import React, { useEffect, useState } from 'react'
import LsChats from '../component/LsChats'
import ChatContainer from '../component/chatContainer'
import TopChatPage from '../component/TopChatPage'
import { ChatState } from '../context/ChatProvider'
import { useNavigate } from 'react-router-dom'
import ToSearchUser from '../component/ToSearchUser'
import Profile from '../component/Profile'


function Chat() {
 const {user ,isSearch} =ChatState() ;
 const navigate= useNavigate() ;
  const [showProfile,setShowProfile]=useState(false);
  useEffect(()=>{
    if(!user){
      navigate("/login");
   }
    },[user]) ;
 

  return (
    <div className='h-screen w-screen flex flex-col relative'>
     {user&& <TopChatPage showProfile={setShowProfile} setShowProfile={setShowProfile} />}
    <div className='h-full w-full flex flex-row p-1 pb-5'>   
    { user&&  <LsChats/>}
     { user && <ChatContainer/>}
     {isSearch && <ToSearchUser/>}
     {showProfile && <Profile  showProfile={setShowProfile} setShowProfile={setShowProfile}/>}
    </div>

    </div>
  
  )
}

export default Chat ;
