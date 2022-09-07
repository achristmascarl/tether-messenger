import Twilio = require('twilio');
import config from '../config';

/**
 *
 * @param userId ID of user initiating the request
 * @param recipientId ID of recipient
 * @returns Twilio Sid of conversation that both user 
 *          and recipient are partipiants of
 */
async function conversationConnector(userId: string, recipientId: string) {
  const client = Twilio(
    config.TWILIO_API_KEY,
    config.TWILIO_API_SECRET,
    {accountSid: config.TWILIO_ACCOUNT_SID}
  );
  console.log(`connecting conversation between ${userId} and ${recipientId}`);
  const conversationSid = await client.conversations.v1.services(
    config.TWILIO_CONVERSATIONS_SERVICE_SID
  )
    .conversations
    .create()
    .then((conversation) => {
      console.log('conversation: ');
      console.log(conversation.sid);
      return conversation.sid;
    }).catch(error => {
      console.log(error);
      throw new Error('Problem creating new conversation');
    });
  
  console.log(
    `adding ${userId} and ${recipientId} to new chat ${conversationSid}`
  );

  const addUserToConversation = new Promise ((resolve, reject) => {
    client.conversations.v1.services(
      config.TWILIO_CONVERSATIONS_SERVICE_SID
    )
      .conversations(conversationSid)
      .participants
      .create({identity: userId})
      .then(participant => {
        resolve(participant);
      }).catch(error => {
        reject(error);
      });
  });
  const addRecipientToConversation = new Promise ((resolve, reject) => {
    client.conversations.v1.services(
      config.TWILIO_CONVERSATIONS_SERVICE_SID
    )
      .conversations(conversationSid)
      .participants
      .create({identity: recipientId})
      .then(participant => {
        resolve(participant);
      }).catch(error => {
        reject(error);
      });
  });

  await Promise.all([addUserToConversation, addRecipientToConversation])
    .then(() => {
      console.log(
        `successfully added ${userId} and ${recipientId}` +
        ` to new chat ${conversationSid}`
      );
    }).catch(async (error) => {
      await client.conversations.v1.services(
        config.TWILIO_CONVERSATIONS_SERVICE_SID
      )
        .conversations(conversationSid)
        .remove()
        .then(() => {
          console.log(
            `removed conversation ${conversationSid}` +
            ' after problem adding recipients'
          );
        }).catch(error => {
          console.log(error);
          throw new Error('Problem deleting conversation');
        });
      throw new Error('Problem adding recipients to conversations');
    });
  return conversationSid;
}

export default conversationConnector;
