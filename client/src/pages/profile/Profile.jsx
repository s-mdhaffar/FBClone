import axios from "axios";
import { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css"
import { useParams } from "react-router";

export default function Profile() {

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});
    const userName=useParams().userName

    useEffect(() => {
        const fetchUser = async () => {
        const res = await axios.get(`/users?userName=${userName}`);
        setUser(res.data)
        };
        fetchUser();
        }, [userName]); 


    return  <div>
                <Topbar />
                <div className="profile">
                    <Sidebar />
                    <div className="profileRight">
                        <div className="profileRightTop">
                            <div className="profileCover">
                                <img src={user.coverPicture?PF+user.coverPicture: PF+"person/noCover.jpg"} alt="" className="profileCoverImg" />
                                <img src={user.profilePicture?PF+user.profilePicture : PF+"person/noAvatar.jpg"} alt="" className="profileUserImg" />
                            </div>
                            <div className="profileInfo">
                                <h4 className="profileInfoName">{user.userName}</h4>
                                <span className="profileInfoDesc">{user.desc} </span>
                            </div>
                        </div>
                        <div className="profileRightBottom">
                            <Feed userName={userName} />
                            <Rightbar user={user} />
                        </div>
                    </div>
                </div>
            </div>;
}
