#!/bin/bash
set -e

mongoimport --jsonArray -d ${MONGO_INITDB_DATABASE} -c videos --file /docker-entrypoint-initdb.d/videos.json
mongoimport --jsonArray -d ${MONGO_INITDB_DATABASE} -c quizzes --file /docker-entrypoint-initdb.d/quizzes.json

mongo <<EOF
use $MONGO_INITDB_DATABASE
db.createUser({
  user:  '$MONGO_INITDB_ROOT_USERNAME',
  pwd: '$MONGO_INITDB_ROOT_PASSWORD',
  roles: [{
    role: 'readWrite',
    db: '$MONGO_INITDB_DATABASE'
  }]
});
EOF