import React, { useEffect, useState } from 'react'
import { ChatState } from '../context/ChatProvider'
import axios from 'axios';
import { AccessChatRoute, allUsersRoute } from '../Utils/Routes';


function ToSearchUser() {
  const{user} =ChatState();
  const[Users,setUsers] =useState([]) ;
  const {setIsSearch ,setChats,chats} =ChatState();
  const[query,setQuery] =useState("") ;

  const  config = { headers: {
    Authorization: `Bearer ${user.token}`,
  },
};
 useEffect(()=>{

    const getUsers= async()=>{
      const res =await axios.get(allUsersRoute,config);  
      if(res.data){
        setUsers(res.data) ;
  
      }
    }

       getUsers();
 },[])
const onClose=()=>{
  setIsSearch(false);
}

const onAccesTochat=async(userId)=>{
  try{
  
    const res =await axios.post(AccessChatRoute,{userId},config) ;
    if(res.data) {
      setIsSearch(false) ;
            setChats( [...chats,res.data]) ;
      }
    
  }catch(err){
    console.log(err) ;
  }
}
  return (
    <div className='bg-slate-200  h-screen w-1/4 fixed inset-0  z-50
        overflow-y-scroll scroll-smooth  scrollbar scrollbar-thumb-2px'>
         
<div className='bg-white p-8 rounded-lg shadow-md border-2 w-full'>
  <div className='w-full flex justify-between'>
     <input className='focus:outline-none rounded-lg bg-slate-300 ps-2 p-1  hover:bg-slate-400 ' 
                type='text'
                placeholder='Enter your message ...' 
                value={query}
                onChange={(e)=>{setQuery(e.target.value)}}
           />
    <button className="ms-1 font-medium text-2xl  text-red-500 p-1  rounded-lg hover:bg-slate-700 " 
        onClick={onClose}>X</button>
  </div>
  
{  Users.map((usr,i)=>{
    
  return    (<div  key={i}
       className='bg-slate-300  rounded mt-1  flex flex-row  p-1 hover:bg-slate-400 '
       onClick={()=>{onAccesTochat(usr._id)}}
       >
        <img src={usr.pic} alt="icapp"  className="w-8 h-8 rounded-lg bg-white"/> 
        <h3 className="">{usr.name} </h3>
    </div>)

})
}

    </div>
      </div>
     
  )
}

export default ToSearchUser
