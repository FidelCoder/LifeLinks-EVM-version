// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TicketingNFT is ERC721Enumerable, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _ticketIds;

    struct Ticket {
        uint256 eventId;
        address currentOwner;
        bool forSale;
        uint256 price;
    }

    mapping(uint256 => Ticket) public tickets;

    constructor() ERC721("TicketingNFT", "TKNFT") Ownable(msg.sender) {}


    function mintTicket(address to, uint256 eventId) external onlyOwner returns (uint256) {
        _ticketIds.increment();
        uint256 newTicketId = _ticketIds.current();
        _mint(to, newTicketId);
        tickets[newTicketId] = Ticket(eventId, to, false, 0);
        return newTicketId;
    }

    function setTicketForSale(uint256 ticketId, uint256 price) external {
        require(ownerOf(ticketId) == msg.sender, "Only the owner can set the ticket for sale");
        tickets[ticketId].forSale = true;
        tickets[ticketId].price = price;
    }

    function buyTicketFromSale(uint256 ticketId) external payable nonReentrant {
        Ticket storage ticket = tickets[ticketId];
        require(ticket.forSale, "Ticket is not for sale");
        require(msg.value == ticket.price, "Ether sent is not correct");

        ticket.forSale = false;
        address seller = ownerOf(ticketId);
        payable(seller).transfer(msg.value);

        _transfer(seller, msg.sender, ticketId);
        ticket.currentOwner = msg.sender;
    }

    function validateTicketOwnership(uint256 ticketId) external view returns (bool) {
        return ownerOf(ticketId) == msg.sender;
    }

    function burnTicket(uint256 ticketId) external {
        require(ownerOf(ticketId) == msg.sender, "Only the owner can burn the ticket");
        _burn(ticketId);
        delete tickets[ticketId];
    }
}
