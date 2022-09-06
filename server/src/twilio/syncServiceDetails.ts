const Twilio = require('twilio');
import config from '../config';
require('dotenv').config();

function syncServiceDetails() {
    const syncServiceSid = config.TWILIO_SYNC_SERVICE_SID || 'default';

    const client = new Twilio(
        config.TWILIO_API_KEY,
        config.TWILIO_API_SECRET,
        {accountSid: config.TWILIO_ACCOUNT_SID}
    );
    client.sync
        .services(syncServiceSid)
        .fetch()
        .then(response => {
            console.log(response);
        })
        .catch(error => {
            console.log(error);
        });
    
}

export default syncServiceDetails;
