import React, { useState, useEffect } from 'react';
import web3 from './../../web3'; // Assuming this is the correct path to your web3 instance
import { initializeContracts } from './../../contractInstance'; // Assuming this is the correct path to your initializeContracts function

function EventPage() {
  const [contract, setContract] = useState(null);
  const [accountAddress, setAccountAddress] = useState(null); // To store the user's Ethereum address
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    ticketPrice: ''
  });

  useEffect(() => {
    async function init() {
      try {
        // Fetch the connected account
        const accounts = await web3.eth.getAccounts();
        if (accounts.length > 0) {
          setAccountAddress(accounts[0]);
        }

        // Initialize contracts
        const contracts = await initializeContracts();
        setContract(contracts['Eventmanagement']);
      } catch (error) {
        console.error("Error initializing:", error);
      }
    }
    init();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createEvent = async () => {
    if (!contract || !accountAddress) {
        console.error("Contract not initialized or account address not found.");
        return;
    }

    const { name, description, date, ticketPrice } = formData;
    
    // Convert date string to Unix timestamp
    const timestamp = new Date(date).getTime() / 1000; // Convert from milliseconds to seconds
    
    try {
        await contract.methods.createEvent(name, description, timestamp, ticketPrice).send({ from: accountAddress });
        // You can add a function to refresh event list or give some success feedback here
    } catch (error) {
        console.error("Error creating event:", error);
    }
};


  return (
    <div>
      <h1>Event Management</h1>
      
      {/* Input for Event Name */}
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Event Name"
      />
      
      {/* Input for Event Description */}
      <input
        type="text"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        placeholder="Event Description"
      />
      
      {/* Input for Event Date */}
      <input
        type="date"
        name="date"
        value={formData.date}
        onChange={handleInputChange}
        placeholder="Event Date"
      />
      
      {/* Input for Ticket Price */}
      <input
        type="number"
        name="ticketPrice"
        value={formData.ticketPrice}
        onChange={handleInputChange}
        placeholder="Ticket Price"
      />
      
      {/* Button to Create Event */}
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
}

export default EventPage;
