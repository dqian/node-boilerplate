#!/usr/bin/env python3
import subprocess
import os

print('Removing .env.production file')
os.remove('./.env.production')

print('Deleting RDS DB')
delete_db_result = subprocess.run(["aws", "rds", "delete-db-instance", "--db-instance-identifier", "node-boilerplate-db-instance", "--skip-final-snapshot"], text=True, stdout=subprocess.PIPE)

print('Deleting ECR repo')
delete_repo_result = subprocess.run(["aws", "ecr", "delete-repository", "--repository-name", "node-boilerplate-repo", "--force"], text=True, stdout=subprocess.PIPE)

print('Cleaning up cloudformation stack')
delete_stack_result = subprocess.run(["aws", "cloudformation", "delete-stack", "--stack-name", "node-boilerplate-cluster"], text=True, stdout=subprocess.PIPE)
