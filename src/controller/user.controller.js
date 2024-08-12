import { User } from "../models/user.model.js";
import { UploadOnCloudinary } from "../utils/cloudinary.js";
import bcrypt from "bcrypt"; 

export const RegisterUser = async (req, res) => {
  const { fullname, email, contact, password } = req.body;

  if ([fullname, email, contact, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All fields are required" });
  }

  const existingUser = await User.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }

  let avatar = null;
  if (req.file) {
    const avatarLocalPath = req.file.path;
    avatar = await UploadOnCloudinary(avatarLocalPath);
  }


    const newUser = await User.create({
      fullname,
      email,
      contact,
      password,
      avatar: avatar.url,
    });

    const createdUser = await newUser.findById(newUser._id).select("-password -refreshToken");

    res.status(201).json({ createdUser, message: "User created successfully" });
  
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  
  if (!user) {
    return res.status(400).json({ message: "User not found" });
  }

  const matchPassword = await user.isPasswordCorrect(password);
  if (!matchPassword) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  const accessToken = user.GenrateAcessToken();
  const refreshToken = user.generateRefreshToken();

  const loggedUser = await User.findById(user._id).select('-password -refreshToken');

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res.status(200)
    .cookie('accessToken', accessToken, options)
    .cookie('refreshToken', refreshToken, options)
    .json({
      user: loggedUser,
      accessToken,
      refreshToken,
      message: 'User logged in successfully',
    });
};

export const logoutUser = async (req, res) => {
  await User.findByIdAndUpdate(
    req.user._id,
    { $unset: { refreshToken: 1 } },
    { new: true }
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  res.status(200)
    .clearCookie('accessToken', options)
    .clearCookie('refreshToken', options)
    .json({ message: 'User logged out' });
};

export const changePassword = async (req, res) => {
  const { oldpassword, newPassword } = req.body;
  const userId = req.user._id;

  const user = await User.findById(userId);

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  const matchPassword = await user.isPasswordCorrect(oldpassword);

  if (!matchPassword) {
    return res.status(400).json({ error: "Incorrect password" });
  }

  user.password = await bcrypt.hash(newPassword, 10);
  await user.save();

  res.status(200).json({ message: "Password changed successfully" });
};

export const changeAvatar = async (req, res) => {
  const avatarLocalPath = req.file?.path;

  if (!avatarLocalPath) {
    return res.status(400).json({ error: "Avatar file is required" });
  }

  const avatar = await UploadOnCloudinary(avatarLocalPath);

  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar: avatar.url } },
    { new: true }
  ).select('-password');

  res.status(200).json({ message: "Avatar updated successfully", user: updatedUser });
};

export const getUserDetails = async (req, res) => {
    try {
      const userId = req.user._id;
  
      const userDetails = await User.aggregate([
        { $match: { _id: mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'properties',
            localField: '_id',
            foreignField: 'owner',
            as: 'uploadedProperties'
          }
        },
        {
          $project: {
            fullname: 1,
            email: 1,
            contact: 1,
            avatar: 1,
            uploadedProperties: 1
          }
        }
      ]);
  
      if (userDetails.length === 0) {
        return res.status(404).json({ message: "User not found" });
      }
  
      res.status(200).json(userDetails[0]);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Something went wrong while fetching user details" });
    }
  };