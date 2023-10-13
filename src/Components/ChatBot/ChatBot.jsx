// ChatBot.js
import React, { useState, useEffect } from 'react'
import Message from './Message'
import './ChatBot.css'
import provideAction from './ActionProvider'
import parseMessage from './MessageParse'

const ChatBot = () => {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Initial greeting message from the chatbot
    const initialGreeting = {
      text: 'Hi! How can I help you?',
      isUserMessage: false,
    }
    setMessages([initialGreeting])
  }, [])

  const handleUserMessage = (text) => {
    const userMessage = { text, isUserMessage: true }
    setMessages([...messages, userMessage])
    const parsedMessage = parseMessage(text)

    if (parsedMessage.type === 'SPOTS') {
      const bestSpotsResponse = {
        text: 'Sure! Here are some of the best spots in Kerala: Spot 1, Spot 2, Spot 3, etc.',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, bestSpotsResponse])
    } else {
      provideAction(parsedMessage, setMessages)
    }
  }

  const scrollbarsRef = React.useRef(null)

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">Tourism Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((message, index) => (
          <Message key={index} message={message} />
        ))}
      </div>

      <div className="chatbot-input">
        <input
          type="text"
          className="chatBotInput"
          placeholder="Type your message..."
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              handleUserMessage(event.target.value)
              event.target.value = ''
            }
          }}
        />
        <button
          className="chatBotButtonSend"
          onClick={() =>
            handleUserMessage(document.querySelector('input').value)
          }
        >
          Send
        </button>
      </div>
    </div>
  )
}

export default ChatBot
