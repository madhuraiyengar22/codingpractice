const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movies');

router.get('/api/movies', movieController.getAllMovies);
router.get('/api/movies/:id', movieController.getMovieById);
router.post('/api/movies', movieController.createMovie);
router.put('/api/movies/:id', movieController.updateMovie);
router.delete('/api/movies/:id', movieController.deleteMovie);
router.delete('/api/movies', movieController.deleteMovies);

module.exports = router;