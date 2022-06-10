import "./messenger.css";
import Topbar from "../../components/topbar/Topbar"
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";


export default function Messenger() {

    const [conversations, setConversations] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const [arrivalMessage, setArrivalMessage] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const [currentChat, setCurrentChat] = useState(null);
	const [messages, setMessages] = useState([]);



    const {user}=useContext(AuthContext)

	const [ socket, setSocket ] = useState(null);

    useEffect(() => {
		setSocket(io('ws://localhost:8900'));
	}, []);
    
    const scrollRef = useRef();
   

	useEffect(() => {
        
        socket?.on("getMessage",(data)=>{
            setArrivalMessage({
                sender:data.senderId,
                text:data.text,
                createdAt:Date.now()
            })
                })
            }, [socket]);

			useEffect(() => {
				socket?.emit("addUser",user._id)
				socket?.on("getUsers",(users)=>{
					setOnlineUsers(user.followings.filter((f)=> users.some((u)=>u.userId===f)))
				})
				}, [user.followings,user._id,socket]);

				useEffect(() => {
					arrivalMessage && currentChat?.members.includes(arrivalMessage.sender) && setMessages((prev)=>[...prev,arrivalMessage])
					}, [arrivalMessage,currentChat]);


    useEffect(() => {
        const getConversations=async()=>{
        try {
            const res=await axios.get("/conversations/"+user._id)
            setConversations(res.data)
        } catch (error) {
            console.log(error);
        }
    }
    getConversations()
    }, [user._id]);

    useEffect(() => {
    const getMessages= async()=>{
    try {
        const res= await axios.get("/messages/"+currentChat?._id)
        setMessages(res.data)
    } catch (error) {
        console.log(error);
    }
    }
    getMessages()
    }, [currentChat]);



const handleSubmit=async(e)=>{
    e.preventDefault();
    const message={
        sender:user._id,
        text:newMessage,
        conversationId:currentChat._id
    }

    const receiverId=currentChat.members.find((member)=>member!==user._id)

socket?.emit("sendMessage",{
    senderId:user._id,
    receiverId,
    text:newMessage
})

socket?.emit("sendNotification",{
    senderId:user._id,
    senderName:user.userName,
    receiverId,
    text:newMessage
})

try {
    const res=await axios.post("/messages",message)
    setMessages([...messages,res.data])
    setNewMessage("")
} catch (error) {
    console.log(error);
}
}

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    return (
    <>
        <Topbar socket={socket} setCurrentChat={setCurrentChat} />
        <div className="messenger">
        <div className="chatMenu">
            <div className="chatMenuWrapper">
                <input placeholder="Search for friends" className="chatMenuInput" />
                {conversations.map((c)=>(
                <div key={c._id} onClick={()=> setCurrentChat(c)} >
                    <Conversation conversation={c} currentUser={user}/>
                </div>
                ))}
            </div>
        </div>
        <div className="chatBox">
            <div className="chatBoxWrapper">
                {currentChat?(
                    <>
                <div className="chatBoxTop">
                    {messages.map((m)=>(
                        <div ref={scrollRef} >
                            <Message message={m} own={m.sender===user._id} key={m._id} />
                        </div>
                    ))
                    }
                </div>
                <div className="chatBoxBottom">
                    <textarea 
                    placeholder="Write something..." 
                    onChange={(e)=>setNewMessage(e.target.value)}
                    value={newMessage}
                    className="chatMessageInput"></textarea>
                    <button className="chatSubmitButton" onClick={handleSubmit} >Send</button>
                </div>
                </>):(
                <span className="noConversationText">Open new conversation</span>
                )}
            </div>
        </div>
        <div className="chatOnline">
        <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={user._id} setCurrentChat={setCurrentChat} setConversations={setConversations} />
            </div>
        </div>
        </div>
    </>
    );
}
