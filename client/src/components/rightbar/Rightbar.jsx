import "./rightbar.css";
import {Users} from "../../dummyData"
import Online from "../online/Online";
import { useContext, useEffect,  useState} from "react";
import axios from "axios";
import { Link} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";


export default function Rightbar({user}){

  const PF=process.env.REACT_APP_PUBLIC_FOLDER;

  const [friends, setFriends] = useState([]);

  const {user:currentUser,dispatch}=useContext(AuthContext)

  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

  useEffect(() => {
  setFollowed(currentUser.followings.includes(user?.id))
  }, [currentUser,user]);


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get("/users/friends/" + user._id)
        setFriends(friendList.data)
      } catch (error) {
        console.log(error);
      }
    }
    getFriends()
  }, [user]);

  const handleClick=async()=>{
    try {
      if(followed){
        await axios.put("/users/"+user._id+"/unfollow",{userId:currentUser._id});
        dispatch({type:"UNFOLLOW",payload:user._id})
      }else{
        await axios.put("/users/"+user._id+"/follow",{userId:currentUser._id})
        dispatch({type:"FOLLOW",payload:user._id})
      }
      
    } catch (error) {
      console.log(error);
    }
    setFollowed(!followed);
  }
  

const HomeRightbar=()=>{
  return(
  <>
        <div className="birthdayContainer">
        <img src="/assets/Birthdays.png" alt="" className="birthdayImg" />
        <span className="birthdayText"><b> Khadija Mdhaffar </b> and <b> 3 other friends </b> have a birthday today</span>
      </div>
      <img src="assets/ad.jpg" alt="" className="rightbarAd" />
      <h4 className="rightbarTitle">Online Friends</h4>
      <ul className="rightbarFriendList">
        {
          Users.map((u)=>
          <Online key={u.id} user={u} />
          )
        }

      </ul>
  </>
)}

const ProfileRightbar=()=>{
  return(
    <>
  {user.userName!==currentUser.userName &&(
    <button className="rightbarFollowButton" onClick={handleClick} >
      {followed?"Unfollow":"Follow"}
      {followed?<Remove/>:<Add/>}
    </button>
  )}
  <h4 className="rightbarTitle">User Informations</h4>
  <div className="rightbarInfo">
  <div className="rightbarInfoItem">
      <span className="rightbarInfoKey">City :</span>
      <span className="rightbarInfoValue">{user.city} </span>
    </div>
    <div className="rightbarInfoItem">
      <span className="rightbarInfoKey">From :</span>
      <span className="rightbarInfoValue">{user.from} </span>
    </div>
    <div className="rightbarInfoItem">
      <span className="rightbarInfoKey">Relationship :</span>
      <span className="rightbarInfoValue">{user.relationship===1?"Single":user.relationship===2?"Married":"Other"} </span>
    </div>
  </div>
  <h4 className="rightbarTitle">Friends</h4>
  <div className="rightbarFollowings">
    {friends.map((friend) => (
      <Link to={"/profile/"+friend.userName} key={friend._id} style={{textDecoration:"none"}} >
    <div className="rightbarFollowing">
      <img src={friend.profilePicture?PF+friend.profilePicture:PF+"/person/noAvatar.jpg"} 
      alt="" 
      className="rightbarFollowingImg" />
      <span className="rightbarFollowingName">{friend.userName}</span>
    </div>
    </Link>
    ))}

  </div>

  </>
    )
}

  return <div className="rightbar">
    <div className="rightbarWrapper">
      {user?<ProfileRightbar/>:<HomeRightbar/>}
    </div>
  </div>;
};


