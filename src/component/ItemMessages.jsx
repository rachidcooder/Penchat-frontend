import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios';


function ItemMessages({socket,messages,setMessages}) {
const {user} =ChatState();
const {selectedChat}=ChatState();


   useEffect(()=>{
  const getMsges=async()=>{
    const config = { headers: {
    Authorization: `Bearer ${user.token}`,
  },
};
     try{
      const res =await axios.get(`http://localhost:3000/api/message/${selectedChat._id}`,config) ;
         ;
        if(res.data){
         setMessages(res.data) ;
         socket.emit("join chat", selectedChat._id);
        }
         
     }catch(err){

     }
  } 
  if(selectedChat)
      getMsges();
   
},[selectedChat])

 useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
       setMessages([...messages, newMessageRecieved]);
    })
  
    
      // if (
      //   !selectedChatCompare || // if chat is not selected or doesn't match current chat
      //   selectedChatCompare._id !== newMessageRecieved.chat._id
      // ) {
      //   if (!notification.includes(newMessageRecieved)) {
      //     setNotification([newMessageRecieved, ...notification]);
      //     setFetchAgain(!fetchAgain);
      //   }
      // } else {
       // setMessages([...messages, newMessageRecieved]);
     // }
    });
  
  return (


    <div className=' bg-slate-100 rounded m-1 h-full overflow-y-scroll scroll-smooth  scrollbar scrollbar-thumb-2px'>
  {  messages.map((msg, i) => (

  <div className={`flex justify-${msg.sender._id === user.id ? 'end' : 'start'} p-2`} key={i}>
    <p className={`rounded-lg ${msg.sender._id === user.id ? 'bg-indigo-500' : 'bg-slate-400'} p-1`}>
      {msg.content}
    </p>
  </div>
))



}
      </div>
  )
}

export default ItemMessages

