// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract OrganizationManagement {

    struct Organization {
        string orgName;
        string orgProfileData;
        bool isRegistered;
    }

    mapping(address => Organization) public organizations;

    event OrganizationRegistered(address indexed orgAddress, string orgName);
    event OrganizationProfileUpdated(address indexed orgAddress, string newProfileData);

    /**
     * @dev Register a new organization.
     * @param _orgName Name of the organization.
     * @param _orgProfileData Additional profile data for the organization.
     */
    function registerOrganization(string memory _orgName, string memory _orgProfileData) external {
        require(!organizations[msg.sender].isRegistered, "Organization already registered.");

        Organization memory newOrg = Organization({
            orgName: _orgName,
            orgProfileData: _orgProfileData,
            isRegistered: true
        });

        organizations[msg.sender] = newOrg;

        emit OrganizationRegistered(msg.sender, _orgName);
    }

    function isOrganizationRegistered(address _orgAddress) external view returns (bool) {
    return organizations[_orgAddress].isRegistered;
    }


    /**
     * @dev Update the profile data of an organization.
     * @param _newProfileData Updated profile data for the organization.
     */
    function updateOrgProfile(string memory _newProfileData) external {
        require(organizations[msg.sender].isRegistered, "Organization not registered.");

        organizations[msg.sender].orgProfileData = _newProfileData;

        emit OrganizationProfileUpdated(msg.sender, _newProfileData);
    }

    /**
     * @dev Get the details of an organization.
     * @param _orgAddress Ethereum address of the organization.
     */
    function getOrgDetails(address _orgAddress) external view returns (string memory orgName, string memory orgProfileData) {
        require(organizations[_orgAddress].isRegistered, "Organization not registered.");

        Organization memory org = organizations[_orgAddress];
        return (org.orgName, org.orgProfileData);
    }

}
