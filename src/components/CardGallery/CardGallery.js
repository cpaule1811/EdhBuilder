import React from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import "./CardGallery.css";

function CardGallery({ Cards, view }) {
  return (
    <div className="gallery-container">
      {Cards.map((item, index) => {
        return <DisplayCard key={index} card={item} view={view} />;
      })}
    </div>
  );
}

export default CardGallery;
