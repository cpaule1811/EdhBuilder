import React from 'react';
import './DeckCard.css'
import star from  '../../icons/star.svg'
import { Link } from 'react-router-dom'

function DeckCard(props) {
  const { deckID, cardArt, deckName, partner, username, avgRating, commander } = props;
  const artist = "beau"
    return (
        <Link to={`decklist/${deckID}`}>
        <div className="a-box">
            <img id="commander-art" src={cardArt} alt="commander" title={`Artist: ${artist}`} />
            <div className="deck-info-container">
              <div className="inner-diagnal"></div>
              <h3>{deckName}</h3>
              <h4>{commander}</h4>
              {partner && <h4>{`& ${partner}`}</h4>}
                <div className="user">{username}</div>
                <div className="rating"><span id="rating">{avgRating}</span> <img src={star} alt="star rating" height='25px' width= '25px'/></div>
         </div>
       </div>
       </Link>
    );
}

export default DeckCard;