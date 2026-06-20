import express from "express";
import { v2 as cloudinary } from "cloudinary";
import { Product } from "../models/product.model.js";

const uploadOnCloudinary = async (localFilePath) => {
  try {
    //upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "image",
    });

    // file has been uploaded successfull
    console.log("Image is uploaded on cloudinary ");
    return response;
  } catch (error) {
    console.log("Error while uploading image on cloudinary ");
    console.log(error);
    return;
  }
};

export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;
    // console.log(req.files);


    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];
    // console.log(image1,image2,image3,image4);

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined,
    );
    // console.log(images);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let response = await uploadOnCloudinary(item.path);
        return response.url;
      }),
    );
    // console.log(imagesUrl);

    const newProduct = await Product.create({
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller == "true" ? true : false,
      sizes: JSON.parse(sizes),
      images: imagesUrl,
    });
    return res.json({
      success: true,
      message: "Product added successfully",
      newProduct,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while adding product",
    });
  }
};
export const removeProduct = async (req, res) => {
  try {
    const products = await Product.findByIdAndDelete(req.body.id);
    return res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while removing product",
    });
  }
};
export const listProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    return res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while listing product",
    });
  }
};
export const singleProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.body.id);
    return res.json({ sucess: true, product });
  } catch (error) {
    console.log(error);
    return res.json({
      success: false,
      message: "Error while fetching product",
    });
  }
};
