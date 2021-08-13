import React, { useState } from 'react';
import './DeckListImg.css';
import CardGallery from '../CardGallery/CardGallery';
import { useSelector } from 'react-redux'

function DeckListImg() {
   const [board, setBoard] = useState("main")
   const [filter, setFilter] = useState({ cmc: "all", type: "all" })
   const { decklist, sideboard } = useSelector((state)  => state.requestDecklist)

   const filterCmc = (board) => {
    if (filter.cmc !== "all") { 
        return board.filter(item => Number(item.cmc) === Number(filter.cmc))
    }
    return board;
   }

   const filterType = (board) => {
    if (filter.type !== "all") { 
        let filtered = board.filter(item => item.type.includes(filter.type))
        if (filter.type.includes("Enchantment") || filter.type.includes("Artifact")){ 
            return filtered.filter(item => !item.type.includes("Creature")).filter(item => !item.type.includes("Land"))
        }  
        return filtered
    }
    return board
   }

   const filteredDecklist = (board) => { 
        return filterType(filterCmc(board));
   }

   const checkBoard = () => {
       return (board === "main" ? decklist : sideboard ) 
   }

   const cmcArray = checkBoard().map(item => item.cmc)
   const cmcOptions = [...new Set(cmcArray)].sort((a, b) => a - b)
   
    return (
        <div>
            { decklist ? 
            <><div className="center">
            <h5>Filter By:</h5>
            <select onChange={(e)=> {setFilter({...filter, cmc: "all"}); setBoard(e.target.value); }} className="filter-by">
                   <option value="main">Main</option>
                   <option value="sideboard">Sideboard</option>
               </select>
               <select onChange={(e)=> setFilter({...filter, type:e.target.value })} className="filter-by">
                   <option value={"all"}>Select Type</option>
                   <option value="Creature">Creature</option>
                   <option value="Instant">Instant</option>
                   <option value="Sorcery">Sorcery</option>
                   <option value="Planeswalker">Planeswalker</option>
                   <option value="Enchantment">Enchantment</option>
                   <option value="Artifact">Artifact</option>
                   <option value="Land">Land</option>
               </select>
               <select onChange={(e)=> setFilter({...filter, cmc: e.target.value })} className="filter-by" defaultValue="all">
                    <option value={"all"}>CMC</option>
                   { cmcOptions.map((item, i) => { return <option key={i} value={item}>{item}</option> }) }
               </select>
            </div>
            <CardGallery Cards={filteredDecklist(checkBoard())} view={null}/></> : 
            <div>Use the search bar to find cards to add</div> }
        </div>
    );
}

export default DeckListImg;