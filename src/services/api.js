import { API_URLS } from "../config/apiUrls";

export const fetchTeamsChats = async () => {
  const response = await fetch(API_URLS.GET_TEAMS_CHATS);
  return response.json();
};

export const fetchMessage = async () => {
  const response = await fetch(API_URLS.GET_MESSAGE);
  return response.json();
};