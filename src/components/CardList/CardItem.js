import React, { useState, useEffect } from 'react';
import ReactTooltip from 'react-tooltip';
import { useDispatch, useSelector } from 'react-redux';
import deleteBin from '../../icons/delete-bin.svg'
import { updateDecklist } from '../../actions';
import Message from '../Message/Message'

function CardItem({ card }) {

    const { deckDetails, decklist, sideboard } = useSelector((state) => state.requestDecklist);
    const [legality, setLegality] = useState("")
    const [message, setMessage] = useState("")
    const dispatch = useDispatch()

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

    const handleRemoveCard = () => { 
      fetch("https://edh-builder-api-m7vk6.ondigitalocean.app/removecard", { 
          method: "POST",
          body: JSON.stringify({ deckID: card.deckID, cardName: card.cardName }),
          headers: { 
              "Content-Type": "application/json",
              "Authorization": window.localStorage.getItem('token')
          }
      })
      .then(response => response.json())
      .then(card => { 
          generateMessage("card succesfully removed", "red")
          dispatch(updateDecklist(decklist.filter(item => item.cardName !== card), sideboard.filter(item => item.cardName !== card)))
      })
  }

  const generateMessage = (message, color) => {
   setMessage({message: message, color: color })
   setTimeout(() => { setMessage("") }, 2000) 
}

    return (
        <div>
        {message && <Message message={message.message} color={message.color}/>}
        <div data-tip data-for={card.cardName} className={!legality ? "card-text" : "ilegal-card-text"} >
             {card.quantity > 1 && card.quantity} {card.cardName}
             <img onClick={() => handleRemoveCard()} className={deckDetails.authorised && "delete-bin"} src={deleteBin} alt="delete magic the gathering card"/>
         </div>
                  
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