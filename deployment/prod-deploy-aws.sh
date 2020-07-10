#!/bin/bash

# import read_var
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/read_var.sh"

ROOT_DIR="$DIR/../"
AWS_ECR_REPO_URI=$(read_var AWS_ECR_REPO_URI .env.production)
AWS_ECR_REPO_NAME=$(read_var AWS_ECR_REPO_NAME .env.production)
AWS_ECS_CLUSTER_NAME=$(read_var AWS_ECS_CLUSTER_NAME .env.production)
AWS_ECS_SERVICE_NAME=$(read_var AWS_ECS_SERVICE_NAME .env.production)

echo "Deploying to..."
echo "AWS_ECR_REPO_URI = $AWS_ECR_REPO_URI"
echo "AWS_ECR_REPO_URI = $AWS_ECR_REPO_NAME"
echo "AWS_ECR_REPO_URI = $AWS_ECS_CLUSTER_NAME"
echo "AWS_ECR_REPO_URI = $AWS_ECS_SERVICE_NAME"
echo "TAG (local) = $AWS_ECR_REPO_NAME:latest"
echo "TAG (remote) = $AWS_ECR_REPO_URI/$AWS_ECR_REPO_NAME:latest"

# deploy to ECR and update ECS
aws ecr get-login-password --region us-east-2 | docker login --username AWS --password-stdin $AWS_ECR_REPO_URI
docker build --no-cache	-f $ROOT_DIR/Dockerfile.prod -t $AWS_ECR_REPO_NAME .
docker tag $AWS_ECR_REPO_NAME:latest $AWS_ECR_REPO_URI/$AWS_ECR_REPO_NAME:latest
docker push $AWS_ECR_REPO_URI/$AWS_ECR_REPO_NAME:latest
aws ecs update-service --cluster $AWS_ECS_CLUSTER_NAME --service $AWS_ECS_SERVICE_NAME --force-new-deployment
