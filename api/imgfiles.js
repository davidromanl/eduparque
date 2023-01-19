const fs = require('fs'),
    multer  = require('multer'),
    upload = multer({ dest: 'public/' }),
    sharp = require('sharp')

sharp.cache(false)

function getImage(req, res) {
    const { tipo, id } = req.params
    const tipos = ["usuario", "curso", "blog"]
    if(!tipos.includes(tipo))
        return res.status(401).end()

    const ruta = './public/'+tipo+'_'+id+'.jpg'
    fs.readFile(ruta, function(err, data) {
        if(err)
            fs.readFile('./public/'+tipo+'_0.jpg', function(e, data) {
                if (e) throw e;
                return res.end(data)
            })
        else
            return res.end(data)
    })
}

function uploadImage(req, res) {
    
    const { id } = req.body
    const { tipo } = req.params
    const ruta = './public/'+tipo+'.jpg'
    const file = './public/'+tipo+'_'+id+'.jpg'

    const w = (tipo!=='usuario') ? 1200 : 500
    const h = (tipo!=='usuario') ? 600 : 500

    fs.rename(req.file.path, ruta, (err)=>{
        if(err)
            console.log(err);
        
        sharp(ruta)
            .resize(w,h).jpeg({quality : 50})
            .toFile(file)
            .then(d => {
                fs.unlinkSync(ruta)
                res.send(d)
            }).catch( e => console.log(e))
    })
}

module.exports = {
    uploadImage: uploadImage,
    getImage: getImage,
    upload: upload
}