// Base de datos
const dbconf = {
    client: 'mysql',
    connection: {
        host : 'localhost',
        user : 'root',
        password : '',
        database : 'ci4'
    }
}

const knex = require('knex')(dbconf)

module.exports = knex