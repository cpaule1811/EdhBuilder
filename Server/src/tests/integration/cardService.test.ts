import { MongoMemoryServer } from 'mongodb-memory-server';
import { insertCard, upsertCards } from "../../services/cardService";
import { mockCards } from "../mockData/mockCards";
import { expect } from "@jest/globals";
import { mongoClient, cardDb } from "../../mongoClient";
import { cardsCollection } from "../../models/Card";
import { mockCard } from "../mockData/mockCard";

describe('CardService', () => {
    let mongoServer: MongoMemoryServer;

    beforeAll(async () => {
        console.log(process.env.MONGO_TEST_PORT)
        mongoServer = await MongoMemoryServer.create({
            instance: {
                port: +process.env.MONGO_TEST_PORT,
                ip: process.env.MONGO_TEST_IP,
                dbName: process.env.DATABASE_NAME,
            }
        });
        await mongoServer.start()
    });

    afterEach(async () => {
        await cardsCollection.deleteMany({});
    });

    afterAll(async () => {
        await mongoClient.close();
        await mongoServer.stop();
    });

    test("insert_singleCard_shouldUpdateDb", async () => {
        const expectedId: string = "44623693-51d6-49ad-8cd7-140505caf02f";

        const result = await insertCard(mockCards[0]);

        expect(result).toEqual(expectedId)
    });

    test("Upsert_whenDbEmpty_shouldInsertAllCards", async () => {
        const expectedCount: number = 4;

        const result = await upsertCards(mockCards);

        expect(result.upsertCount).toEqual(expectedCount)
    });

    test("Upsert_whenAllCardsExist_shouldChangeNothing", async () => {
        await cardsCollection.insertMany(mockCards);
        const expectedModifiedCount: number = 0;
        const expectedUpsertCount: number = 0;

        const result = await upsertCards(mockCards);
        console.log(result);

        expect(result.modifiedCount).toEqual(expectedModifiedCount)
        expect(result.upsertCount).toEqual(expectedUpsertCount)
    });

    test("Upsert_whenExistingCardDifferent_shouldUpdateCard", async () => {
        await cardsCollection.insertMany([mockCard, mockCards[2]]);
        const expectedModifiedCount: number = 1;
        const expectedUpsertCount: number = 2;

        const result = await upsertCards(mockCards);
        console.log(result);

        expect(result.modifiedCount).toEqual(expectedModifiedCount)
        expect(result.upsertCount).toEqual(expectedUpsertCount)
    });
});