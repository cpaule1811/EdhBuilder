import { cardDb } from "../mongoClient";

const collectionName = "cards";
export const cardsCollection = cardDb.collection<Card>(collectionName);

export interface Card {
    _id: string;
    name: string;
    lang: string;
    layout: string;
    power: string;
    typeLine: string;
    toughness: string;
    manaCost: string;
    cmc: number;
    oracleText: string;
    colors: string[];
    colorIdentity: string[];
    colorIndicator: string[];
    keywords: string[];
    cardFaces: string[];
    allParts: {
        id: string;
        component: string;
    }[];
    legalities: {
        standard: boolean;
        pioneer: boolean;
        modern: boolean;
        legacy: boolean;
        vintage: boolean;
        commander: boolean;
        brawl: boolean;
    };
    cardVersions: {
        versionId: string;
        set: string;
        setName: string;
        cardImage: string;
        flavorName: string;
        flavorText: string;
        artCrop: string;
        artist: string;
        isFoil: boolean;
        isPromo: boolean;
        isReprint: boolean;
        isFullArt: boolean;
        isOversized: boolean;
        isTextless: boolean;
        rarity: string;
        borderColor: string;
    }[]
}