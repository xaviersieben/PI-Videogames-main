const { Router } = require('express');
const axios = require('axios')
const {API_KEY}= process.env;
const { conn, Videogame, Genre, Videogame_Genre } = require('../db.js')
const {getVideogame,getVideoId,getGenre,postVideogame} = require('./../controllers/index.js')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.get('/videogames', getVideogame)
router.get('/videogames/:id', getVideoId)
router.get('/genres', getGenre)
router.post('/videogames', postVideogame)


module.exports = router;
