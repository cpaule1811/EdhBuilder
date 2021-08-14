import React, {useState, useEffect, useCallback} from 'react';
import { useSelector } from 'react-redux';
import DeckCard from '../DeckCard/DeckCard';
import left from '../../icons/chevron-left.svg'
import right from '../../icons/chevron-right.svg'
import './DeckPages.css'

function DeckPages({ source }) {
    const [pageNo, setPageNo] = useState(1)
    const [deckNum, setDeckNum] = useState(0)
    const [lastPage, setLastPage] = useState(1)
    const [decks, setDecks] = useState([])
    const { userId } = useSelector((state) => state.loginStatus)

    useEffect(() => {
        const url = `https://edh-builder-api-m7vk6.ondigitalocean.app/decknum${source}/${userId}`
        fetch(url)
        .then(response => response.json())
        .then(data => { 
            setDeckNum(Number(data.count))
            setLastPage(Math.ceil(Number(data.count)/8)) 
        })
      }, [source, userId])

    const handlePageChange = useCallback((val) => {
        setPageNo(val) 
        const url = `https://edh-builder-api-m7vk6.ondigitalocean.app/decks${source}/${val}/${userId}`
         fetch(url)
         .then(response => response.json())
         .then(data => {setDecks(data)})
      }, [source, userId])
    
      useEffect(() => {
        handlePageChange(1);
      }, [handlePageChange]);

    const between = (pageNo, max) => {  
        var between = []
        if (pageNo > 2){ 
            between.push(pageNo-1)
        }
        if (pageNo !== max && pageNo !== 1){ 
            between.push(pageNo)
        }
        if (pageNo < max-1){ 
            between.push(pageNo+1)
        }
        return between;
    }

    let count = 0;
    return (
        <>
            <div className="deckcard-container">
                {decks.map((item, i) => {
                    return <DeckCard key={i} {...item} />
                })}
            </div>
            {deckNum > 8 ?   
                <div className="pagination-container">
                   <div className="pagination-wrapper">
                   {(lastPage <= 4 ?
                    decks.map((item, i) => { 
                    if (i%8 === 0){
                        count++;
                        return <div key={i} onClick={(e) => handlePageChange(Number(e.target.innerText))} className={`number ${pageNo === count ? 'active-page' : 'none'}`}>{count}</div>
                        }
                        return null;
                    }) :
                    <>
                    {pageNo === 1 ? null : <div className="prev" onClick={(e) => handlePageChange(pageNo-1)}><img src={right} alt="next-page"/></div>}
                    <div className={`number ${pageNo === 1 ? 'active-page' : 'none'}`} onClick={(e) => handlePageChange(1)}>1</div>
                    {between(pageNo, lastPage).map((item, i) => { 
                          return <div key={i} onClick={(e) => handlePageChange(Number(e.target.innerText))} className={`number ${pageNo === item && 'active-page'}`}>{item}</div>
                    }) }
                    <div className={`number ${pageNo === lastPage ? 'active-page' : 'none'}`} onClick={(e) => handlePageChange(lastPage)}>{lastPage}</div>
                    {pageNo < lastPage && <div className="next" onClick={(e) => handlePageChange(pageNo+1)}><img src={left} alt="previous-page"/></div>}
                    </>
                   )}
                  </div>
             </div> 
            : null}
        </>
    )
}

export default DeckPages;