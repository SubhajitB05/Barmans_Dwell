import User from "../models/user.model.js";
import Rent from "../models/rent.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/generateToken.js";


const handleUserRegistration = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      district,
      state,
      zipCode,
      aadhaarNumber,
      aadhaarPhoto,
      password,
    } = req.body;

    const user = await User.findOne({
      $or: [{ email }, { phoneNumber }, { aadhaarNumber }],
    });
    if (user) {
      return res.status(400).json({
        message: "User already exists",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      firstName,
      middleName,
      lastName,
      email,
      phoneNumber,
      addressLine1,
      addressLine2,
      city,
      district,
      state,
      zipCode,
      aadhaarNumber,
      aadhaarPhoto,
      password: hashedPassword,
    });

    // Initialize Rent Collection for that new user
    if(newUser){
      await Rent.create({
        user: newUser._id,
        rentAmount:1500,
        dueDate: newUser.createdAt,
        paymentHistory:[],
        dueList:[],
      });
    }
    return res.status(200).json({
      message: "User created successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password, phoneNumber } = req.body;

    // If user wants to login through email and password
    if (email && password) {
      const user = await User.findOne({ email });

      // Case - user not found through the given email
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid email or password", success: false });
      } 
      // If user is found through email check the correctness of password 
      else {
        const isValidPassword = await bcrypt.compare(password, user.password);
        // Case - Incorrect password
        if (!isValidPassword) {
          return res
            .status(401)
            .json({ message: "Invalid password", success: false });
        }

        //Case - Correct password, Login Success - Generate JWT token 
        const token = generateToken(user);
        return res.status(200).json({
          message: "Login successful",
          success: true,
          token,
        });
      }

    }
    // If user wants to login through phone number
    else if (phoneNumber) {
      const user = await User.findOne({ phoneNumber });
      // Case - User not found with the given phone number
      if (!user) {
        return res
          .status(401)
          .json({ message: "Invalid phone number", success: false });
      }
      // case - User Found -> Generate otp
      
      // Handle generate OTP

      // Validate OTP
      return res.status(200).json({
        message: "User logged in successfully",
        success: true,
      });
    } 
    // User provides nothing in input fields 
    else {
      return res.status(400).json({
        message: "Please provide all necessary details",
        success: false,
      });
    }
  } 
  catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: error.message,
    });
  }
};



const handleUserDashboard = async(req, res)=>{
  try {
    const userId = req.params.id;

    if(req.user._id !== userId && req.user.role !== 'admin'){
      return res.status(403).json({
        message:"Access denied",
        success:false
        });
    }

    const user = await User.findOne({_id:userId}, {password:0});
    if(!user){
      return res.status(404).json({
        message:"User not found",
        success:false
      })
    }
    return res.status(200).json({
      message:'User dashboard data retrieved successfully',
      success: true,
      user:user
    })
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
      success: false,
    })
  }
}

export { handleUserRegistration, handleUserLogin, handleUserDashboard };
