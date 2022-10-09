using System.Collections.Generic;
using System.IO;
using System.Linq;
using NUnit.Framework;
using Server.Dtos;
using Server.Services;

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
    public void Read_WhenValidJson_ShouldHaveCorrectNumberOfRecords() {
        IEnumerable<CardDto> cardsResult;
        const int ExpectedCount = 2;

        cardsResult = _cardJsonReader.Read();
        
        Assert.AreEqual(ExpectedCount, cardsResult.Count());
    }
}