import React from 'react'
import Container from '../component/Container'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { PiSmileySadLight } from 'react-icons/pi'
import { decrement, increment, productRemove } from '../component/slice/productSlice'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'

const Cart = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const data = useSelector((state) => state.product.cartItem)

  const handleIncrement = (i) => dispatch(increment(i))
  const handleDecrement = (i) => dispatch(decrement(i))
  const handleRemove = (i) => {
    toast.success('Item removed from cart')
    dispatch(productRemove(i))
  }

  const clearCart = () => {
    const len = data.length
    for (let i = 0; i < len; i++) dispatch(productRemove(0))
    toast.success('Cart cleared')
  }

  const { totalPrice, totalQuantity } = data.reduce(
    (acc, item) => {
      acc.totalPrice += item.price * item.quantity
      acc.totalQuantity += item.quantity
      return acc
    },
    { totalPrice: 0, totalQuantity: 0 }
  )

  const shipping = totalPrice > 0 ? 15.0 : 0
  const tax = totalPrice > 0 ? totalPrice * 0.07 : 0
  const finalTotal = totalPrice + shipping + tax

  return (
    <Container>
      <div className="mt-[80px]">
        <AnimatePresence mode="wait">
          {data.length > 0 ? (
            <motion.div
              key="cart-content"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-screen py-8 font-josefin"
            >
              <h1 className="text-3xl font-bold text-[#0D134E] mb-2">Shopping Cart</h1>
              <h2 className='mb-16 text-[#0D134E]'>
                <Link to="/"><span className='hover:text-[#FB2E86] transition-colors'>Home</span></Link>.Pages.
                <Link to="/allproduct"><span className='hover:text-[#FB2E86] transition-colors'>Products</span></Link>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 bg-white">
                  <div className="grid grid-cols-12 gap-4 px-6 py-4 bg-gray-50 font-semibold text-gray-700">
                    <div className="col-span-4">Product</div>
                    <div className="col-span-2 text-center">Price</div>
                    <div className="col-span-3 text-center">Quantity</div>
                    <div className="col-span-2 text-center">Total</div>
                    <div className="col-span-1" />
                  </div>

                  <AnimatePresence>
                    {data.map((item, i) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 40, height: 0, overflow: 'hidden' }}
                        transition={{ duration: 0.25, layout: { duration: 0.2 } }}
                        className="divide-y"
                      >
                        <div className="grid grid-cols-12 gap-4 items-center px-6 py-4 hover:bg-gray-50 transition-colors">
                          <div className="col-span-4 flex items-center gap-4">
                            <motion.img
                              whileHover={{ scale: 1.05 }}
                              src={item.thumbnail}
                              alt="Product"
                              className="w-20 h-20 object-cover rounded-sm"
                            />
                            <div>
                              <Link to={`/productdetails/${item.id}`}>
                                <h3 className="font-semibold hover:text-[#FB2E86] hover:underline hidden md:block text-[#0D134E] transition-colors">{item.title}</h3>
                              </Link>
                              <p className="text-sm text-gray-500 hidden md:block">{item.category}</p>
                            </div>
                          </div>

                          <div className="col-span-2 text-center text-gray-600">${item.price}</div>

                          <div className="col-span-3 flex justify-center">
                            <div className="flex items-center bg-blue-50 rounded-lg overflow-hidden">
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => handleDecrement(i)}
                                className="px-0 md:px-4 py-0 md:py-2 text-blue-600 hover:bg-blue-100 transition-colors font-bold"
                              >-</motion.button>
                              <span className="px-4 py-2 bg-white border-x border-blue-200 min-w-[40px] text-center">{item.quantity}</span>
                              <motion.button
                                whileTap={{ scale: 0.85 }}
                                onClick={() => handleIncrement(i)}
                                className="px-0 md:px-4 py-0 md:py-2 text-blue-600 hover:bg-blue-100 transition-colors font-bold"
                              >+</motion.button>
                            </div>
                          </div>

                          <div className="col-span-2 text-center font-semibold text-gray-800">
                            ${(item.price * item.quantity).toFixed(2)}
                          </div>

                          <div className="col-span-1">
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.85 }}
                              onClick={() => handleRemove(i)}
                              className="ml-6 text-red-400 hover:text-red-600 transition-colors"
                            >
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  <div className="items-center px-6 py-4 border-t border-t-[#e9d6d6]">
                    <div className="flex justify-end">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        onClick={clearCart}
                        disabled={data.length === 0}
                        className="px-6 py-2 rounded-sm transition-all bg-[#FB2E86] hover:bg-[#c71d66] text-white"
                      >
                        Clear Cart
                      </motion.button>
                    </div>
                  </div>
                </div>

                {/* Summary + Shipping */}
                <div className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-gray-50 p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Cart Total</h2>
                    <div className="space-y-3 mb-6">
                      {[
                        { label: 'Subtotal:', value: `$${totalPrice.toFixed(2)}` },
                        { label: 'Quantity:', value: totalQuantity },
                        { label: 'Shipping:', value: `$${shipping.toFixed(2)}` },
                        { label: 'Tax:', value: `$${tax.toFixed(2)}` },
                      ].map(({ label, value }) => (
                        <div key={label} className="flex justify-between text-gray-600">
                          <span>{label}</span>
                          <span>{value}</span>
                        </div>
                      ))}
                      <div className="border-t border-t-[#e9d6d6] pt-3">
                        <div className="flex justify-between text-lg font-bold text-gray-800">
                          <span>Total:</span>
                          <motion.span
                            key={finalTotal}
                            initial={{ scale: 1.1, color: '#FB2E86' }}
                            animate={{ scale: 1, color: '#1f2937' }}
                            transition={{ duration: 0.3 }}
                          >
                            ${finalTotal.toFixed(2)}
                          </motion.span>
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => navigate('/checkout')}
                      className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
                    >
                      Proceed to Checkout
                    </motion.button>
                  </motion.div>

                  {/* Shipping calculator */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="bg-gray-50 p-6"
                  >
                    <h2 className="text-xl font-bold text-gray-800 mb-4">Calculate Shipping</h2>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                        <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                          <option>Bangladesh</option>
                          <option>Canada</option>
                          <option>United Kingdom</option>
                        </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                          <select className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all">
                            <option>Dhaka</option>
                            <option>Sylhet</option>
                            <option>Chittagong</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                          <input type="text" className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" placeholder="12345" />
                        </div>
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full mt-7 border border-gray-300 text-white py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors"
                      >
                        Calculate Shipping
                      </motion.button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="empty-cart"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-[300px] mx-auto mt-[200px] pb-[100px] text-center"
            >
              <div className="flex items-center gap-2 justify-center">
                <p className="text-[24px]">No items in cart</p>
                <PiSmileySadLight className='text-[30px]' />
              </div>
              <Link to="/allproduct">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className='mt-6 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors'
                >
                  Back to Products
                </motion.button>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  )
}

export default Cart