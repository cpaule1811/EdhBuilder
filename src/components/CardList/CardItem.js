import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useSelector } from 'react-redux'

function CardItem({ card }) {

    const { deckDetails } = useSelector((state) => state.requestDecklist);
    const [legality, setLegality] = useState("")

    useEffect(() => {
    const checkLegal = (item) => { 
         if (item.legal !== "legal") { 
            setLegality("*This card is banned")
            return false
         }
         return checkColor(item);
    }

    const checkColor = (item) => {
      const { excludedColors } = deckDetails; 
      for (var i = 0; i < excludedColors.length; i++){ 
        if(item.color.includes(excludedColors[i])){
           setLegality("*This card is not in your commander's color identity")
           return false
        }
      }
      setLegality("")
      return true
   }
    checkLegal(card)
    }, [deckDetails, card])

    return (
        <div><div data-tip data-for={card.cardName} className={!legality ? "card-text" : "ilegal-card-text"} >{card.quantity > 1 && card.quantity} {card.cardName}</div>
                  <ReactTooltip className="tooltip" id={card.cardName} place="left" effect="solid" delayShow={200} >
                     <img className={`image-tooltip`} src={card.imageUrl} alt={card.cardName}/>
                     {card.imageUrl2 && <img className="image-tooltip" src={card.imageUrl2} alt={card.cardName}/>}
                     <div >{card.cardName}</div>
                     <div>{`$${card.price}`}</div>
                     {<div className="ilegal-wrapper center"><div className="ilegal-card-text">{legality}</div></div>}
                  </ReactTooltip>
            </div>
    );
}

export default CardItem;