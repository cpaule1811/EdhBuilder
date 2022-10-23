import { MongoMemoryServer } from 'mongodb-memory-server';
import { insertCard, upsertCards } from "../../services/cardService";
import { mockCards } from "../mockData/mockCards";
import { expect } from "@jest/globals";
import { mongoClient, cardDb } from "../../mongoClient";

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
        await cardDb.dropCollection("cards")
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

    test("Upsert_whenGivenCards_ShouldUpdateDb", async () => {
        const expectedCount: number = 4;

        const result = await upsertCards(mockCards);

        expect(result).toEqual(expectedCount)
    });
});