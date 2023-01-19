const express = require('express'),
    router = express.Router(),
    knex = require('./mysqldb')


// trae todos resultados con usuario fitro buscar
router.get('/', async (req, res) => {
    const { q } = req.query
    
    let sql = knex('blog as b')
    if(q !== undefined)
        sql.where('b.titulo','like','%'+q+'%')
            .orWhere('b.descripcion','like','%'+q+'%')
                
    const data = await sql
                    .join('usuarios as u', 'b.email', 'u.email')
                    .select('b.id', 'b.titulo', 'b.descripcion', 'b.fecha', 'u.nombre', 'u.id as uid')
                    .orderBy('b.fecha', 'desc')
    res.json(data)
})


// trae b

router.get('/:id', async (req, res) => {
    const data = await knex('blog')
            .where(req.params)
            .first()
    res.json(data)
})

router.post('/guardar', async (req, res) => {
    
    const { body } = req
    body.fecha = new Date()
    
    await knex('blog').insert(body)
        .onConflict('id')
        .merge()
    
    const data = (body.id == null)
        ?   await knex('blog')
                .select('id', 'titulo', 'descripcion', 'fecha')
                .orderBy('fecha', 'desc')
        :   await knex('blog')
                .where('id', body.id)
                .first()
    
    res.json( data )
})

module.exports = router