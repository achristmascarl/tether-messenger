import React, { useState, useRef, useEffect } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  Button,
  View,
  ScrollView
} from 'react-native';
import ChatItem from '../components/ChatItem';
import { Client as ConversationsClient } from '@twilio/conversations';

import { getToken } from '../api';

export default function ChatView({ route, navigation }) {
  const [message, onChangeMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [userId, setUserId] = useState(null);

  const scrollViewRef = useRef(null);
  const messagesRef = useRef([]);
  messagesRef.current = messages;

  // handle network requests, events, etc. async
  useEffect(() => {
    console.log('mounted');
    handleTwilioClient();
  }, []);

  useEffect(() => {
    console.log('messages:');
    console.log(messages);
  }, [messages]);

  async function handleTwilioClient() {
    const params = route.params;
    console.log(params);
    // TODO: await finishing setting state before continuing so that
    // it's all from state
    // use mobx... ?
    setConversationId(params.conversationId);
    setUserId(params.userId);

    console.log(
      `conversationId: ${params.conversationId}, user: ${params.userId}`
    );
    let token = '';

    if (!params.userId || !params.conversationId) {
      navigation.navigate('Welcome');
    } else {
      setLoading(true);
      console.log('loading');
      try {
        token = await getToken(params.userId);
      } catch (err) {
        console.error(err.message);
      }
  
      const client = new ConversationsClient(token);

      client.on('connectionError', (data) => {
        console.log('connection error; data:');
        console.log(data);
      });

      client.on('connectionStateChanged', (state) => {
        console.log('new connection state: ' + state);
      });

      await client.on('stateChanged', async (state) => {
        console.log('state changed: ' + state);
        if (state === 'initialized') {
          // Use the client
          try {
            const conversation =
              await client.getConversationBySid(params.conversationId);
            console.log('joining conversation');
            console.log(conversation);
            joinConversation(conversation);
          } catch(err) {
            console.error(err.message);
          }
        } else if (state === 'failed') {
          console.error('connection failed');
        }
      });
  
      client.on('tokenAboutToExpire', async () => {
        const token = await getToken(params.userId);
        client.updateToken(token);
      });
    
      client.on('tokenExpired', async () => {
        const token = await getToken(params.userId);
        client.updateToken(token);
      });
  
      client.on('conversationJoined', async (conversation) => {
        // getting list of all messages since this is an existing conversation
        const conversationMessages = await conversation.getMessages();
        setMessages(conversationMessages.items);
      });
    }
  }

  async function joinConversation(conversation) {
    console.log('attempting to join conversation');
    console.log(conversation.status);
    if (conversation.status !== 'joined') {
      await conversation.join();
    }

    setConversation(conversation);
    setLoading(false);

    conversation.on('messageAdded', handleMessageAdded);
  }

  function handleMessageAdded(message) {
    const updatedMessages = [...messagesRef.current];
    updatedMessages.push(message);
    setMessages(updatedMessages);
  }

  function sendMessage() {
    if (message.length > 0) {
      setLoading(true);
      conversation.sendMessage(String(message).trim());
      onChangeMessage('');
      setLoading(false);
    }
  }

  return(
    <View>
      {loading ? <Text>loading</Text> : null}
      <Text>{`Conversation: ${conversationId}, User: ${userId}`}</Text>
      {/* <ScrollView
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef?.current.scrollToEnd({ animated: true })
        }
      > */}
      <FlatList
        data={messages.map((message) => {
          return {
            message: message,
            userId: userId
          };
        })}
        renderItem={({ item, index }) => {
          return <ChatItem
            key={index}
            message={item.message}
            myUserId={item.userId}
          />;
        }}
      />
      {/* </ScrollView> */}
      <Text>enter message</Text>
      <TextInput
        placeholder='Enter message'
        value={message}
        // editable={!conversation}
        onChangeText={onChangeMessage}
        autoCorrect={false}
        autoCapitalize={'none'}
      />
      <Button
        onPress={sendMessage}
        // disabled={!conversation}
        title="Send"
      />
    </View>
  );
}
