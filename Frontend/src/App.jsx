import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  async function sendMessage() {
    if (message.trim() === '') return;

    const currentMessage = message;

    setMessage('');

    const response = await fetch('http://localhost:5000/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: currentMessage,
      }),
    });

    const data = await response.json();

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'user',
        text: currentMessage,
      },
      {
        role: 'assistant',
        text: data.reply,
      },
    ]);
  }

  return (
    <div className="chat-container">

      <header className="header">
        <div className="logo-box">
          BIS
        </div>

        <div className="header-title">
          <h1>BIS AI Assistant</h1>
          <p>Bureau of Indian Standards</p>
        </div>

        <div className="online">
          Online
        </div>
      </header>

      <div className="chat">
        {messages.length === 0 && (
          <div className="assistant">
            <h2>Welcome to BIS AI Assistant 👋</h2>

            <p>
              I can help you understand BIS standards, certification,
              ISI marks, hallmarking, licences and consumer services.
            </p>
          </div>
        )}

        {messages.map((chatMessage, index) => (
          <div
            key={index}
            className={chatMessage.role}
          >
            <ReactMarkdown>
              {chatMessage.text}
            </ReactMarkdown>
          </div>
        ))}
      </div>

      <div className="input-area">
        <input
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Ask anything about BIS..."
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              sendMessage();
            }
          }}
        />

        <button onClick={sendMessage}>
          Send
        </button>
      </div>

    </div>
  );
}

export default App;