import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.contoller.js";
import { upload } from "../middleware/multer.middleware.js";
import { adminAuth } from "../middleware/adminAuth.js";

export const productRouter = express.Router();

productRouter.post(
  "/add",adminAuth,
  upload.fields([
    {
      name: "image1",
      maxCount: 1,
    },
    {
      name: "image2",
      maxCount: 1,
    },
    {
      name: "image3",
      maxCount: 1,
    },
    {
      name: "image4",
      maxCount: 1,
    },
  ]),
  addProduct,
);

productRouter.post("/remove",adminAuth, removeProduct);
productRouter.get("/single", singleProduct);
productRouter.get("/list", listProducts);
