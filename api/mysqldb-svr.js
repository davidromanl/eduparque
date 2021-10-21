// Base de datos
const dbconf = {
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'eduparque',
        password : '*Edu2021',
        database : 'eduparque'
    }
}

const knex = require('knex')(dbconf)

module.exports = knex