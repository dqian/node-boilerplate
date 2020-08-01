#!/bin/bash

# import read_var
DIR="${BASH_SOURCE%/*}"
if [[ ! -d "$DIR" ]]; then DIR="$PWD"; fi
. "$DIR/read_var.sh"

DB_HOST=$(read_var DB_HOST .env.production)
DB_NAME=$(read_var DB_NAME .env.production)
DB_PASSWORD=$(read_var DB_PASSWORD .env.production)
DB_PORT=$(read_var DB_PORT .env.production)
DB_USER=$(read_var DB_USER .env.production)

psql "postgresql://$DB_USER:$DB_PASSWORD@$DB_HOST/$DB_NAME"