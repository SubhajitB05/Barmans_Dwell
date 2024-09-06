import React, { useState } from 'react'
import Box from '../../components/Box'
import { Button } from '@mui/material';

const AdminUserBill = () => {

  const [billAmount, setBillAmount] = useState({
    prevRating:0,
    currRating:0
  });

  const [payable, setPayable] = useState({
    status:false,
    units:0,
    amount:0
  });

  const handleInputChange = (e)=>{
    const name = e.target.name;
    const value = e.target.value;
    setBillAmount({...billAmount, [name]:value});
  }

  const handleCalculateBill = (e)=>{
    e.preventDefault();
    const units = (billAmount.currRating - billAmount.prevRating);
    setPayable({status:true, units, amount:units*8});
  }

  return (
    <div className='mt-xxl container'>
      <div className="box-container row mb-5">
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Joining Date"} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Electricity Rate Amount"} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Current Active Due"} />
        </div>
        <div className="col col-12 col-lg-3 col-md-6 col-sm-12">
          <Box prop={["green", "red"]} data={"Total Due"} />
        </div>
      </div>

      <div className="manual-rent-add border p-4 mb-5 mx-2">
        <h3>Add paid bill manually</h3>

        <form onSubmit={handleCalculateBill}>
          <div className="form-group">
            <label className="form-label">Previous Rating (Unit)</label>
            <input type="number" className="form-control" required onChange={handleInputChange} name='prevRating'/>
          </div>
          <div className="form-group">
            <label className="form-label">Current Rating (Unit)</label>
            <input type="number" className="form-control" required onChange={handleInputChange} name='currRating'/>
          </div>
          <button className='btn btn-primary w-100 my-3' type='submit'>Calculate Payable Amount</button>
          </form>

          {
            payable.status && <div className='bg-dark p-3 mb-4'>
              <p className='text-success bold'>Total units: {payable.units}</p>
              <p className='text-success bold'>Payable Amount (Rupees): {payable.amount}</p>
            </div>
          }

          <form onSubmit={(e)=>e.preventDefault()}>
          <div className="form-group">
            <label className="form-label">Bill Amount Paid</label>
            <input type="number" className="form-control" />
          </div>
          <div className="form-group">
            <label className="form-label">Date of Payment</label>
            <input type="date" className="form-control" />
          </div>
          <button className="btn btn-primary mt-3 w-100">Generate Bill</button>
        </form>
      </div>

      <div className="bill-tabs">
        <div className="tabs d-flex justify-content-center">
          <Button variant='text' className='w-100'>Billing History</Button>
          <Button variant='text' className='w-100'>Payment History</Button>
          <Button variant='text' className='w-100'>Due List</Button>
        </div>
      </div>

    </div>
  )
}

export default AdminUserBill