import express from 'express'
import { adminAuth} from '../middleware/adminAuth.js';
import {userAuth} from '../middleware/userAuth.js';
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpay } from '../controllers/order.controller.js';

export const orderRouter = express.Router()


//admin-feature
orderRouter.post("/list",adminAuth,allOrders);
orderRouter.post("/status",adminAuth,updateStatus);


//payment-method
orderRouter.post("/place",userAuth,placeOrder);
orderRouter.post("/stripe",userAuth,placeOrderStripe);  
orderRouter.post("/razorpay",userAuth,placeOrderRazorpay);  


//verify-payment
orderRouter.post("/verifyRazorpay",userAuth,verifyRazorpay);  


//user features
orderRouter.post("/orders",userAuth,userOrders)