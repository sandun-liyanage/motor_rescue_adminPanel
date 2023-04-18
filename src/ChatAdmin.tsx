import React from 'react'
import ChatList from './ChatList'
import { Chat } from './liveChat'

export default function ChatAdmin() {
  return (
    <div className= "chatAdmin">
        <div className='chatAdminChild'><ChatList /></div>
        <div className='chatAdminChildd'><Chat id={"sss"} /></div>
    </div>
  )
}
