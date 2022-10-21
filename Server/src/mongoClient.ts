import { MongoClient } from "mongodb";
import { Card } from "./models/Card";

const connectionString : string = process.env.MONGO_CONNECTION_STRING
console.log(connectionString)
export const mongoClient = new MongoClient(connectionString);

export const cardDb = mongoClient.db(process.env.CARD_DATABASE)
export const cardsCollection = cardDb.collection<Card>(process.env.CARDS_COLLECTION_NAME)