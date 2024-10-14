import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import { useSelector } from "react-redux";
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const { isAuthenticated, role, token } = useSelector((state) => state.auth);

  useEffect(() => {

    if (!isAuthenticated || role !== 'admin') {
      // Redirect to login if not authenticated or not an admin
      navigate('/users/auth/login');
      return;
    }

    if (token) {
      axios.get('/admin/users', {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(({ data }) => {
          setUsers(data.allUsers);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [isAuthenticated, role, navigate]);

  return (
    <div className='container mt-xxl'>
      <div className="container-fluid">
        {users.length > 0 ? (
          users.map((user) => (
            <div className="card mb-3" key={user._id}>
              <h4 className="card-header">{user.firstName}</h4>
              <h4 className="card-title">{user.email}</h4>
              <p className="card-body">{user.addressLine1}</p>
              <Link to={`/admin/users/${user._id}`}>Click Me</Link>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  )
}

export default AdminUsers