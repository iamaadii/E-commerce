import express from 'express'
import { addToCart, getUserCart, updateCart } from '../controllers/cart.controller.js';
import { userAuth } from '../middleware/userAuth.js';

export const cartRouter = express.Router()

cartRouter.post("/get",userAuth,getUserCart);
cartRouter.post("/add",userAuth,addToCart);
cartRouter.post("/update",userAuth,updateCart);