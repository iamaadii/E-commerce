import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { dropdown_icon } from '../assets/asset'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

const Collection = () => {
  const { products, categories, sub_categories, search, showSearch } = useContext(ShopContext)
  const [showFilter, setShowFilter] = useState(false)
  const [filterProducts, setFilterProducts] = useState([])
  const [category, setCategory] = useState([])
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState("relavent")

  const toogleCategory = (e) => {
    const cat = e.target.value;
    if (category.includes(cat)) {
      setCategory(prev => prev.filter((item) => item !== cat))
    }
    else {
      setCategory(prev => [...prev, cat]);
    }
  }

  const toogleSubCategory = (e) => {
    const subCat = e.target.value;
    if (subCategory.includes(subCat)) {
      setSubCategory(prev => prev.filter((item) => item !== subCat))
    }
    else {
      setSubCategory(prev => [...prev, subCat]);
    }
  }


  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter((product) => product.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter((product) => category.includes(product.category))
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((product) => subCategory.includes(product.subCategory))
    }
    setFilterProducts(productsCopy)
  }


  const sortProduct = () => {
    let fpCopy = filterProducts.slice();
    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter()

    }
  }


  useEffect(() => {
    // console.log(category)
    // console.log(subCategory)
    applyFilter()
  }, [category, subCategory, search, showSearch,products])


  useEffect(() => {
    sortProduct()
  }, [sortType])


  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-gray-300'>

      {/* filter options */}
      <div className='min-w-60'>
        <p onClick={() => setShowFilter(!showFilter)} className="my-2 text-xl flex items-center cursor-pointer gap-2">FILTERS
          <img className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" src={dropdown_icon} />
        </p>

        {/* Category filter  */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium ' >CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {categories.map((category,index) => (
              <p className='flex gap-2' key={index}>
                <input type='checkbox' className='w-3' onChange={toogleCategory} value={category} /> {category}
              </p>
            ))}
          </div>
        </div>

        {/* sub-Category filter  */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 sm:block ${showFilter ? '' : 'hidden'}`}>
          <p className='mb-3 text-sm font-medium ' >TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
            {sub_categories.map((sub_category,index) => (
              <p className='flex gap-2'key={index}>
                <input type='checkbox' className='w-3' onChange={toogleSubCategory} value={sub_category} /> {sub_category}
              </p>
            ))}
          </div>
        </div>
      </div>



      {/* Right Side  */}
      <div className='flex-1'>

        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'ALL'} text2={'COLLECTIONS'} />
          {/* Product Sort*/}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-gray-300 text-sm px-2'>
            <option value="relavent">Sort by: Relavent</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>


        {/* Map Products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((product) => (
              <ProductItem
                key={product._id}
                id={product._id}
                images={product.images}
                name={product.name}
                price={product.price}
              />
            ))
          }
        </div>

      </div>

    </div>
  )
}

export default Collection;
