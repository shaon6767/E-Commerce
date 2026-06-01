import React, { useContext, useState } from 'react'
import Container from './Container'
import { ApiData } from './ContextApi'
import { FaHeart, FaShoppingCart, FaSearchPlus } from 'react-icons/fa'
import delivery from '../assets/delivery.png'
import quality from '../assets/quality.png'
import cashback from '../assets/cashback.png'
import support from '../assets/support.png'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from './slice/productSlice'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const tabs = [
  { key: 'newArrival', label: 'New Arrival' },
  { key: 'bestSeller', label: 'Best Seller' },
  { key: 'featured', label: 'Featured' },
  { key: 'specialOffer', label: 'Special Offer' },
]

const featureCards = [
  { img: delivery, label: 'Free Delivery' },
  { img: cashback, label: '100% Cash Back' },
  { img: quality, label: 'Quality Product' },
  { img: support, label: '24/7 Support' },
]

const Latest = () => {
  const data = useContext(ApiData)
  const dispatch = useDispatch()
  const [activeCategory, setActiveCategory] = useState('newArrival')

  let filteredProducts = []
  if (data?.products) {
    const keyMap = {
      newArrival: 'isNew',
      bestSeller: 'isBestSeller',
      featured: 'isFeatured',
      specialOffer: 'isSpecialOffer',
    }
    filteredProducts = data.products.filter(item => item[keyMap[activeCategory]]).slice(0, 6)
  }

  const discountPrice = (product) => {
    if (!product) return 0
    return (product.price - (product.price * product.discountPercentage) / 100).toFixed(2)
  }

  const handleAddToCart = (e, item) => {
    e.preventDefault()
    dispatch(addToCart(item))
    toast.success(`${item.title} added to cart!`)
  }

  return (
    <Container>
      <div className="mt-[100px] sm:mt-[200px] lg:mt-[120px] font-josefin">
        <div className="text-center text-[#1A0B5B] text-2xl sm:text-3xl lg:text-[42px] font-semibold">
          <h2>Latest Products</h2>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 lg:gap-12 mt-4 sm:mt-6 lg:mt-8">
          {tabs.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveCategory(key)}
              className={`text-sm sm:text-base lg:text-[18px] font-semibold pb-2 relative transition-colors duration-200 ${
                activeCategory === key ? 'text-pink-500' : 'text-[#1A0B5B] hover:text-pink-400'
              }`}
            >
              {label}
              {activeCategory === key && (
                <motion.div
                  layoutId="tab-underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-pink-500 rounded-full"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Product Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="mt-6 sm:mt-8 lg:mt-[50px] grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-2"
          >
            {filteredProducts.map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.06 }}
              >
                <Link to={`/productdetails/${item.id}`} className="group block">
                  <div className="bg-white p-2 sm:p-6 lg:p-4 h-[180px] sm:h-[350px] lg:h-[400px] flex items-center cursor-pointer justify-center relative overflow-hidden">
                    <motion.img
                      whileHover={{ scale: 1.07 }}
                      transition={{ duration: 0.3 }}
                      className='w-[180px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[300px] lg:h-[300px] object-cover z-10'
                      src={item.thumbnail}
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg" />

                    <div className="absolute left-0 lg:left-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col gap-2 sm:gap-4 pointer-events-none z-20">
                      <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-50 pointer-events-auto hover:text-blue-500 transition-colors">
                        <FaHeart className="text-sm sm:text-lg" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="bg-white p-2 sm:p-3 rounded-full shadow-lg pointer-events-auto hover:bg-blue-50 hover:text-blue-500 transition-colors">
                        <FaSearchPlus className="text-sm sm:text-lg" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => handleAddToCart(e, item)}
                        className="bg-white p-2 sm:p-3 rounded-full shadow-lg hover:bg-blue-50 pointer-events-auto hover:text-blue-500 transition-colors"
                      >
                        <FaShoppingCart className="text-sm sm:text-lg cursor-pointer" />
                      </motion.button>
                    </div>

                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-red-500 text-white px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                      SALE
                    </div>
                  </div>

                  <div className="flex justify-center gap-10 items-center px-2 sm:px-4 mt-3 sm:mt-4">
                    <h3 className="text-xs sm:text-sm lg:text-[16px] font-semibold text-[#151875] line-clamp-2">{item.title}</h3>
                    <div className="flex gap-1 sm:gap-2 items-center">
                      <p className="text-[#151875] font-bold text-xs sm:text-[14px]">${discountPrice(item)}</p>
                      <p className="text-[#FB2448] line-through font-bold text-xs sm:text-[14px]">${item.price}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Feature Cards */}
        <div className="mt-8 sm:mt-12 lg:mt-[100px]">
          <h2 className='text-center text-[#1A0B5B] text-2xl sm:text-3xl lg:text-[42px] font-semibold'>What Shopex Offer!</h2>
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {featureCards.map(({ img, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                whileHover={{ y: -4, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
                className="bg-white p-6 sm:p-8 lg:p-16 shadow-lg text-center transition-shadow duration-300"
              >
                <div className="flex justify-center mb-3 sm:mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 bg-gray-200 rounded-full flex items-center justify-center">
                    <img src={img} alt={label} className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />
                  </div>
                </div>
                <h3 className="text-sm sm:text-base lg:text-lg font-semibold mb-2 sm:mb-3 text-[#151875]">{label}</h3>
                <p className="text-[#1a0b5b6c] text-xs sm:text-sm w-full sm:w-[180px] lg:w-[200px] mx-auto">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa purus gravida.
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Latest