// EventPage.jsx
import React, { useState, useEffect } from 'react';
import web3 from './../../web3'; // Correct path to your web3 instance
import { initializeContracts } from './../../contractInstance'; // Correct path to your initializeContracts function

function EventPage() {
  const [contracts, setContracts] = useState({});
  const [accountAddress, setAccountAddress] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    date: '',
    ticketPrice: ''
  });

  useEffect(() => {
    const init = async () => {
      try {
        // Fetch the connected account
        const accounts = await web3.eth.getAccounts();
        if (accounts.length === 0) throw new Error("No accounts found.");

        setAccountAddress(accounts[0]);

        // Initialize contracts
        const initializedContracts = await initializeContracts();
        setContracts(initializedContracts);
      } catch (error) {
        console.error("Error initializing:", error);
      }
    };

    init();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const createEvent = async () => {
    if (!contracts.EventManagement || !accountAddress) {
      console.error("Contract not initialized or account address not found.");
      return;
    }

    const { name, description, date, ticketPrice } = formData;
    const timestamp = Math.floor(new Date(date).getTime() / 1000); // Convert from milliseconds to seconds

    try {
      await contracts.EventManagement.methods.createEvent(name, description, timestamp, web3.utils.toWei(ticketPrice, 'ether')).send({ from: accountAddress });
      console.log("Event created successfully");
      // Refresh event list or provide feedback here
    } catch (error) {
      console.error("Error creating event:", error);
    }
  };

  return (
    <div>
      <h1>Event Management</h1>
      <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Event Name" />
      <input type="text" name="description" value={formData.description} onChange={handleInputChange} placeholder="Event Description" />
      <input type="date" name="date" value={formData.date} onChange={handleInputChange} />
      <input type="number" name="ticketPrice" value={formData.ticketPrice} onChange={handleInputChange} placeholder="Ticket Price" />
      <button onClick={createEvent}>Create Event</button>
    </div>
  );
}

export default EventPage;
