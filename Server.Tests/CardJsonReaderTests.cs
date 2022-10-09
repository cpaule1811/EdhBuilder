using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using AutoMapper;
using Newtonsoft.Json;
using NUnit.Framework;
using Server.Controllers;
using Server.Dtos;
using Card = Server.Dtos.Card;

namespace Server.Tests;

public class CardJsonReaderTests
{
    private CardJsonReader _cardJsonReader;
    private const string TestCardDtosPath = "TestData/cards.json";

    [SetUp]
    public void Setup() {
        _cardJsonReader = new CardJsonReader(new FileInfo(TestCardDtosPath));
    }

    [Test]
    public void Read_WhenValidJson_ShouldReturnNotEmpty() {
        IEnumerable<CardDto> cardsResult;
        
        cardsResult = _cardJsonReader.Read();
        
        CollectionAssert.IsNotEmpty(cardsResult);
    }
}