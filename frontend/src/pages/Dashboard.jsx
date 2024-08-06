import { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);

  useEffect(()=>{
    axios.get('/users/dashboard',{
      withCredentials: true
    })
    .then(({data})=>{
      setUserData(data.user);
    })
    .catch(err=>console.log(err));
  }, [])
  return (
    <div className='container mt-xxl text-center'>
      <h1>Hello {userData?.firstName} Welcome to your dashboard</h1>
      <ul>
        <li>User id: {userData?._id}</li>
        <li>Email: {userData?.email}</li>
        <li>Aadhaar Number: {userData?.aadhaarNumber}</li>
      </ul>
    </div>
  )
}

export default Dashboard