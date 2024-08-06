import { Link, useNavigate } from "react-router-dom";
import "../index.css";
import house from "../assets/house.png";
import Cookie from 'js-cookie';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { FaCircleUser } from "react-icons/fa6";
import BackdropLoader from './BackdropLoader';

const Navigationbar = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(()=>{
    const token =  Cookie.get('token');
    if(token){ 
      setIsLoggedIn(()=>true);
    }
  });

  const handleLogout = ()=>{
    try {
      setLoading(true);
      axios.get('/users/auth/logout', {
        withCredentials:true
      }).then(response=>{
        if(response.data.success){
          setIsLoggedIn(()=>false);
          toast.success(response.data.message);
          navigate('/users/auth/login');
        }
        else{
          toast.error(response.data.message);
        }
      }).catch(error=>{
        toast.error(error.data.message); 
      })
    } catch (error) {
      console.log(error);
    }
    finally{
      setLoading(false);
    }
  }

  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary fixed-top ps-5 pe-5 shadow-sm py-2">
      {
        loading && <BackdropLoader/>
      }
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
            arman's{" "}
            <span
              className="fs-2 fw-bold"
              style={{ color: "var(--secondary-color)" }}
            >
              D
            </span>
            well
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
          <ul className="navbar-nav ms-auto gap-2 nav-fonts">
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
            {
              isLoggedIn ?
       
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  <FaCircleUser/> Profile
                </Link>
                <ul class="dropdown-menu">
                  <li><Link class="dropdown-item" to={'/users/dashboard'}>Dashboard</Link></li>
                  <li><Link class="dropdown-item"  onClick={handleLogout}>Logout</Link></li>
                </ul>
              </li>
            
              : 
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
            }
            
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navigationbar;
