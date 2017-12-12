curl -X POST -v \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
  "title": "some title",
  "body": "some body"
}' \
'http://localhost:3000/api/posts'