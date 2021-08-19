import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setMenuStatus } from '../../actions';
import './Sidebar.css'
import backMenu from '../../img/sidebar.jpg'
import dashboard from '../../icons/dashboard.png'
import add from '../../icons/add.png'
import deck from '../../icons/deck.png'
import down from '../../icons/down.svg'
import enter from '../../icons/enter.svg'
import edit from '../../icons/edit-white.svg'
import questionMark from '../../icons/question-mark.svg'
import contact from '../../icons/contact.svg'
import { Link, useLocation } from 'react-router-dom'
import GoogleSignOut from './GoogleSignOut';


function Sidebar() {
    const location = useLocation().pathname
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const dispatch = useDispatch();
    const menuStatus = useSelector((state) =>  state.menuStatus.menuStatus)
    const { isSignedIn, username, profile, userId } = useSelector((state) =>  state.loginStatus)
    return (
        <div className={`sidebar ${!menuStatus && "hide-menu"}`}>
        <div className="sidebar-background" style={{backgroundImage:`url(${backMenu})`, backgroundSize: 'cover'}}></div>
        <div className="background-overlay"></div> 
        <div className="sidebar-container">
            <div onClick= {() => setShowProfileMenu(!showProfileMenu)} className="profile-tab">
               <img src={profile} alt="profile" width="50px" height="50px"/>
               <span id="username">{username}</span><img id="drop-down" src={down} width="25px" height="25px" alt="icon"/>
               <div className={`tabs-dropdown ${showProfileMenu ? null : "hidden"}`}>
               {isSignedIn ? 
               <><Link to="/editprofile">
                    <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/editprofile" ? "active-tab tab-dropdown" : "tab tab-dropdown"}>
                        <img src={edit} alt="icon" width="25px" height="25px"/>
                        <span>Edit Profile</span>
                        </div>
                </Link>
                {userId === process.env.ADMIN ?
                <Link to="/adminaddentrys">
                    <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/adminaddentry" ? "active-tab tab-dropdown" : "tab tab-dropdown"}>
                        <img src={add} alt="icon" width="25px" height="25px"/>
                        <span>New Set</span>
                    </div>
                </Link> : null}
                <GoogleSignOut/>
                </> :
               <Link to="/signin">
                    <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/signin" ? "active-tab tab-dropdown" : "tab tab-dropdown"}>
                        <img src={enter} alt="icon" width="25px" height="25px"/>
                        <span>Signin/register</span>
                    </div>
                </Link>
               }
               </div> 
            </div>
            <div className="tabs">
                <Link to="/">
                     <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/" ? "active-tab" : "tab"}>
                       <img src={dashboard} alt="icon" width="25px" height="25px"></img>
                       <span>DashBoard</span>
                     </div>
                </Link>
                <Link to="/yourdecks">
                     <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/yourdecks" ? "active-tab" : "tab"}>
                       <img src={deck} alt="icon" width="25px" height="25px"></img>
                       <span>Your Decks</span>
                     </div>
                </Link> 
                <Link to="/adddeck">
                     <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/adddeck" ? "active-tab" : "tab"}>
                       <img src={add} alt="icon" width="25px" height="25px"></img>
                       <span>ADD Deck</span>
                     </div>
                </Link>  
            </div> 
            <div className="tabs tabs-two">
                <Link to="/howto">
                     <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/howto" ? "active-tab" : "tab"}>
                       <img src={questionMark} alt="icon" width="25px" height="25px"></img>
                       <span>How To</span>
                     </div>
                </Link>
                <Link to="/contact">
                     <div onClick={() => dispatch(setMenuStatus(!menuStatus))} className={location === "/contact" ? "active-tab" : "tab"}>
                       <img src={contact} alt="icon" width="25px" height="25px"></img>
                       <span>Contact us</span>
                     </div>
                </Link> 
            </div> 
        </div>
       </div>
    );
}

export default Sidebar;