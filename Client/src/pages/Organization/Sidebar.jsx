import React from 'react';
import './Sidebar.scss';

const Sidebar = () => {
    return (
        <div className="sidebar">
            <h4>Menu</h4>
            <ul>
                <li><a href="/orgDashboard" className="active">Dashboard</a></li>
                <li><a href="/events">Events</a></li>
                <li><a href="/payments">Ticket Sales</a></li>
                <li><a href="#">Announcements</a></li>
                <li><a href="#">Settings</a></li>
            </ul>
        </div>
    );
};

export default Sidebar;
