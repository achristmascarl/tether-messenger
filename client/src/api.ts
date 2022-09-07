import axios, { AxiosResponse } from 'axios';
// import {
//   Conversation,
//   Message,
//   Participant,
//   Media,
//   Client,
//   Paginator,
// } from '@twilio/conversations';

export async function getToken(userId: string): Promise<string> {
  let data;
  await axios.post('http://localhost:8000/token', {
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
    'http://localhost:8000/users/search',
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
    'http://localhost:8000/conversations/connect',
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
