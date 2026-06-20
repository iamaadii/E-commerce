import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const generateToken = async (id,email) => {
  // console.log(name,email);
  return await jwt.sign({ id,email }, process.env.JWT_SECRET);
};

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // if(!validator.isEmail(email)){
    //     return res.json({success:false,message:"Please enter a valid email"})
    // }
    // if(password.length<8){
    //     return res.json({success:false,message:"Please enter a strong password"})
    // }

    const existerUser = await User.findOne({ email });
    if (existerUser) {
      return res.json({ success: false, message: "User Already exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashPassword,
    });

    const token = await generateToken(user._id,user.email);
    return res.json({
      success: true,
      message: "Registration Successfull",
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({ success: false, message: "Error while registering" });
  }
};






export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ success: false, message: "Invalid email" });
    }

    const isPassMatch = await bcrypt.compare(password, user.password);
    console.log(isPassMatch);

    if (!isPassMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = await generateToken(user._id,user.email);
    return res.json({
      success: true,
      message: "Logged-in successfully",
      token,
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: "Error while login" });
  }
};







export const adminLogin = async (req,res) => {
  try {
    const {email,password} = req.body;
    if(email===process.env.ADMIN_EMAIL && password===process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email,password},process.env.JWT_SECRET);
        
        return res.json({success:true,message:"Logged-in successfully",token})
    }
    return res.json({success:false,message:"Invalid Credentials"})
  } catch (error) {
    console.error(error);
    return res.json({success:false,message:"Error while login"})
  }
};
