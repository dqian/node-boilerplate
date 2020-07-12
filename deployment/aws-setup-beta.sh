#!/bin/bash

# import read_var
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/read_var.sh"

AWS_ECR_REPO_NAME=$(read_var AWS_ECR_REPO_NAME .env.production)

# create ECR repository
CREATE_REPOSITORY_RESPONSE=$(aws ecr create-repository --repository-name $AWS_ECR_REPO_NAME)

# identify new repository
DESCRIBE_REPOSITORIES_RESPONSE=$(aws ecr describe-repositories)
REPOSITORY_URI=$(echo $DESCRIBE_REPOSITORIES_RESPONSE | jq -r '.repositories[0].repositoryUri')
REPOSITORY_URI_BASE=${REPOSITORY_URI%%/*}

# create ECS task definition
TASK_DEFINITION_NAME=$AWS_ECR_REPO_NAME-task
CONTAINER_NAME=$AWS_ECR_REPO_NAME-container
aws ecs register-task-definition \
  --family $TASK_DEFINITION_NAME \
  --task-role-arn "ecsTaskExecutionRole" \
  --execution-role-arn "ecsTaskExecutionRole" \
  --network-mode "awsvpc" \
  --container-definitions "
      [
        {
          \"name\": \"$CONTAINER_NAME\",
          \"image\": \"$REPOSITORY_URI:latest\",
          \"cpu\": 0,
          \"portMappings\": [
            {
              \"containerPort\": 80,
              \"hostPort\": 80,
              \"protocol\": \"tcp\"
            }
          ],
          \"essential\": true,
          \"environment\": [],
          \"mountPoints\": [],
          \"volumesFrom\": [],
          \"logConfiguration\": {
            \"logDriver\": \"awslogs\",
            \"options\": {
              \"awslogs-group\": \"/ecs/$TASK_DEFINITION_NAME\",
              \"awslogs-region\": \"us-east-2\",
              \"awslogs-stream-prefix\": \"ecs\"
            }
          }
        }
      ]
    " \
  --requires-compatibilities "FARGATE" \
  --cpu 256 \
  --memory 512

# create ECS cloud formation stack
# CLUSTER_NAME=$AWS_ECR_REPO_NAME-cluster
# aws cloudformation create-stack \
#   --stack-name $CLUSTER_NAME \
#   --template-body file://$DIR/cloud-formation-template.yml \
#   --parameters ParameterKey=EcsClusterName,ParameterValue=$CLUSTER_NAME
