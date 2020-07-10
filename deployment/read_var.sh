#!/bin/bash

read_var() {
  VAR=$(grep -w $1 $2 | xargs)
  IFS="=" read -ra VAR <<< "$VAR"
  echo ${VAR[1]}
}
 