import "./online.css"

export default function Online({user}) {

    const PF=process.env.REACT_APP_PUBLIC_FOLDER;


  return <div>
        <li className="rightbarFriend">
            <div className="rightbarProfileContainer">
                <img src={PF+user.profilePicture} alt="" className="rightbarProfileImg" />
                <span className="rightbarOnline"></span>
            </div>
            <span className="rightbarUserName">{user.username}</span>
        </li>
</div>;
}
