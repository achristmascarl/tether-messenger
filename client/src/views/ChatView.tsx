import React, { useState, useRef, useEffect, useCallback } from 'react';
import ChatItem from '../components/ChatItem';
import { Client as ConversationsClient } from '@twilio/conversations';

import { getToken } from '../api';

export default function ChatView({ route, navigation }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [userId, setUserId] = useState(null);

  const bottomRef = useRef(null);
  const messagesRef = useRef([]);
  messagesRef.current = messages;

  // handle network requests, events, etc. async
  useEffect(() => {
    console.log('mounted');
    handleTwilioClient();
  }, []);

  // scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    console.log('conversation:');
    console.log(conversation);
  }, [conversation]);

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
        const messages = await conversation.getMessages();
        setMessages(messages.items || []);
        scrollToBottom();
      });
    }
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
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
    scrollToBottom();
  }

  function handleMessageAdded(message) {
    const updatedMessages = [...messagesRef.current];
    updatedMessages.push(message);
    setMessages(updatedMessages);
  }

  function sendMessage() {
    if (text.length > 0) {
      setLoading(true);
      conversation.sendMessage(String(text).trim());
      setText('');
      setLoading(false);
    }
  }

  return(
    <>
      {loading ? <h1>loading</h1> : <></>}
      <h2>{`Conversation: ${conversationId}, User: ${userId}`}</h2>
      <ul>
        {messages && 
          messages.map((message) =>
            <ChatItem
              key={message.index}
              message={message}
              myUserId={userId}
            />
          )
        }
      </ul>
      <div ref={bottomRef}/>
      <h3>enter message</h3>
      <input
        required
        placeholder='Enter message'
        value={text}
        disabled={!conversation}
        onChange={(event) => 
          setText(event.target.value)
        }
      />
      <button
        onClick={sendMessage}
        disabled={!conversation}
      >Send</button>
    </>
  );
}
