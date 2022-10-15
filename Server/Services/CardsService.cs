using System.Collections;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Server.Controllers;
using Server.Entities;

namespace Server.Services;

public class CardsService
{
    private readonly IMongoCollection<CardEntity> _cardsCollection;

    public CardsService(IOptions<CardDatabaseSettings> cardDatabaseSettings) {
        var mongoClient = new MongoClient(cardDatabaseSettings.Value.ConnectionString);
        var mongoDatabase = mongoClient.GetDatabase(cardDatabaseSettings.Value.DatabaseName);

        _cardsCollection = mongoDatabase.GetCollection<CardEntity>(cardDatabaseSettings.Value.CardsCollectionName);
    }

    public async Task<CardEntity> Get() =>
        await _cardsCollection.Find(_ => true).FirstOrDefaultAsync();

    public async Task<long> CreateMany(IEnumerable<CardEntity> cards) {
        var preInsertCount = await _cardsCollection.CountDocumentsAsync("{}");
        await _cardsCollection.InsertManyAsync(cards);
        var postInsertCount = await _cardsCollection.CountDocumentsAsync("{}");

        return postInsertCount - preInsertCount;
    }

    public async Task<IEnumerable<CardEntity>> GetAll() =>
        await _cardsCollection.Find(_ => true).ToListAsync();

    public async Task Drop() =>
        await _cardsCollection.DeleteManyAsync("{}");
}