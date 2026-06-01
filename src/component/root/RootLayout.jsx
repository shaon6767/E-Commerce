import React from 'react'
import Header from '../Header'
import Navbar from '../Navbar'
import { Outlet, useLocation } from 'react-router-dom'
import Footer from '../Footer'
import { AnimatePresence, motion } from 'framer-motion'
import { Toaster } from 'react-hot-toast'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
}

const pageTransition = {
  duration: 0.3,
  ease: 'easeInOut',
}

const RootLayout = () => {
  const location = useLocation()

  return (
    <>
      <Header />
      <Navbar />
      {/* Global toast notifications - replaces react-toastify everywhere */}
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 2000,
          style: {
            background: '#0D134E',
            color: '#fff',
            fontFamily: 'Josefin Sans, sans-serif',
            fontSize: '14px',
            borderRadius: '4px',
          },
          success: {
            iconTheme: { primary: '#FB2E86', secondary: '#fff' },
          },
        }}
      />
      <AnimatePresence mode="wait">
        <motion.main
          key={location.pathname}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={pageTransition}
        >
          <Outlet />
        </motion.main>
      </AnimatePresence>
      <Footer />
    </>
  )
}

export default RootLayout