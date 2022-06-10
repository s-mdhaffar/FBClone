import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({onlineUsers,currentId,setCurrentChat}) {

const [friends,setFriends]=useState([])
const [onlineFriends, setOnlineFriends] = useState([]);
const PF=process.env.REACT_APP_PUBLIC_FOLDER;

useEffect(() => {
const getFriends= async()=>{
        const res= await axios.get("/users/friends/"+currentId)
        setFriends(res.data)
}
getFriends()
}, [currentId]);

useEffect(() => {
setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)))
}, [onlineUsers,friends]);



const handleClick=async(user)=>{
try {
    const res= await axios.get(`/conversations/find/${currentId}/${user._id}`);
    if(res.data){
        
        setCurrentChat(res.data)
    }else{
        const conv={senderId:currentId,receiverId:user._id}
    try {
        const res= await axios.post("/conversations",conv);
        setCurrentChat(res.data)
    } catch (error) {
        console.log(error);
    }
    }
        // setCurrentChat(res.data)
} catch (error) {
    console.log(error);
}
}

// const handleClick=async(user)=>{
//     const conv={senderId:currentId,receiverId:user._id}
//     try {
//         const res= await axios.post("/conversations",conv);
//             console.log(res);
//     } catch (error) {
//         console.log(error);
//     }
//     }


    return (
    <div className="chatOnline">
        {onlineFriends.map((o)=>(
            
            <div className="chatOnlineFriend" key={o._id} onClick={()=>handleClick(o)} >
            <div className="chatOnlineImgContainer">
                <img src={o?.profilePicture?PF+o.profilePicture:PF+"person/noAvatar.jpg"} alt="" className="chatOnlineImg" />
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o?.userName}</span>
        </div>
        
        ))}
    </div>
    );}
