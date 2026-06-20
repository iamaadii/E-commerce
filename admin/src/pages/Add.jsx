import React, { use, useEffect } from 'react'
import { upload } from '../assets/asset'
import { useState } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';

const Add = ({ token }) => {

    const [image1, setImage1] = useState(false);
    const [image2, setImage2] = useState(false);
    const [image3, setImage3] = useState(false);
    const [image4, setImage4] = useState(false);

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("");

    const [category, setCategory] = useState("Men");
    const [subCategory, setSubCategory] = useState("Topwear");
    const [bestseller, setBestseller] = useState(false);
    const [sizes, setSizes] = useState([]);


    // useEffect(() => {
    //     console.log(image1)
    //     // console.log(bestseller)
    // }, [image1, sizes, bestseller])


    const onSubmitHandler = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData();

            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("subCategory", subCategory);
            formData.append("bestseller", bestseller);

            // Arrays are usually sent as JSON strings
            formData.append("sizes", JSON.stringify(sizes));

            // Images
            if (image1) formData.append("image1", image1);
            if (image2) formData.append("image2", image2);
            if (image3) formData.append("image3", image3);
            if (image4) formData.append("image4", image4);

            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/product/add`,
                formData, {
                headers: { token }
            }
            );

            console.log(response)
            if (response.data.success) {
                toast.success(response.data.message)
                setImage1(false);
                setImage2(false);
                setImage3(false);
                setImage4(false);

                setName("");
                setDescription("");
                setPrice("");

            } else {
                toast.error(response.data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
            <div>
                <p className='mb-2'>Upload Image</p>
                <div className='flex gap-2'>
                    <label htmlFor="image1">
                        <img className='w-21' src={image1 ? URL.createObjectURL(image1) : upload} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" name="" id="image1" hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-21' src={image2 ? URL.createObjectURL(image2) : upload} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" name="" id="image2" hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-21' src={image3 ? URL.createObjectURL(image3) : upload} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" name="" id="image3" hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-21' src={image4 ? URL.createObjectURL(image4) : upload} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" name="" id="image4" hidden />
                    </label>
                </div>
            </div>

            <div className='w-full'>
                <p className='mb-2'>Product name</p>
                <input value={name} onChange={(e) => setName(e.target.value)} className='bg-white w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product description</p>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} className='bg-white w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Write content here' required />
            </div>

            {/* Category Row */}
            <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
                <div>
                    <p className="mb-2">Product category</p>
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-3 py-2"
                    >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Sub category</p>
                    <select
                        value={subCategory}
                        onChange={(e) => setSubCategory(e.target.value)}
                        className="w-full px-3 py-2"
                    >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className="mb-2">Product Price</p>
                    <input
                        type="number"
                        placeholder="299"
                        min={1}
                        // step={1}
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        className="w-full px-3 py-2 sm:w-[120px]"
                    />
                </div>
            </div>

            {/* Sizes */}
            <div className="mt-4">
                <p className="mb-2">Product Sizes</p>
                <div className="flex gap-3">
                    {["XS","S", "M", "L", "XL", "XXL"].map((size) => (
                        <p
                            key={size}
                            onClick={() => setSizes((prev) => prev.includes(size) ? prev.filter((a) => a != size) : [...prev, size])}
                            className={`px-3 py-1 cursor-pointer ${sizes.includes(size)
                                ? "bg-pink-200 border-black"
                                : "bg-slate-200 "
                                }`}
                        >
                            {size}
                        </p>
                    ))}
                </div>
            </div>

            {/* Bestseller */}
            <div className="flex items-center gap-2 mt-2">
                <input
                    type="checkbox"
                    id="bestseller"
                    checked={bestseller}
                    onChange={() => setBestseller(prev => !prev)}
                    className="w-4 h-4 cursor-pointer"
                />
                <label htmlFor="bestseller" className="text-sm text-gray-700 cursor-pointer">
                    Add to bestseller
                </label>
            </div>

            {/* Submit */}
            <button
                type="submit"
                className="w-28 py-3 mt-4 bg-black text-white rounded
               hover:bg-gray-900
               active:scale-95
               active:shadow-inner
               transition-all duration-150"
            >
                ADD
            </button>

        </form>
    )
}

export default Add
