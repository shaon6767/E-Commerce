import React, { useEffect, useRef, useState } from 'react'
import Container from './Container'
import { GoMail } from 'react-icons/go'
import { BiPhoneCall } from 'react-icons/bi'
import { FaRegHeart, FaUser } from 'react-icons/fa'
import { GrCart } from 'react-icons/gr'
import { useDispatch, useSelector } from 'react-redux'
import { productRemove } from './slice/productSlice'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const Header = () => {
  let data = useSelector((state) => state.product.cartItem)
  let dispatch = useDispatch()
  let navigate = useNavigate()
  let [cart, setCart] = useState(false)
  let cartRef = useRef()
  let cartDropdownRef = useRef()

  useEffect(() => {
    let handleClick = (e) => {
      if (cartRef.current.contains(e.target)) {
        setCart((prev) => !prev)
      } else if (cartDropdownRef.current && !cartDropdownRef.current.contains(e.target)) {
        setCart(false)
      }
    }
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [cart])

  let handleRemove = (i, e) => {
    e.stopPropagation()
    dispatch(productRemove(i))
  }

  let { totalPrice } = data.reduce(
    (acc, item) => { acc.totalPrice += item.price * item.quantity; return acc },
    { totalPrice: 0 }
  )

  let handleGoCart = () => { setCart(false); navigate('/cart') }
  let handleCheckout = () => { setCart(false); navigate('/checkout') }

  useEffect(() => { setCart(false) }, [navigate])

  useEffect(() => {
    if (typeof initFlowbite !== 'undefined') initFlowbite()
  }, [])

  return (
    <section className='bg-[#7E33E0] font-josefin'>
      <Container>
        <div className="py-2">
          <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-6 lg:grid-cols-7 xl:grid-cols-6">
            <div className="flex gap-10">
              <div className="hidden sm:flex gap-2 items-center">
                <GoMail className="text-white" />
                <p className="text-white text-sm">mhhasanul@gmail.com</p>
              </div>
              <div className="flex gap-2 items-center">
                <BiPhoneCall className="text-white" />
                <p className="text-white text-sm">(12345)67890</p>
              </div>
            </div>
            <div></div><div></div><div></div>

            <div className="flex lg:ml-[30px] sm:ml-[10px] items-center gap-3">
              <div className="hidden lg:flex items-center">
                <div>
                  <button
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdownLang"
                    className="text-white rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center transition-opacity hover:opacity-80"
                    type="button"
                  >
                    English
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="#" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div id="dropdownLang" className="z-10 hidden bg-white divide-y divide-gray-100 shadow-sm w-25 dark:bg-gray-700">
                    <ul className="text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Bangla</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">French</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Arabic</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">Spanish</a></li>
                    </ul>
                  </div>
                </div>
                <div className="lg:ml-4 sm:ml-2">
                  <button
                    id="dropdownDefaultSecButton"
                    data-dropdown-toggle="dropdownCurrency"
                    className="text-white rounded-lg text-sm px-1 py-2.5 text-center inline-flex items-center transition-opacity hover:opacity-80"
                    type="button"
                  >
                    USD
                    <svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="#" fill="none" viewBox="0 0 10 6">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                    </svg>
                  </button>
                  <div id="dropdownCurrency" className="z-10 hidden bg-white divide-y divide-gray-100 shadow-sm w-20 dark:bg-gray-700">
                    <ul className="text-sm text-gray-700 dark:text-gray-200">
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">EURO</a></li>
                      <li><a href="#" className="block px-4 py-2 hover:bg-gray-100">BDT</a></li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Login */}
              <motion.div
                className="flex items-center lg:px-2 sm:px-0 gap-2 text-white cursor-pointer"
              >
                <p className='hidden sm:block text-sm'>Login</p>
                <FaUser />
              </motion.div>

              {/* Wishlist */}
              <motion.div
                className="flex items-center gap-2 lg:px-2 sm:px-0 text-white cursor-pointer"
              >
                <p className='hidden sm:block text-sm'>Wishlist</p>
                <FaRegHeart />
              </motion.div>

              {/* Cart */}
              <div className="flex lg:px-2 sm:px-0 lg:ml-[5px] sm:ml-[10px] text-white relative">
                <motion.button
                  ref={cartRef}
                  className="relative"
                  whileTap={{ scale: 0.9 }}
                >
                  <GrCart className="text-xl" />
                  <AnimatePresence>
                    {data.length > 0 && (
                      <motion.span
                        key="badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                      >
                        {data.length}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>

                <AnimatePresence>
                  {cart && data.length > 0 && (
                    <motion.div
                      key="cart-dropdown"
                      ref={cartDropdownRef}
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -8, scale: 0.97 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full right-0 mt-2 w-80 bg-white shadow-xl z-50 rounded-sm"
                    >
                      <div className="p-4">
                        <div className="max-h-60 overflow-y-auto space-y-1">
                          <AnimatePresence>
                            {data.map((item, i) => (
                              <motion.div
                                key={item.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20, height: 0, marginBottom: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-3 py-3 border-b"
                              >
                                <img src={item.thumbnail} alt="" className="w-12 h-12 object-cover rounded" />
                                <div className="flex-1">
                                  <h4 className="text-sm font-semibold text-gray-800 truncate">{item.title}</h4>
                                  <p className="text-xs text-gray-500">${item.price}</p>
                                </div>
                                <motion.button
                                  whileHover={{ scale: 1.2 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) => handleRemove(i, e)}
                                  className="text-gray-400 hover:text-red-500 transition-colors"
                                >
                                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                </motion.button>
                              </motion.div>
                            ))}
                          </AnimatePresence>
                        </div>
                      </div>

                      <div className="py-4 border-b">
                        <div className="flex justify-between items-center px-6">
                          <span className="text-sm font-semibold text-gray-700">Subtotal:</span>
                          <span className="text-sm font-bold text-[#0D134E]">${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>

                      <div className="pt-4 pb-2 px-2 flex gap-2">
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleGoCart}
                          className="flex-1 py-2 border border-[#0D134E] hover:border-[#FB2E86] text-[#0D134E] hover:bg-[#FB2E86] hover:text-white transition-all duration-200 text-sm font-semibold"
                        >
                          View Cart
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={handleCheckout}
                          className="flex-1 py-2 border border-[#0D134E] hover:border-[#FB2E86] text-[#0D134E] hover:bg-[#FB2E86] hover:text-white transition-all duration-200 text-sm font-semibold"
                        >
                          Checkout
                        </motion.button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default Header