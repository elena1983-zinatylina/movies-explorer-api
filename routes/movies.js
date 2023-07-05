const router = require('express').Router();
const { 
    getAllMovies, 
    addMovie, 
    deleteMovie } 
    = require('../controllers/movies');

const { 
    addMovieValidator, 
    movieIdValidator 
} = require('../middlewares/validation');

router.get('/movies', getAllMovies);

router.post('/movies', addMovieValidator, addMovie);

router.delete('/movies/:_id', movieIdValidator, deleteMovie);

module.exports = router;