import React, { useState } from 'react'
import icSend from "../assets/send.svg"
import { ChatState } from '../context/ChatProvider';
import axios from "axios"


function sendInpo({socket,messages,setMessages}) {
 const[content,setContent]=useState("");
 const{user,selectedChat}=ChatState() ;


   const senMessage=async()=>{
         const config = { headers: {
    Authorization: `Bearer ${user.token}`,
  },
};
      try{
          const res =await axios.post("http://localhost:3000/api/message",{
               content,chatId:selectedChat._id
          },config);

          console.log(res) ;
          if(res.data){
            const data=res.data
             socket.emit("new message", data);
            setContent("") ; 
            setMessages([...messages,data]) ;
          }
        
      }catch(err){
          console.log(err)
      }
   }

   
  return (
     <div className='self-end   rounded-lg overflow-hidden bg-slate-300 flex flex-row w-full  p-1 hover:bg-slate-400'>
          <input className='focus:outline-none bg-slate-300 ps-2 p-1 w-full hover:bg-slate-400 ' 
                type='text'
                placeholder='Enter your message ...' 
                value={content}
                onChange={(e)=>{setContent(e.target.value)}}
           />
          <button className='pe-1 rounded-lg '
             onClick={()=>{
               senMessage()}} 
               >  <img src={icSend} className='rounded-lg w-7 h-7 me-1'/>
               </button>
     </div>
  )
}

export default sendInpo
