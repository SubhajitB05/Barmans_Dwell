import React, { useState } from "react";
import Box from "../../components/Box";
import { Button } from "@mui/material";
import axios from 'axios';
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";


const AdminUserRent = () => {

  const { isAuthenticated, role, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const {id} = useParams();

  const [tabIndex, setTabIndex] = useState(0);
  const [rentData, setRentData] = useState({
    rentAmount:0,
    rentPaymentDate:''
  });

  const handleAddRent = (e) => {
    e.preventDefault();
    if(!isAuthenticated || role !== 'admin'){
      navigate('/users/auth/login');
      return;
    }
    if(token){
      axios.post(`/admin/users/:id/rent`, rentData, {
        headers: {
          'Authorization': `Bearer ${token}`
          }
      }).then(res=>console.log(res))
      .catch(err=>console.log(err));
    }
  };

  return (
    <div className="mt-xxl container">
      <div className="box-container row mb-5">
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Joining Date"} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Rent Amount"} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Current Active Due"} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Total Due"} />
        </div>
      </div>

      <div className="manual-rent-add border p-4 mb-5">
        <h3>Add paid rent manually</h3>
        <form onSubmit={handleAddRent}>
          <div className="form-group mb-2">
            <label className="form-label">Rent Amount Paid</label>
            <input type="number" className="form-control" name='rentAmount' onChange={(e)=>setRentData({...rentData, rentAmount:e.target.value})}/>
          </div>
          <div className="form-group">
            <label className="form-label">Date</label>
            <input type="date" className="form-control" name='rentPaymentDate' onChange={(e)=>setRentData({...rentData, rentPaymentDate:e.target.value})}/>
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
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td>Mark</td>
                <td>Otto</td>
                <td>@mdo</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>@fat</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td colspan="2">Larry the Bird</td>
                <td>@twitter</td>
              </tr>
            </tbody>
          </table>
            )
            :
            (
              <div>No Dues</div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default AdminUserRent;
