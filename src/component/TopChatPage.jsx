import React, { useState } from 'react'
import IcSearch from "../assets/search-ic.svg"
import NotIcon from '../assets/notification-bell-svgrepo-com.svg'
import icProfile from '../assets/avatar-svgrepo-com.svg'
import { ChatState } from '../context/ChatProvider'


function TopChatPage({showProfile,setShowProfile}) {
  const{isSearch,setIsSearch}=ChatState()

 return (
    <div className='bg-white p-2 flex flex-row mb-2 justify-around'>
      <div className="w-full"
      onClick={()=>{setIsSearch(true)}}
      >
           <button className='flex flex-row hover:bg-slate-100 rounded pe-2 ps-2 items-center'>
             <img src={IcSearch} className='rounded-lg w-4 h-4 me-1'/> Search </button>
      </div>
      <div className="w-full">
           <p className='font-bold'>PenChat</p>
      </div>

      <div className='w-full flex flex-row justify-end me-2 '>
     
          <img src={NotIcon} className='rounded-lg w-7 h-7 me-1'/>
            <img src={icProfile} 
              onClick={()=>{setShowProfile(true)}}
            className='rounded-lg w-7 h-7 bg-bg-slate-300'/>
       
      </div>
    </div>
  )
}

export default TopChatPage
