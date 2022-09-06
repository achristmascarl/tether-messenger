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
  await axios.get(`http://localhost:8000/token/${userId}`)
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

// export const getMessages = async (
//   conversation: Conversation
// ): Promise<Paginator<Message>> =>
//   await conversation.getMessages(CONVERSATION_PAGE_SIZE);
