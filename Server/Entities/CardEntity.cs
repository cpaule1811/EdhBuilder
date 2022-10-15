using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Server.Entities;

public class CardEntity
{
    [BsonId]
    public string OracleId { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Lang { get; set; } = string.Empty;
    public string Layout { get; set; } = string.Empty;
    public string Power { get; set; } = string.Empty;
    public string TypeLine { get; set; } = string.Empty;
    public string Toughness { get; set; } = string.Empty;
    public IEnumerable<string> Colors { get; set; } = Enumerable.Empty<string>();
    public IEnumerable<string> ColorIndicator { get; set; } = Enumerable.Empty<string>();
    public IEnumerable<string> ColorIdentity { get; set; } = Enumerable.Empty<string>();
    public IEnumerable<string> Keywords { get; set; } = Enumerable.Empty<string>();
    public IEnumerable<AllPartEntity> AllParts { get; set; } = Enumerable.Empty<AllPartEntity>();
    public LegalitiesEntity LegalitiesEntity { get; set; } = new ();
    public IEnumerable<CardVersionEntity> CardVersions { get; set; } = Enumerable.Empty<CardVersionEntity>();
}

public class AllPartEntity
{
    public Guid PartId { get; set; }
}

public class LegalitiesEntity
{
    public bool Standard { get; set; }
    public bool Pioneer { get; set; }
    public bool Modern { get; set; }
    public bool Legacy { get; set; }
    public bool Vintage { get; set; }
    public bool Commander { get; set; }
    public bool Brawl { get; set; }
}

public class CardVersionEntity
{
    public string Set { get; set; }
    public string SetName { get; set; }
    public Uri CardImage { get; set; }
    public Uri ArtCrop { get; set; }
    public string Artist { get; set; }
    public bool IsFoil { get; set; }
    public bool IsPromo { get; set; }
    public bool IsVariation { get; set; }
    public bool IsFullArt { get; set; }
    public bool IsReprint { get; set; }
    // TODO: Maybe enum??
    public string Rarity { get; set; }
    public string BorderColor { get; set; }
}