// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./NFTTicketing.sol";
import "./EventManagement.sol";
import "./LINKCoins.sol";

contract AttendanceValidation {
    TicketingNFT private ticketingNFT;
    EventManagement private eventManagement;
    LINKCoins private linkCoins;

    mapping(bytes32 => bool) public redeemedQRs; // To ensure a QR code isn't redeemed more than once

    constructor(address _ticketingNFTAddress, address _eventManagementAddress, address _linkCoinsAddress) {
        ticketingNFT = TicketingNFT(_ticketingNFTAddress);
        eventManagement = EventManagement(_eventManagementAddress);
        linkCoins = LINKCoins(_linkCoinsAddress);
    }

    function generateQRCode(uint256 ticketId) external view returns (bytes32) {
        require(ticketingNFT.validateTicketOwnership(ticketId), "Caller does not own the ticket");
        
        // Simple QR code generation based on keccak256 hash of ticketId and user's address
        return keccak256(abi.encodePacked(ticketId, msg.sender));
    }

    
    function validateAttendanceByQR(bytes32 qrCode, uint256 eventId) external returns (bool) {
    require(!redeemedQRs[qrCode], "QR Code has already been validated");
    
    // Check if the QR code corresponds to any valid ticket for the event
    bool isValid = false;
    uint256 totalTickets = ticketingNFT.totalSupply();
    for (uint256 i = 0; i < totalTickets; i++) {
        if (keccak256(abi.encodePacked(i, ticketingNFT.ownerOf(i))) == qrCode) {
            (uint256 eventIdFromTicket, , , ) = ticketingNFT.tickets(i);  // Extract eventId from the struct
            if (eventIdFromTicket == eventId) {
                isValid = true;
                break;
            }
        }
    }

    if (isValid) {
        redeemedQRs[qrCode] = true;
    }

    return isValid;
}






    function rewardLinkCoins(address to, uint256 amount) external {
        // This can be modified to have restrictions, e.g., only callable by certain addresses or based on certain conditions
        linkCoins.transfer(to, amount);  // Assuming LINKCoins contract has a simple transfer function
    }
}
