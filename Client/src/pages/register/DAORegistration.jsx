import { Link } from "react-router-dom";
import "./DAORegistration.scss";

const DAORegistration = () => {
  return (
    <div className="dao-register">
      <div className="card">
        <div className="left">
          <h1>LifeLinks DAO Network.</h1>
          <p>
            Join our decentralized autonomous organization and contribute to the future.
          </p>
          <span>Already a member?</span>
          <Link to="/daoLogin">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register for LifeLinks DAO</h1>
          <form>
            <input type="text" placeholder="Full Name" />
            <input type="email" placeholder="Email" />
            <input type="text" placeholder="ID or Passport Number" />
            <input type="text" placeholder="Country" />
            <textarea placeholder="What do you do? (e.g. Developer, Designer, Researcher)"></textarea>
            <button>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default DAORegistration;
