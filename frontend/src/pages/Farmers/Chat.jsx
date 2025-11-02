import React, { useState, useEffect, useRef } from 'react';

function App() {
  const [messages, setMessages] = useState(() => {
    const saved = localStorage.getItem('chatMessages');
    return saved ? JSON.parse(saved) : [];
  });
  const [currentUser, setCurrentUser] = useState('Farmer');
  const [messageText, setMessageText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');
  const [pickerOpen, setPickerOpen] = useState(null);
  const chatWindowRef = useRef(null);

  const emojis = ['👍', '❤️', '😂', '😮', '😢'];

  useEffect(() => {
    localStorage.setItem('chatMessages', JSON.stringify(messages));
  }, [messages]);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = () => {
    if (messageText.trim()) {
      const newMessage = {
        id: Date.now(),
        user: currentUser,
        text: messageText,
        timestamp: new Date().toLocaleTimeString(),
        reactions: [],
      };
      setMessages([...messages, newMessage]);
      setMessageText('');
      simulateTyping();
    }
  };

  const simulateTyping = () => {
    setIsTyping(true);
    setTimeout(() => setIsTyping(false), 2000);
  };

  const handleTyping = (e) => {
    setMessageText(e.target.value);
    if (!isTyping) simulateTyping();
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
            <h2 className="text-lg font-bold">Farmer-Buyer Chat</h2>
            <div className="flex space-x-2">
              <button className="px-3 py-1 border border-white text-white hover:bg-white hover:text-green-500 rounded transition">
                Settings
              </button>
              <button className="px-3 py-1 border border-white text-white hover:bg-white hover:text-green-500 rounded transition">
                Logout
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

          {/* Typing Indicator */}
          {isTyping && (
            <div className="p-3 italic text-gray-300 animate-pulse">
              {currentUser === 'Farmer' ? 'Buyer' : 'Farmer'} is typing...
            </div>
          )}

          {/* Input Area */}
          <div className="flex p-3 bg-white bg-opacity-80 border-t border-gray-300 md:flex-row">
            <select
              value={currentUser}
              onChange={(e) => setCurrentUser(e.target.value)}
              className="mr-3 p-2 border border-gray-300 rounded hover:border-green-500 focus:border-green-500 transition"
            >
              <option value="Farmer">Farmer</option>
              <option value="Buyer">Buyer</option>
            </select>
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