import { mongoClient } from "../mongoClient";
import { Card, cardsCollection } from "../models/Card";
import {
    AnyBulkWriteOperation,
    BulkResult,
    BulkWriteResult, FindCursor,
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

export const getCards = async (cardIds: string[]): Promise<GetCardsResult> => {
    const result: FindCursor<Card> = await cardsCollection.find<Card>({ _id: { $in: cardIds } });
    const cards: Card[] = await result.toArray()
    const nonExistentIds = cardIds.filter(id => !cards.find(card => card._id == id))
    const errors = nonExistentIds.map(id => `Could not find card with id: ${id}`)

    return {
        cards,
        errors
    }
}

export const upsertCards = async (cards: Card[]): Promise<UpsertResult> => {
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

interface UpsertResult {
    isSuccessful: boolean;
    modifiedCount: number;
    matchedCount: number;
    upsertCount: number;
    jsonResponse: BulkResult;
    errors: WriteError[]
}

export interface GetCardsResult {
    cards: Card[];
    errors: string[];
}