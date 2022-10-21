import { cardsCollection } from "../mongoClient";
import { Card } from "../models/Card";
import { AnyBulkWriteOperation, InsertManyResult } from "mongodb";

export const findCard = async () =>
    await cardsCollection.findOne();

export const deleteCards = async () =>
    await cardsCollection.deleteMany({});

export const upsertCards = async (cards: Card[]) => {
    await cardsCollection.deleteMany({});
    const result: InsertManyResult<Card> = await cardsCollection.insertMany(cards);
}