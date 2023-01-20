const { Router } = require('express');
// import { uploader } from '../utils.js';
const router = Router();

//let users = [];


router.get('/', (req, res) => {
    res.send({ message: 'hi user get asasas' })
});

router.post('/', (req, res) => {
    res.send({ message: 'hi user post' })
});

// router.post('/',uploader.single('file'),(req, res) => {
//     if(!req.file) 
//         return res.status(400).send({status:'error', error:'no se pudo cargar'});
//     console.log(req.file);
//     let user = req.body;

//     user.profile = req.file.path;
//     user.push(user);
//     res.send({status:'success',message:'User created'});
 

// })

module.exports = router