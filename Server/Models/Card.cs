using Newtonsoft.Json;

namespace Server.Dtos;

public class Card
{
    public Guid OracleId { get; set; }
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
    public IEnumerable<AllPart> AllParts { get; set; } = Enumerable.Empty<AllPart>();
    public Legalities Legalities { get; set; } = new ();
    public IEnumerable<CardVersion> CardVersions { get; set; } = Enumerable.Empty<CardVersion>();
}

public class AllPart
{
    public Guid Id { get; set; }
}

public class ImageUris
{
    [JsonProperty("normal")] 
    public Uri Normal { get; set; } 

    [JsonProperty("art_crop")]
    public Uri ArtCrop { get; set; }
}

public class Legalities
{
    public bool Standard { get; set; }
    public bool Pioneer { get; set; }
    public bool Modern { get; set; }
    public bool Legacy { get; set; }
    public bool Vintage { get; set; }
    public bool Commander { get; set; }
    public bool Brawl { get; set; }
}

public class CardVersion
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