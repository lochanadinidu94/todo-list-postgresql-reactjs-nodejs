const {Client } = require('pg')

const client = new Client({
    user: 'dinidulochana',
    host: 'localhost',
    database: 'todolist',
    password: '1234',
    port: 5432,
})

module.exports = client