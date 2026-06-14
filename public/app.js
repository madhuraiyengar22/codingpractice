const apiBase = '/api/movies';
const elements = {
    refreshMovies: document.getElementById('refreshMovies'),
    moviesTableBody: document.querySelector('#moviesTable tbody'),
    createTitle: document.getElementById('createTitle'),
    createDirector: document.getElementById('createDirector'),
    createYear: document.getElementById('createYear'),
    createMovie: document.getElementById('createMovie'),
    getId: document.getElementById('getId'),
    getMovie: document.getElementById('getMovie'),
    updateId: document.getElementById('updateId'),
    updateTitle: document.getElementById('updateTitle'),
    updateDirector: document.getElementById('updateDirector'),
    updateYear: document.getElementById('updateYear'),
    updateMovie: document.getElementById('updateMovie'),
    deleteId: document.getElementById('deleteId'),
    deleteMovie: document.getElementById('deleteMovie'),
    deleteIds: document.getElementById('deleteIds'),
    deleteMovies: document.getElementById('deleteMovies'),
    responseOutput: document.getElementById('responseOutput')
};

const renderResponse = async (response) => {
    const contentType = response.headers.get('content-type') || '';
    let output;

    if (contentType.includes('application/json')) {
        const json = await response.json();
        output = JSON.stringify(json, null, 2);
    } else {
        output = await response.text();
    }

    elements.responseOutput.textContent = `Status: ${response.status} ${response.statusText}\n\n${output}`;
};

const handleError = (error) => {
    elements.responseOutput.textContent = `Error: ${error.message}`;
};

const fetchMovies = async () => {
    try {
        const response = await fetch(apiBase);
        if (!response.ok) throw new Error('Failed to load movies');
        const movies = await response.json();
        elements.moviesTableBody.innerHTML = movies.map(movie => `
            <tr>
                <td>${movie.id}</td>
                <td>${movie.title}</td>
                <td>${movie.director}</td>
                <td>${movie.year}</td>
            </tr>
        `).join('');
        elements.responseOutput.textContent = 'Loaded movie list.';
    } catch (error) {
        handleError(error);
    }
};

const createMovie = async () => {
    const body = {
        title: elements.createTitle.value.trim(),
        director: elements.createDirector.value.trim(),
        year: Number(elements.createYear.value)
    };

    try {
        const response = await fetch(apiBase, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        await renderResponse(response);
        if (response.ok) fetchMovies();
    } catch (error) {
        handleError(error);
    }
};

const getMovie = async () => {
    const id = elements.getId.value.trim();
    if (!id) return handleError(new Error('Enter a movie ID'));

    try {
        const response = await fetch(`${apiBase}/${id}`);
        await renderResponse(response);
    } catch (error) {
        handleError(error);
    }
};

const updateMovie = async () => {
    const id = elements.updateId.value.trim();
    if (!id) return handleError(new Error('Enter a movie ID to update'));

    const body = {
        title: elements.updateTitle.value.trim(),
        director: elements.updateDirector.value.trim(),
        year: Number(elements.updateYear.value)
    };

    try {
        const response = await fetch(`${apiBase}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        await renderResponse(response);
        if (response.ok) fetchMovies();
    } catch (error) {
        handleError(error);
    }
};

const deleteMovie = async () => {
    const id = elements.deleteId.value.trim();
    if (!id) return handleError(new Error('Enter a movie ID to delete'));

    try {
        const response = await fetch(`${apiBase}/${id}`, { method: 'DELETE' });
        await renderResponse(response);
        if (response.ok) fetchMovies();
    } catch (error) {
        handleError(error);
    }
};

const deleteMovies = async () => {
    const ids = elements.deleteIds.value
        .split(',')
        .map(item => item.trim())
        .filter(Boolean)
        .map(Number);

    if (!ids.length) return handleError(new Error('Enter at least one ID'));

    try {
        const response = await fetch(apiBase, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ids })
        });
        await renderResponse(response);
        if (response.ok) fetchMovies();
    } catch (error) {
        handleError(error);
    }
};

elements.refreshMovies.addEventListener('click', fetchMovies);
elements.createMovie.addEventListener('click', createMovie);
elements.getMovie.addEventListener('click', getMovie);
elements.updateMovie.addEventListener('click', updateMovie);
elements.deleteMovie.addEventListener('click', deleteMovie);
elements.deleteMovies.addEventListener('click', deleteMovies);

fetchMovies();
