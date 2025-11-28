import React, { useEffect, useRef } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let navigate = useNavigate();
    let dispatch = useDispatch();

    useEffect(()=>{
        if (localStorage.getItem("token")) {
            // onValidateToken();
        }
        // if (localStorage.getItem("email")&& localStorage.getItem("password")) {
        // emailInputRef.current.value =localStorage.getItem("email");
        // passwordInputRef.current.value = localStorage.getItem("password");
        // loginUsingFD();
        // } 
    })

    let onValidateToken = async()=>{
            let dataToSendFD = new FormData();
            dataToSendFD.append("token",localStorage.getItem("token"))
            
            let reqOptions = {  
            method: "Post",
            body: dataToSendFD
        };

        let JSONDataFromServer = await fetch("/validateToken",reqOptions);
        let JSOData = await JSONDataFromServer.json();
        console.log(JSOData);
        alert(JSOData.msg);
        
        if (JSOData.status === "Success") {
        dispatch({type:"login",data:JSOData.data});
        navigate("/dashboard");
    } 
    }

    let loginUsingFD = async()=>{
            let dataToSendFD = new FormData();
            dataToSendFD.append("email", emailInputRef.current.value);
            dataToSendFD.append("password", passwordInputRef.current.value);
            
            let reqOptions = {  
            method: "Post",
            body: dataToSendFD
        };

        let JSONDataFromServer = await fetch("/login",reqOptions);
        let JSOData = await JSONDataFromServer.json();
        console.log(JSOData);
        alert(JSOData.msg);
        
        if (JSOData.status === "Success") {
            localStorage.setItem("token", JSOData.data.token);
            // localStorage.setItem("email",emailInputRef.current.value);
            // localStorage.setItem("password",passwordInputRef.current.value);
            dispatch({type:"login",data:JSOData.data});
        navigate("/dashboard");
    } 
    }

  return (
    <div>     
        <form>
            <h2>Login</h2>
            <div>
                <label>Email</label>
                <input ref={emailInputRef} placeholder='ex: abc123@gmail.com'></input>
            </div>

            <div>
                <label>Password</label>
                <input ref={passwordInputRef} placeholder='Enter minimum 8 characters'></input>
            </div>

            <div>
            <button type='button' onClick={()=>{
                loginUsingFD();
            }}>Login</button>
            </div>

            <br></br>
        <p>Don't have an account?<b> <Link to="/signup"> Sign Up</Link></b></p>
        </form>
    </div>
  )
}

export default Login