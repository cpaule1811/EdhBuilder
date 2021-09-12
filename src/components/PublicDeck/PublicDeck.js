import React from 'react';
import { useSelector } from 'react-redux';
import DeckHeader from '../DeckHeader/DeckHeader';
import CardList from '../CardList/CardList';
import EditorSidebar from '../EditorSidebar/EditorSidebar';
import spinner from '../../icons/spinner.svg'
// import './PublicDeck.css'

function PublicDeck() {
    const { isPending } = useSelector(state => state.requestDecklist)

    return (
        <div style={{padding: "20px"}}>
            {isPending ? <img className="spinner" src={spinner} alt="loading spinner"/> :
            <>
                <DeckHeader/>
                <div className= "editor-sidebar-bracket">
                    <EditorSidebar/>
                    <CardList/>
                </div>
            </>}
        </div>
    );
}

export default PublicDeck;