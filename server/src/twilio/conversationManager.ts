import Twilio = require('twilio');
import config from '../config';

function conversationManager(userId: string, recipientId: string) {
  const client = Twilio(
    config.TWILIO_API_KEY,
    config.TWILIO_API_SECRET,
    {accountSid: config.TWILIO_ACCOUNT_SID}
  );
}
export default conversationManager;
    