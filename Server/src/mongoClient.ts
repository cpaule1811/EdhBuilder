import { MongoClient } from "mongodb";

const environment : string = process.env.NODE_ENV;
const connectionString : string = environment == "test"
    ? `mongodb://${process.env.MONGO_TEST_IP}:${process.env.MONGO_TEST_PORT}`
    : process.env.MONGO_CONNECTION_STRING

export const mongoClient: MongoClient = new MongoClient(connectionString ?? "")
export const cardDb = mongoClient.db(process.env.DATABASE_NAME)