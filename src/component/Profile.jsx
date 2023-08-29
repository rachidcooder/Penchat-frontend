import React from 'react'
import { ChatState } from '../context/ChatProvider'
import { useNavigate } from 'react-router-dom';

function Profile({showProfile,setShowProfile}) {
  const {user,setUser}=ChatState();
  const navigate=useNavigate()
 
  const onlogOut=()=>{
     localStorage.removeItem("userInfo") ;
     setUser();
     navigate("/login");
  }
  return (
 <div className='fixed top-0 right-0 m-4 p-2 bg-white rounded-lg z-50'>
  <div className='flex flex-col items-center justify-center'>
    <img className='h-14 w-14' src={user.pic} alt='profile' />
    <h1 className=''>{user.name}</h1>
  </div>
  
  <h3 className='mt-1 text-cyan-500'>{user.email}</h3>
  <div className='flex justify-between mt-2'>
    <button onClick={() => {onlogOut()}} className='p-1 bg-cyan-400 rounded-lg hover:bg-cyan-600'>
      Log out
    </button>
     <button onClick={() => setShowProfile(false)} className='text-red-500 me-2 font-bold'> X
    </button>
  </div>
</div>

  )
}

export default Profile
