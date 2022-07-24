import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateDecklist } from "../../actions";
import "./DisplayCard.css";
import plus from "../../icons/plus.svg";
import flip from "../../icons/flip.png";
import minus from "../../icons/minus.svg";
import Message from "../Message/Message";
import { LazyLoadImage } from "react-lazy-load-image-component";

function DisplayCard({ card, view }) {
  const [url, setUrl] = useState(true);
  const [message, setMessage] = useState("");
  const [newQuantity, setNewQuantity] = useState(1);
  const { deckDetails, decklist, sideboard } = useSelector(
    (state) => state.requestDecklist
  );
  const dispatch = useDispatch();
  const [legality, setLegality] = useState("");

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

  const handleAddCard = () => {
    const cardToAdd = Object.assign(card, {
      quantity: newQuantity,
      deckID: deckDetails.deckID,
    });
    fetch(`${process.env.REACT_APP_API_URL}addcard`, {
      method: "POST",
      body: JSON.stringify(cardToAdd),
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const { card, resp } = data;
        if (resp) {
          generateMessage("card succesfully added", "green");
          const indexToFind = decklist.findIndex(
            (item) => item.cardName === card.cardName
          );
          let appendedDecklist = decklist;
          indexToFind >= 0
            ? (appendedDecklist[indexToFind].quantity = card.quantity)
            : appendedDecklist.unshift(card);
          dispatch(updateDecklist(appendedDecklist, sideboard));
          setNewQuantity(1);
        }
      });
  };

  const handleRemoveCard = () => {
    fetch(`${process.env.REACT_APP_API_URL}removecard`, {
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

  const handleMove = (status) => {
    fetch(`${process.env.REACT_APP_API_URL}sideboard`, {
      method: "PUT",
      body: JSON.stringify({
        deckID: card.deckID,
        cardName: card.cardName,
        status: status,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: window.localStorage.getItem("token"),
      },
    })
      .then((response) => response.json())
      .then((card) => {
        if (status === "main") {
          const appendedDecklist = decklist;
          appendedDecklist.unshift(card);
          dispatch(
            updateDecklist(
              appendedDecklist,
              sideboard.filter((item) => !(item.cardName === card.cardName))
            )
          );
        } else {
          const appendedSideboard = sideboard;
          appendedSideboard.unshift(card);
          dispatch(
            updateDecklist(
              decklist.filter((item) => !(item.cardName === card.cardName)),
              appendedSideboard
            )
          );
        }
        generateMessage("card succesfully moved", "green");
      });
  };

  function isNumberKey(evt) {
    var charCode = evt.which ? evt.which : evt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) return false;
    if (evt.target.value.length > 2) {
      return false;
    } else {
      setNewQuantity(evt.target.value);
    }
  }

  return (
    <div className="display-card-container">
      {message && <Message message={message.message} color={message.color} />}
      <div className={`display-card-image ${legality && "ilegal"}`}>
        {url && card.imageUrl2 ? (
          <LazyLoadImage
            alt={card.cardName}
            height={"332"}
            src={card.imageUrl2}
            width={"250"}
          />
        ) : (
          <LazyLoadImage
            alt={card.cardName}
            height={"332"}
            src={card.imageUrl}
            width={"250"}
          />
        )}
      </div>
      {card.quantity > 1 && view !== "add" && (
        <div className="quantity-number">x{card.quantity}</div>
      )}
      <div className="display-card-overlay">
        {card.imageUrl2 && (
          <img
            onClick={() => setUrl(!url)}
            id="flip"
            src={flip}
            alt="icon"
            height="35px"
            width="35px"
          ></img>
        )}
        <div className="overlay-functions">
          {view === "add" ? (
            <div id="left-space" />
          ) : (
            <div className="input-wrapper">
              <img onClick={() => handleRemoveCard()} src={minus} alt="icon" />
              {card.cardStatus === "main" ? (
                <button
                  onClick={() => handleMove("sideboard")}
                  className="sideboard"
                >
                  SB
                </button>
              ) : (
                <button
                  onClick={() => handleMove("main")}
                  className="sideboard"
                >
                  MB
                </button>
              )}
            </div>
          )}
          <div className="price">
            <div>AUS</div>
            <div>${card.price}</div>
          </div>
          <div className="input-wrapper">
            <input
              onChange={(e) => {
                isNumberKey(e);
              }}
              placeholder={card.quantity}
              value={newQuantity}
              className="quantity"
              type="number"
            />
            <img onClick={() => handleAddCard()} src={plus} alt="icon" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default DisplayCard;
