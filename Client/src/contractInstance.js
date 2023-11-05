import web3 from './web3';
import abi from './ABI/UserManagerABI'
import soABI from './ABI/SocialInteractionsABI'
import EventManagement from './ABI/EventManagementABI'


async function initializeContracts() {
    const contractInstances = {};
    contractInstances['contract1'] = new web3.eth.Contract(abi, '0x95D09403e67FaBd9C77C961170678aA7e868b524');
    contractInstances['contract2'] = new web3.eth.Contract(soABI, '0x36c46a7Da67d32b4DCc869a0C875D1030deb8153');
    contractInstances['Eventmanagement'] = new web3.eth.Contract(EventManagement, '0x16858061dD49738992FD6702707CE8d77bdA23dE');
    return contractInstances;
}

export { initializeContracts };
