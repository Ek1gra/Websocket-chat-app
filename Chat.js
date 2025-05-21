import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';

const Chat = ({ token }) => {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const newSocket = io('http://localhost:4000', {
      auth: { token }
    });

    newSocket.on('message', msg => {
      setMessages(prev => [...prev, msg]);
    });

    setSocket(newSocket);

    return () => newSocket.disconnect();
  }, [token]);

  const sendMessage = e => {
    e.preventDefault();
    if (socket && message.trim()) {
      socket.emit('message', message);
      setMessage('');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex-1 overflow-y-auto p-4">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2 p-2 bg-white rounded shadow">
            {msg}
          </div>
        ))}
      </div>
      <form onSubmit={sendMessage} className="flex p-4 bg-white shadow">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded mr-2"
          placeholder="Type a message..."
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default Chat;