import express from "express";
// import { ObjectId } from "mongodb";
import { getClient } from "../db";
import Shoutout from "../models/Shoutout";

// create a new router object
const routes = express.Router();

// GET /shoutouts
routes.get("/shoutouts", async (req, res) => {
  const to = req.query.to as string;

  try {
    if (to) {
      const client = await getClient();
      const results = await client
        .db()
        .collection<Shoutout>("shoutouts2")
        .find({ title: to })
        .toArray();
      res.json(results);
    } else {
      const client = await getClient();
      const results = await client
        .db()
        .collection<Shoutout>("shoutouts2")
        .find()
        .toArray();
      res.json(results);
    }
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// POST /shoutouts
routes.post("/shoutouts", async (req, res) => {
  const newShoutout: Shoutout = req.body;
  try {
    const client = await getClient();
    const result = await client
      .db()
      .collection<Shoutout>("shoutouts2")
      .insertOne(newShoutout);
    newShoutout._id = result.insertedId;
    res.status(201);
    res.json(newShoutout);
  } catch (err) {
    console.error("ERROR", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default routes;
