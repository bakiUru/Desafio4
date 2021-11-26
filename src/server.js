import express from 'express';
import cors from 'cors'
import productRouter from './routes/products.js'
import upload from './services/uploader.js';
const port = 8080 || process.env.PORT;
const server = express();

//LLAMADA ROUTER
const prodRouter = productRouter
const serverStats = server.listen(port, ()=>{
    console.log(`Servidor Escuchando en Puerto ${port}`);
})

//manejo de error Servidor
serverStats.on('error',(error)=>{ console.log('Error en el server ' + error)});

server.use(express.json());
server.use(cors());
server.use(express.urlencoded({extended:true})); //necesario para recibir arreglos con objetos anidados
//directorio publico
server.use(express.static('public'));

//Router
server.use('/api/products',prodRouter);

//images
server.post('/api/uploadfile',upload.fields([
    {
        name:'file', maxCount:1
    },
    {
        name:"documents", maxCount:3
    }
]),(req,res)=>{
    const files = req.files;
    console.log(files);
    if(!files||files.length===0){
        res.status(500).send({messsage:"No se subió archivo"})
    }
    res.send(files);
})
