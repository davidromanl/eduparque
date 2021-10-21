const express = require('express'),
    router = express.Router(),
    knex = require('./mysqldb'),
    auth = require("./auth")

function get_cursos() {
    return knex('cursos')
        .select('id', 'nombre', 'descripcion')
}

router.get('/', async (req, res) => {
    const data = await get_cursos()
    res.json(data)
})

router.get('/:id', async (req, res) => {
    const data = {
        curso: await knex('cursos')
            .where(req.params)
            .first(),
        unidad: await knex('unidades')
            .where('id_curso', req.params.id)
            .select('id', 'id_curso', 'nombre', 'orden'),
        actividad: await knex('actividades as a')
            .join('unidades as u', 'u.id', 'a.id_unidad')
            .where('u.id_curso', req.params.id)
            .select('a.id', 'a.id_unidad', 'a.nombre', 'a.orden')
    }
    res.json(data)
})

router.post('/guardar', async (req, res) => {
    await knex('cursos').insert(req.body)
        .onConflict('id')
        .merge()
    res.status(200).json(true)
})

router.get('/eliminar/:id', async (req, res) => {
    await knex('cursos').where('id',req.params.id).del()
    res.status(200).json(true)
})

module.exports = router