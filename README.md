# Node consumer + producer with Kafka

This project runs 1 producer and 4 Node.js consumers with Kafka. Each consumer pair is using the same group id and reading from different partitions. This example illustrates multiple consumption groups balancing load with partitions.

## Running
```
docker-compose -f docker-compose.yml rm
docker-compose -f docker-compose.yml up --build
```

## CURL
```
curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "title": "some title",
  "body": "some body"
}' \
'http://localhost:3001/api/posts'
```

## Bombardier
```
./bombardier --connections=500 \
--latencies \
--method=POST \
--duration=30s \
--requests=1000 \
--header='Content-Type: application/json' \
--header='Accept: application/json' \
--body='{ "title": "some title", "body": "some body" }' \
'http://localhost:3001/api/posts'
```