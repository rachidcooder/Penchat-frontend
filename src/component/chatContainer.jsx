
import ItemMessages from "./ItemMessages"
import SendInpo from "./sendInpo"
import { ChatState } from "../context/ChatProvider"
import { useEffect, useState } from "react"


import io from 'socket.io-client'


const ENDPOINT = "http://localhost:3000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

function chatContainer() {
  const[messages,setMessages] =useState([]);
  const[SocketConnected,setSocketConnected] =useState(false) ;
  const[name,setName]=useState("")
  const[pic,setPic]=useState("")
 const{ user, selectedChat, userChatselected }=ChatState();

  useEffect(()=>{
      
    if(userChatselected){
        setName(userChatselected.name)
        setPic(userChatselected.pic)
     }
  },[userChatselected])

   
    useEffect(() => {
      if(user){
    socket = io(ENDPOINT);
     socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    // socket.on("typing", () => setIsTyping(true));
    // socket.on("stop typing", () => setIsTyping(false));
    // eslint-disable-next-line 
      }
  }, []);

 


  return (
    <div
      className='bg-slate-200  m-1 p-1 rounded-lg w-full  flex items-stretch  flex-col h-full'>


{selectedChat ? (
    <div className="w-full  flex items-stretch  flex-col h-full p-2">
     <div className="m-2 rounded  flex flex-row items-center p-1">
          <img src={pic} alt="icapp"  className="w-10 h-10 rounded-lg bg-white"/> 
          <h3 className="ms-3 font-medium">{name}</h3>
      </div>
       <ItemMessages socket={socket} messages={messages} setMessages={setMessages}/>
       <SendInpo socket={socket} messages={messages} setMessages={setMessages}/>
     </div>  
  ):(
    <div>
  <div className='m-5 h-full flex items-center justify-center flex-col'>
     <h1 className="font-bold m-2 mt-5 text-4xl" > Welcom to ChatPen ! </h1> 
      <h2 className="font-semibold m-2 text-2xl" >Select a Chat to start Talking with Friend</h2>
    </div>
    </div>
  )
}
   
       
    </div>
  )
}

export default chatContainer ;
