import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./DAOLogin.scss";

const DAOLogin = () => {
  const { login } = useContext(AuthContext);

  const handleLogin = () => {
    login();
  };

  return (
    <div className="daoLogin">
      <div className="card">
        <div className="left">
          <h1>LifeLinks DAO.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account with LifeLinks DAO?</span>
          <Link to="/daoReg"> {/* Change the route if necessary */}
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>DAO Login</h1>
          <form>
            <input type="text" placeholder="Username" />
            <input type="password" placeholder="Password" />
            <button onClick={handleLogin}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DAOLogin;
