import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import SearchBar from '../SearchBar/SearchBar';
import './DeckEditor.css'
import Recommended from '../Recommended/Recommended';
import CardList from '../CardList/CardList'
import { Switch, useRouteMatch, Route, useParams } from 'react-router-dom'
import CreateForm from '../CreateForm/CreateForm';
import DeckHeader from '../DeckHeader/DeckHeader';
import DeckListImg from '../DeckListImg/DeckListImg';
import EditorSidebar from '../EditorSidebar/EditorSidebar';
import PublicDeck from '../PublicDeck/PublicDeck';
import { requestDecklist } from '../../actions';
import spinner from '../../icons/spinner.svg'

function DeckEditor() {
   
    const dispatch = useDispatch();
    const { decklist, isPending, authorised } = useSelector((state) => state.requestDecklist);
    const { userId, isPendingLogin } = useSelector((state) => state.loginStatus);
    let { url } = useRouteMatch();
    const { deckId } = useParams()
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        dispatch(requestDecklist(deckId, userId));
        setIsMounted(true)
      }, [deckId, userId, dispatch])

    return (
        isPending || isPendingLogin ? <img className="spinner" src={spinner} alt="loading spinner"/> : 
        authorised ?
            <><div className="card-search-container">
            <DeckHeader/>
                <EditorSidebar/>
                <div className= "editor-sidebar-bracket">
                <SearchBar url={url}/>
                <Switch>
                    <Route exact path={`/decklist/:${deckId}`}>
                       <CardList/>
                    </Route>
                    <Route path={`${url}/imageview`}>
                       <DeckListImg decklist={decklist}/>
                    </Route>
                    <Route path={`${url}/recommended`}>
                       <Recommended/>
                    </Route>
                    <Route path={`${url}/edit`}>
                       <CreateForm/>
                    </Route>
                </Switch>
                </div>
            </div></>
            : (isMounted && <PublicDeck/>)
        );
}

export default DeckEditor;