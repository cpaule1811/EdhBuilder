import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Signin from './components/SignInForms/Signin'
import Sidebar from './components/Sidebar/Sidebar.js'
import DeckPages from './components/DeckPages/DeckPages'
import DeckEditor from './components/DeckEditor/DeckEditor'
import CreateForm from './components/CreateForm/CreateForm'
import Logo from './components/Logo/Logo'
import Dashboard from './components/Dashboard/Dashboard'
import HowTo from './components/HowTo/HowTo'
import EditProfile from './components/SignInForms/EditProfile'
import Contact from './components/Contact/Contact'
import { requestUserWithToken } from './actions'
import { useDispatch } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

function App() {
const { isSignedIn, username } = useSelector((state) =>  state.loginStatus)
const dispatch = useDispatch()

useEffect(() => { 
   window.localStorage.getItem('token') && dispatch(requestUserWithToken())
}, [dispatch])

    return (
      <Router>
      <div className="main-container">
      <Logo/>
        <Sidebar/>
        <div className="layout">
        
        <Switch>
          <Route path="/signin">
             {isSignedIn ? !username ? <Redirect to="/editprofile"/> : <Redirect to="/" /> : <Signin/>}
          </Route>
          <Route path="/profile">
             { isSignedIn ? 
               <><h1 className="deckPagesTitle">Your Decks</h1> 
             <DeckPages source="priv"/></> : 
             <Signin/>
             }
          </Route>
          <Route path="/adddeck">
             { isSignedIn ? 
               <><div className="createform-bracket"></div><CreateForm/></>: 
             <Signin/>}
          </Route>
          <Route path="/decklist/:deckId">
             <DeckEditor/>
          </Route>
          <Route path="/editprofile">
             <EditProfile/>
          </Route>
          <Route path="/howto">
             <HowTo/>
          </Route>
          <Route path="/contact">
             <Contact/>
          </Route>
          <Route path="/">
             <Dashboard/>
          </Route>
        </Switch>
        </div>
      </div>
      </Router>
    );
}

export default App;



