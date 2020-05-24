const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    const newRepository = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0,
    };

    repositories.push(newRepository);

    return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { title, url, techs } = request.body;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex === -1) {
        return response.status(400).json({ err: 'Repository not found' });
    }

    const oldRepository = repositories[repositoryIndex];

    const updatedRepository = {
        ...oldRepository,
        title,
        url,
        techs,
    }

    repositories[repositoryIndex] = updatedRepository;

    return response.json(updatedRepository);
});

app.delete("/repositories/:id", (request, response) => {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex === -1) {
        return response.status(400).json({ err: 'Repository not found' });
    }

    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const repositoryIndex = repositories.findIndex(repository => repository.id === id);

    if (repositoryIndex === -1) {
        return response.status(400).json({ err: 'Repository not found' });
    }

    const oldRepository = repositories[repositoryIndex];

    const updatedRepository = {
        ...oldRepository,
        likes: oldRepository.likes + 1,
    }

    repositories[repositoryIndex] = updatedRepository;

    return response.json(updatedRepository);

});


module.exports = app;