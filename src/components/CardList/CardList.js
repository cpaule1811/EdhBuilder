import React from 'react';
import { useSelector } from 'react-redux'
import HowTo from '../HowTo/HowTo';
import CardItem from './CardItem';

import './CardList.css'

function CardList() {
   const { decklist, deckDetails, sideboard } = useSelector((state) => state.requestDecklist);

   const cardList = () => {
      return Object.entries({
       Lands: filterCards("Land", "nothing"),
       Creatures: filterCards("Creature", "nothing"),
       Planeswalker: filterCards("Planeswalker", "nothing"),
       Instants: filterCards("Instant", "Creature"),
       Sorceries: filterCards("Sorcery", "Creature"),
       Enchantments: filterCards("Enchantment", "Creature"),
       Artifacts: filterCards('Artifact', "Creature")
      }).sort((fir,sec) => fir[1].length - sec[1].length)
   }

    const filterCards = (type, ignore) => { 
         return decklist.filter(item => 
            item.modal.includes("transform") || item.modal.includes('modal_dfc') ? 
            item.type.substring(0, item.type.indexOf(' //')).includes(type) : 
            item.type.includes(type) && !item.type.includes(ignore)
         )
    }

    const columns = (columnContent) => {
      return columnContent.map((type, i) => { 
         if (type[1].length){
         return <div key={i} className="column-item"><div className="type">{type[0]} ({quantity(type[1])})</div>
            {type[1].map((item, i) => { 
               return <CardItem key={i} card={item}/>
            } )}
         </div>
         } return null
        }
        )
    }

    const sideBoard = () => { 
       return Object.entries({ Sideboard: sideboard })
    }

    const quantity = (typeArray) => { 
       let initialValue = 0;
      return typeArray.reduce((acc, cur) => acc + cur.quantity, initialValue)
    }

    return (
       <>
       { decklist.length ? 
     <> <div className="outer-cardlist-container">
        <div className="card-list-container">
         <div className="column">
            {columns(cardList().splice(0,1).concat(cardList().splice(6,1)))}
         </div>
         <div className="column">
             {columns(cardList().splice(5,1).concat(cardList().splice(1,1)))}
         </div>
         <div className="column">
              {columns(cardList().splice(3,2).reverse())}
         </div>
         <div className="column">
            {columns(cardList().splice(2,1).concat(sideBoard()))}
         </div>
           {}
        </div>
      </div> 
      <div className="cardlist-description">
           <h2>Deck Description</h2>
           <div>{deckDetails.description}</div>
        </div></>
      : 
      <HowTo/>}
        </>
       
    );
}

export default CardList;