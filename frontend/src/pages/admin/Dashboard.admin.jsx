import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useSelector } from "react-redux";

const AdminDashboard = () => {
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
      axios.get('/admin/dashboard', {
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
    <div className="mt-xxl container">
      <h2>Admin Dashboard</h2>
      <div>
        {users.length > 0 ? (
          users.map((user) => (
            <div className="card mb-3" key={user._id}>
              <h4 className="card-header">{user.firstName}</h4>
              <h4 className="card-title">{user.email}</h4>
              <p className="card-body">{user.addressLine1}</p>
            </div>
          ))
        ) : (
          <p>No users found.</p>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
