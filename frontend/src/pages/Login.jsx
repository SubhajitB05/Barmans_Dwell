
import '../index.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackdropLoader from '../components/BackdropLoader';

const Login = () => {

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    email:"",
    password:"",
    phoneNumber:"",
    // otp:""
  });
   
  const handleLogin = async (e)=>{
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/users/auth/login", userData, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      if (response.data.success){
        localStorage.setItem('token', response.data.token);
        toast.success(response.data.message);
        navigate("/users/dashboard");
      } 
      else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "An error occurred during login. Please try again."
        );
      }
    }
    finally{
      setLoading(false);
    }
  }
  return (
    <div className="container mt-xxl">
      {loading && <BackdropLoader/>}
      <h2 className="text-center">
        <span className="heading">User Login</span>
      </h2>
      <form onSubmit={handleLogin}>
        <div className="mb-3 row">
          <div className="col-12 col-lg-8 col-md-10 col-sm-12">
            <label htmlFor="exampleInputEmail1" className="form-label ">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            />
          </div>
        </div>

        <div className="mb-3 row">
          <div className="col-12 col-lg-8 col-md-10 col-sm-12">
            <label htmlFor="exampleInputPassword1" className="form-label ">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={userData.password}
              onChange={(e)=>setUserData({...userData, password:e.target.value})}
            />
          </div>
        </div>
        <div className="row">
            <div className="col-12 col-lg-8 col-md-10 col-sm-12 position-relative">
                <span className='position-absolute start-50 z-1 px-1 fw-bold' style={{top:'4px', backgroundColor:'white', transform:'translateX(-50%)'}}>OR</span>
                <hr/>
            </div>
        </div>
        <p className='text-center'>Login With OTP</p>
        <div className="row">
            <div className="col-12 col-lg-8 col-md-12 col-sm-12">
                <label htmlFor="otp" className='form-label'>
                    Enter Registered Phone Number
                </label>
                <input type="number" 
                  name="otp" 
                  id="otp" 
                  className='form-control'
                  value={userData.otp}
                  onChange={(e)=>setUserData({...userData, phoneNumber:e.target.value})}
                />
            </div>
            
        </div>
        <div className="row">
            <div className="col-12 col-lg-4 col-md-8 col-sm-12">
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>

            </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
