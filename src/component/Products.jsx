import React, { useContext, useEffect, useState } from 'react'
import Container from './Container'
import { ApiData } from './ContextApi'
import Slider from 'react-slick'
import { FaHeart, FaShoppingCart } from 'react-icons/fa'
import { FiZoomIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { addToCart } from './slice/productSlice'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const Products = () => {
  const data = useContext(ApiData)
  const dispatch = useDispatch()
  const [filterShow, setFilterShow] = useState([])

  useEffect(() => {
    if (data?.products) {
      setFilterShow(data.products.filter(item => item.isFeatured))
    }
  }, [data])

  const handleAddToCart = (item) => {
    dispatch(addToCart(item))
    toast.success(`${item.title} added to cart!`)
  }

  const products = {
    infinite: true,
    arrows: false,
    dots: true,
    speed: 500,
    slidesToShow: window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 2 : window.innerWidth < 1024 ? 3 : 4,
    slidesToScroll: window.innerWidth < 640 ? 2 : window.innerWidth < 768 ? 1 : window.innerWidth < 1024 ? 2 : 2,
    autoplay: window.innerWidth < 1024,
    autoplaySpeed: 1500,
    responsive: [
      { breakpoint: 640, settings: { slidesToShow: 2, slidesToScroll: 2, autoplay: true } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1, autoplay: true } },
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 2, autoplay: false } },
    ],
    appendDots: dots => (
      <div style={{ position: 'absolute', bottom: '-100px', display: 'flex', justifyContent: 'center', width: '100%' }}>
        <ul style={{ display: 'flex', gap: '10px', margin: 0, padding: 0 }}>{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div style={{ width: '24px', height: '8px', marginBottom: '40px', borderRadius: '20%', backgroundColor: '#d1d5db', cursor: 'pointer' }} />
    ),
  }

  return (
    <Container>
      <div className="mt-8 sm:mt-12 lg:mt-[80px] font-josefin">
        <div className="text-center text-[#1A0B5B] text-2xl sm:text-3xl lg:text-[42px] font-semibold">
          <h2>Featured Products</h2>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-[60px] prdct">
          <Slider {...products}>
            {filterShow.map((item, i) => (
              <div key={item.id} className="px-2 sm:px-3">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.05 }}
                >
                  {/* Image Box */}
                  <div className="bg-gray-100 p-3 sm:p-4 h-[200px] sm:h-[250px] lg:h-[320px] flex items-center justify-center shadow-lg relative group overflow-hidden">
                    <div className="absolute left-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex gap-2 z-10">
                      <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="bg-white p-2 rounded-full shadow-md hover:bg-red-50 hover:text-red-500 transition-colors">
                        <FaHeart className="text-sm" />
                      </motion.button>
                      <motion.button whileHover={{ scale: 1.15 }} whileTap={{ scale: 0.9 }} className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors">
                        <FiZoomIn className="text-sm" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(item)}
                        className="bg-white p-2 rounded-full shadow-md hover:bg-blue-50 hover:text-blue-500 transition-colors"
                      >
                        <FaShoppingCart className="text-sm cursor-pointer" />
                      </motion.button>
                    </div>

                    <Link to={`/productdetails/${item.id}`}>
                      <button className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white lg:px-4 sm:px-6 py-2 rounded-md opacity-0 group-hover:opacity-100 cursor-pointer transition-all duration-300 hover:bg-green-600 text-sm sm:text-base z-10">
                        View Details
                      </button>
                    </Link>

                    <Link to="/allproduct">
                      <motion.img
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.3 }}
                        className="h-[150px] w-[300px] lg:h-[250px] lg:w-[250px] object-cover"
                        src={item.thumbnail}
                        alt={item.title}
                      />
                    </Link>
                  </div>

                  {/* Info Box */}
                  <div className="bg-white p-3 sm:p-4 shadow-lg min-h-[100px] sm:min-h-[120px] group hover:bg-[#2F1AC4] transition-all duration-300 ease-in-out cursor-pointer text-center">
                    <h3 className="text-sm sm:text-base lg:text-lg text-[#FB2E86] group-hover:text-white mb-1 sm:mb-2 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex gap-2 sm:gap-3 justify-center py-1 sm:py-2">
                      <div className="h-[2px] w-[15px] sm:w-[20px] bg-[green] rounded-[2px]" />
                      <div className="h-[2px] w-[15px] sm:w-[20px] bg-[#fc03f3] rounded-[2px]" />
                      <div className="h-[2px] w-[15px] sm:w-[20px] bg-[blue] group-hover:bg-[white] rounded-[2px]" />
                    </div>
                    <span className="text-[#151875] group-hover:text-white block mt-2 sm:mt-3 text-xs sm:text-sm">Code - Y523201</span>
                    <span className="text-[#151875] group-hover:text-white mt-2 sm:mt-4 block text-sm sm:text-base font-semibold">${item.price}</span>
                  </div>
                </motion.div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </Container>
  )
}

export default Products