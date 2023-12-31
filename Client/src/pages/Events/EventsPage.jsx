import React, { useState, useEffect } from 'react';
import Sidebar from '../Organization/Sidebar';
import UpcomingEvents from '../../components/Events/UpcomingEvents';
import PastEvents from '../../components/Events/PastEvents';
import CancelledEvents from '../../components/Events/CancelledEvents';
import ProposedEvents from '../../components/Events/ProposedEvents';
import './EventsPage.scss';
import EventPage from '../../components/Events/EventPage';

const EventsPage = () => {
    const [eventsData, setEventsData] = useState({
        upcoming: [],
        past: [],
        cancelled: [],
        proposed: []
    });

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        // Simulate fetching data.
        const fetchedData = {
            upcoming: [],
            past: [],
            cancelled: [],
            proposed: []
        };
        setEventsData(fetchedData);
    }, []);

    const handleEventSubmission = (event) => {
        event.preventDefault();
        setEventsData(prevData => ({ ...prevData, upcoming: [...prevData.upcoming] }));
        setShowModal(false);
    };

    return (
        <div className="events-page">
            <Sidebar />
            <div className="content">
                <h2>Events</h2>
                <EventPage />
                <div className="events-grid">
                    <UpcomingEvents events={eventsData.upcoming} />
                    <PastEvents events={eventsData.past} />
                    <CancelledEvents events={eventsData.cancelled} />
                    <ProposedEvents events={eventsData.proposed} />
                </div>

                
            </div>
        </div>
    );
};

export default EventsPage;
