import express from 'express';
import Prod from '../classes/contenedorProductos.js'
import upload from '../services/uploader.js';

const router = express.Router();

//LLAMADA CONTENEDOR PRODUCTO 
const product = new Prod();

router.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log('Petición hecha a las: '+time.toTimeString().split(" ")[0])
    next()
})

//GET
router.get('/',(req,res)=>{
    product.getAll().then(result=>{
        res.send(result);
    })
})
 
router.get('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid);
    product.getById(id).then(result=>{
        res.send(result);
    })
})

//POST
router.post('/',(req,res)=>{
    let products = req.body;
    console.log("Lo que recibe el post",products);
    product.save(products).then(result=>{
        res.send(result);
    })
})


//DELETES
router.delete('/:uid',(req,res)=>{
    let id= parseInt(req.params.uid);
    product.deleteById(id).then(result=>{
        res.send(result);
    })
})

//PUT
router.put('/:uid', (req,res)=>{
    let id= parseInt(req.params.uid);
    product.updateProduct(id).then(result=>{
        res.send(result);
    })
})

export default  router;