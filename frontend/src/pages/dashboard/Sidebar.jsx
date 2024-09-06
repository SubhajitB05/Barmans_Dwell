import Button from "@mui/material/Button";
import { IoIosArrowForward } from "react-icons/io";
import { RxDashboard } from "react-icons/rx";
import { RiHomeOfficeFill } from "react-icons/ri";
import { RiLightbulbFlashFill } from "react-icons/ri";
import { BsCashCoin } from "react-icons/bs";
import { ImHistory } from "react-icons/im";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


const Sidebar = ({collapse}) => {
  const [userId, setUserId] = useState('');
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
    }
  }, []);

  const sidebarItems = [
    [<RxDashboard size={22}/>, "Dashboard", `/users/${userId}/dashboard`],
    [<RiHomeOfficeFill size={22}/>, "Home Rent",`/users/${userId}/dashboard/home-rent`],
    [<RiLightbulbFlashFill size={22} />, "Electricity Bill", `/users/${userId}/dashboard/electricity-bill`],
    [<BsCashCoin size={22}/>, "Pay Online", `/users/${userId}/dashboard/online-payment`],
    [<ImHistory size={22}/>, "Payment History", `/users/${userId}/dashboard/payment-history`],
  ];
  
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);


  const handleSelectedItem = (ind)=>{
    setSelectedIndex(ind);
    navigate(sidebarItems[ind][2]);
  }

  return (
    <div className="pt-xl overflow-hidden">
      <ul className="p-2 pt-4 text-dark overflow-hidden">
        {sidebarItems.map((item, index) => {
          return (
            <li key={index} >
              <Button
                variant="text"
                className={`w-100 d-flex justify-content-start my-2 text-dark ${selectedIndex===index && 'bg-primary text-white'}`}
                style={{ marginLeft: "auto", flexWrap:'nowrap', height:'46px'}}
                onClick={()=>handleSelectedItem(index)}
              >
                <span>
                  {item[0]}
                </span>
                <span className="w-100 d-flex justify-content-between align-items-center">
                  <span className="ms-2 me-auto"
                    style={{
                        visibility:`${collapse ? 'hidden': 'visible'}`,
                        // display:`${collapse ? 'none' : 'inline-block'}`
                    }}
                  >{item[1]}</span>
                  {!collapse && <IoIosArrowForward />}
                </span>
              </Button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Sidebar;
