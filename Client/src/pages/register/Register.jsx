import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import web3 from '../../web3'; // Make sure you have the web3 instance imported
import userManagerInstance from '../../contractInstance'; // Your contract instance path
import "./register.scss";
import { initializeContracts } from '../../contractInstance';

const Register = () => {
  const [username, setUsername] = useState('');
  const [profileData, setProfileData] = useState(''); // Replaces the email field for now
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(''); // For feedback messages
  const [contractInstances, setContractInstances] = useState({});
  useEffect(() => {
    const fetchContracts = async () => {
        const instances = await initializeContracts();
        console.log('Contract instances:', instances);  // Log it here
        setContractInstances(instances);
    };

    fetchContracts();
}, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Inside handleSubmit, contractInstances:', contractInstances);  // Log it here

    setLoading(true);
    try {
      const accounts = await web3.eth.getAccounts();
      
     console.log(accounts[0])
      if (!contractInstances.contract1) {
        throw new Error("Contract instance not available");
    }
      // await userManagerInstance.methods.registerUser(username, profileData).send({ from: accounts[0] });
      await contractInstances.contract1.methods.registerUser(username, profileData).send({ from: accounts[0] });

      setMessage('Successfully registered!');
    } catch (err) {
      console.error("Error:", err.message);
      setMessage(err.message);
    }
    setLoading(false);
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          {/*... existing code ...*/}
        </div>
        <div className="right">
          <h1>Register</h1>
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="text" placeholder="Profile Data" value={profileData} onChange={e => setProfileData(e.target.value)} />
            {/* Skipped password as Ethereum uses private keys. If you need authentication beyond signing transactions, consider additional measures. */}
            <button disabled={loading} type="submit">{loading ? 'Registering...' : 'Register'}</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
    </div>
  );
};

export default Register;
