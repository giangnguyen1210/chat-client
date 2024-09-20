import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';
import { API_URLS } from '../config/apiUrls';
import { getCurrentUser } from '../utils/auth';

const socket = io('http://localhost:3000'); // Kết nối đến server Socket.IO

const MessagesComponent = ({ channelId }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const currentUser = getCurrentUser();
  const messageEndRef = useRef(null);

  // Cuộn xuống cuối danh sách khi có tin nhắn mới
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch(API_URLS.GET_MESSAGE(channelId), {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const data = await response.json();
        setMessages(data);
        scrollToBottom(); // Cuộn xuống cuối ngay khi load tin nhắn
      } catch (error) {
        console.error('Error fetching messages:', error);
      }
    };

    fetchMessages();

    const handleMessage = (message) => {
      console.log(message.chatChannelId._id===channelId);
      if (message.chatChannelId._id === channelId) {
        setMessages((prevMessages) => [...prevMessages, message]);
        scrollToBottom();
      }
    };

    socket.on('newMessage', handleMessage);

    return () => {
      socket.off('newMessage', handleMessage);
    };
  }, [channelId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageData = {
      chatChannelId: channelId,
      content: newMessage,
    };

    try {
      const response = await fetch(API_URLS.SEND_MESSAGE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(messageData),
      });

      if (response.ok) {
        setNewMessage(''); // Xóa input sau khi gửi tin nhắn
      } else {
        console.error('Failed to send message:', response.statusText);
      }
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Ngăn việc submit form mặc định
      handleSendMessage();  
    }
  };
  console.log(messages);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, overflowY: 'auto' }}>
        <h3>Messages</h3>
        <ul>
          {messages.map(message => (
            <li key={message._id}>
              <strong>{message?.userId?.username}</strong> {message.content}
            </li>
          ))}
          <div ref={messageEndRef} /> {/* Đánh dấu vị trí cuối cùng */}
        </ul>
      </div>
      <div style={{ borderTop: '1px solid #ccc', padding: '10px', display: 'flex' }}>
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ flex: 1, padding: '10px' }}
          onKeyDown={handleKeyDown}
        />
        <button onClick={handleSendMessage} style={{ marginLeft: '10px' }}>
          Send
        </button>
      </div>
    </div>
  );
};

export default MessagesComponent;
  