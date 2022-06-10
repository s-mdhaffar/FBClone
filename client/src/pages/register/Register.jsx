import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import "./register.css"

export default function Register() {

  const userName = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const history=useHistory()

  const handleSubmit= async(e)=>{
    e.preventDefault();
    if(passwordAgain.current.value !== password.current.value){
      passwordAgain.current.setCustomValidity("Passwords don't match")
    } else{
      const user = {
        userName:userName.current.value,
        email:email.current.value,
        password:password.current.value
      };
      try {
        await axios.post("/auth/register",user)
        history.push("/login")
      } catch (error) {
        console.log(error);
      }
    }
  }

  return <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">HediBook</h3>
        <span className="loginDesc">Welcome to HediBook</span>
        <img src="/assets/mst.jpg" alt="" className="loginMst" />
      </div>
      <div className="loginRight">
        <form className="loginBoxRight" onSubmit={handleSubmit} >
          <input placeholder="FullName" 
          required 
          ref={userName} 
          className="loginInput" />
          <input placeholder="Email" 
          type="email" 
          required 
          ref={email} 
          className="loginInput" />
          <input placeholder="Password" 
          type="password" 
          minLength="6" 
          required 
          ref={password} 
          className="loginInput" />
          <input placeholder="Re-Write Password" 
          type="password" 
          minLength="6" 
          required 
          ref={passwordAgain} 
          className="loginInput" />
          <button className="loginButton" type="submit" >Sign Up</button>
          <Link to="/login">
            <button className="loginRegisterButton">Log into your Account</button>
          </Link>
        </form>
      </div>
    </div>
  </div>;
}
