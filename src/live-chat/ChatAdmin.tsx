import React from 'react'
import ChatList from './ChatList'
import { Chat } from './liveChat'
import { useParams } from 'react-router-dom';

export default function ChatAdmin() {
  const { id } = useParams();
  return (
    <div className= "chatAdmin">
        <div className='chatAdminChild'><ChatList /></div>
        <div className='chatAdminChildd'><Chat id={id} /></div>
    </div>
  )
}
