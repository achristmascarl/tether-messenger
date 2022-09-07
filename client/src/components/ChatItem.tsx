import React from 'react';
import { Text, View } from 'react-native';

export default function ChatItem(props) {
  const message = props.message;
  const myUserId = props.myUserId;
  const isOwnMessage = message.author === myUserId;

  return(
    <View>
      <Text>author: {isOwnMessage ? 'Me' : message.author}</Text>
      <Text>message: {message.body}</Text>
      <Text>
        timestamp: {
          new Date(message.dateCreated.toISOString()).toLocaleString()
        }
      </Text>
    </View>
  );
}
