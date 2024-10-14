import React, { useEffect, useState } from "react";
import Box from "../../components/Box";
import { Button } from "@mui/material";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from 'react-toastify';

const AdminUserRent = () => {

  const { isAuthenticated, role, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {id} = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [rentData, setRentData] = useState({
    rentAmount:'',
    rentPaymentDate:''
  });

  const [allPaidRent, setAllPaidRent] = useState([]);
  const [dueList, setDueList] = useState([]);
  const [rentDetails, setRentDetails] = useState({});

  const handleAddRent = (e) => {
    e.preventDefault();
    if(!isAuthenticated || role !== 'admin'){
      navigate('/users/auth/login');
      return;
    }

    if(token){
      axios.post(`/admin/users/${id}/rent`, rentData, {
        headers: {
          'Authorization': `Bearer ${token}`
          },
        withCredentials:true
      }).then(res=>{
        toast.success(res.data.message);
        setRentData({rentAmount:'', rentPaymentDate:''});
        fetchRentDetails();
      })
      .catch(err=>{
        console.log(err.response.data.message);
      });
    }
  };

  const fetchRentDetails = () => {
    axios.get(`/admin/users/${id}/rent`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      withCredentials: true,
    })
    .then((res) => {
      setRentDetails(res.data.rentDetails);
      setAllPaidRent(res.data.rentDetails.paymentHistory || []); // Safely update state
      setDueList(res.data.rentDetails.dueList || []);
    })
    .catch((err) => {
      toast.error(err.response.data.message);
    });
  };

  useEffect(() => {
  fetchRentDetails();
}, []);


  return (
    <div className="mt-xxl container">
      <div className="box-container row mb-5">
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={["Joining Date", `${rentDetails?.dueDate?.split('T')[0]}`]} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={["Rent Amount", 1500]} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={["Current Active Due", 0]} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={["Total Due", 0]} />
        </div>
      </div>

      <div className="manual-rent-add border p-4 mb-5">
        <h3>Add paid rent manually</h3>
        <form onSubmit={handleAddRent}>
          <div className="form-group mb-2">
            <label className="form-label">Rent Amount Paid</label>
            <input type="number" className="form-control" name='rentAmount' value={rentData.rentAmount} onChange={(e)=>setRentData({...rentData, rentAmount:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" name='rentPaymentDate' value={rentData.rentPaymentDate} onChange={(e)=>setRentData({...rentData, rentPaymentDate:e.target.value})}/>
          </div>
          <button className="btn btn-primary mt-3" type="submit">Add</button>
        </form>
      </div>

      <div className="rent-tabs ">
        <div className="tab-content  border rounded">
          <Button variant={tabIndex === 0 ? 'contained' : 'text'} className="w-50" onClick={()=>setTabIndex(0)}>
            All Paid Rent
          </Button>
          <Button variant={tabIndex === 1 ? 'contained' : 'text'} className="w-50" onClick={()=>setTabIndex(1)}>
            All Due Rent
          </Button>
        </div>

        <div className="rent-table table-responsive">
          {
            tabIndex === 0 ? (
          <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Amount Paid</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {
                allPaidRent.map((item, index)=>{
                  return (
                    <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{item.paymentDate.split('T')[0]}</td>
                      <td>{item.amountPaid}</td>
                      <td>View</td>
                    </tr>
                  )
                })
              }
            
            </tbody>
          </table>
            )
            :
            (
            <table class="table table-hover align-middle">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Due Amount</th>
                <th scope="col">View</th>
              </tr>
            </thead>
            <tbody>
              {
                dueList.map((item, index)=>{
                  return (
                    <tr key={index}>
                      <th scope="row">{index+1}</th>
                      <td>{item.dueDate.split('T')[0]}</td>
                      <td>{item.amountDue}</td>
                      <td>View</td>
                    </tr>
                  )
                })
              }
            
            </tbody>
          </table>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AdminUserRent;
