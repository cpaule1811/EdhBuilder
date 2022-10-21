import { Card } from "../models/Card";
import { rawCardDto } from "../dtos/rawCardDto";

export const readCardsFromJson = (cardsAsJson: string): rawCardDto[] =>
    JSON.parse(cardsAsJson)

export const groupRawCardDtos = (cardDtos: rawCardDto[]): rawCardDto[][] => {
    const initialValue: (rawCardDto[][]) = [];

    return cardDtos.reduce((groups, curCard, i) => {
        const oracleId = curCard.oracle_id;
        const groupIndex = groups.findIndex(group => group[0].oracle_id == oracleId);

        if (groupIndex >= 0)
            groups[groupIndex].push(curCard)
        else
            groups.push([curCard])

        return groups;
    }, initialValue)
}

export const legalityStrToTruthy = (legalityStr: string): boolean =>
    (legalityStr == "legal");

export const mapRawCardDtosToCard = (groupedCardDto: rawCardDto[]): Card => {
    const firstGroupedDto: rawCardDto = groupedCardDto[0];
    const { legalities } = firstGroupedDto;

    return {
        _id: firstGroupedDto.oracle_id,
        name: firstGroupedDto.name,
        lang: firstGroupedDto.lang,
        layout: firstGroupedDto.layout,
        power: firstGroupedDto.power,
        typeLine: firstGroupedDto.type_line,
        toughness: firstGroupedDto.toughness,
        colors: firstGroupedDto.colors,
        colorIdentity: firstGroupedDto.color_identity,
        colorIndicator: firstGroupedDto.color_identity,
        keywords: firstGroupedDto.keywords,
        cmc: firstGroupedDto.cmc,
        manaCost: firstGroupedDto.mana_cost,
        oracleText: firstGroupedDto.oracle_text,
        allParts: firstGroupedDto.all_parts?.map(part => ({id: part.id, component: part.component})) ?? [],
        legalities: {
            standard: legalityStrToTruthy(legalities.standard),
            pioneer: legalityStrToTruthy(legalities.pioneer),
            modern: legalityStrToTruthy(legalities.modern),
            legacy: legalityStrToTruthy(legalities.vintage),
            vintage: legalityStrToTruthy(legalities.vintage),
            commander: legalityStrToTruthy(legalities.commander),
            brawl: legalityStrToTruthy(legalities.brawl),
        },
        cardVersions: groupedCardDto.map(cardVersion => ({
            artCrop: cardVersion.image_uris.art_crop,
            artist: cardVersion.artist,
            borderColor: cardVersion.border_color,
            cardImage: cardVersion.image_uris.normal,
            isFoil: cardVersion.foil,
            isPromo: cardVersion.promo,
            isReprint: cardVersion.reprint,
            rarity: cardVersion.rarity,
            set: cardVersion.set,
            setName: cardVersion.set_name

        }))
    }
}

export const mapRawCardDtosToCards = (rawCardDtoGroups: rawCardDto[][]): Card[] =>
    rawCardDtoGroups.map(cardDtoGroup => mapRawCardDtosToCard(cardDtoGroup));