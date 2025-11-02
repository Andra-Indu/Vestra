import React, { useState } from 'react';

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([{ from: 'bot', text: 'Hi! How can I help you today?' }]);
  const [input, setInput] = useState('');

  const sendMessage = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    setMessages([...messages, { from: 'user', text: input }, { from: 'bot', text: 'Thanks! Our team will get back soon.' }]);
    setInput('');
  };

  return (
    <>
      <div
        style={{
          position: 'fixed', bottom: '20px', right: '20px', background: '#333', color: '#fff',
          padding: '12px 16px', borderRadius: '50%', cursor: 'pointer'
        }}
        onClick={() => setOpen(!open)}
      >
        💬
      </div>

      {open && (
        <div style={{
          position: 'fixed', bottom: '80px', right: '20px', width: '300px', background: '#fff',
          border: '1px solid #ccc', borderRadius: '8px', padding: '8px'
        }}>
          <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '8px' }}>
            {messages.map((m, i) => (
              <div key={i} style={{ textAlign: m.from === 'user' ? 'right' : 'left' }}>
                <p style={{ margin: '4px 0' }}><strong>{m.from === 'user' ? 'You: ' : 'Bot: '}</strong>{m.text}</p>
              </div>
            ))}
          </div>
          <form onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              style={{ width: '80%', padding: '4px' }}
            />
            <button style={{ width: '18%' }}>Send</button>
          </form>
        </div>
      )}
    </>
  );
}
