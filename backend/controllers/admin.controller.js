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

export const handleGetUserRent = async (req, res) => {
  const id = req.params.id;
  try {
    const userRent = await Rent.findOne({ user: id });
    if (!userRent) {
      return res.status(400).json({
        message: "User has no rent",
        status: false,
      });
    }
    return res.status(200).json({
      message: "User rent found",
      status: true,
      rentDetails: userRent,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const handleGetUserPayment = async (req, res) => {};

export const handleGetUserELectricityBill = async (req, res) => {};

export const handleAddUserRent = async (req, res) => {

  const id = req.params.id;
  const { rentAmount, rentPaymentDate } = req.body;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    const dueAmount = rentAmount != 1500 ? 1500 - rentAmount : 0;
    const ExistingUser = await Rent.findOne({ user: id });
    if (ExistingUser === null)
      return res.status(404).json({
        message: "Rent for the user is not found",
        success: false,
      });

    if (ExistingUser) {
      // Push new data to paymentHistory array
      ExistingUser.paymentHistory.unshift({
        paymentDate: rentPaymentDate,
        amountPaid: rentAmount,
      });

      // Push new data to dueList array
      ExistingUser.dueList.unshift({
        dueDate: rentPaymentDate,
        amountDue: dueAmount,
      });

      // Save the updated document back to the database
      await ExistingUser.save();
    }
    return res.status(200).json({
      message: "Rent updated successfully",
      success: true,
      rentDetails: ExistingUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(505).json({
      message: "Internal Server Error",
      success: false,
    });
  }
};
