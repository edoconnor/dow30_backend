import * as mongodb from "mongodb";
import { Dow } from "./dow";

export const collections: {
  dow30?: mongodb.Collection<Dow>;
} = {};

export async function connectToDatabase(uri: string) {
  const client = new mongodb.MongoClient(uri);
  await client.connect();

  const db = client.db("test");
  await applySchemaValidation(db);

  const dow30Collection = db.collection<Dow>("dow30");
  collections.dow30 = dow30Collection;
}

async function applySchemaValidation(db: mongodb.Db) {
  const jsonSchema = {
    $jsonSchema: {
      bsonType: "object",
      required: [
        "name",
        "symbol",
        "last",
        "pe",
        "peg",
        "beta",
        "shares",
        "ebitda",
        "mktcap",
      ],
      additionalProperties: false,
      properties: {
        _id: {},
        name: {
          bsonType: "string",
          description: "'name' is required and is a string",
        },
        symbol: {
          bsonType: "string",
          description: "'symbol' is required and is a string",
        },
        last: {
          bsonType: "number",
          description: "'last' is required and is a number",
        },
        pe: {
          bsonType: "number",
          description: "'pe' is required and is a number",
        },
        peg: {
          bsonType: "number",
          description: "'peg' is required and is a number",
        },
        beta: {
          bsonType: "number",
          description: "'beta' is required and is a number",
        },
        shares: {
          bsonType: "number",
          description: "'shares' is required and is a number",
        },
        ebitda: {
          bsonType: "number",
          description: "'ebitda' is required and is a number",
        },
        mktcap: {
          bsonType: "number",
          description: "'mktcap' is required and is a number",
        },
      },
    },
  };

  await db
    .command({
      collMod: "states",
      validator: jsonSchema,
    })
    .catch(async (error: mongodb.MongoServerError) => {
      if (error.codeName === "NamespaceNotFound") {
        await db.createCollection("states", { validator: jsonSchema });
      }
    });
}
