// Base de datos
const dbconf = {
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'eduparque'
    }
}

const knex = require('knex')(dbconf)

module.exports = knex