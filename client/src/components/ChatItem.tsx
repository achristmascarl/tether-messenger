import React, { useState } from 'react';

export default function ChatItem(props) {
  const message = props.message;
  const ownEmail = props.ownEmail;
  const isOwnMessage = message.author === ownEmail;

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
