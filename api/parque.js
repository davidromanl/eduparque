const express = require('express'),
    router = express.Router(),
    knex = require('./mysqldb')


router.get('/:uri', async (req, res) => {
    const { uri } = req.params
    let data = false
    const pagina = await knex('paginas')
            .where('url',uri)
            .first()
    if(pagina !== undefined) {

        const filas = await knex('filas as f')
                        .where('f.id_pagina',pagina.id)
                        .select('*')
        
        const contenidos = await knex('contenidos as c')
                        .join('filas as f','f.id','c.id_fila')
                        .where('f.id_pagina',pagina.id)
                        .select('c.*')

        data = { pagina, filas, contenidos }

    }
    // console.log(data)
    res.json(data)
})

router.post('/fila', async (req, res) => {
    req.body.columnas = `[${req.body.columnas}]`
    await knex('filas').insert(req.body)
    
    const filas = await knex('filas')
        .where('id_pagina',req.body.id_pagina)
        .select('*')
    res.json({filas})
})

router.post('/contenido/:id', async (req, res) => {
    await knex('contenidos').insert(req.body)
        .onConflict('id')
        .merge()
    const contenidos = await knex('contenidos as c')
        .join('filas as f','f.id','c.id_fila')
        .where('f.id_pagina',req.params.id)
        .select('c.*')
    res.json({contenidos})
})

router.get('/eliminar/:id', async (req, res) => {
    await knex('cursos').where('id',req.params.id).del()
    res.status(200).json(true)
})

module.exports = router