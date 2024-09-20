import React, { useState } from 'react';
import useFetch from '../hooks/useFetch';
import { API_URLS } from '../config/apiUrls';
import ChatChannelsComponent from './ChatChannelsComponent';
import MessagesComponent from './MessagesComponent'; // Component mới để hiển thị tin nhắn
import { getCurrentUser } from '../utils/auth';

const TeamsChatComponent = () => {
  const currentUser = getCurrentUser();
  console.log(currentUser);
  const { data: teamsChats, loading, error } = useFetch(API_URLS.GET_TEAMS_CHATS);
  const [selectedChannelId, setSelectedChannelId] = useState(null);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading teams chats: {error.message}</div>;

  const handleChannelClick = (channelId) => {
    setSelectedChannelId(channelId);
  };
  console.log(teamsChats);

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ width: '200px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {teamsChats.teamsChats.map((teamsChat) => (
            <li 
              key={teamsChat._id} 
              style={{ cursor: 'pointer', padding: '10px', backgroundColor: selectedChannelId === teamsChat._id ? '#f0f0f0' : 'transparent' }}
            >
              <div>
                {teamsChat.name}
              </div>
              <ChatChannelsComponent chatChannels={teamsChat.chatChannels} onChannelClick={handleChannelClick} />
            </li>
          ))}
        </ul>
      </div>
      <div style={{ flex: 1, padding: '10px' }}>
        {selectedChannelId ? (
          <MessagesComponent channelId={selectedChannelId} />
        ) : (
          <div>Please select a chat channel to view messages</div>
        )}
      </div>
    </div>
  );
};

export default TeamsChatComponent;
