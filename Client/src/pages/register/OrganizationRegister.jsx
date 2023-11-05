// OrganizationRegister.jsx
import { Link } from "react-router-dom";
import "./OrganizationRegister.scss";

const OrganizationRegister = () => {
  return (
    <div className="organizationRegister">
      <div className="card">
        <div className="left">
          <h1>LifeLinks Social for Organizations.</h1>
          <p>
            Create an organization account to manage collaborations, insights, and more.
          </p>
          <span>Already have an organization account?</span>
          <Link to="/orglogin">
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Organization Registration</h1>
          <form>
            <input type="text" placeholder="Organization Name" />
            <input type="text" placeholder="Organization Username" />
            <input type="email" placeholder="Organization Email" />
            <input type="password" placeholder="Password" />
            <input type="text" placeholder="Organization Type" />
            <input type="text" placeholder="Contact Number" />
            <button>Register Organization</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OrganizationRegister;
