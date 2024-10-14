import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import house from "../assets/house.png";
import { useState } from "react";
import { toast } from "react-toastify";
import BackdropLoader from './BackdropLoader';
import avatar from '../assets/avatar.png';
import { useSelector, useDispatch } from 'react-redux';
import { logoutSuccess } from '../features/auth/authSlice'; // Adjust the path to your authSlice file
import useWindowWidth from "../hooks/useWindowWidth";

const Navigationbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const windowWIdth = useWindowWidth();

  // Accessing authentication state and role from Redux
  const { isAuthenticated, role, user} = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);


  const handleLogout = () => {
    setLoading(true);
    dispatch(logoutSuccess()); // Use logout action from Redux
    toast.success("Logout Successful");
    setLoading(false);
    navigate('/users/auth/login');
  };

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ps-5 pe-5 shadow-sm py-2"
      style={{ zIndex: 1000 }}
    >
      {loading && <BackdropLoader />}
      <div className="container-fluid">
        <Link to={"/"} className="navbar-brand d-flex align-items-center gap-2">
          <img src={house} alt="Logo" width="40" height="40" />
          <span>
            <span
              className="fs-2 fw-bold"
              style={{ color: "var(--secondary-color)" }}
            >
              B
            </span>
            {
              windowWIdth < 600 ? "" : 
              "arman's "
            }
            <span
              className="fs-2 fw-bold"
              style={{ color: "var(--secondary-color)" }}
            >
              D
            </span>
            {
              windowWIdth < 600 ? "" :
              "well " 
            }
          </span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto gap-2 nav-fonts align-items-center">
            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to={"/"}>
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/about"}>
                About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to={"/contact"}>
                Contact
              </Link>
            </li>
            {isAuthenticated ? (
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <img src={avatar} style={{ width: '30px', height: '30px', borderRadius: '50%', border: '1px solid gray', padding: '2px' }} />
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={role === 'user' ? `/users/${user.id}/profile` : '/admin/profile'}>
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to={role === 'user' ? `/users/${user.id}/dashboard` : '/admin/dashboard'}>
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      Logout
                    </Link>
                  </li>
                </ul>
              </li>
            ) : (
              <>
                <button
                  className="btn border border-primary nav-fonts"
                  onClick={() => navigate("/users/auth/login")}
                >
                  Login
                </button>
                <button
                  className="btn btn-primary nav-fonts"
                  onClick={() => navigate("/users/auth/register")}
                >
                  Signup
                </button>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigationbar;
