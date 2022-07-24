import React, { useState, useEffect, useCallback, lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import DeckCard from "../DeckCard/DeckCard";
import "./DeckPages.css";

function DeckPages({ source }) {
  const [pageNo, setPageNo] = useState(1);
  const [deckNum, setDeckNum] = useState(0);
  const [lastPage, setLastPage] = useState(1);
  const [decks, setDecks] = useState([]);
  const { userId } = useSelector((state) => state.loginStatus);

  const DeckPagesCounter = lazy(() => import("./DeckPagesCounter"));

  useEffect(() => {
    const url = `${process.env.REACT_APP_API_URL}decknum${source}/${userId}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setDeckNum(Number(data.count));
        setLastPage(Math.ceil(Number(data.count) / 8));
      });
  }, [source, userId]);

  const handlePageChange = useCallback(
    (val) => {
      setPageNo(val);
      const url = `${process.env.REACT_APP_API_URL}decks${source}/${val}/${userId}`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          setDecks(data);
        });
    },
    [source, userId]
  );

  useEffect(() => {
    handlePageChange(1);
  }, [handlePageChange]);

  const between = (pageNo, max) => {
    var between = [];
    if (pageNo > 2) {
      between.push(pageNo - 1);
    }
    if (pageNo !== max && pageNo !== 1) {
      between.push(pageNo);
    }
    if (pageNo < max - 1) {
      between.push(pageNo + 1);
    }
    return between;
  };

  return (
    <>
      <div className="deckcard-container">
        {decks.map((item, i) => {
          return <DeckCard key={i} {...item} />;
        })}
      </div>
      {deckNum > 8 && (
        <Suspense fallback={<></>}>
          <DeckPagesCounter
            handlePageChange={handlePageChange}
            pageNo={pageNo}
            lastPage={lastPage}
            decks={decks}
            between={between}
          />
        </Suspense>
      )}
    </>
  );
}

export default DeckPages;
