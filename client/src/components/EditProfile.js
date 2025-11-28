import React, { useEffect, useRef, useState } from 'react'
import TopNav from './TopNav';
import { useSelector } from 'react-redux';

function EditProfile() {
    let firstNameInputRef = useRef();
    let lastNameInputRef = useRef();
    let emailInputRef = useRef();
    let passwordInputRef = useRef();
    let mobileNoInputRef = useRef();
    let profilePicInputRef = useRef();

    let [profilePic, setProfilePic]= useState("https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png");

        let userDetails = useSelector(( store)=>{
        return store.userDetails;
    });
    
    useEffect (()=>{
        firstNameInputRef.current.value = userDetails.firstName;
        lastNameInputRef.current.value = userDetails.lastName;
        emailInputRef.current.value = userDetails.email;
        mobileNoInputRef.current.value = userDetails.mobileNo;
        setProfilePic(`/${userDetails.profilePic}`);
    }, []);

        let updateProfile = async()=>{
            let dataToSendFD = new FormData();
            dataToSendFD.append("firstName", firstNameInputRef.current.value);
            dataToSendFD.append("lastName", lastNameInputRef.current.value);
            dataToSendFD.append("email", emailInputRef.current.value);
            dataToSendFD.append("password", passwordInputRef.current.value);
            dataToSendFD.append("mobileNo", mobileNoInputRef.current.value);
            for(let i=0; i<profilePicInputRef.current.files.length; i++){
                dataToSendFD.append("profilePic", profilePicInputRef.current.files[i]);
            }
            
            let reqOptions = {  
            method: "PATCH",
            body: dataToSendFD
        };

        let JSONDataFromServer = await fetch("/updateProfile",reqOptions);
        let JSOData = await JSONDataFromServer.json();
        console.log(JSOData);
        alert(JSOData.msg);
    }

  return (
    <div>  
        <TopNav />   
        <form>
            <h2>Edit Profile</h2>
            <div>
                <label>First Name</label>
                <input ref={firstNameInputRef} placeholder='Enter your First Name'></input>
            </div>

            <div>
                <label>Last Name</label>
                <input ref={lastNameInputRef} placeholder='Enter your Last Name'></input>
            </div>

            <div>
                <label>Email</label>
                <input ref={emailInputRef} placeholder='ex: abc123@gmail.com' readOnly></input>
            </div>

            <div>
                <label>Password</label>
                <input ref={passwordInputRef} placeholder='Enter minimum 8 characters'></input>
            </div>

            <div>
                <label>Mobile No.</label>
                <input ref={mobileNoInputRef} placeholder='Enter your Mobile Number'></input>
            </div>

            <div>
                <label>Profile Pic</label>
                <input ref={profilePicInputRef} type="file" onChange={(e)=>{
                    let selectedPath = URL.createObjectURL(e.target.files[0]);
                    setProfilePic(selectedPath);
                }} ></input>
            </div>
            <img src={profilePic} alt='profilePic'></img>
            <div>

            <button type='button' onClick={()=>{
                updateProfile();
            }}>Update Profile</button>
            </div>
        </form>
    </div>
  )
}

export default EditProfile;