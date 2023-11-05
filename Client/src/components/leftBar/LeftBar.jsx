import "./leftBar.scss";
import { Link } from "react-router-dom"; // Import Link
import Friends from "../../assets/1.png";
import Groups from "../../assets/2.png";
import Market from "../../assets/3.png";
import Watch from "../../assets/4.png";
import Memories from "../../assets/5.png";
import Events from "../../assets/6.png";
import Gaming from "../../assets/7.png";
import Gallery from "../../assets/8.png";
import Videos from "../../assets/9.png";
import Messages from "../../assets/10.png";
import Tutorials from "../../assets/11.png";
import Courses from "../../assets/12.png";
import Fund from "../../assets/13.png";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";

const LeftBar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user">
            <img src={currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
          </div>
          <div className="item">
            <img src={Friends} alt="" />
            <Link to="/friends"><span>Friends</span></Link>
          </div>
          <div className="item">
            <img src={Groups} alt="" />
            <Link to="/groups"><span>Organization</span></Link>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <Link to="/marketplace"><span>Events</span></Link>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <Link to="/watch"><span>Watch</span></Link>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <Link to="/memories"><span>Memories</span></Link>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Your shortcuts</span>
          <div className="item">
            <img src={Events} alt="" />
            <Link to="/events"><span>Events</span></Link>
          </div>
          <div className="item">
            <img src={Gaming} alt="" />
            <Link to="/gaming"><span>Gaming</span></Link>
          </div>
          <div className="item">
            <img src={Gallery} alt="" />
            <Link to="/gallery"><span>Gallery</span></Link>
          </div>
          <div className="item">
            <img src={Videos} alt="" />
            <Link to="/videos"><span>Videos</span></Link>
          </div>
          <div className="item">
            <img src={Messages} alt="" />
            <Link to="/messages"><span>Messages</span></Link>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Fund} alt="" />
            <Link to="/fundraiser"><span>Fundraiser</span></Link>
          </div>
          <div className="item">
            <img src={Tutorials} alt="" />
            <Link to="/tutorials"><span>Tutorials</span></Link>
          </div>
          <div className="item">
            <img src={Courses} alt="" />
            <Link to="/courses"><span>Courses</span></Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
