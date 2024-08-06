import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import BackdropLoader from '../components/BackdropLoader';

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [user, setUser] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    district: "",
    state: "",
    zipCode: "",
    aadhaarNumber: "",
    aadhaarPhoto: "",
    password: "",
    confirmPassword: "",
  });

  const handleUserRegistration = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/users/auth/register", user, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true
      });
      setLoading(true);
      
      if (response.data.success) {
        toast.success(response.data.message);
        setTimeout(() => {
          navigate("/users/auth/login");
          setLoading(false);
        }, 1000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error(
          "An error occurred during registration. Please try again."
        );
      }
    }
  };

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };

  return (
    <>
      <div className="container mt-xxl ">
        {
          loading && <BackdropLoader/>
        }
        <h2 className="text-center mb-5">
          {" "}
          <span className="heading">User Registration</span>
        </h2>
        <form onSubmit={handleUserRegistration}>
          <div className="row ">
            <div className="col-12 col-lg-4 col-md-5 col-sm-12">
              <label htmlFor="firstName" className="form-label required-field">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="form-control"
                name="firstName"
                required
                value={user.firstName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-3 col-md-3 col-sm-12">
              <label htmlFor="middleName" className="form-label">
                Middle Name
              </label>
              <input
                type="text"
                id="middleName"
                className="form-control"
                name="middleName"
                value={user.middleName}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-3 col-md-4 col-sm-12">
              <label htmlFor="lastName" className="form-label required-field">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="form-control"
                name="lastName"
                required
                value={user.lastName}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-5 col-md-6 col-sm-12">
              <label htmlFor="email" className="form-label required-field">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                required
                value={user.email}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-5 col-md-6 col-sm-12">
              <label
                htmlFor="phoneNumber"
                className="form-label required-field"
              >
                Phone Number
              </label>
              <input
                type="number"
                id="phoneNumber"
                name="phoneNumber"
                className="form-control"
                required
                value={user.phoneNumber}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-10 col-sm-12">
              <label htmlFor="address1" className="form-label required-field">
                Address Line 1 (Permanent Address)
              </label>
              <input
                type="text"
                id="address1"
                name="addressLine1"
                className="form-control"
                required
                value={user.addressLine1}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-10 col-sm-12">
              <label htmlFor="address2" className="form-label">
                Address Line 2
              </label>
              <input
                type="text"
                id="address2"
                name="addressLine2"
                className="form-control"
                value={user.addressLine2}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="row ">
            <div className="col-12 col-lg-3 col-md-3 col-sm-12">
              <label htmlFor="city" className="form-label required-field">
                City
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className="form-control"
                value={user.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-3 col-md-3 col-sm-12">
              <label htmlFor="district" className="form-label required-field">
                District
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className="form-control"
                value={user.district}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-2 col-md-3 col-sm-12">
              <label htmlFor="state" className="form-label required-field">
                State
              </label>
              <input
                type="text"
                id="state"
                name="state"
                className="form-control"
                value={user.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-2 col-md-3 col-sm-12">
              <label htmlFor="zipCode" className="form-label required-field">
                Zip Code
              </label>
              <input
                type="number"
                id="zipCode"
                name="zipCode"
                className="form-control"
                value={user.zipCode}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row ">
            <div className="col-12 col-lg-6 col-md-12 col-sm-12">
              <label htmlFor="aadhaar" className="form-label required-field">
                Aadhaar Number
              </label>
              <input
                type="number"
                className="form-control"
                id="aadhaar"
                name="aadhaarNumber"
                required
                value={user.aadhaarNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-12 col-lg-4 col-md-12 col-sm-12">
              <label htmlFor="aadhaar-photo" className="form-label ">
                Upload Aadhaar (JPG, JPEG, PNG: Less than 1 MB)
              </label>
              <input
                type="file"
                className="form-control"
                id="aadhaar-photo"
                name="aadhaarPhoto"
                // required
                value={user.aadhaarPhoto}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-12 col-lg-5 col-md-6 col-sm-12">
              <label htmlFor="password" className="form-label required-field">
                Create Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control"
                required
                value={user.password}
                onChange={handleInputChange}
              />
            </div>
            <div className="col col-12 col-lg-5 col-md-6 col-sm-12">
              <label
                htmlFor="confirmPassword"
                className="form-label required-field"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                className="form-control"
                required
                value={user.confirmPassword}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="mt-4 row">
            <div className="col-12 col-lg-4 col-md-8">
              <button type="submit" className="btn btn-primary w-100">
                Register
              </button>
            </div>
          </div>
        </form>
        <p className="text-center mt-4">
          Already registered? <Link to={"/users/auth/login"}>Login</Link>
        </p>
      </div>
    </>
  );
};

export default Register;
