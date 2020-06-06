#!/usr/bin/zsh

if [ $1 ]; then
  yarn ts-node ./node_modules/.bin/typeorm migration:generate -n $1
else
  echo "You need to provide a migration name"
fi
