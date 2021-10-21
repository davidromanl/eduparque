const express = require('express'),
    router = express.Router(),
    knex = require('./mysqldb'),
    ba64 = require("ba64")

router.get('/', async (req, res) => {
    const data = await knex('actividades as a')
            .join('unidades as u', 'u.id', 'a.id_unidad')
            .where('u.id_curso', req.query.id_curso)
            .select('a.id', 'a.id_unidad', 'a.nombre', 'a.orden')
    res.json( data )
})

router.get('/:id', async (req, res) => {
    const actividad = await knex('actividades')
            .where(req.params).first('*')
    const recursos = await knex('recursos')
            .where('id_actividad',req.params.id).select('*')
    const aportes = await knex('aportes as a')
            .join('usuarios as u', 'a.email', 'u.email')
            .where('a.id_actividad',req.params.id)
            .select('a.*','u.id as id_usuario','u.nombre')
    const data = {
        actividad, recursos, aportes
    }
    res.json( data )
})

router.post('/guardar', async (req, res) => {
    const { descripcion } = req.body
    const imgRex = /(data:image\/[^;]+;base64[^"]+)/g;
    
    const img = imgRex.exec(descripcion)
    
    if(img !== null) {
        ba64.writeImageSync("./public/image1.jpg", img[0])
        req.body.descripcion = descripcion.replace(img[0],"")
    }

    await knex('actividades').insert(req.body)
        .onConflict('id')
        .merge()

    
    res.status(200).json( true )
})


//recursos

router.post('/add_recurso', async (req, res) => {
    await knex('recursos').insert(req.body)
        .onConflict('id')
        .merge()
    const recursos = await knex('recursos')
        .where('id_actividad',req.body.id_actividad).select('*')
    res.status(200).json( recursos )
})


//aportes
router.post('/send_aporte', async (req, res) => {
    await knex('aportes').insert(req.body)
        .onConflict('id')
        .merge()
    const aportes = await knex('aportes as a')
                        .join('usuarios as u', 'a.email', 'u.email')
                        .where('a.id_actividad',req.body.id_actividad)
                        .select('a.*','u.id as id_usuario','u.nombre')
    res.status(200).json( aportes )
})


module.exports = router