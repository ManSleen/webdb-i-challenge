const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  const { limit, sortby, sortdir } = req.query;
  const query = db("*");

  if (limit) {
    query.limit(limit);
  }

  if (sortby) {
    query.orderBy(sortby);
    if (sortby && sortdir) {
      query.orderBy(sortby, sortdir);
    }
  }

  query
    .from("accounts")
    .then(results => {
      res.status(200).json(results);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not get list of accounts" });
    });
});

server.post("/", (req, res) => {
  const account = req.body;
  db("accounts")
    .insert(account, "id")
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res.status(500).json({ message: "Could not add account to db" });
    });
});

server.delete("/:id", (req, res) => {
  const accountId = req.params.id;
  db("accounts")
    .where("id", "=", accountId)
    .del()
    .then(account => {
      res.status(200).json(account);
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was a problem deleting the account" });
    });
});

server.put("/:id", (req, res) => {
  const accountId = req.params.id;
  const changes = req.body;
  db("accounts")
    .where("id", "=", accountId)
    .update(changes)
    .then(count => {
      if (count) {
        res.status(200).json(count);
      } else {
        res
          .status(404)
          .json({ message: "Could not find account with that ID" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error changing that account" });
    });
});

module.exports = server;
