
import '../index.css';
import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import BackdropLoader from '../components/BackdropLoader';
import { Link } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../features/auth/authSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loginBtn, setLoginBtn] = useState(0);
  const [loading, setLoading] = useState(false);
  const [gettingOTP, setGettingOTP] = useState(false);
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
        toast.success(response.data.message);
        // localStorage.setItem('token', response.data.token);
        
        const decodedToken = jwtDecode(response.data.token);
        const userRole = decodedToken.role;

        // Dispatch login action
        dispatch(loginSuccess({
          token: response.data.token,
          user: {id:decodedToken._id, role:userRole},
          role: userRole,
        }));

        if(userRole === 'user') navigate(`/users/${decodedToken._id}/dashboard`);
        else navigate('/admin/dashboard');
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

  const handleGetOTP = (e)=>{
    e.preventDefault();
    setGettingOTP(true);
  }

  return (
    <div className="container mt-xxl">
      {loading && <BackdropLoader/>}
      <h2 className="text-center">
        <span className="heading">User Login</span>
      </h2>

      <div className='row mt-4'>
        <div className="col-12 col-lg-4 col-md-10 col-sm-12 mb-3">
          <button className={`w-100 btn  ${loginBtn===0 && 'btn-light'}`}
            onClick={()=>setLoginBtn(0)}
          >Login with email & password</button>
        </div>
        <div className="col-12 col-lg-4 col-md-10 col-sm-12 mb-3">
          <button className={`w-100 btn ${loginBtn===1 && 'btn-light'}`}
            onClick={()=>setLoginBtn(1)}
          >Login with OTP</button>
        </div>
      </div>

      <form onSubmit={handleLogin}>
        {
          loginBtn === 0 ?
        <>
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
              required={loginBtn===0}
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
              required={loginBtn===0}
            />
          </div>
        </div>
        </>
        :
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
                  required={loginBtn===1}
                />
            {
              gettingOTP ? <p className='text-danger mt-2'>OTP sent to your registered phone number</p>: ""
            }
            </div>
        </div>
      }  
        <div className="row">
            <div className="col-12 col-lg-4 col-md-8 col-sm-12">
              {
                loginBtn === 0 ?
              
                <button type="submit" className="btn btn-primary w-100">
                    Login
                </button>
                :
                <button className='btn btn-success w-100' onClick={handleGetOTP} >
                  {gettingOTP ? "Getting..." : "Get OTP"}
                </button>
              }

            </div>
        </div>
              <p className='text-center'>New user? <Link to={'/users/auth/register'}>Register Here</Link></p>
      </form>
    </div>
  );
};

export default Login;
