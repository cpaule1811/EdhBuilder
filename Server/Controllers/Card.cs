using System.Collections;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.Options;
using Microsoft.Extensions.Options;
using Server.Entities;
using Server.Services;

namespace Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Card : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly CardJsonReader _cardJsonReader;
        private CardsService _cardService;

        public Card(IMapper mapper, IOptions<CardDatabaseSettings> cardDatabaseSettings) {
            _mapper = mapper;
            _cardJsonReader = new CardJsonReader(new FileInfo("Data/cards.json"));
            _cardService = new CardsService(cardDatabaseSettings);
        }
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardEntity>>> GetCards() {
            var cards = await _cardService.GetAll();

            return Ok(cards);
        }
        
        
        [HttpPost]
        public async Task<ActionResult> WriteCards() {
            var cards = _cardJsonReader.Read();
            var uniqueCards = cards.GroupBy(card => card.OracleId);
            
            var cardsToAdd = uniqueCards.Select(uniqueCard => 
                _mapper.Map<CardEntity>(uniqueCard));
            
            var result = await _cardService.CreateMany(cardsToAdd);

            return Ok($"{result} rows inserted!");
        }

        [HttpDelete]
        public async Task<ActionResult> DeleteCards() {
            await _cardService.Drop();

            return Ok("Success");
        }
    }
}
