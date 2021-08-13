import React, { useEffect, useState } from 'react'
import Leaderboard from '../Leaderboard/Leaderboard'
import DeckPages from '../DeckPages/DeckPages'
import { Link } from 'react-router-dom'
import './Dashboard.css'

function Dashboard() {

  const [leaderboard, setLeaderboard] = useState([])

  useEffect(() => {
    fetch("https://edh-builder-api-m7vk6.ondigitalocean.app/leaderboard")
    .then(response => response.json())
    .then(leaderboardData => setLeaderboard(leaderboardData))
  }, [])

    return (
        <>
        <div className="welcome">
         <div className="welcome-overlay">
          <div className="welcome-content">
            <h1>Welcome to EDH Builder</h1>
            <h2>The Unofficial deckbuilding site for Magic The Gathering</h2>
            <Link to="/adddeck"><button className="build">BUILD</button></Link>
          </div>
         </div>
        </div>
        <div className="dashboard-page">
          <h1>Top Decks</h1> 
           <div className="dashboard-rankings-container">
           {leaderboard.length && 
              <><Leaderboard rankings={leaderboard[0]}/>
              <Leaderboard rankings={leaderboard[1]}/></>
           }
           </div>
        <h1>Most Recent Decks</h1>
            <DeckPages source="pub"/>
        </div>
        </>
    );
}

export default Dashboard;