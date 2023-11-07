import React from 'react';
import './ProposedEvents.scss';

const ProposedEvents = () => {
    return (
        <div className="proposed-events">
            <h3>Proposed Events</h3>
            <ul>
                <li>
                    <span className="event-date">2023-02-20</span>
                    <span className="event-title">Tech Vision 2023</span>
                    <span className="event-description">An in-depth look into the future of technology.</span>
                </li>
                <li>
                    <span className="event-date">2023-03-25</span>
                    <span className="event-title">Artistic Waves</span>
                    <span className="event-description">A modern art exhibition proposing new-age artistic expressions.</span>
                </li>
                <li>
                    <span className="event-date">2023-04-15</span>
                    <span className="event-title">Dance Utopia</span>
                    <span className="event-description">A proposal for an international dance festival celebrating diverse dance forms.</span>
                </li>
                <li>
                    <span className="event-date">2023-05-10</span>
                    <span className="event-title">Eco Fest</span>
                    <span className="event-description">A proposed event focusing on sustainable living and eco-friendly innovations.</span>
                </li>
            </ul>
        </div>
    );
};

export default ProposedEvents;
