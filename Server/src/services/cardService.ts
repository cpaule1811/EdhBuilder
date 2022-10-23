import { mongoClient } from "../mongoClient";
import { Card, cardsCollection } from "../models/Card";
import {
    AnyBulkWriteOperation,
    BulkResult,
    BulkWriteResult,
    InsertManyResult,
    InsertOneResult,
    WriteError
} from "mongodb";

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

export const upsertCards = async (cards: Card[]): Promise<upsertResult> => {
    const operations: AnyBulkWriteOperation<Card>[] = cards.map(card => ({
        updateOne: {
            filter: { _id: card._id },
            update: {
                $set: {
                    legalities: card.legalities,
                    cardVersions: card.cardVersions
                }
            },
            upsert: true
        }
    }));
    const result: BulkWriteResult = await cardsCollection.bulkWrite(operations);
    const errors: WriteError[] = result.getWriteErrors()

    return {
        isSuccessful: result.isOk(),
        modifiedCount: result.modifiedCount,
        matchedCount: result.matchedCount,
        upsertCount: result.upsertedCount,
        jsonResponse: result.toJSON(),
        errors
    }
}

interface upsertResult {
    isSuccessful: boolean;
    modifiedCount: number;
    matchedCount: number;
    upsertCount: number;
    jsonResponse: BulkResult;
    errors: WriteError[]
}