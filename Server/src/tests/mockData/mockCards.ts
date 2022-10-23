import { Card } from "../../models/Card";
import { ObjectId } from "mongodb";

export const mockCards: Card[] = [
    {
        _id:"44623693-51d6-49ad-8cd7-140505caf02f",
        name: "Fury Sliver",
        lang: "en",
        layout: "normal",
        power: "3",
        typeLine: "Creature — Sliver",
        toughness: "3",
        colors: [
            "R"
        ],
        colorIdentity: [
            "R"
        ],
        colorIndicator: [
            "R"
        ],
        keywords: [],
        cmc: 6,
        manaCost: "{5}{R}",
        oracleText: "All Sliver creatures have double strike.",
        allParts: [],
        cardFaces: [],
        legalities: {
            standard: false,
            pioneer: false,
            modern: true,
            legacy: true,
            vintage: true,
            commander: true,
            brawl: false
        },
        cardVersions: [
            {
                versionId: "0000579f-7b35-4ed3-b44c-db2a538066fe",
                artCrop: "https://cards.scryfall.io/art_crop/front/0/0/0000579f-7b35-4ed3-b44c-db2a538066fe.jpg?1562894979",
                artist: "Paolo Parente",
                flavorText: "A rift opened, and our arrows were abruptly stilled. To move was to push the world. But the sliver's claw still twitched",
                flavorName: "",
                borderColor: "black",
                cardImage: "https://cards.scryfall.io/normal/front/0/0/0000579f-7b35-4ed3-b44c-db2a538066fe.jpg?1562894979",
                isFoil: true,
                isPromo: false,
                isReprint: false,
                isOversized: false,
                rarity: "uncommon",
                set: "tsp",
                setName: "Time Spiral",
                isFullArt: false,
                isTextless: false
            },
            {
                versionId: "a8a64329-09fc-4e0d-b7d1-378635f2801a",
                artCrop: "https://cards.scryfall.io/art_crop/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
                artist: "Paolo Parente",
                flavorText: "A rift opened, and our arrows were abruptly stilled. To move was to push the world. But the sliver's claw still twitched",
                flavorName: "",
                borderColor: "black",
                cardImage: "https://cards.scryfall.io/normal/front/a/8/a8a64329-09fc-4e0d-b7d1-378635f2801a.jpg?1619396979",
                isFoil: true,
                isPromo: false,
                isReprint: true,
                isOversized: false,
                rarity: "uncommon",
                set: "tsr",
                setName: "Time Spiral Remastered",
                isFullArt: false,
                isTextless: false
            }
        ]
    },
    {
        _id: "8ae3562f-28b7-4462-96ed-be0cf7052ccc",
        name: "Kor Outfitter",
        lang: "en",
        layout: "normal",
        power: "2",
        typeLine: "Creature — Kor Soldier",
        toughness: "2",
        colors: [
            "W"
        ],
        colorIdentity: [
            "W"
        ],
        colorIndicator: [
            "W"
        ],
        keywords: [],
        cmc: 2,
        manaCost: "{W}{W}",
        oracleText: "When Kor Outfitter enters the battlefield, you may attach target Equipment you control to target creature you control.",
        allParts: [],
        cardFaces: [],
        legalities: {
            standard: false,
            pioneer: false,
            modern: true,
            legacy: true,
            vintage: true,
            commander: true,
            brawl: false
        },
        cardVersions: [
            {
                versionId: "00006596-1166-4a79-8443-ca9f82e6db4e",
                artCrop: "https://cards.scryfall.io/art_crop/front/0/0/00006596-1166-4a79-8443-ca9f82e6db4e.jpg?1562609251",
                artist: "Kieran Yanner",
                flavorText: "",
                flavorName: "",
                borderColor: "black",
                cardImage: "https://cards.scryfall.io/normal/front/0/0/00006596-1166-4a79-8443-ca9f82e6db4e.jpg?1562609251",
                isFoil: true,
                isPromo: false,
                isReprint: false,
                isOversized: false,
                rarity: "common",
                set: "zen",
                setName: "Zendikar",
                isFullArt: false,
                isTextless: false
            }
        ]
    },
    {
        _id: "dc4e2134-f0c2-49aa-9ea3-ebf83af1445c",
        name: "Spirit",
        lang: "en",
        layout: "token",
        power: "1",
        typeLine: "Token Creature — Spirit",
        toughness: "1",
        colors: [
            "W"
        ],
        colorIdentity: [
            "W"
        ],
        colorIndicator: [
            "W"
        ],
        keywords: [
            "Flying"
        ],
        cmc: 0,
        manaCost: "",
        oracleText: "Flying",
        allParts: [
            {
                id: "4d8542f6-ee34-42c6-acd5-07b0c7cc2f63",
                component: "combo_piece"
            }
        ],
        cardFaces: [],
        legalities: {
            standard: false,
            pioneer: false,
            modern: false,
            legacy: false,
            vintage: false,
            commander: false,
            brawl: false
        },
        cardVersions: [
            {
                versionId: "0000a54c-a511-4925-92dc-01b937f9afad",
                artCrop: "https://cards.scryfall.io/art_crop/front/0/0/0000a54c-a511-4925-92dc-01b937f9afad.jpg?1562701869",
                artist: "Mike Sass",
                flavorText: "",
                flavorName: "",
                borderColor: "black",
                cardImage: "https://cards.scryfall.io/normal/front/0/0/0000a54c-a511-4925-92dc-01b937f9afad.jpg?1562701869",
                isFoil: false,
                isPromo: false,
                isReprint: true,
                isOversized: false,
                rarity: "common",
                set: "tmm2",
                setName: "Modern Masters 2015 Tokens",
                isFullArt: false,
                isTextless: false
            }
        ]
    },
    {
        _id: "9f0d82ae-38bf-45d8-8cda-982b6ead1d72",
        name: "Siren Lookout",
        lang: "en",
        layout: "normal",
        power: "1",
        typeLine: "Creature — Siren Pirate",
        toughness: "2",
        colors: [
            "U"
        ],
        colorIdentity: [
            "U"
        ],
        colorIndicator: [
            "U"
        ],
        keywords: [
            "Flying",
            "Explore"
        ],
        cmc: 3,
        manaCost: "{2}{U}",
        oracleText: "Flying\nWhen Siren Lookout enters the battlefield, it explores. (Reveal the top card of your library. Put that card into your hand if it's a land. Otherwise, put a +1/+1 counter on this creature",
        allParts: [],
        cardFaces: [],
        legalities: {
            standard: false,
            pioneer: true,
            modern: true,
            legacy: true,
            vintage: true,
            commander: true,
            brawl: false
        },
        cardVersions: [
            {
                versionId: "0000cd57-91fe-411f-b798-646e965eec37",
                artCrop: "https://cards.scryfall.io/art_crop/front/0/0/0000cd57-91fe-411f-b798-646e965eec37.jpg?1562549609",
                artist: "Chris Rallis",
                flavorText: "",
                flavorName: "",
                borderColor: "black",
                cardImage: "https://cards.scryfall.io/normal/front/0/0/0000cd57-91fe-411f-b798-646e965eec37.jpg?1562549609",
                isFoil: true,
                isPromo: false,
                isReprint: false,
                isOversized: false,
                rarity: "common",
                set: "xln",
                setName: "Ixalan",
                isFullArt: false,
                isTextless: false
            }
        ]
    }
]