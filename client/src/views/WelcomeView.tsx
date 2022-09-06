import React, { useState } from 'react';

export default function WelcomeView({props, navigation}) {
  const [email, setEmail] = useState('');
  const [room, setRoom] = useState('');

  function login() {
    if (email && room) {
      console.log(`room: ${room}, user: ${email}`);
      navigation.navigate('Chat', {room: room, email: email});
    }
  }

  function handleChangeEmail(event) {
    setEmail(event.target.value);
  }

  function handleChangeRoom(event) {
    setRoom(event.target.value);
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
          value={email}
          name='email'
          placeholder='enter email address'
          onChange={handleChangeEmail}
        />
        <h2>
         room
        </h2>
        <input
          required
          value={room}
          name='room'
          placeholder='enter room name'
          onChange={handleChangeRoom}
        />
        <button onClick={login}>Login</button>
      </div>
    </>
  );
}
