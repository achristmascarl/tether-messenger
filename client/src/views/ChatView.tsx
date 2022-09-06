import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ChatItem from '../components/ChatItem';
// TODO: replace with twilio conversations...
import { Client } from 'twilio-chat';

export default function ChatView({ props, route, navigation }) {
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [channel, setChannel] = useState(null);
  const [room, setRoom] = useState(null);
  const [email, setEmail] = useState(null);

  const bottomRef = useRef(null);

  // handle network requests, events, etc. async
  useEffect(() => {
    console.log('mounted');
    handleTwilioClient();
  }, []);

  // scroll on new messages
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  async function handleTwilioClient() {
    const params = route.params;
    console.log(params);
    // TODO: await finishing setting state before continuing so that
    // it's all from state
    // use mobx... ?
    setRoom(params.room);
    setEmail(params.email);

    console.log(`room: ${params.room}, user: ${params.email}`);
    let token = '';

    if (!params.email || !params.room) {
      navigation.navigate('Welcome');
    } else {
      setLoading(true);
      console.log('loading');
      try {
        token = await getToken(params.email);
      } catch (err) {
        console.error(err.message);
        throw new Error('Unable to get token, please reload this page');
      }
  
      const client = new Client(token);
  
      client.on('tokenAboutToExpire', async () => {
        const token = await getToken(params.email);
        client.updateToken(token);
      });
    
      client.on('tokenExpired', async () => {
        const token = await getToken(params.email);
        client.updateToken(token);
      });
  
      client.on('channelJoined', async (channel) => {
        // getting list of all messages since this is an existing channel
        const messages = await channel.getMessages();
        setMessages(messages.items || []);
        scrollToBottom();
      });
    
      try {
        const channel = await client.getChannelByUniqueName(params.room);
        joinChannel(channel);
      } catch(err) {
        try {
          const channel = await client.createChannel({
            uniqueName: params.room,
            friendlyName: params.room,
          });
      
          joinChannel(channel);
        } catch (err) {
          console.error(err.message);
          throw new Error('Unable to create channel, please reload this page');
        }
      }
    }
  }

  function scrollToBottom() {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }

  async function getToken(email) {
    let data;
    await axios.get(`http://localhost:8000/token/${email}`)
      // get response
      .then(function (response) {
        console.log(response.data);
        data = response.data;
      })
      // error handling
      .catch(function (error) {
        console.log(error);
        throw new Error('Unable to get token');
      });
    return data.token;
  }

  async function joinChannel(channel) {
    if (channel.channelState.status !== 'joined') {
      await channel.join();
    }

    setChannel(channel);
    setLoading(false);

    channel.on('messageAdded', handleMessageAdded);
    scrollToBottom();
  }

  function handleMessageAdded(message) {
    const oldMessages = messages;
    setMessages([...oldMessages, message]);
  }

  function sendMessage() {
    if (text.length > 0) {
      setLoading(true);
      channel.sendMessage(String(text).trim());
      setText('');
      setLoading(false);
    }
  }

  return(
    <>
      {loading ? <h1>loading</h1> : <></>}
      <h2>{`Room: ${room}, User: ${email}`}</h2>
      <ul>
        {messages && 
          messages.map((message) =>
            <ChatItem
              key={message.index}
              message={message}
              ownEmail={email}
            />
          )
        }
      </ul>
      <h3>enter message</h3>
      <input
        required
        placeholder='Enter message'
        value={text}
        disabled={!channel}
        onChange={(event) => 
          setText(event.target.value)
        }
      />
      <button
        onClick={sendMessage}
        disabled={!channel}
      >Send</button>
    </>
  );
}
