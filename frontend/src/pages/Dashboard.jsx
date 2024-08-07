import { useEffect, useState } from 'react';
import '../index.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  useEffect(()=>{
    axios.get('/users/dashboard',{
      headers:{
        "Authorization":localStorage.getItem('token')
      },
      withCredentials:true
    })
    .then(({data})=>{
      setUserData(data.user);
    })
    .catch(err=>console.log(err));
  }, []);

  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(!token) navigate('/users/auth/login')
  })

  return (
    <div className='container mt-xxl text-center'>
      {
        userData ?
        <>
        <h1>Hello {userData?.firstName} Welcome to your dashboard</h1>
        <ul>
          <li>User id: {userData?._id}</li>
          <li>Email: {userData?.email}</li>
          <li>Aadhaar Number: {userData?.aadhaarNumber}</li>
        </ul>
        </>
        :
        // ()=>navigate('/users/auth/login')
        null
        
      }
    </div>
  )
}

export default Dashboard