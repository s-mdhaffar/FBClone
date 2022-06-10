import { format } from "timeago.js";
import "./message.css";

export default function Message({message,own}) {
    return <div className={own?"message":"message own"}>
        <div className="messageTop">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDWrIiYIAdOLTJ5Ql5YtMUvL3y3kK0Vh5JXQ&usqp=CAU" alt="" className="messageImg" />
            <p className="messageText">{message.text}</p>
        </div>
        <div className="messageBottom">{format(message.createdAt)}</div>
    </div>;
}
