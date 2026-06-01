import React, { useContext, useEffect, useState } from 'react'
import Container from '../component/Container'
import { FaList, FaRegStar, FaStar, FaStarHalfAlt, FaTh } from 'react-icons/fa'
import { ApiData } from '../component/ContextApi'
import { Link } from 'react-router-dom'
import { GoZoomIn } from 'react-icons/go'
import { BsCart } from 'react-icons/bs'
import { SlHeart } from 'react-icons/sl'
import { useDispatch } from 'react-redux'
import { addToCart } from '../component/slice/productSlice'
import com from '../assets/company.png'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const AllProduct = () => {
  const info = useContext(ApiData)
  const dispatch = useDispatch()
  const [perPage, setPerPage] = useState(6)
  const [currentPage, setCurrentPage] = useState(1)
  const [categories, setCategories] = useState([])
  const [brands, setBrands] = useState([])
  const [colors, setColors] = useState([])
  const [filterShow, setFilterShow] = useState([])
  const [view, setView] = useState('')
  const [cateFilterShow, setCateFilterShow] = useState([])
  const [show, setShow] = useState(true)
  const [searchProduct, setSearchProduct] = useState('')
  const [activeFilter, setActiveFilter] = useState(null)

  const lastPage = perPage * currentPage
  const firstPage = lastPage - perPage
  const allPage = info.products.slice(firstPage, lastPage)

  const pageNumber = []
  for (let i = 0; i < Math.ceil(info.products?.length / perPage); i++) pageNumber.push(i)

  const paginate = (index) => setCurrentPage(index + 1)
  const next = () => { if (currentPage < pageNumber.length) setCurrentPage(s => s + 1) }
  const previous = () => { if (currentPage > 1) setCurrentPage(s => s - 1) }
  const handlePerPage = (e) => setPerPage(e.target.value)

  useEffect(() => {
    if (info?.products) {
      setCategories([...new Set(info.products.map(item => item.category))])
      setBrands([...new Set(info.products.map(item => item.brand))])
      setColors([...new Set(info.products.map(item => item.color))])
    }
  }, [info])

  const handleCategory = (citem) => {
    setFilterShow(info.products.filter(item => item.category === citem))
    setActiveFilter(citem)
  }
  const handleBrand = (bitem) => {
    setFilterShow(info.products.filter(item => item.brand === bitem))
    setActiveFilter(bitem)
  }
  const handleColor = (colorItem) => {
    setFilterShow(info.products.filter(item => item.color === colorItem))
    setActiveFilter(colorItem)
  }
  const handlePrice = (value) => {
    setFilterShow(info.products.filter(item => item.price > value.low && item.price < value.high))
    setActiveFilter(`$${value.low}-${value.high}`)
  }
  const handleRating = (rating) => {
    setFilterShow(info.products.filter(item => item.rating == rating))
    setActiveFilter(`${rating}★`)
  }
  const handleSearch = (e) => {
    const v = e.target.value.toLowerCase()
    setSearchProduct(v)
    setActiveFilter(v ? `"${v}"` : null)
    if (!v) setFilterShow([])
    else setFilterShow(info.products.filter(item =>
      item.title.toLowerCase().includes(v) ||
      item.category.toLowerCase().includes(v) ||
      item.brand.toLowerCase().includes(v)
    ))
  }
  const handleClear = () => {
    setFilterShow([])
    setActiveFilter(null)
    setSearchProduct('')
  }

  useEffect(() => {
    setCateFilterShow(filterShow.slice(0, 6))
  }, [filterShow])

  const discountPrice = (product) => {
    const discount = (product.price * product.discountPercentage) / 100
    return (product.price - discount).toFixed(2)
  }

  const clientRating = (rating) =>
    Array.from({ length: 5 }, (_, index) => {
      const n = index + 0.5
      return rating > index + 1
        ? <FaStar key={index} className='text-[gold]' />
        : rating > n
          ? <FaStarHalfAlt key={index} className='text-[gold]' />
          : <FaRegStar key={index} className='text-[gold]' />
    })

  const handleAddToCart = (e, item) => {
    e.preventDefault()
    e.stopPropagation()
    dispatch(addToCart(item))
    toast.success(`${item.title} added to cart!`)
  }

  const displayProducts = filterShow.length > 0 ? cateFilterShow : allPage

  const gridClass = 'w-full grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6'
  const listClass = 'w-full flex flex-col space-y-4'

  return (
    <Container>
      <div className="mt-2 lg:mt-[60px] py-[40px]">
        <h2 className='text-[#101750] text-[36px] font-semibold'>All Products</h2>
        <h2 className='text-[#0D134E]'>
          <Link to="/"><span className='hover:text-[#FB2E86] transition-colors'>Home</span></Link>.Pages.
          <Link to="/allproduct"><span className='hover:text-[#FB2E86] transition-colors'>Products</span></Link>
        </h2>
      </div>

      {/* Controls */}
      <div className="mx-auto py-3">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="w-full md:w-2/5 mb-3 md:mb-0 hidden lg:block">
            <h2 className="text-lg font-semibold text-[#151875]">Ecommerce Accessories & Fashion Items</h2>
          </div>
          <div className="flex gap-2 w-full md:flex lg:flex sm:flex-row justify-end items-center space-y-3 md:space-y-0 md:space-x-4">
            {filterShow.length === 0 && (
              <div className="flex items-center space-x-2">
                <span className="text-sm text-[#3F509E] hidden sm:block">Per page:</span>
                <select onChange={handlePerPage} className="text-sm border rounded px-2 w-[60px] py-1 focus:ring-1 focus:ring-[#FB2E86] focus:outline-none transition-all">
                  {[6, 9, 15, 27, 36].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
            )}
            <div className="flex items-center space-x-2">
              <span className="text-sm text-[#3F509E] hidden sm:block">Sort by:</span>
              <select className="text-sm border w-[150px] rounded px-2 py-1 focus:ring-1 focus:ring-[#FB2E86] focus:outline-none transition-all">
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>
            <div className="flex items-center space-x-1 p-1">
              <h2 className='text-[#3F509E]'>View:</h2>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView('')} className={`p-1.5 rounded transition-all ${view !== 'active' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}><FaTh size={16} /></motion.button>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setView('active')} className={`p-1.5 rounded transition-all ${view === 'active' ? 'bg-blue-500 text-white' : 'hover:bg-gray-100'}`}><FaList size={16} /></motion.button>
            </div>
            <div className="flex-1 max-w-xs">
              <input
                type="text"
                className="hidden sm:block w-full py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:border-transparent text-sm transition-all"
                placeholder="Search products..."
                value={searchProduct}
                onChange={handleSearch}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="container mx-auto py-6">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar */}
          <div className="w-full lg:w-1/5 hidden md:block">
            <div className="bg-white">
              <div className="flex justify-between items-center mb-8">
                <h2 className="font-semibold text-[18px] text-[blue] hidden lg:block">Filter</h2>
                {filterShow.length > 0 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClear}
                    className="text-sm underline text-red-600 cursor-pointer flex items-center gap-1"
                  >
                    Clear {activeFilter && <span className="bg-red-100 text-red-700 text-xs px-2 py-0.5 rounded-full">{activeFilter}</span>}
                  </motion.button>
                )}
              </div>

              {/* Categories */}
              <div className="pb-4 mb-4">
                <h3 className="font-semibold text-[#151875] underline">Categories</h3>
                <div className="mt-3 space-y-2 max-h-[180px] overflow-y-scroll">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <label
                        onClick={() => handleCategory(category)}
                        className={`text-sm cursor-pointer capitalize transition-colors hover:text-[#FB2E86] ${activeFilter === category ? 'text-[#FB2E86] font-semibold' : 'text-gray-600'}`}
                      >{category}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Brand */}
              <div className="pb-4 mb-4">
                <h3 className="font-semibold text-[#151875] underline">Brand</h3>
                <div className="mt-3 space-y-2 max-h-[200px] overflow-y-scroll">
                  {brands.map(brand => (
                    <div key={brand} className="flex items-center">
                      <label
                        onClick={() => handleBrand(brand)}
                        className={`text-sm cursor-pointer transition-colors hover:text-[#FB2E86] ${activeFilter === brand ? 'text-[#FB2E86] font-semibold' : 'text-gray-600'}`}
                      >{brand}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pb-4 mb-4">
                <h3 className="font-semibold text-[#151875] underline">Price</h3>
                <div className="mt-3 space-y-2">
                  {[
                    { label: '$0 - $99.99', value: { low: 0, high: 100 } },
                    { label: '$100 - $499.99', value: { low: 100, high: 500 } },
                    { label: '$500 - $999.99', value: { low: 500, high: 1000 } },
                    { label: '$1000 - $1999.99', value: { low: 1000, high: 2000 } },
                  ].map(({ label, value }) => (
                    <div key={label} className="flex items-center">
                      <label
                        onClick={() => handlePrice(value)}
                        className="text-sm text-gray-600 cursor-pointer py-2 hover:text-[#FB2E86] transition-colors"
                      >{label}</label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div className="pb-4 mb-4">
                <h3 className="font-semibold text-[#151875] underline mb-3">Rating</h3>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(r => (
                    <div key={r} className="flex items-center">
                      <label
                        onClick={() => handleRating(r)}
                        className="text-sm text-gray-600 cursor-pointer py-2 flex items-center gap-1 hover:opacity-80 transition-opacity"
                      >
                        {clientRating(r)} <span className="ml-1">({r})</span>
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Color */}
              <div className="pb-4">
                <h3 className="font-semibold text-[#151875] underline">Color</h3>
                <div className="mt-3 max-h-[200px] overflow-y-scroll space-y-2">
                  {colors.map(color => (
                    <div key={color} className="flex items-center">
                      <label
                        onClick={() => handleColor(color)}
                        className={`text-sm cursor-pointer capitalize transition-colors hover:text-[#FB2E86] ${activeFilter === color ? 'text-[#FB2E86] font-semibold' : 'text-gray-600'}`}
                      >{color}</label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="w-full lg:w-4/5">
            <div className="bg-white">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-[#151875]">
                  Showing {filterShow.length > 0 ? `${cateFilterShow.length} of ${filterShow.length}` : `${allPage.length} of ${info.products?.length || 0}`} products
                </h2>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${view}-${activeFilter}-${currentPage}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className={view === 'active' ? listClass : gridClass}
                >
                  {displayProducts.map((item, i) =>
                    view === 'active' ? (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="flex items-center gap-4 p-4 w-full bg-white hover:shadow-lg transition-all ease-in-out rounded-sm"
                      >
                        <Link to={`/productdetails/${item.id}`}>
                          <img src={item.thumbnail} alt="" className="w-[60px] h-[60px] md:w-[120px] md:h-[100px] lg:w-[200px] lg:h-[170px] object-cover" />
                        </Link>
                        <div className="flex-1">
                          <h2 className="text-[#151875] font-semibold text-lg">{item.title}</h2>
                          <div className="flex items-center mt-2 hidden md:flex">{clientRating(item.rating)}<span className="text-sm text-gray-600 ml-2">({item.rating})</span></div>
                          <p className="text-[#9295AA] mt-2 hidden lg:block line-clamp-2">{item.description}</p>
                          <div className="flex justify-between items-center mt-3">
                            <div className="flex items-center gap-2">
                              <span className="text-lg font-bold text-[#111C85]">${discountPrice(item)}</span>
                              <span className="text-lg font-bold line-through text-[#FF2AAA]">${item.price}</span>
                            </div>
                            <div className="flex">
                              {[SlHeart, GoZoomIn].map((Icon, j) => (
                                <motion.button key={j} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                                  <Icon size={18} className="text-blue-600" />
                                </motion.button>
                              ))}
                              <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={(e) => handleAddToCart(e, item)} className="bg-white p-2 rounded-full hover:bg-gray-200 transition-colors">
                                <BsCart size={18} className="text-blue-600 cursor-pointer" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}
                        className="py-2 group relative bg-white transition-all ease-in-out rounded-sm"
                      >
                        <Link to={`/productdetails/${item.id}`}>
                          <img src={item.thumbnail} alt="" className="w-full h-[150px] lg:h-[250px] object-cover" />
                        </Link>
                        <div className="p-4">
                          <h2 className="flex justify-center text-blue-600">{item.title}</h2>
                          <div className="flex items-center justify-center mt-2">{clientRating(item.rating)}</div>
                          <div className="flex items-center gap-4 mt-4 justify-center">
                            <p className="text-[16px] line-through text-[#FF2AAA]">${item.price}</p>
                            <p className="text-blue-600">${discountPrice(item)}</p>
                          </div>
                          <div className="absolute top-3 left-0">
                            <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                              {[SlHeart, GoZoomIn].map((Icon, j) => (
                                <motion.button key={j} whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="bg-white p-2 rounded-full hover:bg-gray-200 shadow transition-colors">
                                  <Icon size={18} className="text-blue-800" />
                                </motion.button>
                              ))}
                              <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} onClick={(e) => handleAddToCart(e, item)} className="bg-white p-2 rounded-full hover:bg-gray-200 shadow transition-colors">
                                <BsCart size={18} className="text-blue-800 cursor-pointer" />
                              </motion.button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Show more / pagination */}
              {filterShow.length > 6 && (
                <div className="flex justify-center mt-8">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={show ? () => { setCateFilterShow(filterShow); setShow(false) } : () => { setCateFilterShow(filterShow.slice(0, 6)); setShow(true) }}
                    className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {show ? `Show All (${filterShow.length} products)` : 'Show Less'}
                  </motion.button>
                </div>
              )}

              {filterShow.length === 0 && pageNumber.length > 1 && (
                <div className="flex justify-center mt-[50px]">
                  <ul className="flex items-center gap-1">
                    <li>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={previous} className="px-3 py-1 border rounded cursor-pointer hover:bg-blue-50 transition-colors">Previous</motion.button>
                    </li>
                    {pageNumber.map((_, i) => {
                      const last = pageNumber.length - 1
                      if (i < 4 || i === last || (i >= currentPage - 2 && i <= currentPage)) {
                        return (
                          <li key={i} onClick={() => paginate(i)}>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              className={`px-3 py-1 rounded cursor-pointer transition-all ${currentPage === i + 1 ? 'bg-blue-600 text-white' : 'border text-blue-700 hover:bg-blue-50'}`}
                            >{i + 1}</motion.button>
                          </li>
                        )
                      }
                      if (i === last - 1 && currentPage < last - 1) return <span key={i} className="px-2">...</span>
                      return null
                    })}
                    <li>
                      <motion.button whileTap={{ scale: 0.95 }} onClick={next} className="px-3 py-1 border rounded cursor-pointer hover:bg-blue-50 transition-colors">Next</motion.button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12 flex justify-end mr-[80px] cursor-pointer">
        <img src={com} alt="" />
      </div>
    </Container>
  )
}

export default AllProduct