import React, { useContext, useState, useEffect } from "react";
import Web3 from "web3";
import { AuthContext } from "../../context/authContext";
import { initializeContracts } from '../../contractInstance';
import "./share.scss";
import Image from "../../assets/img.png";
import Map from "../../assets/map.png";
import Friend from "../../assets/friend.png";

const Share = () => {
  const { currentUser } = useContext(AuthContext);

  const [web3, setWeb3] = useState(null);
  const [contractInstances, setContractInstances] = useState({});
  const [postText, setPostText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const [location, setLocation] = useState(""); 
  const [tags, setTags] = useState(""); 
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    // Initialize web3
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      window.ethereum.enable().catch(error => {
        // User denied account access
        console.error(error);
      });
    } else if (window.web3) {
      setWeb3(new Web3(window.web3.currentProvider));
    } else {
      setSuccessMessage("Please install an Ethereum wallet provider like MetaMask!");
    }

    // Initialize contracts
    (async () => {
      const instances = await initializeContracts();
      setContractInstances(instances);
    })();
  }, []);

  const composePost = () => {
    return `${postText}
            ${location ? `Location: ${location}` : ""}
            ${tags ? `Tags: ${tags}` : ""}`;
  };

  const sharePost = async () => {
    if (!web3) {
      return setSuccessMessage("Web3 is not initialized. Please check your Ethereum wallet connection.");
    }

    // if (!currentUser.ethereumAddress || !web3.utils.isAddress(currentUser.ethereumAddress)) {
    //   return setSuccessMessage("Please connect your Ethereum wallet or ensure your address is valid!");
    // }

    try {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const accounts = await web3.eth.getAccounts();
      const userAddress = accounts[0];

      // await contractInstances.contract2.methods.createPost(composePost()).send({ from: currentUser.ethereumAddress });
      await contractInstances.contract2.methods.createPost(composePost()).send({ from: userAddress, gas: 300000 });


      setSuccessMessage("Post was successful!");
      setTimeout(() => setSuccessMessage(""), 3000);
      resetFields();
    } catch (err) {
      console.error(err);
      setSuccessMessage("Failed to create the post. Please try again!");
    }
  };

  const resetFields = () => {
    setPostText("");
    setSelectedFile(null);
    setLocation("");
    setTags("");
  };


  return (
    <div className="share">
      {successMessage && <div className="success-message">{successMessage}</div>}
      <div className="container">
        <div className="top">
          <img src={currentUser.profilePic} alt="" />
          <input
            type="text"
            placeholder={`What's on your mind ${currentUser.name}?`}
            value={postText}
            onChange={e => setPostText(e.target.value)}
          />
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{ display: "none" }} onChange={e => setSelectedFile(e.target.files[0])} />
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            {selectedFile && <img src={URL.createObjectURL(selectedFile)} alt="Chosen" style={{ height: '150px' }} />}
            <div className="item">
              <img src={Map} alt="" />
              <input type="text" placeholder="Add Place" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            {location && <p>Location: {location}</p>}
            <div className="item">
              <img src={Friend} alt="" />
              <input type="text" placeholder="Tag Friends (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
            </div>
            {tags && <p>Tags: {tags.split(",").map(tag => tag.trim()).join(", ")}</p>}
          </div>
          <div className="right">
            <button onClick={sharePost}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
