import axios from 'axios';
import { Platform } from 'react-native';
// TODO: move twilio client stuff here
// import {
//   Conversation,
//   Message,
//   Participant,
//   Media,
//   Client,
//   Paginator,
// } from '@twilio/conversations';

// different base api urls for dev per platform
const apiBaseUrl = Platform.OS === 'web' ?
  'http://localhost:8000' :
  'http://192.168.0.189:8000';

export async function getToken(userId: string): Promise<string> {
  let data;
  await axios.post(`${apiBaseUrl}/token`, {
    id: userId
  })
    // get response
    .then(function (response) {
      console.log(response.data);
      data = response.data;
    })
    // error handling
    .catch(function (error) {
      console.log(error);
    });
  console.log(data.token);
  return data.token;
}

export async function searchUser(
  userId: string
): Promise<unknown> {
  const responseData = await axios.post(
    `${apiBaseUrl}/users/search`,
    {
      userId: userId
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  
  return responseData;
}

export async function connectConversation(
  userId: string,
  recipientId: string
): Promise<unknown> {
  const responseData = await axios.post(
    `${apiBaseUrl}/connect`,
    {
      userId: userId,
      recipientId: recipientId
    })
    .then(function (response) {
      console.log(response);
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  
  return responseData;
}
