import React from 'react';
import left from '../../icons/chevron-left.svg'
import right from '../../icons/chevron-right.svg'

function DeckPagesCounter({ handlePageChange, pageNo, lastPage, decks, between }) {
    let count = 0;
    return (
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
    );
}

export default DeckPagesCounter;