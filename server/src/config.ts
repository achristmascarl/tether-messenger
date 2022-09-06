require('dotenv').config();

const config = {
  TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
  TWILIO_API_KEY: process.env.TWILIO_API_KEY,
  TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
  TWILIO_CHAT_SERVICE_SID: process.env.TWILIO_CHAT_SERVICE_SID,
  TWILIO_NOTIFICATION_SERVICE_SID: process.env.TWILIO_NOTIFICATION_SERVICE_SID,
  TWILIO_SYNC_SERVICE_SID: process.env.TWILIO_SYNC_SERVICE_SID || 'default'
}

export default config;
