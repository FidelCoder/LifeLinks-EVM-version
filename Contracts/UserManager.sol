// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserManager {

    // Events
    event UserRegistered(address indexed userAddress, uint256 userId);
    event UserProfileUpdated(address indexed userAddress, uint256 userId);
    event UserPrivacySettingsUpdated(address indexed userAddress, uint256 userId);
    
    // Structs
    struct User {
        string username;
        string profileData;  // Can be a JSON string or IPFS hash pointing to more detailed data.
        bool isPrivate;      // Privacy setting: true for private, false for public.
        bool isRegistered;   // Helps with existence checks.
    }

    // State variables
    mapping(address => User) public users;
    uint256 public userCount;

    // Register a new user
    function registerUser(string memory _username, string memory _profileData) external {
        require(!users[msg.sender].isRegistered, "User already registered.");
        
        userCount++;
        User storage newUser = users[msg.sender];
        
        newUser.username = _username;
        newUser.profileData = _profileData;
        newUser.isPrivate = false;          // Default privacy setting.
        newUser.isRegistered = true;

        emit UserRegistered(msg.sender, userCount);
    }

    function isUserRegistered(address _userAddress) external view returns (bool) {
    return users[_userAddress].isRegistered;
    }


    // Update user profile
    function updateProfile(string memory _newProfileData) external {
        require(users[msg.sender].isRegistered, "User not registered.");
        
        users[msg.sender].profileData = _newProfileData;

        emit UserProfileUpdated(msg.sender, userCount);
    }

    // Set privacy settings
    function setPrivacySettings(bool _isPrivate) external {
        require(users[msg.sender].isRegistered, "User not registered.");
        
        users[msg.sender].isPrivate = _isPrivate;

        emit UserPrivacySettingsUpdated(msg.sender, userCount);
    }

    // Get user details (This is public due to the public mapping, but included here for clarity.)
    function getUserDetails(address _userAddress) external view returns (User memory) {
        require(users[_userAddress].isRegistered, "User not registered.");
        
        return users[_userAddress];
    }
}
