
## Instruction

sample .env

NODE_ENV=development
DB_NAME=game-score
DB_HOST=localhost
DB_USER=root
DB_PASS=toor
JWT_SECRET=2a$10$lwOKj6ps3wgFoiyrdn7Kte

run docker compose up -d

# get token
curl -X POST http://localhost:3000/auth \
 -H "Content-Type: application/json" \
 -d '{"email": "me@nendy.name", "password": "12345"}'

# first query
curl http://localhost:3000/users -H "Authorization: Bearer <token>"

# add score
curl -X POST http://localhost:3000/scores \
 -H 'Content-Type: application/json' \
 -H 'Authorization: Bearer <token>' \
 -d '{"name":"nendy","score":99}'
