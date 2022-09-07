import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { connectConversation, searchUser } from '../api';

export default function WelcomeView({ navigation }) {
  const [userId, setUserId] = useState('');
  const [recipientId, setRecipientId] = useState('');
  const [conversationId, setConversationId] = useState('');

  async function connect() {
    if (
      userId.length > 0 &&
      recipientId.length > 0 &&
      conversationId.length === 0
    ) {
      console.log(`recipient: ${recipientId}, user: ${userId}`);
      const recipientExists = await searchUser(recipientId);
      if (recipientExists) {
        const conversationId = await connectConversation(userId, recipientId);
        navigation.navigate('Chat', {
          conversationId: conversationId,
          userId: userId
        });
      } else {
        console.log('recipient doesnt exist');
      }
    } else if (conversationId.length > 0) {
      const userExists = await searchUser(userId);
      if (userExists) {
        navigation.navigate('Chat', {
          conversationId: conversationId,
          userId: userId
        });
      }
    }
  }

  function handleChangeUserId(event) {
    setUserId(event.target.value);
  }

  function handleChangeRecipientId(event) {
    setRecipientId(event.target.value);
  }

  function handleChangeConversationId(event) {
    setConversationId(event.target.value);
  }

  return(
    <View>
      <h1>
        <Text>
          Chat app with Twilio
        </Text>
      </h1>
      <div>
        <h2>
          <Text>
            email
          </Text>
        </h2>
        <input
          required
          value={userId}
          name='userId'
          placeholder='enter your email address'
          onChange={handleChangeUserId}
        />
        <h2>
          <Text>
            recipient
          </Text>
        </h2>
        <input
          required
          value={recipientId}
          name='recipientId'
          placeholder='enter recipient email address'
          onChange={handleChangeRecipientId}
        />
        <h2>
          <Text>
            conversation id
          </Text>
        </h2>
        <input
          required
          value={conversationId}
          name='recipientId'
          placeholder='enter recipient email address'
          onChange={handleChangeConversationId}
        />
        <button onClick={connect}><Text>Connect</Text></button>
      </div>
    </View>
  );
}
