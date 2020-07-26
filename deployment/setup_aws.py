#!/usr/bin/env python3
import subprocess
import json
import fileinput
import uuid
import time

ECS_CLUSTER_NAME = 'deployment-node-boilerplate-cluster'
ECS_SERVICE_NAME = 'deployment-node-boilerplate-service'
ECR_REPO_NAME = 'node-boilerplate-repo'
AWS_REGION = 'us-west-2'
SERVER_PORT = 80

# First create a .env.production file
subprocess.run(['cp', './.env.template', './.env.production'])

# Next setup RDS
subprocess.run(["aws", "rds", "create-db-instance", "--db-instance-identifier", "node-boilerplate-db-instance", "--master-username", "postgres", "--master-user-password", "password",
                "--port", "5432", "--engine", "postgres", "--engine-version", "11", "--db-instance-class", "db.m5.large", "--allocated-storage", "20", "--publicly-accessible"], text=True, stdout=subprocess.PIPE)

# Keep checking if the DB is created so that we can get the endpoint
# TODO: Clean this ghetto shit up
starttime = time.time()
while True:
    time_delta = time.time() - starttime
    print(("Creating database - it's been {} seconds").format(time_delta))

    if time_delta > 1800:
        print('Operation timed out')
        break

    try:
        rds_description = subprocess.run(["aws", "rds", "describe-db-instances", "--db-instance-identifier",
                                          "node-boilerplate-db-instance"], text=True, stdout=subprocess.PIPE)
        rds_description_json = json.loads(
            rds_description.stdout.replace('\n', ''))
        db_instances = rds_description_json.get('DBInstances')
        db_instance = next(filter(lambda item: item.get(
            'DBInstanceIdentifier') == 'node-boilerplate-db-instance', db_instances))
        rds_host = db_instance.get('Endpoint').get('Address')

        print(('Created, host is: {}').format(rds_host))
        break

    except AttributeError as error:
        time.sleep(60.0 - ((time.time() - starttime) % 60.0))

# Then create an image & upload to ECR
ecr_repo_result = subprocess.run(
    ['aws', 'ecr', 'create-repository', '--repository-name', ECR_REPO_NAME], text=True, stdout=subprocess.PIPE)
ecr_repo_result_json = json.loads(ecr_repo_result.stdout.replace('\n', ''))
ecr_repo_uri = ecr_repo_result_json.get('repository').get('repositoryUri')
print('ECR Repo URI: {}'.format(ecr_repo_uri))

values_list = [str(uuid.uuid1()), rds_host, ecr_repo_uri, ECR_REPO_NAME,
               ECS_CLUSTER_NAME, ECS_SERVICE_NAME, AWS_REGION, str(SERVER_PORT)]
pointer = 0

# Write the RDS & ECR URIs into the .env.production file
print('Writing production env file')

# Read in the file
with open('.env.production', 'r') as file :
  filedata = file.read()

# Replace the target string
for idx, val in enumerate(values_list):
  indicator = '[{}]'.format(idx)
  new_val = values_list[idx]
  filedata = filedata.replace(indicator, new_val)

# Write the file out again
with open('.env.production', 'w') as file:
  file.write(filedata)

# Login to AWS
print('Logging in')
subprocess.Popen( "aws ecr get-login-password --region {} | docker login --username AWS --password-stdin {}".format(AWS_REGION, ecr_repo_uri), stdin=subprocess.PIPE, shell=True)

# Build production image
print('Building production image')
build_result = subprocess.run(["docker", "build", "--no-cache", "-f", "./Dockerfile.prod", "-t", ECR_REPO_NAME, "."], text=True, stdout=subprocess.PIPE)

# Tag image
print('Tagging image')
tag_result = subprocess.run(["docker", "tag", "{}:latest".format(ECR_REPO_NAME), "{}:latest".format(ecr_repo_uri)], text=True, stdout=subprocess.PIPE)

# Push image
print('Pushing image')
push_result = subprocess.run(["docker", "push", "{}:latest".format(ECR_REPO_NAME)], text=True, stdout=subprocess.PIPE)

# Run the cloud formation setup script with the RDS + image info
print('Running cloudformation setup')
cloudformation_result = subprocess.run(["aws", "cloudformation", "create-stack", "--stack-name", "node-boilerplate-cluster", "--template-body", "file://./deployment/ecs.yml", "--capabilities",
                                        "CAPABILITY_NAMED_IAM", "--parameters", "ParameterKey=ImageUri,ParameterValue={}".format(ecr_repo_uri)], text=True, stdout=subprocess.PIPE)

# Setup the database
print('Running database migrations')
migration_result = subprocess.run(["yarn", "setup:prod"], text=True, stdout=subprocess.PIPE)

# Deploy
print('Deploying')
deploy_result = subprocess.run(["yarn", "deploy"], text=True, stdout=subprocess.PIPE)