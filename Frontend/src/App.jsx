import { useState } from 'react';
import ReactMarkdown from 'react-markdown';

function App() {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (message.trim() === '') return;

    const currentMessage = message;

    setMessage('');

    setLoading(true),

    setMessages((prevMessages) => [
      ...prevMessages,
      {
        role: 'user',
        text: currentMessage,
      },

    ]);
  

    const response = await fetch('https://hackathon-bis-assisstant.onrender.com/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: currentMessage,
      }),
    });

    const data = await response.json();

    setLoading(false),

    setMessages((prevMessages) => [
      ...prevMessages,

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
          <div className="welcome-screen">

            <div className="bis-symbol">
              BIS
            </div>

            <h2>BIS AI Assistant</h2>

            <p>
              Your intelligent assistant for Indian Standards,
              certification and BIS services.
            </p>

            <div className="suggestions">

              <button>
                What is BIS?
                <span>→</span>
              </button>

              <button>
                How do I verify HUID?
                <span>→</span>
              </button>

              <button>
                What is the ISI Mark?
                <span>→</span>
              </button>

              <button>
                How do I get a BIS licence?
                <span>→</span>
              </button>

            </div>

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

          {loading && (
            <div className="loading">
              BIS AI is thinking...
            </div>
          )}
          
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