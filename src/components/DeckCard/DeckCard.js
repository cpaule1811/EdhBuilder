import React from 'react';
import './DeckCard.css'
import star from  '../../icons/star.svg'
import { Link } from 'react-router-dom'
import { LazyLoadImage } from 'react-lazy-load-image-component';

function DeckCard(props) {
  const { deckID, cardArt, deckName, partner, username, avgRating, commander, artist } = props;
    return (
        <Link to={`decklist/${deckID}`}>
        <div className="a-box">
        <LazyLoadImage id="commander-art" src={cardArt} alt="commander" title={`Artist: ${artist}`} width={220} height={210}/>
            <div className="deck-info-container">
              <div className="inner-diagnal"/>
              <h3>{deckName}</h3>
              <h4>{commander}</h4>
              {partner && <h4>{`& ${partner}`}</h4>}
                <div style={{color: "black"}}>{username}</div>
                <div className="rating"><span id="rating">{avgRating}</span> <img src={star} alt="star rating" height='25px' width= '25px'/></div>
         </div>
       </div>
       </Link>
    );
}

export default DeckCard;