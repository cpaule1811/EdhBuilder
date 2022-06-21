import React from "react";
import "./DeckHeader.css";
import { useSelector } from "react-redux";
import star from "../../icons/full_star.svg";
import Rating from "react-rating";
import fullStar from "../../icons/full_star.svg";
import emptyStar from "../../icons/empty_star.svg";
import { Helmet } from "react-helmet";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DeckHeader() {
  const {
    deckID,
    commander,
    cardArt,
    deckName,
    partner,
    username,
    avgRating,
    userRating,
    description,
  } = useSelector((state) => state.requestDecklist.deckDetails);
  const { userId } = useSelector((state) => state.loginStatus);

  const handleRating = (e) => {
    fetch(`${process.env.REACT_APP_API_URL}/rating`, {
      method: "post",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify({
        deckID: deckID,
        userID: userId,
        rating: e,
      }),
    });
  };

  return (
    <div className="decklist-header">
      <Helmet>
        <title>{deckName} - EDH Builder</title>
        <meta name="description" content={description} />
      </Helmet>
      <div className="colored-image-background">
      <LazyLoadImage
          alt={`commander ${commander} art`}
          src={cardArt}
          width={200}
        />
      </div>
      <div className="titles">
        <div className="deck-name">{deckName}</div>
        <div className="header-commander">
          {commander} {partner && `& ${partner}`}
        </div>
        <div className="user">{username}</div>
        <div className="rating-star">
          <div>{avgRating}</div>
          <img
            src={star}
            alt="rating for high quality magic the gathering commander deck"
          />
        </div>
        <div className="rating-position">
          <Rating
            {...{
              fractions: 2,
              initialRating: userRating,
              onClick: (e) => handleRating(e),
              emptySymbol: (
                <img src={emptyStar} alt="rate magic the gathering deck"></img>
              ),
              fullSymbol: (
                <img src={fullStar} alt="rate magic the gathering deck"></img>
              ),
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default DeckHeader;
