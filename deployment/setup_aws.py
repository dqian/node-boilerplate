import subprocess
import json

# First create a .env.production file
subprocess.run(['cp', '.env.example', '.env.production']

# Next setup RDS
rds_creation_result=subprocess.run(["aws", "rds", "create-db-instance", "--db-instance-identifier", "node-boilerplate-db-instance", "--master-username", "postgres", "--master-user-password", "password",
               "--port", "5432", "--engine", "postgres", "--engine-version", "11", "--db-instance-class", "db.m5.large", "--allocated-storage", "20"], text=True, stdout=subprocess.PIPE)
rds_creation_result_json=json.loads(
    rds_creation_result.stdout.replace('\n', ''))

# ==== Might need to deal with some VPC bullshit right here.

# Then create an image & upload to ECR
ecr_repo_result=subprocess.run(
    ['aws', 'ecr', 'create-repository', '--repository-name', 'node-boilerplate-repo'])
ecr_repo_result_json=json.loads(rds_creation_result.stdout.replace('\n', ''))
ecr_repo_uri=ecr_repo_result_json.get('repository').get('repositoryUri')

# Write the RDS & ECR URIs into the .env.production file

# Finally run the cloud formation setup script with the RDS + image info
cloudformation_result=subprocess.run(["aws", "cloudformation", "create-stack", "--stack-name", "node-boilerplate-cluster", "--template-body", "file://./deployment/ecs.yml", "--capabilities",
               "CAPABILITY_NAMED_IAM", "--parameters", "ParameterKey=VpcId,ParameterValue=<vpc-id>", "ParameterKey=SubnetIds,ParameterValue=<subnet-id>\,<subnet-id>"], text=True, stdout=PIPE)
