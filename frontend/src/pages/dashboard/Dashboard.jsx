import { useEffect, useState } from "react";
import "../../index.css";
import axios from "axios";
import { useNavigate, Outlet, useParams } from "react-router-dom";
import Sidebar from "./Sidebar";
import { FaBarsStaggered } from "react-icons/fa6";
import D1 from "./D1";

const Dashboard = () => {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();
  const [collapse, setCollapse] = useState(false);

  const {userId} = useParams();

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
          <Sidebar collapse={collapse} />
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
