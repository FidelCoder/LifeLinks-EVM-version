// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./LINKCoins.sol";
import "./EventManagement.sol";  // Only if we need to verify attendance. 
import "./UserManager.sol";  // To verify if the users are registered.

contract IncentiveDistribution {
    
    LINKCoins private linkCoinsContract;
    EventManagement private eventManagementContract;  // Optional: Only if we verify event attendance.
    UserManager private userManagerContract;

    uint256 private rewardForEventAttendance = 10;  // Assuming 10 LINKCoins for event attendance.
    uint256 private rewardForSuccessfulCatchUp = 5;  // Assuming 5 LINKCoins for successful catch-up.

    constructor(address _linkCoinsAddress, address _eventManagementAddress, address _userManagerAddress) {
        linkCoinsContract = LINKCoins(_linkCoinsAddress);
        eventManagementContract = EventManagement(_eventManagementAddress);
        userManagerContract = UserManager(_userManagerAddress);
    }

    modifier onlyRegisteredUser() {
        require(userManagerContract.isUserRegistered(msg.sender), "Only registered users can claim rewards");
        _;
    }

    function distributeForEventAttendance(uint256 _eventId) external onlyRegisteredUser {
        // Optional: Verify if the user attended the event.
        // require(eventManagementContract.userAttendedEvent(msg.sender, _eventId), "User did not attend the specified event");

        require(linkCoinsContract.transferFrom(address(this), msg.sender, rewardForEventAttendance), "Reward distribution failed.");
    }

    function distributeForSuccessfulCatchUp() external onlyRegisteredUser {
        require(linkCoinsContract.transferFrom(address(this), msg.sender, rewardForSuccessfulCatchUp), "Reward distribution failed.");
    }
}
