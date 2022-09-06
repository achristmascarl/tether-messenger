import React, { useState } from 'react';

export default function ChatItem(props) {
  const message = props.message;
  const myUserId = props.myUserId;
  const isOwnMessage = message.author === myUserId;

  return(
    <>
      <li>
        <p>author: {isOwnMessage ? 'Me' : message.author}</p>
        <p>message: {message.body}</p>
        <p>timestamp: {new Date(message.dateCreated.toISOString()).toLocaleString()}</p>
      </li>
    </>
  );
}
