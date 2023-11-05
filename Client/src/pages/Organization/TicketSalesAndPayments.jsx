import React, { useState } from 'react';
import Sidebar from './Sidebar';
import EventList from '../../components/Organization/Events/EventList';
import ProcessedPaymentsList from '../../components/Organization/ProcessedPaymentsList';
import './TicketSalesAndPayments.scss';

const TicketSalesAndPayments = () => {
    const [eventsData, setEventsData] = useState([
        // You can place your initial events data here or fetch from an API
        // Example:
        // {
        //     id: 1,
        //     title: 'Event Name',
        //     regularTicketsSold: 50,
        //     vipTicketsSold: 20,
        //     coupleTicketsSold: 10,
        //     regularTicketPrice: 50,
        //     vipTicketPrice: 100,
        //     coupleTicketPrice: 150,
        //     paymentProcessed: false
        // }
    ]);

    const [processedPayments, setProcessedPayments] = useState([]);

    const handleProcessPayment = (eventId) => {
        // Filter out the event whose payment is being processed
        const eventToProcess = eventsData.find(event => event.id === eventId);
        if (eventToProcess) {
            eventToProcess.paymentProcessed = true;
            setProcessedPayments([...processedPayments, eventToProcess]);

            // Filter out processed event from eventsData
            const updatedEvents = eventsData.filter(event => event.id !== eventId);
            setEventsData(updatedEvents);
        }
    };

    return (
        <div className="ticket-sales-and-payments">
            <Sidebar />
            <div className="content">
                <h2>Ticket Sales and Payments</h2>
                <h3>Events</h3>
                <EventList 
                    events={eventsData.filter(event => !event.paymentProcessed)}
                    onProcessPayment={handleProcessPayment}
                />

                <h3>Processed Payments</h3>
                <ProcessedPaymentsList events={processedPayments} />
            </div>
        </div>
    );
};

export default TicketSalesAndPayments;
