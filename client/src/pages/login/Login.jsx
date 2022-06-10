import { useContext } from "react";
import { useRef } from "react";
import { loginCall } from "../../apiCalls";
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@mui/material"
import "./login.css"

export default function Login() {

const email  = useRef();
const password  = useRef();

const {isFetching,dispatch}=useContext(AuthContext)


const handleSubmit=(e)=>{
e.preventDefault()
loginCall({email:email.current.value,password:password.current.value},dispatch)
}

  return <div className="login">
    <div className="loginWrapper">
      <div className="loginLeft">
        <h3 className="loginLogo">HediBook</h3>
        <span className="loginDesc">Welcome to HediBook<br/>Connect with your friends and family</span>
      </div>
      <div className="loginRight">
        <form className="loginBox" onSubmit={handleSubmit} >
          <input placeholder="Email" 
          type="email" 
          required 
          className="loginInput" 
          ref={email} />
          <input placeholder="Password" 
          type="password" 
          required 
          minLength="6" 
          className="loginInput" 
          ref={password} />
          <button className="loginButton" disabled={isFetching} >{isFetching?(<CircularProgress color="inherit" size="20px" /> ):("Log In")}</button>
          <span className="loginForgot">Forgot Password?</span>
          <button className="loginRegisterButton">{isFetching?(<CircularProgress color="inherit" size="20px" />) :("Create a new Account")}</button>
        </form>
      </div>
    </div>
  </div>;
}
