// SPDX-License-Identifier: MIT
pragma solidity ^0.8.22;

import "./UserManager.sol";
import "./OrganizationManagement.sol";
import "./NFTTicketing.sol"; // Assuming NFTTicketing is the correct contract name
import "./LINKCoins.sol"; // Assuming LINKCoins is the correct contract name

contract EventManagement {
    struct Event {
        uint256 eventId;
        address creator; // can be an individual user or organization
        string name;
        string description;
        uint256 date;  // using Unix timestamp for date
        uint256 ticketPrice;  // can be 0 for free events
        bool isDeleted;
    }
    
    uint256 private eventIdCounter = 0;
    mapping(uint256 => Event) private events;
    
    UserManager private userManagementContract;
    OrganizationManagement private organizationManagementContract;
    TicketingNFT private nftTicketingContract;
    LINKCoin private linkCoinsContract;
    
    modifier onlyRegisteredEntities() {
        require(
            userManagementContract.isUserRegistered(msg.sender) || 
            organizationManagementContract.isOrganizationRegistered(msg.sender),
            "Only registered users or organizations can perform this action"
        );
        _;
    }
    
    constructor(
        address _userManagementAddress, 
        address _organizationManagementAddress,
        address _nftTicketingAddress,
        address _linkCoinsAddress
    ) {
        userManagementContract = UserManager(_userManagementAddress);
        organizationManagementContract = OrganizationManagement(_organizationManagementAddress);
        nftTicketingContract = TicketingNFT(_nftTicketingAddress);
        linkCoinsContract = LINKCoin(_linkCoinsAddress);
    }

    function createEvent(string memory _name, string memory _description, uint256 _date, uint256 _ticketPrice) external onlyRegisteredEntities returns(uint256) {
        eventIdCounter++;
        events[eventIdCounter] = Event(eventIdCounter, msg.sender, _name, _description, _date, _ticketPrice, false);
        return eventIdCounter;
    }

    function updateEvent(uint256 _eventId, string memory _name, string memory _description, uint256 _date, uint256 _ticketPrice) external onlyRegisteredEntities {
        require(events[_eventId].creator == msg.sender, "Only the event creator can update this event");
        require(!events[_eventId].isDeleted, "This event has been deleted");
        
        events[_eventId].name = _name;
        events[_eventId].description = _description;
        events[_eventId].date = _date;
        events[_eventId].ticketPrice = _ticketPrice;
    }
    
    function deleteEvent(uint256 _eventId) external onlyRegisteredEntities {
        require(events[_eventId].creator == msg.sender, "Only the event creator can delete this event");
        events[_eventId].isDeleted = true;
    }

    function getEventDetails(uint256 _eventId) external view returns(Event memory) {
        require(!events[_eventId].isDeleted, "This event has been deleted");
        return events[_eventId];
    }

    function attendEvent(uint256 _eventId) external {
        // The logic here is kept the same as before
        require(
            userManagementContract.isUserRegistered(msg.sender) || 
            organizationManagementContract.isOrganizationRegistered(msg.sender),
            "Only registered users or organizations can attend events"
        );
        require(!events[_eventId].isDeleted, "This event has been deleted");
        if (events[_eventId].ticketPrice > 0) {
            // If it's a paid event, transfer LINKCoins to the event creator
            require(linkCoinsContract.transferFrom(msg.sender, events[_eventId].creator, events[_eventId].ticketPrice), "Payment failed.");
        }
        // Mint NFT ticket for the attendee
        nftTicketingContract.mintTicket(msg.sender, _eventId);
    }
}
