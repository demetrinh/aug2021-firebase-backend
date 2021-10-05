import * as functions from "firebase-functions";
import express from "express";
import cors from "cors";
import shoutoutRoutes from "./routes/shoutoutRoute";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/", shoutoutRoutes);

export const api = functions.https.onRequest(app);
