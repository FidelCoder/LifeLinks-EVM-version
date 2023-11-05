import React from 'react';

const ProcessedPaymentsList = ({ events }) => (
    <ul className="processed-payments-list">
        {events.map(event => (
            <li key={event.id}>
                <span className="event-title">{event.title}</span>
                <span className="revenue">
                    Revenue: ${
                        (event.regularTicketsSold * event.regularTicketPrice) +
                        (event.vipTicketsSold * event.vipTicketPrice) +
                        (event.coupleTicketsSold * event.coupleTicketPrice)
                    }
                </span>
            </li>
        ))}
    </ul>
);

export default ProcessedPaymentsList;
