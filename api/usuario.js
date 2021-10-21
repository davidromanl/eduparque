const express = require('express'),
    router = express.Router(),
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
    knex = require('./mysqldb'),
    auth = require('./auth'),
    fs = require('fs'),
    multer  = require('multer'),
    upload = multer({ dest: 'public/' }),
    sharp = require('sharp')

sharp.cache(false)

function buscar_usuario(email) {
    return knex('usuarios')
        .where('email', email)
        .first()
}

router.get('/', auth, async (req, res) => {
    const {email} = req.decoded
    const buscar = await buscar_usuario(email)
    return res.json(buscar)
})
/* 
router.post('/foto', upload.single('file'), (req, res) => {
    
    const { id } = req.body
    fs.rename(req.file.path, './public/avatar.jpg', (err)=>{
        if(err)
            console.log(err);
        
        sharp('./public/avatar.jpg')
            .resize(200,200).jpeg({quality : 50})
            .toFile('./public/avatar_'+id+'.jpg')
            .then(d => {
                fs.unlinkSync('./public/avatar.jpg')
                res.send(d)
            }).catch( e => console.log(e))
    })
    
})

router.get('/avatar/:id', (req, res) => {
    const { id } = req.params
    fs.readFile('./public/avatar_'+id+'.jpg', function(err, data) {
        if(err)
            fs.readFile('./public/avatar0.jpg', function(err, data) {
                if (err) throw err;
                return res.end(data)
            })
        else
            return res.end(data)
    })
})
 */
router.post('/registro', async (req, res) => {
    
    const usuario = req.body

    const buscar = await buscar_usuario(usuario.email)

    if(buscar === undefined) {
        usuario.clave = await bcrypt.hash(usuario.clave, 10)
        usuario.email = usuario.email.toLowerCase()
        await knex('usuarios').insert(usuario)
        res.json(true)
    } else {
        res.json(false)
    }
})

router.post('/login', async (req, res) => {

    let { email, clave } = req.body

    const buscar = await buscar_usuario(email)

    if(buscar && (await bcrypt.compare(clave,buscar.clave)) ) {
        const token = jwt.sign(
            { email: email },
            'EstaEsLaAPP',
            { expiresIn: '30m' })
        const data = { token: token, user: buscar }
        res.status(200).json(data)
    } else {
        res.status(401).json(false)
    }

})


module.exports = router