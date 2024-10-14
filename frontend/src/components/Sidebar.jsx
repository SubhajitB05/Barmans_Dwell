import Button from "@mui/material/Button";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { IoIosArrowForward } from "react-icons/io";


const Sidebar = ({collapse, sidebarItems}) => {
  const [userId, setUserId] = useState('');
  useEffect(()=>{
    const token = localStorage.getItem('token');
    if(token){
      const decoded = jwtDecode(token);
      setUserId(decoded._id);
    }
  }, []);


  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleSelectedItem = (ind)=>{
    setSelectedIndex(ind);
    navigate(sidebarItems[ind].path);
  }

  return (
    <div className="pt-xl overflow-hidden">
      <ul className="p-2 pt-4 text-dark overflow-hidden">
        {
            sidebarItems.map((item, index)=>(
              <li key={item.id}>
                <Button 
                    variant="text"
                    className={`w-100 d-flex justify-content-start my-2 text-dark ${selectedIndex===index && 'bg-primary text-white'}`}    
                    style={{ marginLeft: "auto", flexWrap:'nowrap', height:'46px'}}
                    onClick={()=>handleSelectedItem(index)}
                >
                  <span>
                    {item.icon}
                  </span>
                  <span className="w-100 d-flex justify-content-between align-items-center">
                    <span className="ms-2 me-auto"
                      style={{
                        visibility:`${collapse ? 'hidden': 'visible'}`,
                        // display:`${collapse ? 'none' : 'inline-block'}`
                      }}
                    >
                      {item.title}
                    </span>
                    {!collapse && <IoIosArrowForward />}
                  </span>
                </Button>
                </li>
            ))
        }
      
      </ul>
    </div>
  );
};

export default Sidebar;
