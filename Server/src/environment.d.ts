export {}

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: string;
            PORT: string;
            MONGO_CONNECTION_STRING: string;
            CARD_DATABASE: string;
            CARDS_COLLECTION_NAME: string;
        }
    }
}