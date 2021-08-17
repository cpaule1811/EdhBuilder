import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import './App.css'
import Signin from './components/SignInForms/Signin'
import Sidebar from './components/Sidebar/Sidebar.js'
import DeckPages from './components/DeckPages/DeckPages'
import DeckEditor from './components/DeckEditor/DeckEditor'
import CreateForm from './components/CreateForm/CreateForm'
import ForgotPassword from './components/SignInForms/ForgotPassword'
import ResetPassword from './components/SignInForms/ResetPassword'
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
import { Helmet } from "react-helmet";

function App() {
const { isSignedIn, username } = useSelector((state) =>  state.loginStatus)
const dispatch = useDispatch()

useEffect(() => { 
   window.localStorage.getItem('token') && dispatch(requestUserWithToken())
}, [dispatch])

    return (
      <Router>
       <Helmet>
          <title>EDH Builder</title>
          <meta name="description" content="Build Magic the Gathering commander/EDH decks easily"/>
          <meta name="keywords" content="build MTG commander decks, Magic the Gathering deck builder, commander deck suggestions"/>
       </Helmet>
      <div className="main-container">
      <Logo/>
        <Sidebar/>
        <div className="layout">
        
        <Switch>
          <Route path="/signin">
              <Helmet>
                  <title>Sign In - EDH Builder</title>
                  <meta name="description" content="Sign in to or register for EDH Builder"/>
               </Helmet>
             {isSignedIn ? !username ? <Redirect to="/editprofile"/> : <Redirect to="/" /> : <Signin/>}
          </Route>
          <Route path="/yourdecks">
             { isSignedIn ? 
               <>
               <Helmet>
                  <title>Your Decks - EDH Builder</title>
                  <meta name="description" content="All the decks you have made on EDH Builder"/>
               </Helmet>
               <h1 className="deckPagesTitle">Your Decks</h1> 
             <DeckPages source="priv"/></> : 
             <Signin/>
             }
          </Route>
          <Route path="/adddeck">
             { isSignedIn ? 
               <>
               <Helmet>
                  <title>Add Deck - EDH Builder</title>
                  <meta name="description" content="Create a magic the gathering commander deck in EDH Builder"/>
               </Helmet>
               <div className="createform-bracket"></div>
               <CreateForm/>
               </> : 
             <Signin/>}
          </Route>
          <Route path="/decklist/:deckId">
             <DeckEditor/>
          </Route>
          <Route path="/editprofile">
            <Helmet>
               <title>Profile - EDH Builder</title>
               <meta name="description" content="Edit your profile information"/>
            </Helmet>
             <EditProfile/>
          </Route>
          <Route path="/howto">
            <Helmet>
               <title>How To - EDH Builder</title>
               <meta name="description" content="Learn how to use EDH Builder to create Magic the Gathering commander/EDH decks easily"/>
            </Helmet>
             <HowTo/>
          </Route>
          <Route path="/contact">
            <Helmet>
                  <title>Contact Us - EDH Builder</title>
                  <meta name="description" content="Contact us if you have any inquries about the application"/>
               </Helmet>
             <Contact/>
          </Route>
          <Route path="/forgotyourpassword">
             <ForgotPassword/>
          </Route>
          <Route path="/forgotpassword/:resetid">
             <ResetPassword/>
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



