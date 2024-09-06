import Button from "@mui/material/Button";
import {useEffect, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";


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
    navigate(sidebarItems[ind][2]);
  }

  return (
    <div className="pt-xl overflow-hidden">
      <ul className="p-2 pt-4 text-dark overflow-hidden">
        {
            sidebarItems.map((item)=>(
                <Button 
                    variant="text"
                    className="w-100 d-flex justify-content-start"    
                    key={item.id}
                    onClick={()=>navigate(item.path)}
                >{item.title}</Button>
            ))
        }
      
      </ul>
    </div>
  );
};

export default Sidebar;
