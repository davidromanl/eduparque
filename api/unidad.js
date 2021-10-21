const express = require('express'),
    router = express.Router(),
    knex = require('./mysqldb')

router.get('/', async (req, res) => {
    const data = await knex('unidades')
        .select('id', 'nombre', 'descripcion')
    res.json(data)
})

router.get('/:id', async (req, res) => {

})

router.post('/guardar', async (req, res) => {
    await knex('unidades').insert(req.body)
        .onConflict('id')
        .merge()
    
    const data = await knex('unidades')
        .where('id_curso', req.body.id_curso)
        .select('*')
    
    res.json( data )
})

module.exports = router