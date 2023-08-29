import React, { useEffect, useState } from 'react'
 import pinIc from "../assets/pen.svg"
 import {ToastContainer, toast} from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useNavigate,Link } from 'react-router-dom';
import { ChatState } from '../context/ChatProvider';

function login() {
  const [email,setEmail]=useState("")
  const [password,setPassword]=useState("");
const {user ,setUser}=ChatState();
   const navigate= useNavigate();

   const toastOptions = {
    position: "bottom-right",
    autoClose: 5000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };


   const onSubmitt=async(event)=>{
     event.preventDefault();
      if(!email||!password){
 toast.error("some fields are empty !",toastOptions)
      }else{
       try{
           const res= await axios.post("http://localhost:3000/api/user/login",{email,password});
            
     if(res.data.id){  
       localStorage.setItem("userInfo",JSON.stringify(res.data));
       setUser(res.data) ;
             navigate("/chat");
      }else{
              toast.error(res.data.msg,toastOptions)
        }
       }catch(err){
        console.error(err) ;
       }
        
      }
   }

    useEffect(()=>{
           if(user) navigate("/chat");
    },[user])
  return (
   <div className='h-screen w-screen flex items-center justify-center'>   
        <div
         className="container bg-white flex flex-col justify-center items-center p-2 w-fit rounded-lg drop-shadow-2xl">
          <div className='flex flex-col text-2xl '>
         PenChat 
           <img src={pinIc} alt='pen' className='w-12 h-12'/>
          </div>
          <form className='mt-2 flex flex-col' onSubmit={onSubmitt}>
      
               <input type='email' 
                  className='m-2 p-1 outline-none rounded bg bg-slate-200 hover:bg-slate-300'
                  placeholder='Enter your email'
                   value={email}
                  onChange={(e)=>{setEmail(e.target.value)}}
                  />
  
               <input type='password' 
                  className='m-2 p-1 outline-none rounded bg bg-slate-200 hover:bg-slate-300'
                  placeholder='Enter password'
                   value={password}
                  onChange={(e)=>{setPassword(e.target.value)}}
                  />
             
        
            <button type='submit'
              className='bg-cyan-400 rounded-lg  p-1 m-2 font-bold hover:bg-cyan-600'
              >Log in</button>
               <div>
          <span>
             you don't have account ? <Link to="/ " className='text-cyan-900  font-bold'>Register</Link>
          </span>
         
        </div>
          </form>
        </div>
       <ToastContainer/>
    </div>
  )
}

export default login
