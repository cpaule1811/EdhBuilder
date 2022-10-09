using System;
using System.Collections.Generic;
using System.IO;
using AutoMapper;
using Newtonsoft.Json;
using NUnit.Framework;
using Server.Dtos;
using Server.Models;
using Server.Services;
using Card = Server.Models.Card;

namespace Server.Tests;

public class CardEntityMappingProfileTests
{
    private const string TestCardDtosPath = "TestData/cards.json";
    private IEnumerable<CardDto> _testCardDtos;
    private IMapper _mapper;

    [OneTimeSetUp]
    public void Setup() {
        var configuration = new MapperConfiguration(cfg => {
            cfg.AddProfile<CardEntityMappingProfile>();
        });
        
        _mapper = new Mapper(configuration);
        
        var CardJsonReader = new CardJsonReader(new FileInfo(TestCardDtosPath));
        _testCardDtos = CardJsonReader.Read();
    }

    [Test]
    public void CardMap_WhenGivenDto_ShouldReturnExpectedResult() {
        var expected = new Card {
            OracleId = Guid.ParseExact("09cc8709-fe10-472a-b05c-e89f3523018d", "D"),
            Name = "Austere Command",
            Lang = "en",
            Layout = "normal",
            Power = null,
            Toughness = null,
            Colors = new []{ "W" },
            ColorIndicator = Array.Empty<string>(),
            ColorIdentity = new []{ "W" },
            Keywords = Array.Empty<string>(),
            AllParts = Array.Empty<AllPart>(),
            Legalities = new Legalities {
                Standard = false,
                Pioneer = false,
                Modern = true,
                Legacy = true,
                Vintage = true,
                Commander = true,
                Brawl = false
            },
            CardVersions = new CardVersion[] {
                new () {
                    Artist = "Anna Steinbauer",
                    IsPromo = false,
                    IsVariation = false,
                    IsFullArt = false,
                    IsFoil = false,
                    IsReprint = true,
                    BorderColor = "black",
                    Set = "clb",
                    Rarity = "rare",
                    SetName = "Commander Legends: Battle for Baldur's Gate",
                    CardImage = new Uri("https://cards.scryfall.io/normal/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687"),
                    ArtCrop = new Uri("https://cards.scryfall.io/art_crop/front/3/d/3d24036e-075f-4991-a740-a9d943722ad2.jpg?1654114687"),
                },
                new () {
                    Artist = "Wayne England",
                    IsPromo = false,
                    IsVariation = false,
                    IsFullArt = false,
                    IsFoil = false,
                    IsReprint = true,
                    BorderColor = "black",
                    Set = "cmd",
                    Rarity = "rare",
                    SetName = "Commander 2011",
                    CardImage = new Uri("https://cards.scryfall.io/normal/front/4/5/45000021-a6d9-4f86-a92e-3e52d1000c20.jpg?1592712728"),
                    ArtCrop = new Uri("https://cards.scryfall.io/art_crop/front/4/5/45000021-a6d9-4f86-a92e-3e52d1000c20.jpg?1592712728"),
                }
            }
        };
        var expectedAsJson = JsonConvert.SerializeObject(expected);
        
        var result = _mapper.Map<Card>(_testCardDtos);
        var resultAsJson = JsonConvert.SerializeObject(result);
        
        Assert.AreEqual(expectedAsJson, resultAsJson);
    }
}