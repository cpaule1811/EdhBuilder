import React from "react";
import "./Message.css";

function Message({ message, color }) {
  return <div className={`message ${color}`}>{message}</div>;
}

export default Message;
