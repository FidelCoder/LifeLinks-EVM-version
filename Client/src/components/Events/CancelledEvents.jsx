import React from 'react';
import './CancelledEvents.scss';

const CancelledEvents = () => {
    return (
        <div className="cancelled-events">
            <h3>Cancelled Events</h3>
            <ul>
                <li>
                    <span className="event-date">2021-07-10</span>
                    <span className="event-title">Music Mania 2021</span>
                    <span className="event-description">The biggest music event of the year, unfortunately cancelled.</span>
                </li>
                <li>
                    <span className="event-date">2021-05-20</span>
                    <span className="event-title">Sports Carnival</span>
                    <span className="event-description">An athletic event showcasing talents from different regions, sadly not happening this year.</span>
                </li>
                <li>
                    <span className="event-date">2021-08-15</span>
                    <span className="event-title">Gaming Expo</span>
                    <span className="event-description">A meetup for all gaming enthusiasts, cancelled due to unforeseen reasons.</span>
                </li>
            </ul>
        </div>
    );
};

export default CancelledEvents;
