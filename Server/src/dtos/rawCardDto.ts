export interface imageUriDto {
    small: string;
    normal: string;
    large: string;
    png: string;
    art_crop: string;
    border_crop: string;
}

export interface AllPartDto {
    object: string;
    id: string;
    component: string;
    name: string;
    type_line: string;
    uri: string;
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
    multiverse_ids: any[];
    flavor_text?: string;
    name: string;
    lang: string;
    released_at: string;
    uri: string;
    scryfall_uri: string;
    layout: string;
    highres_image: boolean;
    image_status: string;
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
    games: string[];
    reserved: boolean;
    foil: boolean;
    nonfoil: boolean;
    finishes: string[];
    oversized: boolean;
    promo: boolean;
    reprint: boolean;
    variation: boolean;
    set_id: string;
    set: string;
    set_name: string;
    set_type: string;
    set_uri: string;
    set_search_uri: string;
    scryfall_set_uri: string;
    rulings_uri: string;
    prints_search_uri: string;
    collector_number: string;
    digital: boolean;
    rarity: string;
    artist: string;
    artist_ids: string[];
    illustration_id: string;
    border_color: string;
    frame: string;
    full_art: boolean;
    textless: boolean;
    booster: boolean;
    story_spotlight: boolean;
    prices: PricesDto;
}