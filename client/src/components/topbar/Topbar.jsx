import './topbar.css';
import {Search,Person, Chat, Notifications} from "@mui/icons-material"
import {Link} from "react-router-dom"
import { useContext, useEffect, useState } from 'react';
import {AuthContext} from "../../context/AuthContext"
import axios from 'axios';

export default function Topbar({socket,setCurrentChat}){


const {user}=useContext(AuthContext)
const PF=process.env.REACT_APP_PUBLIC_FOLDER;



const [notifications, setNotifications] = useState([]);
const [open, setOpen] = useState(false)
const [sender, setSender] = useState([])
// const [senderName, setSenderName] = useState(null)
// const [text, setText] = useState(null)


useEffect(() => {
	socket?.on("getNotification",(data)=>{
		setSender(prev=>[...prev,data])
		// setSenderName(data.senderName)
		// setText(data.text)
	setNotifications(prev=>[...prev,data])
})
}, [socket]);

console.log(notifications)



const handleClick=async()=>{
	try {
		const res= await axios.get(`/conversations/find/${user._id}/${sender.senderId}`);
		if(res.data){
			setCurrentChat(res.data)
			setNotifications(()=>notifications.filter((e)=>e!==sender.senderId))
		console.log(notifications)
			setOpen(false)
		}else{
			const conv={senderId:user._id,receiverId:sender.senderId}
		try {
			const res= await axios.post("/conversations",conv);
			setCurrentChat(res.data)
		} catch (error) {
			console.log(error);
		}
		}
	} catch (error) {
		console.log(error);
	}
	}


const displayNotification=(e,i)=>{
	return (

			<span key={e.senderId} className="notification" onClick={handleClick}  >{`${e.senderName} sent you ${e.text}`}</span>
		
	)
}

	return (
	<div className='topbarContainer' >
		<div className="topbarLeft">
			<div className="logoContainer">
				<Link to="/" style={{textDecoration:"none"}} >
				<img src="/assets/mst.jpg" alt="" className="logoImg" />
				<span className="logo">HediBook</span>
				</Link>
			</div>
		</div>
		<div className="topbarCenter">
			<div className="searchBar">
				<Search className='searchIcon' />
				<input placeholder='Search for friend, post or video' className="searchInput" />
			</div>
		</div>
		<div className="topbarRight">
			<div className="topbarLinks">
				<Link to="/" style={{textDecoration:"none"}}>
				<span className="topbarLink">Home Page</span>
				</Link>
				<span className="topbarLink">Timeline</span>
			</div>
			<div className="topbarIcons">
				<div className="topbarIconItem">
					<Person/>
					<span className="topbarIconBadge">1</span>
				</div>
					<Link to="/messenger" style={{textDecoration:"none"}} >
				<div className="topbarIconItem" onClick={()=>setOpen(!open)} >
					<Chat/>
					{notifications.length>0 &&
					<span className="topbarIconBadge">{notifications.length}</span>}
				</div>
					</Link>
				<div className="topbarIconItem">
					<Notifications/>
					<span className="topbarIconBadge">1</span>
				</div>
				{open &&
			<div className='notifications' >
				{notifications.map((n,i)=>displayNotification(n,i))}
				</div>}
			</div>
			<Link to={`/profile/${user?.userName}`}>
				<img src={user?.profilePicture?PF+user.profilePicture:PF+"person/noAvatar.jpg"} alt="" className="topbarImg" />
			</Link>
		</div>
	</div>);
};
