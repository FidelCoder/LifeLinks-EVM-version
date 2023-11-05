import React from 'react';

const EventList = ({ events, onProcessPayment }) => (
    <ul className="event-list">
        {events.map(event => (
            <li key={event.id}>
                <span className="event-title">{event.title}</span>
                <span className="regular-tickets">Regular: {event.regularTicketsSold}</span>
                <span className="vip-tickets">VIP: {event.vipTicketsSold}</span>
                <span className="couple-tickets">Couple: {event.coupleTicketsSold}</span>
                <span className="revenue">
                    Revenue: ${
                        (event.regularTicketsSold * event.regularTicketPrice) +
                        (event.vipTicketsSold * event.vipTicketPrice) +
                        (event.coupleTicketsSold * event.coupleTicketPrice)
                    }
                </span>
                {!event.paymentProcessed && (
                    <button onClick={() => onProcessPayment(event.id)}>
                        Mark Payment as Processed
                    </button>
                )}
            </li>
        ))}
    </ul>
);

export default EventList;
