import React, { useEffect, useState } from 'react'
import Leaderboard from '../Leaderboard/Leaderboard'
import DeckPages from '../DeckPages/DeckPages'
import { Link } from 'react-router-dom'
import spinner from '../../icons/spinner.svg'
import './Dashboard.css'

function Dashboard() {

  const [leaderboard, setLeaderboard] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("https://edh-builder-api-m7vk6.ondigitalocean.app/leaderboard")
    .then(response => response.json())
    .then(leaderboardData => {
      setLoading(false)
      setLeaderboard(leaderboardData)
    })
  }, [])

    return (
        <>
        <div className="welcome">
         <div className="welcome-overlay">
          <div className="welcome-content">
            <h1>Welcome to EDH Builder</h1>
            <h2>An Unofficial commander deckbuilding site for Magic the Gathering</h2>
            <h6>EDH Builder is unofficial Fan Content permitted under the Fan Content Policy. Not approved/endorsed by Wizards. Portions of the materials used are property of Wizards of the Coast. ©Wizards of the Coast LLC.</h6>
            <Link to="/adddeck"><button className="build">BUILD</button></Link>
          </div>
         </div>
        </div>
        {loading ? <img className="spinner" src={spinner} alt="loading spinner"/> : 
        <div className="dashboard-page">
          <h1>Top Decks</h1> 
           <div className="dashboard-rankings-container">
           {leaderboard.length ?
              <><Leaderboard rankings={leaderboard[0]}/>
              <Leaderboard rankings={leaderboard[1]}/></>
              : null
           }
           </div>
        <h1>Most Recent Decks</h1>
            <DeckPages source="pub"/>
        </div>
        }
        </>
    );
}

export default Dashboard;