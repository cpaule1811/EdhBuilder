import React from 'react';
import './HowTo.css'
import list from '../../icons/list.svg'
import like from '../../icons/like.png'
import image from "../../icons/image.svg"
import edit from '../../icons/edit-white.svg'

function HowTo() {
    return (
        <div className= "how-to-container">
            <h2>Welcome to the EDH Builder Deck Editor</h2>
            <div>Use the search bar to find cards to add to your deck</div>
            <h3>EDH Builder has 4 views</h3>
            <div className="search-bar-explanation-container">
            <div className="search-bar-explanation-wrapper">
                   <div className="explanation-icon-container">
                     <img src={list} alt="" width="30px"/>
                   </div>
                   List view will show you all the cards in your dec. You can delete cards by clicking on them. 
            </div>
            <div className="search-bar-explanation-wrapper">
                 <div className="explanation-icon-container center">
                    <img src={image} alt="" width="30px"/>
                </div>
                Image view will give you a closer look at your cards and let you remove or edit them.
            </div>
            <div className="search-bar-explanation-wrapper">
               <div className="explanation-icon-container">
                   <img src={like} alt="" width="30px"/>
                </div>
                Recommended view will let you see what cards other people are using for your chosen commander.
            </div>
            <div className="search-bar-explanation-wrapper">
               <div className="explanation-icon-container">
                  <img src={edit} alt="" width="30px"/>
               </div>
               Edit view will let you edit the details of your deck and change your commander.
               </div>
            <div className="dashboard-prompt">You can go back to dashboard at anytime to look at other people's decks for inspiration.</div>
            </div>
        </div>
    );
}

export default HowTo;