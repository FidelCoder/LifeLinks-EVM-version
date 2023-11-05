import { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/authContext";
import "./OrganizationLogin.scss";

const OrganizationLogin = () => {
    const { login } = useContext(AuthContext);

    const handleLogin = () => {
        login();
    };

    return (
        <div className="organizationLogin">
            <div className="card">
                <div className="left">
                    <h1>LifeLinks Organization.</h1>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
                        alias totam numquam ipsa exercitationem dignissimos, error nam,
                        consequatur.
                    </p>
                    <span>Don't you have an account with LifeLinks Organization?</span>
                    <Link to="/organizationRegister"> {/* Adjust the route if necessary */}
                        <button>Register</button>
                    </Link>
                </div>
                <div className="right">
                    <h1>Organization Login</h1>
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

export default OrganizationLogin;
