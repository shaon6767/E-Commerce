import React, { useState } from 'react'
import Container from '../component/Container'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { motion, AnimatePresence } from 'framer-motion'
import { productRemove } from '../component/slice/productSlice'
import toast from 'react-hot-toast'
import { FaCreditCard, FaPaypal, FaMoneyBillWave, FaLock } from 'react-icons/fa'

const inputClass =
  'w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FB2E86] focus:border-transparent transition-all duration-200'

const sectionVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
}

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const data = useSelector((state) => state.product.cartItem)
  const [paymentMethod, setPaymentMethod] = useState('cash')
  const [cardDetails, setCardDetails] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [isProcessing, setIsProcessing] = useState(false)

  const { totalPrice } = data.reduce(
    (acc, item) => { acc.totalPrice += item.price * item.quantity; return acc },
    { totalPrice: 0 }
  )
  const shipping = totalPrice > 0 ? 15.0 : 0
  const tax = totalPrice > 0 ? totalPrice * 0.07 : 0
  const finalTotal = totalPrice + shipping + tax

  // Format card number with spaces
  const formatCardNumber = (v) =>
    v.replace(/\D/g, '').replace(/(\d{4})/g, '$1 ').trim().slice(0, 19)

  // Format expiry MM/YY
  const formatExpiry = (v) => {
    const clean = v.replace(/\D/g, '').slice(0, 4)
    if (clean.length >= 3) return clean.slice(0, 2) + '/' + clean.slice(2)
    return clean
  }

  const handleOrder = async () => {
    if (data.length === 0) {
      toast.error('Your cart is empty!')
      return
    }

    // Card validation if credit card selected
    if (paymentMethod === 'card') {
      if (cardDetails.number.replace(/\s/g, '').length < 16) {
        toast.error('Please enter a valid card number')
        return
      }
      if (!cardDetails.name.trim()) {
        toast.error('Please enter the cardholder name')
        return
      }
      if (cardDetails.expiry.length < 5) {
        toast.error('Please enter a valid expiry date')
        return
      }
      if (cardDetails.cvv.length < 3) {
        toast.error('Please enter a valid CVV')
        return
      }
    }

    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 1800))

    // Clear cart
    const len = data.length
    for (let i = 0; i < len; i++) dispatch(productRemove(0))

    toast.success('Order placed successfully!')
    setIsProcessing(false)
    navigate('/ordercomplete')
  }

  return (
    <Container>
      <div className="min-h-screen py-8 font-josefin">
        <h1 className="text-3xl font-bold text-[#0D134E] mb-2 mt-12">Checkout</h1>
        <h2 className='mb-16 text-[#0D134E]'>
          <Link to="/"><span className='hover:text-[#FB2E86] transition-colors'>Home</span></Link>.Pages.
          <Link to="/allproduct"><span className='hover:text-[#FB2E86] transition-colors'>Shop</span></Link>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left: Forms */}
          <div className="lg:col-span-3 space-y-6">

            {/* Contact */}
            <motion.div variants={sectionVariants} initial="initial" animate="animate" transition={{ delay: 0.05 }} className="bg-white p-6 shadow-sm rounded-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contact Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                  <input type="text" className={inputClass} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                  <input type="text" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                  <input type="email" className={inputClass} />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                  <input type="tel" className={inputClass} />
                </div>
              </div>
            </motion.div>

            {/* Address */}
            <motion.div variants={sectionVariants} initial="initial" animate="animate" transition={{ delay: 0.1 }} className="bg-white p-6 shadow-sm rounded-sm">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Shipping Address</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input type="text" className={inputClass} />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <input type="text" className={inputClass} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code</label>
                    <input type="text" className={inputClass} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                    <select className={inputClass}>
                      <option>Bangladesh</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <select className={inputClass}>
                      <option>Dhaka</option>
                      <option>Sylhet</option>
                      <option>Chittagong</option>
                    </select>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Payment */}
            <motion.div variants={sectionVariants} initial="initial" animate="animate" transition={{ delay: 0.15 }} className="bg-white p-6 shadow-sm rounded-sm">
              <h2 className="text-xl font-bold text-[#0D134E] mb-4">Payment Method</h2>

              <div className="space-y-3">
                {/* Cash */}
                <label
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'cash' ? 'border-[#FB2E86] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input type="radio" name="payment" value="cash" checked={paymentMethod === 'cash'} onChange={() => setPaymentMethod('cash')} className="accent-[#FB2E86]" />
                  <FaMoneyBillWave className="text-green-500 text-xl" />
                  <span className="font-medium">Cash on Delivery</span>
                </label>

                {/* PayPal */}
                <label
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'paypal' ? 'border-[#FB2E86] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input type="radio" name="payment" value="paypal" checked={paymentMethod === 'paypal'} onChange={() => setPaymentMethod('paypal')} className="accent-[#FB2E86]" />
                  <FaPaypal className="text-blue-600 text-xl" />
                  <span className="font-medium">PayPal</span>
                </label>

                {/* Credit Card */}
                <label
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${paymentMethod === 'card' ? 'border-[#FB2E86] bg-pink-50' : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="accent-[#FB2E86]" />
                  <FaCreditCard className="text-[#0D134E] text-xl" />
                  <span className="font-medium">Credit / Debit Card</span>
                </label>
              </div>

              {/* Credit card fields */}
              <AnimatePresence>
                {paymentMethod === 'card' && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.25, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="mt-5 space-y-4 pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                        <FaLock className="text-green-500" />
                        <span>Your card details are secure (test mode)</span>
                      </div>

                      {/* Mock card preview */}
                      <div className="bg-gradient-to-br from-[#0D134E] to-[#7E33E0] rounded-xl p-5 text-white mb-4 shadow-lg">
                        <div className="flex justify-between items-start mb-6">
                          <div className="text-xs opacity-70 uppercase tracking-widest">Hekto Store</div>
                          <FaCreditCard className="text-2xl opacity-80" />
                        </div>
                        <div className="text-lg tracking-[0.2em] font-mono mb-4">
                          {cardDetails.number || '•••• •••• •••• ••••'}
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>{cardDetails.name || 'CARDHOLDER NAME'}</span>
                          <span>{cardDetails.expiry || 'MM/YY'}</span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="1234 5678 9012 3456"
                          value={cardDetails.number}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, number: formatCardNumber(e.target.value) }))}
                          maxLength={19}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Cardholder Name</label>
                        <input
                          type="text"
                          className={inputClass}
                          placeholder="John Smith"
                          value={cardDetails.name}
                          onChange={(e) => setCardDetails(prev => ({ ...prev, name: e.target.value.toUpperCase() }))}
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date</label>
                          <input
                            type="text"
                            className={inputClass}
                            placeholder="MM/YY"
                            value={cardDetails.expiry}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, expiry: formatExpiry(e.target.value) }))}
                            maxLength={5}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">CVV</label>
                          <input
                            type="password"
                            className={inputClass}
                            placeholder="•••"
                            value={cardDetails.cvv}
                            onChange={(e) => setCardDetails(prev => ({ ...prev, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) }))}
                            maxLength={4}
                          />
                        </div>
                      </div>
                      <p className="text-xs text-gray-400">Use any test numbers — this is a demo payment UI, no real charge occurs.</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Right: Order Summary */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gray-50 p-6 mt-8 sticky top-4"
            >
              <h2 className="text-xl font-bold text-[#0D134E] mb-4">Order Summary</h2>

              <div className="space-y-4 mb-6 max-h-80 overflow-y-auto pr-1">
                {data.map((item) => (
                  <div key={item.id} className="flex items-center gap-3 pb-4 border-b border-b-[#c9bbbb]">
                    <img src={item.thumbnail} alt="Product" className="w-20 h-20 object-cover rounded-sm" />
                    <div className="flex-1">
                      <h4 className="text-sm font-semibold text-[#0D134E]">{item.title}</h4>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <span className="font-semibold text-[#0D134E]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                {[
                  { label: 'Subtotal:', value: `$${totalPrice.toFixed(2)}` },
                  { label: 'Shipping:', value: `$${shipping.toFixed(2)}` },
                  { label: 'Tax (7%):', value: `$${tax.toFixed(2)}` },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-gray-600">
                    <span>{label}</span>
                    <span>{value}</span>
                  </div>
                ))}
                <div className="border-t border-t-[#c9bbbb] pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total:</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <motion.button
                whileHover={!isProcessing ? { scale: 1.02 } : {}}
                whileTap={!isProcessing ? { scale: 0.97 } : {}}
                onClick={handleOrder}
                disabled={isProcessing}
                className={`w-full py-3 rounded-lg font-semibold mt-6 flex items-center justify-center gap-2 transition-all duration-200 ${
                  isProcessing
                    ? 'bg-gray-400 cursor-not-allowed text-white'
                    : 'bg-[#FB2E86] hover:bg-[#c71d66] text-white'
                }`}
              >
                {isProcessing ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    <FaLock className="text-sm" />
                    Place Order
                  </>
                )}
              </motion.button>
            </motion.div>
          </div>
        </div>
      </div>
    </Container>
  )
}

export default Checkout