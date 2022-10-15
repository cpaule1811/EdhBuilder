using Newtonsoft.Json;

namespace Server.Dtos
{
    public class CardDto
    {
        [JsonProperty("object")]
        public string Object { get; set; }

        [JsonProperty("id")]
        public string Id { get; set; }

        [JsonProperty("oracle_id")]
        public Guid OracleId { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("lang")]
        public string Lang { get; set; }

        [JsonProperty("released_at")]
        public DateTimeOffset ReleasedAt { get; set; }

        [JsonProperty("layout")]
        public string Layout { get; set; }

        [JsonProperty("highres_image")]
        public bool HighresImage { get; set; }

        [JsonProperty("image_uris")]
        public ImageUrisDto ImageUrisDto { get; set; }

        [JsonProperty("mana_cost")]
        public string ManaCost { get; set; }

        [JsonProperty("cmc")]
        public long Cmc { get; set; }

        [JsonProperty("type_line")]
        public string TypeLine { get; set; }

        [JsonProperty("oracle_text")]
        public string OracleText { get; set; }

        [JsonProperty("power")]
        public string Power { get; set; }

        [JsonProperty("toughness")]
        public string Toughness { get; set; }

        [JsonProperty("colors")]
        public string[] Colors { get; set; }

        [JsonProperty("color_indicator")]
        public string[] ColorIndicator { get; set; }

        [JsonProperty("color_identity")]
        public string[] ColorIdentity { get; set; }

        [JsonProperty("keywords")]
        public object[] Keywords { get; set; }

        [JsonProperty("all_parts")]
        public AllPartDto[] AllParts { get; set; }

        [JsonProperty("legalities")]
        public LegalitiesDto LegalitiesDto { get; set; }

        [JsonProperty("games")]
        public string[] Games { get; set; }

        [JsonProperty("reserved")]
        public bool Reserved { get; set; }

        [JsonProperty("foil")]
        public bool Foil { get; set; }

        [JsonProperty("nonfoil")]
        public bool Nonfoil { get; set; }

        [JsonProperty("finishes")]
        public string[] Finishes { get; set; }

        [JsonProperty("oversized")]
        public bool Oversized { get; set; }

        [JsonProperty("promo")]
        public bool Promo { get; set; }

        [JsonProperty("reprint")]
        public bool Reprint { get; set; }

        [JsonProperty("variation")]
        public bool Variation { get; set; }

        [JsonProperty("set")]
        public string Set { get; set; }

        [JsonProperty("set_name")]
        public string SetName { get; set; }

        [JsonProperty("set_type")]
        public string SetType { get; set; }

        [JsonProperty("rulings_uri")]
        public Uri RulingsUri { get; set; }

        [JsonProperty("prints_search_uri")]
        public Uri PrintsSearchUri { get; set; }

        [JsonProperty("rarity")]
        public string Rarity { get; set; }

        [JsonProperty("card_back_id")]
        public Guid CardBackId { get; set; }

        [JsonProperty("artist")]
        public string Artist { get; set; }

        [JsonProperty("artist_ids")]
        public Guid[] ArtistIds { get; set; }

        [JsonProperty("illustration_id")]
        public Guid IllustrationId { get; set; }

        [JsonProperty("border_color")]
        public string BorderColor { get; set; }

        [JsonProperty("security_stamp")]
        public string SecurityStamp { get; set; }

        [JsonProperty("full_art")]
        public bool FullArt { get; set; }

        [JsonProperty("textless")]
        public bool Textless { get; set; }

        [JsonProperty("edhrec_rank")]
        public long EdhrecRank { get; set; }

        [JsonProperty("prices")]
        public PricesDto PricesDto { get; set; }

        [JsonProperty("purchase_uris")]
        public PurchaseUrisDto PurchaseUrisDto { get; set; }
    }
    
     public class AllPartDto
    {
        [JsonProperty("object")]
        public string Object { get; set; }

        [JsonProperty("id")]
        public Guid Id { get; set; }

        [JsonProperty("component")]
        public string Component { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("type_line")]
        public string TypeLine { get; set; }

        [JsonProperty("uri")]
        public Uri Uri { get; set; }
    }

    public class ImageUrisDto
    {
        [JsonProperty("normal")]
        public Uri CardImage { get; set; }

        [JsonProperty("art_crop")]
        public Uri ArtCrop { get; set; }
    }

    public class LegalitiesDto
    {
        [JsonProperty("standard")]
        public string Standard { get; set; }
        
        [JsonProperty("pioneer")]
        public string Pioneer { get; set; }
        
        [JsonProperty("modern")]
        public string Modern { get; set; }

        [JsonProperty("legacy")]
        public string Legacy { get; set; }
        
        [JsonProperty("vintage")]
        public string Vintage { get; set; }
        
        [JsonProperty("commander")]
        public string Commander { get; set; }

        [JsonProperty("brawl")]
        public string Brawl { get; set; }
    }

    public class PricesDto
    {
        [JsonProperty("usd")]
        public string Usd { get; set; }

        [JsonProperty("usd_foil")]
        public string UsdFoil { get; set; }

        [JsonProperty("usd_etched")]
        public object UsdEtched { get; set; }

        [JsonProperty("eur")]
        public string Eur { get; set; }

        [JsonProperty("eur_foil")]
        public string EurFoil { get; set; }

        [JsonProperty("tix")]
        public string Tix { get; set; }
    }

    public class PurchaseUrisDto
    {
        [JsonProperty("tcgplayer")]
        public Uri Tcgplayer { get; set; }

        [JsonProperty("cardmarket")]
        public Uri Cardmarket { get; set; }

        [JsonProperty("cardhoarder")]
        public Uri Cardhoarder { get; set; }
    }

}
    