const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");
const { json } = require("express");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  
  repository = {
    id: uuid(),
    title, 
    url,
    techs,
    likes: 0
  };

  repositories.push(repository);
  response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;
  
  const repositoryIndice = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndice < 0) {
    return response.status(400).send("Register not found.");
  } 
  const dados = repositories[repositoryIndice];
  repositories[repositoryIndice] = { ...dados, title, url, techs };
  
  response.json(repositories[repositoryIndice]);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const repositoryIndice = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndice < 0) {
    return response.status(400).send("Register not found.");
  } 
  
  repositories.splice(repositoryIndice, 1);
  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;
  
  const repositoryIndice = repositories.findIndex(repository => repository.id == id);
  if (repositoryIndice < 0) {
    return response.status(400).send("Register not found.");
  } 
  repositories[repositoryIndice].likes += 1;
  
  response.json(repositories[repositoryIndice]);
});

module.exports = app;
