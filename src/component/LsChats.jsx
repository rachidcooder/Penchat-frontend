import { ChatState } from "../context/ChatProvider"
import icApp from "../assets/pen.svg"
import { useEffect } from "react";
import axios from "axios";


function LsChats() {
const {user}=ChatState();
const {chats,setChats }=ChatState();
const{ setUserChatselected }=ChatState(); 
const {setSelectedChat} =ChatState();
 let config ;

 useEffect(()=>{
   const getListChats=async()=>{
         if(user){
          config = { headers: {
    Authorization: `Bearer ${user.token}`,
  },
};
      try{
      const res =await axios.get("http://localhost:3000/api/chat",config) ;
     
         
           if(res.data){
            setChats(res.data.result);
           }

      }catch(err){
         console.log(err) ;
      }    
   }

   }
    getListChats() ;

 },[user])

 const onchatSelect=async(readId)=>{
          config = { headers: {
    Authorization: `Bearer ${user.token}`,
  },
};
  
    try{
         const res=await axios.post(`http://localhost:3000/api/chat/`,{
            userId:readId
         },config) ;
     const chatslect=res.data ;
         if(res.data){
           setSelectedChat(res.data) ;
          if( chatslect.users[0].name===user.name ){
               setUserChatselected(chatslect.users[1]);
          }
           else {
            setUserChatselected(chatslect.users[0]) ;
          }
          }
   
    }catch(err){
      console.log(err) ;
    }
 }
  return (

    <div className="bg-slate-200 h-full m-1 rounded-lg w-1/3 overflow-y-scroll scroll-smooth  scrollbar scrollbar-thumb-2px">
          <div className="flex flex-col justify-center items-center text-2xl w-full ">
            <h1 className="m-2 font-bold"> PenChat </h1>
             <img src={icApp} alt="icapp"  className="w-14 h-14 rounded-lg bg-white"/>
          </div>

          
   {chats&& chats.map((chat,i)=>{

    return(  
      <div  key={i}  onClick={()=>{onchatSelect(chat.users[1]._id)}}
       className="bg-slate-300 m-2 rounded  flex flex-row items-center p-1 hover:bg-slate-400">
   <img src={chat.users[0].pic} alt="icapp"  className="w-8 h-8 rounded-lg bg-white"/> 
   <div className="ps-2">
        <h3 className="">{chat.users[0].name===user.name ?chat.users[1].name:chat.users[0].name}</h3>
        <p className="font-serif text-sm ms-2 text-green-700">
            {chat.latestMessage !== undefined && chat.latestMessage !== null ? (
                 chat.latestMessage.content
             ) : null}
           
          </p>
  </div>
 
</div>)

   })

   }

         </div>
  )
}

export default LsChats
