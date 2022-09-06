import React, { useState } from 'react';

export default function WelcomeView({ navigation}) {
  const [userId, setUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');

  function login() {
    if (userId && recipientId) {
      console.log(`recipient: ${recipientId}, user: ${userId}`);
      navigation.navigate('Chat', {recipientId: recipientId, userId: userId});
    }
  }

  function handleChangeUserId(event) {
    setUserId(event.target.value);
  }

  function handleChangeRecipientId(event) {
    setRecipientId(event.target.value);
  }

  return(
    <>
      <h1>
       Chat app with Twilio
      </h1>
      <div>
        <h2>
         email
        </h2>
        <input
          required
          value={userId}
          name='userId'
          placeholder='enter your email address'
          onChange={handleChangeUserId}
        />
        <h2>
         receipient
        </h2>
        <input
          required
          value={recipientId}
          name='recipientId'
          placeholder='enter recipient email address'
          onChange={handleChangeRecipientId}
        />
        <button onClick={login}>Login</button>
      </div>
    </>
  );
}
