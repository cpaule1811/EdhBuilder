import { useSelector } from 'react-redux'
import { useState } from 'react'
import Upload from '../../components/Upload/Upload'
import CmcChart from '../Charts/CmcChart'
import ProducedChart from '../Charts/ProducedChart'
import './EditorSidebar.css'

function EditorSidebar() {
   const { decklist, deckDetails, isPending } = useSelector((state) => state.requestDecklist)
   const { userId } = useSelector((state) => state.loginStatus);
   const [imageSwitch, toggleImageSwitch] = useState(true)
   const { partner, cardImage, cardImagePartner, commander, userID } = deckDetails

    const mtgMateUrl = () => { 
      const cardsToAdd = decklist.map(item => { 
        return item.cardName
      }).join("%0D%0A").concat(`%0D%0A${commander}`)
     return `https://www.mtgmate.com.au/cards/decklist_results?utf8=✓&decklist=${cardsToAdd}&commit=Build+Deck`
    }

    const totalPrice = () => { 
      const prices = decklist.map(item => Number(item.price))
      return prices.reduce((a, b) => a + b, 0).toFixed(2)
    }

    const totalQuantity = () => { 
      let initialValue = partner ? 2 : 1;
     return decklist.reduce((acc, cur) => acc + cur.quantity, initialValue)
   }

    return (
        <>
        {!isPending && 
        <div className={`editor-sidebar-container`}>
          <div className="deck-type">{partner ? "Partners" : "Commander"} ({totalQuantity()})</div>
          <img 
            className={`commander-image ${partner && "offset"}`}
             onMouseEnter={() => partner && toggleImageSwitch(false)}
             onMouseLeave={() => partner && toggleImageSwitch(true) }
             src={imageSwitch ? cardImage : cardImagePartner} alt="magic the gathering card"
          />
          {partner && <img className="commander-image partner-image" src={imageSwitch ? cardImagePartner : cardImage} alt="magic the gathering card"/>}
          <div className="purchase-wrapper"><div className="budget">Est. $Aus: {totalPrice()}</div>
          <a target="_blank" rel="noreferrer" href={mtgMateUrl()}>
             <div className="mtg-mate">Purchase</div>
          </a></div>
          {userID === userId && <Upload/>}
          <CmcChart/>
          <ProducedChart/>
        </div>
        }</>
    );
}

export default EditorSidebar;