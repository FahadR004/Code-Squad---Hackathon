

import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: 'Farmer',
      text: 'Hello! I have fresh apples today.',
      timestamp: new Date().toLocaleTimeString(),
      reactions: [],
    },
    {
      id: 2,
      user: 'Buyer',
      text: 'Great! How much per kg?',
      timestamp: new Date().toLocaleTimeString(),
      reactions: [],
    },
    {
      id: 3,
      user: 'Farmer',
      text: '50 PKR per kg.',
      timestamp: new Date().toLocaleTimeString(),
      reactions: [],
    },
    {
      id: 4,
      user: 'Buyer',
      text: 'I will take 5 kg.',
      timestamp: new Date().toLocaleTimeString(),
      reactions: [],
    },
  ]);

  const [messageText, setMessageText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [pickerOpen, setPickerOpen] = useState(null);
  const chatWindowRef = useRef(null);

  const emojis = ['👍', '❤️', '😂', '😮', '😢'];

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        user: 'Farmer',
        text: messageText,
        timestamp: new Date().toLocaleTimeString(),
        reactions: [],
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
    }
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  const addReaction = (id, emoji) => {
    setMessages(messages.map(msg =>
      msg.id === id
        ? { ...msg, reactions: [...new Set([...msg.reactions, emoji])] }
        : msg
    ));
    setPickerOpen(null);
  };

  const togglePicker = (id) => {
    setPickerOpen(pickerOpen === id ? null : id);
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = () => {
    setMessages(messages.map(msg =>
      msg.id === editingId ? { ...msg, text: editText } : msg
    ));
    setEditingId(null);
    setEditText('');
  };

  const deleteMessage = (id) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

  const handleContextMenu = (e, id, text) => {
    e.preventDefault();
    const action = prompt('Edit or Delete? (Type "edit" or "delete")');
    if (action === 'edit') startEdit(id, text);
    if (action === 'delete') deleteMessage(id);
  };

  return (
    <div
      className="flex h-screen"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1631535616112-91cd350b9801?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=774')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Chat Panel */}
      <div className="flex-1 flex justify-center items-center p-4">
        <div className="w-full max-w-lg h-4/5 flex flex-col bg-black bg-opacity-60 rounded-lg shadow-lg overflow-hidden md:max-w-2xl">
          
          {/* Navbar */}
          <nav className="flex justify-between items-center p-4 bg-green-500 text-white">
            {/* Left: Farmer profile */}
            <div className="flex items-center space-x-3">
              <img
                src="https://randomuser.me/api/portraits/men/75.jpg"
                alt="Farmer"
                className="w-8 h-8 rounded-full border-2 border-white"
              />
              <span className="font-semibold">Farmer</span>
            </div>

            {/* Right: Phone and Video Call icons */}
            <div className="flex items-center space-x-3 text-white">
              <button className="hover:text-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M3 5h2l3.6 7.59-1.35 2.44a11.042 11.042 0 005.39 5.39l2.44-1.35L19 19v2a2 2 0 01-2 2h-1a16 16 0 01-11-11V7a2 2 0 012-2z" />
                </svg>
              </button>
              <button className="hover:text-gray-200 transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                  viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14m0-4v4m0 0l-6 3.5V6.5L15 10z" />
                </svg>
              </button>
            </div>
          </nav>

          {/* Chat Window */}
          <div
            ref={chatWindowRef}
            className="flex-1 p-4 overflow-y-auto relative"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`mb-3 p-3 rounded-lg max-w-3/4 transition hover:shadow-md cursor-pointer relative animate-fade-in ${
                  msg.user === 'Farmer'
                    ? 'bg-blue-200 self-start'
                    : 'bg-orange-200 self-end ml-auto'
                }`}
                onClick={() => togglePicker(msg.id)}
                onContextMenu={(e) => handleContextMenu(e, msg.id, msg.text)}
              >
                {editingId === msg.id ? (
                  <div>
                    <input
                      value={editText}
                      onChange={(e) => setEditText(e.target.value)}
                      className="w-full p-1 border rounded"
                    />
                    <button
                      onClick={saveEdit}
                      className="mt-1 px-2 py-1 bg-green-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                ) : (
                  <>
                    <strong>{msg.user}:</strong> {msg.text}
                    <div className="text-xs text-gray-700 mt-1">
                      {msg.timestamp}
                    </div>
                    {msg.reactions.length > 0 && (
                      <div className="mt-1 text-sm">{msg.reactions.join(' ')}</div>
                    )}
                  </>
                )}

                {pickerOpen === msg.id && (
                  <div className="absolute top-0 right-0 mt-2 p-2 bg-white border rounded shadow-lg z-10 flex space-x-1 md:space-x-2">
                    {emojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={(e) => {
                          e.stopPropagation();
                          addReaction(msg.id, emoji);
                        }}
                        className="text-lg hover:scale-110 transition transform"
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex p-3 bg-white bg-opacity-80 border-t border-gray-300 md:flex-row">
            <input
              type="text"
              value={messageText}
              onChange={handleTyping}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 p-2 border border-gray-300 rounded hover:border-green-500 focus:border-green-500 transition mr-3"
            />
            <button
              onClick={sendMessage}
              className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
