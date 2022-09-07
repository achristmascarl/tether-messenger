import React, { useState } from 'react';
import { Text, TextInput, Button, View } from 'react-native';
import { connectConversation, searchUser } from '../api';

export default function WelcomeView({ navigation }) {
  const [userId, onChangeUserId] = useState('');
  const [recipientId, onChangeRecipientId] = useState('');
  const [conversationId, onChangeConversationId] = useState('');

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

  return(
    <View>
      <Text>
        Chat app with Twilio
      </Text>
      <View>
        <Text>
            email
        </Text>
        <TextInput
          value={userId}
          placeholder='enter your email address'
          onChangeText={onChangeUserId}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
      </View>
      <View>
        <Text>
              recipient
        </Text>
        <TextInput
          value={recipientId}
          placeholder='enter recipient email address'
          onChangeText={onChangeRecipientId}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
      </View>
      <View>
        <Text>
              conversation id
        </Text>
        <TextInput
          value={conversationId}
          placeholder='enter conversation id'
          onChangeText={onChangeConversationId}
          autoCorrect={false}
          autoCapitalize={'none'}
        />
      </View>
      <View>
        <Button
          onPress={connect}
          title='Connect'
        />
      </View>
    </View>
  );
}
