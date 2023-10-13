// Message.js
import React from 'react'
import './Message.css'

const Message = ({ message }) => {
  const { text, isUserMessage } = message

  return (
    <div className={`message ${isUserMessage ? 'user' : 'bot'}`}>{text}</div>
  )
}

export default Message
