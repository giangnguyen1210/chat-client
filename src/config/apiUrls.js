const API_BASE_URL = 'http://localhost:6868'; // Cơ sở của API, có thể thay đổi tùy môi trường

export const API_URLS = {
  LOGIN: `${API_BASE_URL}/v2/auth/login`,
  GET_TEAMS_CHATS: `${API_BASE_URL}/v2/teams-chat/list-teamschat-by-user`,
  GET_MESSAGE: (chatChannelId) => `${API_BASE_URL}/v2/chat-messages/history/${chatChannelId}`,
  SEND_MESSAGE: `${API_BASE_URL}/v2/chat-messages`,
};
