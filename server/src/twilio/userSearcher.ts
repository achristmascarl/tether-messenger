import Twilio = require('twilio');
import config from '../config';

/**
 *
 * @param userId ID of user to search for
 * @returns whether the user exists or not 
 */
async function userSearcher(userId: string): Promise<boolean> {
  const client = Twilio(
    config.TWILIO_API_KEY,
    config.TWILIO_API_SECRET,
    {accountSid: config.TWILIO_ACCOUNT_SID}
  );
  console.log(`searching for user: ${userId}`);
  const userExists = await client.conversations.v1.services(
    config.TWILIO_CONVERSATIONS_SERVICE_SID
  )
    .users(userId)
    .fetch()
    .then(() => {
      return true;
    }).catch(error => {
      console.log(error.message);
      return false;
    });
  
  console.log(
    `user ${userId} exists: ${userExists}`
  );

  return userExists;
}

export default userSearcher;
