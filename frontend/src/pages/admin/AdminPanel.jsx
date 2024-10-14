import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import {FaBarsStaggered} from 'react-icons/fa6';
import { RxDashboard } from "react-icons/rx";
import { HiUsers } from "react-icons/hi2";
import useWindowWidth from "../../hooks/useWindowWidth";

const AdminPanel = () => {
  const [collapse, setCollapse] = useState(false);
  let windowWidth = useWindowWidth();
  const sidebarItems = [
    {
      id:0,
      title:'Dashboard',
      path:'/admin/dashboard',
      icon: <RxDashboard size={22}/>
    },
    {
      id:1,
      title: 'Users',
      path: '/admin/users',
      icon:<HiUsers size={22}/>
    },
  
  ]

  return (
    <div className="d-flex">
      <div
        className="sidebar shadow"
        style={{
          transition: "0.4s all ease-in-out",
          width: `${collapse ? (windowWidth < 600 ? "0px" : '50px'): windowWidth<600 ? "45px" : "25%"}`,
        }}
      >
        <div className={`sidebar-wrapper position-sticky top-0`}>
          <Sidebar collapse={collapse} sidebarItems={sidebarItems} />
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

      <div className="content container-fluid px-5">
        <div className="right-content-wrapper">
          <Outlet/>
          </div>
      </div>
    </div>
  );
};

export default AdminPanel;
