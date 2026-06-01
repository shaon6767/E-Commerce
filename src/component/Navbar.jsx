import React, { useState, useEffect } from 'react'
import Container from './Container'
import logo from '../assets/logo.png'
import { initFlowbite } from 'flowbite'
import { IoSearch, IoClose } from 'react-icons/io5'
import { Link, useLocation } from 'react-router-dom'
import { GiHamburgerMenu } from 'react-icons/gi'
import { motion, AnimatePresence } from 'framer-motion'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/allproduct', label: 'Products' },
  { to: '/blog', label: 'Blog' },
  { to: '/about', label: 'About' },
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
]

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    initFlowbite()
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <Container>
      <div className="font-josefin py-2 pb-2">
        <nav>
          <div className="grid grid-cols-6 items-center">
            <div className="col-span-1">
              <Link to="/"><img src={logo} alt="Hekto" /></Link>
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:block col-span-2">
              <ul className='flex gap-6 justify-center items-center'>
                {navLinks.map(({ to, label }) => (
                  <li key={to} className="relative">
                    <Link
                      to={to}
                      className={`transition-colors duration-200 hover:text-[#FB2E86] ${location.pathname === to ? 'text-[#FB2E86]' : 'text-black'}`}
                    >
                      {label}
                    </Link>
                    {/* Active underline indicator */}
                    {location.pathname === to && (
                      <motion.div
                        layoutId="nav-underline"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-[#FB2E86] rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </li>
                ))}
              </ul>
            </div>

            {/* Mobile Hamburger */}
            <div className="lg:hidden col-span-1 flex justify-center">
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-black"
              >
                {menuOpen ? <IoClose className="text-2xl" /> : <GiHamburgerMenu className="text-2xl" />}
              </motion.button>
            </div>

            <div className="hidden lg:block col-span-1" />

            {/* Search Bar */}
            <div className="col-span-4 lg:col-span-2 px-2">
              <div className="flex justify-end items-center">
                <input
                  className='bg-[#D9D9D9] border-none w-20 sm:w-auto focus:outline-none transition-all duration-200 focus:ring-1 focus:ring-[#FB2E86]'
                  type="text"
                  placeholder='Search...'
                />
                <motion.div
                  whileHover={{ backgroundColor: '#d4186e' }}
                  whileTap={{ scale: 0.95 }}
                  className="w-[45px] h-[40px] bg-[#FB2E86] flex justify-center items-center cursor-pointer transition-colors duration-200"
                >
                  <IoSearch className="text-[20px] text-white" />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.25, ease: 'easeInOut' }}
                className="lg:hidden overflow-hidden bg-white shadow-lg rounded mt-2 z-50 absolute left-4 right-4"
              >
                <ul className="flex flex-col text-black px-4 py-2">
                  {navLinks.map(({ to, label }, i) => (
                    <motion.li
                      key={to}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className={`py-3 border-b border-gray-100 last:border-0 hover:text-[#FB2E86] transition-colors duration-150 ${location.pathname === to ? 'text-[#FB2E86] font-semibold' : ''}`}
                    >
                      <Link to={to}>{label}</Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </nav>
      </div>
    </Container>
  )
}

export default Navbar