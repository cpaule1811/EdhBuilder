export interface imageUriDto {
    normal: string;
    art_crop: string;
}

export interface AllPartDto {
    id: string;
    component: string;
}

export interface LegalitiesDto {
    standard: string;
    pioneer: string;
    modern: string;
    legacy: string;
    vintage: string;
    commander: string;
    brawl: string;
}

export interface PricesDto {
    usd: string;
    usd_foil?: any;
    usd_etched?: any;
    eur?: any;
    eur_foil?: any;
    tix?: any;
}

export interface rawCardDto {
    object: string;
    id: string;
    oracle_id: string;
    flavor_name?: string;
    flavor_text?: string;
    name: string;
    lang: string;
    released_at: string;
    uri: string;
    scryfall_uri: string;
    layout: string;
    highres_image: boolean;
    image_uris: imageUriDto;
    mana_cost: string;
    cmc: number;
    type_line: string;
    oracle_text: string;
    power: string;
    toughness: string;
    colors: string[];
    color_identity: string[];
    keywords: string[];
    all_parts?: AllPartDto[];
    legalities: LegalitiesDto;
    foil: boolean;
    oversized: boolean;
    promo: boolean;
    reprint: boolean;
    variation: boolean;
    set: string;
    set_name: string;
    rarity: string;
    artist: string;
    border_color: string;
    card_faces?: {
        oracle_id: string;
    }[]
    full_art: boolean;
    textless: boolean;
    prices: PricesDto;
}