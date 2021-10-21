const express = require('express'),
                app = express(),
                cors = require('cors'),
                curso = require('./curso'),
                usuario = require('./usuario'),
                actividad = require('./actividad'),
                {uploadImage, getImage, upload} = require('./imgfiles'),
                unidad = require('./unidad')

app.use(express.json({limit: '50mb'}))

app.use(express.urlencoded({extended:true}))

app.use(cors({origin: '*'}))

app.listen(3000,()=>{
    console.log('Servidor iniciado en el puerto 3000') 
})

// Rutas API
app.get('/api', (req, res) => {
    res.send('Hi API Rest tailor made development')
} )


app.use('/api/curso', curso)
app.use('/api/usuario', usuario)
app.use('/api/unidad', unidad)
app.use('/api/actividad', actividad)

app.get('/api/img/:tipo/:id', getImage)
app.post('/api/upload/:tipo', upload.single('file'), uploadImage)