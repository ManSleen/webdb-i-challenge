const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get results" });
    });
});

server.post("/", (req, res) => {});

server.delete("/:id", (req, res) => {});

server.put("/:id", (req, res) => {});

module.exports = server;
