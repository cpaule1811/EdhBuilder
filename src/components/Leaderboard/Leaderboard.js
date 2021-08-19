import React from 'react';
import './Leaderboard.css'
import { Link } from 'react-router-dom';
import star from '../../icons/star.svg'

function Leaderboard({ rankings, time }) {
    return (
        <div className="leaderboard-container">
            <div className= "first-tab">
               <h1>Top 5 <span className="month">{time === "Monthly" && "(Past Month)"}</span></h1>
               <h2>Highest Ranked Decks</h2>
               <img src={rankings[0].cardArt} alt="best magic the gathering cardArt" title={rankings[0].artist}/>
                <div className="white-background">
                    <div id="first-rank"><div>{rankings[0].avgRating}</div><img src={star} alt="rating for mtg commander deck" width='25px' height='25px'/></div>
                    <div className="deck-details first">
                            <div className="deck">{rankings[0].deckName}</div>
                            <div>{rankings[0].commander}</div>
                            <div>{rankings[0].partner && `& ${rankings[0].partner}`}</div>
                            <div>{rankings[0].username}</div>
                        </div>
                 </div>
                  <div className="description-wrapper"><div className="description">{`${rankings[0].deckDescription.substring(0,100)}...`}</div></div>
                  <Link to={`/decklist/${rankings[0].deckID}`}><button className="decklist-button" id="signUp">Decklist</button></Link>
            </div> 
            <div className="leaderboard-tabs">
                 {rankings.concat([0,0,0,0]).slice(1,5).map((item, i) => { 
                  return <div key={i} className="leaderboard-tab">
                      <Link to = {`/decklist/${item.deckID}`}><div className="deck-details">
                        <div className="deck">{item.deckName}</div>
                        <div className="commander">{item.commander}</div>
                        <div>{item.partner && `& ${item.partner}`}</div>
                        <div className="user">{item.username}</div>
                      </div></Link>
                      <div className="factor">{item.avgRating}</div>  
                  </div>
                 })}
            </div>
        </div>
    );
}

export default Leaderboard;