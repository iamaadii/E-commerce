import { User } from "../models/user.model.js";

export const addToCart = async (req, res) => {
  try {
        const { userId, itemId, size } = req.body;
        const user = await User.findById(userId);
        let cartData =  user.cartData;
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            } else {
                cartData[itemId][size] = 1;
            }
        } else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        await User.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Added to cart" });
  } 
  catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
  }
};


export const updateCart = async (req, res) => {
  try {
        const { userId, itemId, size, quantity } = req.body;
        const user = await User.findById(userId);
        let cartData =  user.cartData;
        cartData[itemId][size] = quantity;
        await User.findByIdAndUpdate(userId, { cartData });
        return res.json({ success: true, message: "Cart Updated" });
  } 
  catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
  }
};



export const getUserCart = async (req, res) => {
    try {
        const { userId} = req.body;
        const user = await User.findById(userId);
        let cartData = user.cartData;
        return res.json({ success: true,cartData });
  } 
  catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
  }
};
