import React, { useState, useEffect, lazy, Suspense } from "react";
import ReactTooltip from "react-tooltip";
import { useDispatch, useSelector } from "react-redux";
import deleteBin from "../../icons/delete-bin.svg";
import { updateDecklist } from "../../actions";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Message = lazy(() => import("../Message/Message"));

function CardItem({ card }) {
  const { deckDetails, decklist, sideboard, authorised } = useSelector(
    (state) => state.requestDecklist
  );
  const [legality, setLegality] = useState("");
  const [message, setMessage] = useState("");
  const [showBin, setShowBin] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkLegal = (item) => {
      if (item.legal !== "legal") {
        setLegality("*This card is banned");
        return false;
      }
      return checkColor(item);
    };

    const checkColor = (item) => {
      const { excludedColors } = deckDetails;
      for (var i = 0; i < excludedColors.length; i++) {
        if (item.color.includes(excludedColors[i])) {
          setLegality("*This card is not in your commander's color identity");
          return false;
        }
      }
      setLegality("");
      return true;
    };
    checkLegal(card);
  }, [deckDetails, card]);

  const handleRemoveCard = () => {
    fetch(`${process.env.REACT_APP_API_URL}/removecard`, {
      method: "POST",
      body: JSON.stringify({ deckID: card.deckID, cardName: card.cardName }),
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((card) => {
        generateMessage("card succesfully removed", "red");
        dispatch(
          updateDecklist(
            decklist.filter((item) => item.cardName !== card),
            sideboard.filter((item) => item.cardName !== card)
          )
        );
      });
  };

  const generateMessage = (message, color) => {
    setMessage({ message: message, color: color });
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <div>
      {message && <Suspense fallback={null}><Message message={message.message} color={message.color} /></Suspense>}
      <div
        data-tip
        data-for={card.cardName}
        onMouseLeave={() => setShowBin(false)}
        className={showBin + !legality ? "card-text" : "ilegal-card-text "}
      >
        <div onClick={() => setShowBin(!showBin)}>
          {card.quantity > 1 && card.quantity} {card.cardName}
        </div>
        {authorised && showBin && (
          <img
            onClick={() => handleRemoveCard()}
            src={deleteBin}
            alt="delete magic the gathering card"
            display="hidden"
          />
        )}
      </div>
      <ReactTooltip
        className="tooltip"
        id={card.cardName}
        place="left"
        effect="solid"
        delayShow={200}
      >
        <LazyLoadImage
          className={`image-tooltip`}
          alt={card.cardName}
          height={"332"}
          src={card.imageUrl}
          width={"250"}
        />
        {card.imageUrl2 && (
          <LazyLoadImage
            className="image-tooltip"
            src={card.imageUrl2}
            alt={card.cardName}
          />
        )}
        <div>{card.cardName}</div>
        <div>{`$${card.price}`}</div>
        {
          <div className="ilegal-wrapper center">
            <div className="ilegal-card-text">{legality}</div>
          </div>
        }
      </ReactTooltip>
    </div>
  );
}

export default CardItem;
