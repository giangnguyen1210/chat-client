import React from 'react';

const ChatChannelsComponent = ({ chatChannels, onChannelClick }) => {
  return (
    <ul style={{ paddingLeft: '20px', listStyleType: 'circle' }}>
      {chatChannels.map(chatchannel => (
        <li key={chatchannel._id}>
          <div onClick={() => onChannelClick(chatchannel._id)}>
            {chatchannel.name}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ChatChannelsComponent;
