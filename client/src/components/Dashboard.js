import React from 'react'
import TopNav from './TopNav'
import { useSelector } from 'react-redux'

function Dashboard() {
    let userDetails = useSelector((store)=>{
        return store.userDetails;
    })

    let onDeleteAccount = async()=>{
        let dataToSend = new FormData();
        dataToSend.append("email", userDetails.email);
        let reqOptions = {  
            method: "DELETE",
            body: dataToSend
        };
        let JSONData = await fetch("/deleteProfile", reqOptions);
        let JSOData = await JSONData.json();
        console.log(JSOData);
        alert(JSOData.msg);
    }
  return (
    <div>
        <TopNav></TopNav>
        <h1>Welcome to Dashboard</h1>
        <h2>Hello, {userDetails.firstName} {userDetails.lastName}!!</h2>
        <img src={`/${userDetails.profilePic}`} alt="Profile Pic"></img>
        <br></br>
        <button className='delButton' type= 'button' onClick={()=>{
            onDeleteAccount();
        }}>Delete Account</button>
    </div>
  )
}

export default Dashboard