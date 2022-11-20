const express = require('express')
const mongodb = require('mongodb')
import { collections } from "./database";

export const dowRouter = express.Router();
dowRouter.use(express.json());

dowRouter.get("/", async (req, res) => {
  try {
    const dow30 = await collections.dow30.find({}).toArray();
    res.status(200).send(dow30);
  } catch (error) {
    res.status(500).send(error.message);
  }
});
