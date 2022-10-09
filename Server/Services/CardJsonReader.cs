using Newtonsoft.Json;
using Server.Dtos;

namespace Server.Services;

public class CardJsonReader
{
    private readonly FileInfo _cardData;
    
    public CardJsonReader(FileInfo cardData) {
        _cardData = cardData;
    }
    public IEnumerable<CardDto> Read() {

        using var streamReader = new StreamReader(_cardData.FullName);
        using var jsonReader = new JsonTextReader(streamReader);
            
        jsonReader.SupportMultipleContent = true;
        var serializer = new JsonSerializer();
        var cards = new List<CardDto>();

        while (jsonReader.Read()) {
            if (jsonReader.TokenType != JsonToken.StartObject)
                continue;

            var card = serializer.Deserialize<CardDto>(jsonReader);
            
            if (card is not null)
                cards.Add(card);
        }

        return cards;
    }
}