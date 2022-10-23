export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            MONGO_CONNECTION_STRING: string;
            DATABASE_NAME: string;
            CARDS_COLLECTION_NAME: string;
            MONGO_TEST_PORT: string;
            MONGO_TEST_IP: string;
        }
    }
}