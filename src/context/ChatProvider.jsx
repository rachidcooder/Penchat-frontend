import { createContext,useContext,useEffect,useState} from 'react'

const ChatContext =createContext();

const ChatProvider = ({children})=>{
  const [selectedChat, setSelectedChat] = useState();
  const [user, setUser] = useState();
  const [notification, setNotification] = useState([]);
  const [chats, setChats] = useState([]);
  const[isSearch,setIsSearch] =useState(false);
  const[userChatselected,setUserChatselected]=useState();


  useEffect(()=>{
   
          const userInfo=JSON.parse(localStorage.getItem("userInfo"));
          if(userInfo)
            setUser(userInfo);
          
     },[]); 
    
  return (
    <ChatContext.Provider value={{
        selectedChat,
        setSelectedChat,
        user,
        setUser,
        notification,
        setNotification,
        chats,
        setChats,
        isSearch,
        setIsSearch,
        userChatselected,
        setUserChatselected
    }}>
      {children}
    </ChatContext.Provider>
  );
};
export const  ChatState= ()=>{
  return useContext(ChatContext);
}

export default ChatProvider ;

