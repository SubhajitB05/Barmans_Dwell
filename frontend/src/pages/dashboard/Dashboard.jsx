import { useEffect, useState } from "react";
import "../../index.css";
import axios from "axios";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";
import D1 from "./D1";
import { RxDashboard } from "react-icons/rx";
import { RiHomeOfficeFill } from "react-icons/ri";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { ImHistory } from "react-icons/im";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  const {userId} = useParams();

  const sidebarItems = [
    {
      id:0,
      title:'Dashboard',
      path:`/users/${userId}/dashboard`,
      icon: <RxDashboard size={22}/>
    },
    {
      id:1,
      title: 'Home Rent',
      path: `/users/${userId}/dashboard/home-rent`,
      icon:<RiHomeOfficeFill size={22}/>
    },
    {
      id:2,
      title: 'Electricity Bill',
      path: `/users/${userId}/dashboard/electricity-bill`,
      icon: <RiLightbulbFlashFill size={22} />
    },
    {
      id:3,
      title: 'Pay Online',
      path: `/users/${userId}/dashboard/online-payment`,
      icon: <BsCashCoin size={22} />
    },
    {
      id:4,
      title: 'Payment History',
      path: `/users/${userId}/dashboard/payment-history`,
      icon: <ImHistory size={22} />
    }
  ];

  const handleToggle = () => {};

  useEffect(() => {
    axios
      .get(`/users/${userId}/dashboard`, {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("token"),
        },
        withCredentials: true,
      })
      .then(({ data }) => {
        setUserData(data.user);
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/users/auth/login");
  });


  return (
    <div className=" text-center dashboard d-flex">
      <div
        className="sidebar shadow"
        style={{
          transition: "0.4s all ease-in-out",
          width: `${collapse ? "50px" : "25%"}`,
        }}
      >
        <div className="sidebar-wrapper position-sticky top-0">
          <Sidebar collapse={collapse} sidebarItems={sidebarItems}/>
          <span
            className="position-absolute"
            style={{
              top: "76px",
              right: "-22px",
              cursor: "pointer",
            }}
            onClick={() => setCollapse(!collapse)}
          >
            <FaBarsStaggered size={22} />
          </span>
        </div>
      </div>

      <div className="content container-fluid pt-xxl">
        <div className="right-content-wrapper">
          <Outlet/>

          {userData ? (
            <>
              <h1>Hello {userData?.firstName} Welcome to your dashboard</h1>
              <ul>
                <li>User id: {userData?._id}</li>
                <li>Email: {userData?.email}</li>
                <li>Aadhaar Number: {userData?.aadhaarNumber}</li>
              </ul>
            </>
          ) : // ()=>navigate('/users/auth/login')
          null}
          <button className="btn btn-primary" onClick={handleToggle}>
            Toggle
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
