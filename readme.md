# Vef2 2022, verkefni 3

### Build skref býr til stjórnanda sem er með username: admin og password: 123

createdb vef2-2022-v3\
createdb vef2-2022-v3test\
setja upp .env & .env.test með tengingu í gagnagrunna\
npm install\
npm run test\
npm run build\
npm start # eða `npm run dev`


## cURL skipanir

Efsta skipunin gefur token sem þarf í aðrar aðgerðir
`
curl --location --request POST 'https://protected-hollows-46830.herokuapp.com/users/login' \
--header 'Content-Type: application/json' \
--data-raw '{
    "username": "admin",
    "password": "123"
}'
`
### GET/users
`
curl --location --request GET 'https://protected-hollows-46830.herokuapp.com/users' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI3ODAyLCJleHAiOjE2NDY0MzI4MDJ9.tt9Ts0S-rLqh87E0RdpDjGRgY8ekS-ETUTrcQ5FUrLY' \
--data-raw ''
`
### GET/users/me
`
curl --location --request GET 'https://protected-hollows-46830.herokuapp.com/users/me' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzUyNTk3LCJleHAiOjE2NDYzNTc1OTd9.sUXmCGiPYwEMZHZWpzD5j1sEGbAqJU3OSvPS-ftd2lU'
`
### POST/users/register
`
curl --location --request POST 'https://protected-hollows-46830.herokuapp.com/users/register' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "hello",
    "username": "world",
    "password": "123",
    "isAdmin": "false"
}'
`
### GET/events
`
curl --location --request GET 'https://protected-hollows-46830.herokuapp.com/events' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzU0ODk5LCJleHAiOjE2NDYzNTk4OTl9.tNkFFzZzsXpbyUtTB6du6-ceHb7d1uhv9zfdBfW-Prc'
`
### POST/events/register
`
curl --location --request POST 'https://protected-hollows-46830.herokuapp.com/events/register' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzU0ODk5LCJleHAiOjE2NDYzNTk4OTl9.tNkFFzZzsXpbyUtTB6du6-ceHb7d1uhv9zfdBfW-Prc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "Foobar",
    "description": "lorem ipsum"
}'
`
### GET/events/:id
`
curl --location --request GET 'https://protected-hollows-46830.herokuapp.com/events/2'
`
### PATCH/events/:id
`
curl --location --request PATCH 'https://protected-hollows-46830.herokuapp.com/events/2' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzU0ODk5LCJleHAiOjE2NDYzNTk4OTl9.tNkFFzZzsXpbyUtTB6du6-ceHb7d1uhv9zfdBfW-Prc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "name": "batman",
    "description": "lorem ipsum batmanus"
}'
`
### DELETE/events/:id
`
curl --location --request DELETE 'https://protected-hollows-46830.herokuapp.com/events/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI3ODAyLCJleHAiOjE2NDY0MzI4MDJ9.tt9Ts0S-rLqh87E0RdpDjGRgY8ekS-ETUTrcQ5FUrLY'
`

### POST/events/:id/register
`
curl --location --request POST 'https://protected-hollows-46830.herokuapp.com/events/2/register' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzU0ODk5LCJleHAiOjE2NDYzNTk4OTl9.tNkFFzZzsXpbyUtTB6du6-ceHb7d1uhv9zfdBfW-Prc' \
--header 'Content-Type: application/json' \
--data-raw '{
    "comment": "robin kemur ekki"
}'
`
### DELETE/events/:id/register
`
curl --location --request DELETE 'https://protected-hollows-46830.herokuapp.com/events/1/register' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2NDI3ODAyLCJleHAiOjE2NDY0MzI4MDJ9.tt9Ts0S-rLqh87E0RdpDjGRgY8ekS-ETUTrcQ5FUrLY' \
--data-raw ''
`
### GET/users/:id
`
curl --location --request GET 'https://protected-hollows-46830.herokuapp.com/users/1' \
--header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjQ2MzU2MjE3LCJleHAiOjE2NDYzNjEyMTd9.Q78lRl2LytYngldpSRz6ZbsbMIYjngBYY2VIqLNV-Wk'
`