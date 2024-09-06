import { uploadOnCloudinary } from "../utils/cloudinary.js";
import User from "../models/user.model.js";
import verifyToken from "../utils/verifyToken.js";

const handleUlpoadAvatar = async (req, res) => {
  try {
    const imageLocalPath = req.file.path;

    const authHeader = req.headers.authorization.split(" ")[1];

    const userData = verifyToken(authHeader);

    if (!imageLocalPath) {
      return res.status(400).json({
        message: "Profile photo is required",
        success: false,
      });
    }

    const avatar = await uploadOnCloudinary(imageLocalPath);

    if (!avatar) {
      return res.status(500).json({
        message: "Failed to upload image to Cloudinary",
        success: false,
      });
    }

    // Store the avatar url on the database of that particular user
    const user = await User.findByIdAndUpdate(
      userData._id,
      { profileImage: avatar.url },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }
    return res.status(200).json({
      message: "Avatar uploaded successfully",
      success: true,
      imgURL: avatar.url,
    });
  } catch (error) {
    console.error("Error in handleUlpoadAvatar:", error);
    return res.status(500).json({
        message: "Server error",
        success: false
    });
  }
};

const handleUserProfile = async(req, res)=>{
  try {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if(!user){
      return res.status(400).json({
        message: "User not found",
        success: false
      });
    }
    if(req.user._id !== userId){
      return res.status(403).json({
        message: "You are not authorized to view this user's profile",
        success: false
      });
    }
    return res.status(200).json({
      message: "User profile retrieved successfully",
      success: true,
      user: user
    });
  }
  catch(error){
    return res.status(500).json({
      message:'Internal server error',
      success: false
    })
  }
};

export { handleUlpoadAvatar, handleUserProfile };
