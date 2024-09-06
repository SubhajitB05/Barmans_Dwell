import React, { useEffect } from "react";
import avatar from "../../assets/avatar.png";
import "../../index.css";
import { useState, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { MdDeleteForever } from "react-icons/md";
import { jwtDecode } from "jwt-decode";
import { Button } from "@mui/material";


const Profile = () => {
  const [isdisabled, setIsDisabled] = useState(true);
  const imgRef = useRef(null);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(avatar);
  const [canSave, setCanSave] = useState(false);
  const [saving, setSaving] = useState(false);
  const [imgAvatar, setImgAvatar] = useState(null);
  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleEditPhoto = () => {
    imgRef.current.click();
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setCanSave(true);
  };

  const handleSaveImage = async (e) => {
    e.preventDefault();
    if (!image) return null;
    const formData = new FormData();
    formData.append("avatar", image);

    const token = localStorage.getItem("token");

    try {
      setSaving(true);
      const response = await axios.post("/users/profile/avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem('ImgAvatar', response.data.imgURL);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Error uploading image");
    } finally {
      setSaving(false);
      setCanSave(false);
    }
  };

  

  useEffect(()=>{
    const storedImg = localStorage.getItem('ImgAvatar');
    const token = localStorage.getItem('token');
    if (!token) navigate("/users/auth/login");
    if(storedImg){
      setImgAvatar(storedImg);
      setImagePreview(storedImg);
    }
    const decodedToken = jwtDecode(token);
    const path = decodedToken.role === 'admin' ? "/admin/profile" : `/users/${decodedToken._id}/profile`;
    axios.get(path, {
      headers: {
        Authorization: `Bearer ${token}`
        }
    }).then((response)=>{
        setUserData(response.data.user);
        console.log(userData);
    }).catch((err)=>{
      console.log(err);
    })

    
    
  }, [])

  return (
    <div className="container mt-xxl">
      <div className="row gap-5" style={{minHeight:'70vh'}}>
        <div className="col-12 col-lg-3 col-md-10 col-sm-12 d-flex justify-content-start flex-column align-items-center">
          <div
            className="img-wrapper mb-3"
            style={{
              width: "180px",
              height: "200px",
              backgroundImage: `url(${imagePreview})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="text-center">
            <h6>{userData?.email}</h6>
          </div>
          <div className="d-flex justify-content-start align-items-center gap-1">
            <button className="btn btn-primary" onClick={handleEditPhoto}>
              Edit
            </button>
            <input type="file" name="avatar" ref={imgRef} onChange={handleInputChange} className="d-none"/>
            {image && canSave && (
              <>
              <button className="btn btn-success" onClick={handleSaveImage}>
                {saving ? "Saving..." : "Save"}
              </button>
              </>
            )}
            {
              imgAvatar && <button className="btn btn-danger d-flex align-items-center " onClick={()=>{
                setImage(null);
                setCanSave(false);
                setImagePreview(avatar);
                localStorage.removeItem('ImgAvatar');
                imgAvatar(()=>null);
              }} ><MdDeleteForever size={20}/> Delete</button>
            }
          </div>

          <input
            type="file"
            ref={imgRef}
            accept="image/*"
            onChange={handleInputChange}
            className="d-none"
            name="avatar"
          />

            {/* <div className="profile_navigation_menu">
              <ul className="ps-0">
                <li><Button variant="text" className="w-100">Account</Button></li>
                <li><Button variant="text">Account</Button></li>
                <li><Button variant="text">Account</Button></li>
              </ul>
            </div> */}

        </div>

        {/* // User details */}
        <div className="col-12 col-lg-7 col-md-10 col-sm-12 overflow-auto">
          <div className="row">
              <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
                <label className="form-label">First Name</label>
                <input type="text" value={userData?.firstName} className="form-control" disabled={isdisabled}/>
              </div>
              <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
                <label className="form-label">Middle Name</label>
                <input type="text" value={userData?.middleName} className="form-control" disabled={isdisabled}/>
              </div>
              <div className="col col-12 col-lg-4 col-md-12 col-sm-12">
                <label className="form-label">Last Name</label>
                <input type="text" value={userData?.lastName} className="form-control" disabled={isdisabled}/>
              </div>
          </div>

          <div className="row">
            <div className="col col-12 col-lg-6 col-md-12 col-sm-12">
              <label className="form-label">Email</label>
              <input type="email" value={userData?.email} className="form-control" disabled={isdisabled}/>
            </div>
            <div className="col col-12 col-lg-6 col-md-12 col-sm-12">
              <label className="form-label">Phone Number</label>
              <input type="text" value={userData?.phoneNumber} className="form-control" disabled={isdisabled}/>
            </div>
          </div>

          <div className="row">
            <div className="col col-12">
              <label className="form-label">Address Line 1</label>
              <textarea name="addressLine1" className="form-control" value={userData?.addressLine1} disabled={isdisabled} style={{resize:'none'}}></textarea>
            </div>
          </div>
          <div className="row">
            <div className="col col-12">
              <label className="form-label">Address Line 2</label>
              <textarea name="addressLine1" className="form-control" value={userData?.addressLine2} disabled={isdisabled} style={{resize:'none'}}></textarea>
            </div>
          </div>

          <div className="row">
            <div className="col col-12 col-lg-6 col-md-12 col-sm-12">
              <label className="form-label">City</label>
              <input type="email" value={userData?.city} className="form-control" disabled={isdisabled}/>
            </div>
            <div className="col col-12 col-lg-6 col-md-12 col-sm-12">
              <label className="form-label">District</label>
              <input type="text" value={userData?.district} className="form-control" disabled={isdisabled}/>
            </div>
          </div>

          <div className="row">
            <div className="col col-12 col-lg-6 col-md-12 col-sm-12">
              <label className="form-label">State</label>
              <input type="email" value={userData?.state} className="form-control" disabled={isdisabled}/>
            </div>
            <div className="col col-12 col-lg-6 col-md-12 col-sm-12">
              <label className="form-label">Zip Code</label>
              <input type="text" value={userData?.zipCode} className="form-control" disabled={isdisabled}/>
            </div>
          </div>

          <div className="row">
              <div className="col col-12">
                <label className="form-label">Aadhaar Number</label>
                <input type="text" value={userData?.aadhaarNumber} className="form-control" disabled={true}/>
              </div>
          </div>

          <button
            className="btn btn-primary ms-3"
            onClick={() => setIsDisabled(!isdisabled)}
          >
            {isdisabled ? "Edit Profile" : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
