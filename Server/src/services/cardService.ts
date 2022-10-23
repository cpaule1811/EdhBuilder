import { mongoClient } from "../mongoClient";
import { Card, cardsCollection } from "../models/Card";
import { InsertManyResult, InsertOneResult } from "mongodb";

export const insertCard = async (card: Card): Promise<string> => {
    try {
        const result: InsertOneResult<Card> = await cardsCollection.insertOne(card);
        return result.insertedId;
    } finally {

    }
    return "weird";
}

export const deleteCards = async () =>
    await cardsCollection.deleteMany({});

export const upsertCards = async (cards: Card[]): Promise<number> => {
    try {
        // await cardsCollection.deleteMany({});
        const insertResult: InsertManyResult<Card> = await cardsCollection.insertMany(cards);
        return insertResult.insertedCount;
    } finally {

    }
}