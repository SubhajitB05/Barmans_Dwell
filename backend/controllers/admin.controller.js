import User from "../models/user.model.js";
import Rent from "../models/rent.model.js";

export const handleAdminDashboard = async (req, res) => {
  // Handle admin dashboard logic here
  try {
    const allUsers = await User.find({ role: "user" }).select("-password");
    if (!allUsers || allUsers.length === 0) {
      return res.status(400).json({
        message: "No Users found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Users found",
      status: true,
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const handleAdminProfile = async (req, res) => {
  try {
    const admin = User.findOne({ role: "admin" });
    if (!admin) {
      return res.status(400).json({
        message: "Admin not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Admin found",
      status: true,
      user: admin,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const handleGetAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find({ role: "user" }).select("-password");
    if (!allUsers || allUsers.length === 0) {
      return res.status(400).json({
        message: "No Users found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "Users found",
      status: true,
      allUsers,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const handleGetUserById = async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id).select("-password");
    if (!user) {
      return res.status(400).json({
        message: "User not found",
        status: false,
      });
    }
    return res.status(200).json({
      message: "User found",
      status: true,
      user,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const handleGetUserRent = async (req, res) => {};

export const handleGetUserPayment = async (req, res) => {};

export const handleGetUserELectricityBill = async (req, res) => {};

export const handleAddUserRent = async (req, res)=>{
  const id = req.params.id;
  const {rentAmount, rentPaymentDate} = req.body;
  try {
    const user = await User.findById(id);
    if(!user){
      return res.status(404).json({
        message: "User not found",
        success:false
      });
    }
    const dueAmount = rentAmount != 1500 ? (1500-rentAmount) : 0;
    const newRent = await Rent.create({
      user:user._id,

    })
    
  } catch (error) {
    
  }


}