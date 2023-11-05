import React, { useEffect, useState } from "react";
import "./profile.scss";
import web3 from "../../web3"; 
import { initializeContracts } from "../../contractInstance";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';


const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [userAddress, setUserAddress] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getActiveAccount = async () => {
      try {
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0 && isMounted) {
          setUserAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Failed to fetch accounts:", error);
        if (isMounted) setError("Failed to fetch accounts. Please ensure your wallet is connected.");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    getActiveAccount();
    return () => { isMounted = false; };
  }, []);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      if (userAddress) {
        try {
          const instances = await initializeContracts();
          const isRegistered = await instances.contract1.methods.isUserRegistered(userAddress).call();
          if (!isRegistered) {
            if (isMounted) setUserData({ isRegistered: false });
            return;
          }
          const userDetails = await instances.contract1.methods.getUserDetails(userAddress).call();
          if (isMounted) setUserData(userDetails);
          
        } catch (error) {
          console.error("Error fetching user data:", error);
          if (isMounted) setError("Unable to fetch user data due to an error.");
        }
      }
    };

    fetchData();
    return () => { isMounted = false; };
  }, [userAddress]);

  const updateProfile = async (newProfileData) => {
    try {
      const instances = await initializeContracts();
      await instances.contract1.methods.updateProfile(newProfileData).send({ from: userAddress });
      setUserData(prev => ({ ...prev, profileData: newProfileData }));
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  const togglePrivacy = async () => {
    try {
      const instances = await initializeContracts();
      await instances.contract1.methods.setPrivacySettings(!userData.isPrivate).send({ from: userAddress });
      setUserData(prev => ({ ...prev, isPrivate: !prev.isPrivate }));
    } catch (err) {
      console.error("Error toggling privacy:", err);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!userData) return <div>Error: Unable to fetch user data. Please ensure your wallet is connected and refresh the page.</div>;
  if (!userData.isRegistered) return <div>You are not registered. Please <a href="/register">register here</a>.</div>;

  return (
    <div className="profile">
      <div className="coverPhoto">
        {/* Display cover photo here. You can add an image element */}
      </div>

      <div className="profileContainer">
        <div className="profileHeader">
          <div className="profilePic">
            {/* Placeholder for profile picture using an icon. You can replace it with an actual image if you have one */}
            <AccountCircleIcon style={{ fontSize: '100px' }} />
          </div>
          <div className="userName">{userData.username}</div>
        </div>

        <div className="profileDetails">
          <div className="bio">{userData.bio}</div>
          <div className="profileData">{userData.profileData}</div>

          <button 
    className="button editProfile" 
    onClick={() => {
        const newProfileData = prompt("Enter your new profile data:");
        if (newProfileData) updateProfile(newProfileData);
    }}
>
    Edit Profile
</button>

<button 
    className={`button ${userData.isPrivate ? 'setPublic' : 'setPrivate'}`} 
    onClick={togglePrivacy}
>
    {userData.isPrivate ? "Set Profile to Public" : "Set Profile to Private"}
</button>

        </div>

        {/* Replace this with your Posts component or any other relevant component */}
        {/* <Posts /> */}
      </div>
    </div>
  );
};

export default Profile;
