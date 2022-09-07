import axios from 'axios';
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

export async function connectConversation(
  userId: string,
  recipientId: string
): Promise<any> {
  const response = await axios.post(
    'http://localhost:8000/conversations/connect',
    {
      userId: userId,
      recipientId: recipientId
    })
    // get response
    .then(function (response) {
      console.log(response);
      return response;
    })
    // error handling
    .catch(function (error) {
      console.log(error);
    });
  
  return response;
}

// export const getMessages = async (
//   conversation: Conversation
// ): Promise<Paginator<Message>> =>
//   await conversation.getMessages(CONVERSATION_PAGE_SIZE);
