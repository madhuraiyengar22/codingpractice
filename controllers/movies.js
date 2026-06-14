const express = require('express');
const router = express.Router();

const movies = [
    { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
    { id: 2, title: 'The Matrix', director: 'Lana Wachowski, Lilly Wachowski', year: 1999 },
    { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];

const getAllMovies = (req, res) => {
    res.send(movies);
}

const getMovieById = (req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === parseInt(id));
    if(!movie) {
        return res.status(404).send('Movie not found');
    }
    res.send(movie);
}

const createMovie = (req, res) => {
    const movie = req.body; 
    movie.id = movies.length + 1;
    movies.push(movie);
    res.send(movie);
}

const updateMovie = (req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === parseInt(id));
    movie.title = req.body.title;
    movie.director = req.body.director;
    movie.year = req.body.year;
    if(!movie) {
        return res.status(404).send('Movie not found');
    }
    res.send(movie);
}

const deleteMovie = (req, res) => {
    const id = req.params.id;
    const movie = movies.find(movie => movie.id === parseInt(id));
    if(!movie) {
        return res.status(404).send('Movie not found');
    }
    movies.splice(movies.indexOf(movie), 1);
    res.send(movie);
};

const deleteMovies = (req, res) => {
    const ids = req.body.ids; // Expecting an array of IDs like { ids: [1, 2, 3] }
    if (!Array.isArray(ids)) {
        return res.status(400).send('IDs must be an array');
    }
    const deletedMovies = [];
    ids.forEach(id => {
        const movieIndex = movies.findIndex(movie => movie.id === parseInt(id));
        if (movieIndex !== -1) {
            deletedMovies.push(movies.splice(movieIndex, 1)[0]);
        }
    });
    res.send(deletedMovies);
}

module.exports = { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie, deleteMovies };