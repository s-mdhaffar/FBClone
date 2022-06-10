import "./post.css";
import { MoreVert }from "@mui/icons-material"
import { useContext, useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { format } from "timeago.js"
import { AuthContext } from "../../context/AuthContext";

export default function Post({post}) {
    const [like, setLike] = useState(post.likes.length);
    const [isliked, setIsLiked] = useState(false);
    const [user, setUser] = useState({});

    const {user:currentUser} = useContext(AuthContext);
    const PF=process.env.REACT_APP_PUBLIC_FOLDER;

    useEffect(() => {
        const fetchUser = async () => {
        const res = await axios.get(`/users?userId=${post.userId}`);
        setUser(res.data)
        };
        fetchUser();
        }, [post.userId]); 

    useEffect(() => {
        (setIsLiked(post.likes.includes(currentUser._id)))
        
    }, [post.likes,currentUser._id]);
    

    const handleLike=()=>{
        try {
            axios.put("/posts/"+post._id+"/like",{userId:currentUser._id})
        } catch (error) {
            console.log(error);
        }
        isliked?setLike(like-1):setLike(like+1);
        setIsLiked(!isliked)
    }

    return <div className="post">
        <div className="postWrapper">
            <div className="postTop">
                <div className="postTopLeft">
                    <Link to={`profile/${user.userName}`}>
                    <img src={user.profilePicture?PF+user.profilePicture: PF+"person/noAvatar.jpg"} alt="" className="postProfileImg" />
                    </Link>
                    <span className="userName">{user.userName}</span>
                    <span className="postDate">{format(user.createdAt)}</span>
                </div>
                <div className="postTopRight">
                    <MoreVert/>
                </div>
            </div>
            <div className="postCenter">
                <span className="postText">{post?.desc}</span>
                <img src={PF+post.img} alt="" className="postImg" />
            </div>
            <div className="postBottom">
                <div className="postBottomLeft">
                    <img className="fbIcon" src={`${PF}like.png`} alt="" onClick={handleLike} />
                    <img className="fbIcon" src={`${PF}heart.png`} alt="" onClick={handleLike} />
                    <span className="postLikeCounter">{like} Peoples liked it!</span>
                </div>
                <div className="postBottomRight">
                    <span className="postCommentText">{post.comment} Comments</span>
                </div>
            </div>
        </div>
    </div>;
}
