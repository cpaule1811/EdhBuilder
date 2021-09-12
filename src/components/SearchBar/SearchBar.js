import React, { useState } from 'react';
import './SearchBar.css'
import search from '../../icons/search.svg'
import list from '../../icons/list.svg'
import image from '../../icons/image.svg'
import like from '../../icons/like.png'
import edit from '../../icons/edit-white.svg'
import { Link, useLocation, useParams } from 'react-router-dom'
import DisplayCard from '../DisplayCard/DisplayCard';

function SearchBar({ url }) {
   const [loadedCards, setLoadedCards] = useState([]);
   const [searchField, setSearchField] = useState('')
    const location = useLocation().pathname;
    const {deckId} = useParams()

    const active = (target) => { 
        if (location === target)
           return "icon-container active"
           
        return "icon-container"
    }

    const fetchSearchedCards = (val) => {
       setSearchField(val)
      fetch(`https://edh-builder-api-m7vk6.ondigitalocean.app/search?name=${val}`)
      .then(response => response.json())
      .then(searchedCards => {
         if (val) { 
            setLoadedCards(searchedCards)
         }
         else { 
            setLoadedCards([])
         }
      })
   }
    return (  
       <>
       <div className="search-form-container">
        <div className="search-form">
         <div className="icon-container left"><img src={search} alt="icon" width="25px" height="25px"/></div>
        <input onChange={(e) => fetchSearchedCards(e.target.value)} className="search-input" type="search" value={searchField} placeholder="search"/>
        {searchField && <button onClick={() => { setSearchField(''); setLoadedCards([])} } className = "clear-search">X</button>}
           <div className="view-options right">
           <div className={active(`/decklist/${deckId}`)}>
              <div>
                 <Link to={ `${url}`}><img src={list} alt="icon" width="25px" height="25px"/></Link>
              </div>
              <div className="search-tab" hidden>LIST</div>
           </div>
           <div className={active(`/decklist/${deckId}/imageview`)}>
              <div>
                 <Link to={ `${url}/imageview`}><img src={image} alt="icon" width="25px" height="25px"/></Link>
                </div>
                <div className="search-tab" hidden>IMG</div>
            </div>
           <div className={active(`/decklist/${deckId}/recommended`)}>
              <div>
                <Link to={ `${url}/recommended`}><img src={like} alt="icon" width="25px" height="25px"/></Link>
                </div>
                <div className="search-tab" hidden>Rec</div>
          </div>
           <div className={active(`/decklist/${deckId}/edit`)}>
              <div>
                <Link to={ `${url}/edit`}><img src={edit} alt="icon" width="25px" height="25px"/></Link>
                </div>
               <div className="search-tab" hidden>Edit</div>
            </div>
           </div>
        </div>
        </div>
        <div id="searchedCards" className="searched-cards">  
                {loadedCards.map((item, i) => <DisplayCard key={i} card={item} view="add"/>)}
         </div>
      </>
    );
 }

export default SearchBar;