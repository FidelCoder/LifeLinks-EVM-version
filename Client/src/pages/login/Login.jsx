import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";  // Notice the change here
import web3 from "../../web3"; 
import { initializeContracts } from "../../contractInstance";
import { AuthContext } from "../../context/authContext";
import "./login.scss";

const Login = () => {
  const navigate = useNavigate();   // Notice the change here
  const [error, setError] = useState(null);
  
  const { login } = useContext(AuthContext);

  const handleLogin = async () => {
    try {
      // Prompt user to connect their Ethereum wallet
      const accounts = await web3.eth.getAccounts();
      if (!accounts.length) {
        setError("Please connect your Ethereum wallet.");
        return;
      }

      const userAddress = accounts[0];
      
      const instances = await initializeContracts();
      if (!instances.contract1) {
        setError("Failed to initialize contract.");
        return;
      }

      // Check if user is registered
      const isRegistered = await instances.contract1.methods.isUserRegistered(userAddress).call();

      if (!isRegistered) {
        setError("You are not registered. Please register first.");
        return;
      }

      // If everything is fine, login (here, you can set any local context/session state for the authenticated user)
      login();
      navigate("/profile");   // Notice the change here - using navigate instead of history.push

    } catch (err) {
      console.error("Login error:", err);
      setError(err.message || "An error occurred during login.");
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to="/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          {error && <div className="error">{error}</div>}
          <button onClick={handleLogin}>Login with Ethereum Wallet</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
