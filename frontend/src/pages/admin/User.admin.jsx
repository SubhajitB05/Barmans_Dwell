import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';
import { useParams } from 'react-router-dom';


const AdminUser = () => {

  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);
  const {id} = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {

    if (!isAuthenticated || role !== 'admin') {
      // Redirect to login if not authenticated or not an admin
      navigate('/users/auth/login');
      return;
    }

    if (token) {
      axios.get(`/admin/users/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          setUser(data.user);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated, role, navigate]);


  return (
    <div className='mt-xxl'>
      <h1>User Details</h1>
      {
        user && (
          <div className="card mb-3 w-75"  key={user._id}>
              <h4 className="card-header">{user.firstName + " "+ user.lastName}</h4>
              {/* <p className="card-title p-3">Email: {user.email}</p> */}
              <p className="card-body">
                <p>Email: <b>{user.email}</b></p>
                <p>Phone Number: <b>{user.phoneNumber}</b></p>
                <p>Aadhaar Number: <b>{user.aadhaarNumber}</b></p>
                <p>Address Line 1: <b>{user.addressLine1}</b></p>
              </p>
              <div className='d-flex justify-content-center gap-4 p-4'>
                <Link to={`/admin/users/${user._id}/rent`}>Rent</Link>
                <Link to={`/admin/users/${user._id}/electricity-bill`}>Electricity Bill</Link>
                <Link to={`/admin/users/${user._id}/payment`}>Payments</Link>
              </div>
          </div>
        )
      }
    </div>
  )
}

export default AdminUser