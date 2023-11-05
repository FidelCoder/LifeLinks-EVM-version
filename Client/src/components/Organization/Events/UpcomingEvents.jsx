import React from 'react';
import './UpcomingEvents.scss';

const UpcomingEvents = () => {
    // Dummy Data
    const events = [
        {
            date: '2023-10-01',
            title: 'Music Fest 2023',
            description: 'Join us for an evening of classical tunes.',
            vipTicketsSold: 25,
            vipTotal: 50,
            regularTicketsSold: 100,
            regularTotal: 300,
            coupleTicketsSold: 45,
            coupleTotal: 100,
            totalTickets: 450,
            expectedRevenue: 5000
        },
        // ... Add more dummy event data as you wish
    ];

    return (
        <div className="upcoming-events">
            <h3>Upcoming Events</h3>
            <ul>
                {events.map((event, index) => (
                    <li key={index}>
                        <div className="event-date">{event.date}</div>
                        <div className="event-title">{event.title}</div>
                        <div className="event-description">{event.description}</div>
                        <div className="event-ticket-info">
                            <span>VIP: {event.vipTicketsSold} / {event.vipTotal}</span>
                            <span>Regular: {event.regularTicketsSold} / {event.regularTotal}</span>
                            <span>Couples: {event.coupleTicketsSold} / {event.coupleTotal}</span>
                            <span>Total Tickets: {event.vipTicketsSold + event.regularTicketsSold + event.coupleTicketsSold} / {event.totalTickets}</span>
                            <span>Expected Revenue: ${event.expectedRevenue}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UpcomingEvents;
