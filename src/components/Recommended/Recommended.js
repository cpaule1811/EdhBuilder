import "./Recommended.css";
import React, { useState, useEffect } from "react";
import CardGallery from "../CardGallery/CardGallery";
import { useSelector } from "react-redux";
import loader from "../../icons/spinner.svg";

function Recommended() {
  const { deckDetails } = useSelector((state) => state.requestDecklist);
  const [recommendedCards, setReccommendedCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(
      `https://edh-builder-api-m7vk6.ondigitalocean.app/recommend/${deckDetails.commander}/${deckDetails.partner}`
    )
      .then((response) => response.json())
      .then((cards) => {
        if (cards) {
          setReccommendedCards(Object.entries(cards));
        }
        setLoading(false);
      });
  }, [deckDetails]);

  return (
    <div>
      {loading ? (
        <img className="spinner" src={loader} alt="loading recommended cards" />
      ) : recommendedCards.length ? (
        recommendedCards.map((item, i) => {
          if (item[1].length) {
            return (
              <div key={i}>
                <div className="title">
                  <span id="title">Top {item[0]}</span>
                </div>
                <CardGallery Cards={item[1]} view="add" />{" "}
              </div>
            );
          }
          return null;
        })
      ) : (
        <div className="no-recommended">
          Looks like no one has built with this commander yet. <br />
          <br />
          Go on be a trailblazer!
        </div>
      )}
    </div>
  );
}

export default Recommended;
