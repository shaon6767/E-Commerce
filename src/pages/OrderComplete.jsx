import React, { useEffect, useState } from 'react'
import Container from '../component/Container'
import { FaCheckCircle } from 'react-icons/fa'
import com from '../assets/company.png'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

// Simple confetti burst using CSS + framer
const ConfettiPiece = ({ delay, x, color }) => (
  <motion.div
    initial={{ y: -10, x: 0, opacity: 1, rotate: 0, scale: 1 }}
    animate={{ y: 200, x, opacity: 0, rotate: 720, scale: 0 }}
    transition={{ duration: 1.5, delay, ease: 'easeIn' }}
    className="absolute top-0 left-1/2 w-2 h-2 rounded-sm"
    style={{ backgroundColor: color, marginLeft: x }}
  />
)

const confettiData = [
  { delay: 0, x: -60, color: '#FB2E86' },
  { delay: 0.05, x: 60, color: '#7E33E0' },
  { delay: 0.1, x: -120, color: '#0D134E' },
  { delay: 0.05, x: 120, color: '#FFD700' },
  { delay: 0.15, x: -30, color: '#FB2E86' },
  { delay: 0.2, x: 30, color: '#00C9A7' },
  { delay: 0.1, x: -90, color: '#FFD700' },
  { delay: 0.15, x: 90, color: '#7E33E0' },
  { delay: 0.25, x: -150, color: '#FB2E86' },
  { delay: 0.3, x: 150, color: '#0D134E' },
]

const OrderComplete = () => {
  const [showConfetti, setShowConfetti] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setShowConfetti(false), 2500)
    return () => clearTimeout(t)
  }, [])

  return (
    <Container>
      <div className="mt-20">
        <div className="max-h-screen py-12 font-josefin">
          <div className="max-w-3xl mx-auto text-center">

            {/* Confetti burst */}
            <div className="relative flex justify-center">
              {showConfetti && confettiData.map((c, i) => <ConfettiPiece key={i} {...c} />)}

              {/* Animated checkmark */}
              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 300, damping: 18, delay: 0.1 }}
                className="flex justify-center mb-6"
              >
                <FaCheckCircle className="text-[#FF1788] text-7xl drop-shadow-lg" />
              </motion.div>
            </div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="text-3xl font-bold text-[#101750] mb-4"
            >
              Your Order Is Completed!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              className="text-gray-600 text-lg mb-2"
            >
              Thank you for your order! Your order is being processed and will be completed within 3–6 hours.
              You will receive an email confirmation when your order is completed.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.4 }}
              className="flex mt-8 gap-4 justify-center"
            >
              <Link to="/allproduct">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className="flex items-center gap-2 text-white rounded-sm bg-[#FF1788] hover:bg-[#c91166] px-8 py-3 cursor-pointer transition-colors duration-200 font-semibold"
                >
                  Continue Shopping
                </motion.button>
              </Link>
            </motion.div>
          </div>
        </div>

        <div className="flex justify-center">
          <img src={com} alt="" />
        </div>
      </div>
    </Container>
  )
}

export default OrderComplete