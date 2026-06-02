import React from 'react'
import Container from './Container'
import logo from "../assets/Hekto.png"
import { motion } from 'framer-motion'

const Footer = () => {
  return (
    <section className='bg-[#EEEFFB] font-josefin mt-[100px]'>
      <Container>
        <footer className="bg-[#EEEFFB]">
          <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
            <div className="md:flex md:justify-between">

              {/* Brand + email signup */}
              <div className="mb-6 md:mb-0">
                <a href="#" className="flex items-center">
                  <img src={logo} className="h-8 me-3" alt="Hekto" />
                </a>
                <div className="mt-6 flex items-center">
                  <input
                    className='bg-[#D9D9D9] border-none focus:outline-none focus:ring-1 focus:ring-[#FB2E86] transition-shadow duration-200'
                    type="text"
                    placeholder='Enter Email Address'
                  />
                  <button className="w-[90px] h-[40px] bg-[#FB2E86] flex justify-center items-center hover:bg-[#c71d6a] transition-colors duration-200 active:scale-95">
                    <span className="text-[16px] text-white">Sign Up</span>
                  </button>
                </div>
                <div className="mt-6 text-[#8A8FB9] space-y-2">
                  <p>Contact Info</p>
                  <p>17 Princess Road, London, Greater London NW1 8JR, UK</p>
                </div>
              </div>

              {/* Links */}
              <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                {[
                  {
                    title: 'Categories',
                    links: ['Laptops & Computers', 'Cameras & Photography', 'Smart Phones & Tablets', 'Video Games & Consoles', 'Waterproof Headphones'],
                  },
                  {
                    title: 'Customer Care',
                    links: ['My Account', 'Discount', 'Returns', 'Orders History', 'Order Tracking'],
                  },
                  {
                    title: 'Pages',
                    links: ['Blog', 'Browse the Shop', 'Category', 'Pre-Built Pages', 'Visual Composer Elements', 'WooCommerce Pages'],
                  },
                ].map(({ title, links }) => (
                  <div key={title}>
                    <h2 className="mb-6 text-lg font-semibold text-black">{title}</h2>
                    <ul className="text-[#8A8FB9] font-medium space-y-4">
                      {links.map(link => (
                        <li key={link}>
                          <a href="#" className="hover:text-[#FB2E86] transition-colors duration-200 hover:underline">{link}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom bar */}
            <div className="sm:flex sm:items-center sm:justify-between mt-14">
              <span className="text-sm text-gray-500 sm:text-center">©Webecy - All Rights Reserved</span>
              <div className="flex mt-4 sm:justify-center sm:mt-0 gap-5">
                {[
                  // Facebook
                  <svg key="fb" className="w-4 h-4" aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 8 19">
                    <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
                  </svg>,
                  // Discord
                  <svg key="dc" className="w-4 h-4" aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 21 16">
                    <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
                  </svg>,
                  // Twitter
                  <svg key="tw" className="w-4 h-4" aria-hidden="true" xmlns="" fill="currentColor" viewBox="0 0 20 17">
                    <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
                  </svg>,
                ].map((icon, i) => (
                  <a key={i} href="#" className="text-gray-500 hover:text-[#FB2E86] transition-colors duration-200 hover:scale-110 inline-block transform">
                    {icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </footer>
      </Container>
    </section>
  )
}

export default Footer