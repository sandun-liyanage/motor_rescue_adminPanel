import React, { useState, useEffect } from "react";
import { db, auth } from "./firebase";
import {
  collection,
  addDoc,
  where,
  serverTimestamp,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";

//import "../styles/Chat.css";
import "./assets/liveChat.css"
import firebase  from 'firebase/compat/app';

export const Chat = ({ id } : {id: any}) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesRef = collection(db, "messages-admin");

  useEffect(() => {
    const queryMessages = query(
      messagesRef,
      where("id", "==", id),
      orderBy("createdAt")
    );
    const unsuscribe = onSnapshot(queryMessages, (snapshot) => {
      let messages : any = [];
      snapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      console.log(messages);
      setMessages(messages);
    });

    return () => unsuscribe();
  }, []);

  const handleSubmit = async (event : any) => {
    event.preventDefault();

    if (newMessage === "") return;
    await addDoc(messagesRef, {
      text: newMessage,
      createdAt: serverTimestamp(),
      user: "admin",
      id: id,
    });

    setNewMessage("");
  };

  var classNme = "message";

  if(id === 'null'){
    return(<></>);
  }else {
     return (
    <div className="chat-app">
      {/* <div className="header">
        <h1>Chat With: {id}</h1>
      </div> */}
      <div className="messages">
        {messages.map((message) => {
          classNme = "message";
          message.user==='admin'? classNme='adminMessage': '';
          return(
          <div key={message.id} className={classNme}>
            <>{message.text}  &thinsp;</>
            <span className="timestamp "></span> 
          </div>
          )
          })}
      </div>
      <form onSubmit={handleSubmit} className="new-message-form">
        <input
          type="text"
          value={newMessage}
          onChange={(event) => setNewMessage(event.target.value)}
          className="new-message-input"
          placeholder="Type your message here..."
        />
        <button type="submit" className="send-button">
          Send
        </button>
      </form>
    </div>
  );
};
}