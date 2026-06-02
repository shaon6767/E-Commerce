import React from 'react'
import Container from './Container'
import sofa from "../assets/bluesofa.png"
import { motion } from 'framer-motion'

const Trending = () => {
  return (
    <section className='bg-[#F1F0FF] font-josefin'>
      <Container>
        <div className="mt-8 sm:mt-12 lg:mt-[100px]">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6 sm:gap-8 lg:gap-0">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex justify-center lg:justify-start"
            >
              <img
                src={sofa}
                alt=""
                className="w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] lg:w-[400px] lg:h-[300px] xl:w-auto xl:h-auto
                           transition-transform duration-500 hover:scale-105"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-center lg:text-left px-4 sm:px-0"
            >
              <h2 className='text-[#1A0B5B] text-xl sm:text-2xl lg:text-[42px] font-semibold w-full lg:w-[577px] pb-3 sm:pb-4 lg:pb-5'>
                Unique Features Of leatest & Trending Poducts
              </h2>

              <div className="space-y-1">
                {[
                  { color: 'red', text: 'All frames constructed with hardwood solids and laminates' },
                  { color: 'blue', text: 'Reinforced with double wood dowels, glue, screw - nails corner blocks and machine nails' },
                  { color: 'green', text: 'Arms, backs and seats are structurally reinforced' },
                ].map(({ color, text }, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + i * 0.08 }}
                    className="flex items-center gap-3 sm:gap-4"
                  >
                    <div className={`h-2 w-2 sm:h-3 sm:w-3 bg-[${color}] rounded-full flex-shrink-0`} />
                    <p className='text-[#ACABC3] py-1 sm:py-2 text-sm sm:text-base'>{text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-center justify-center lg:justify-start">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className='mt-4 sm:mt-6 lg:mt-[30px]'
                >
                  <a className='px-4 py-2 sm:px-6 sm:py-3 bg-[#FB2E86] text-white text-sm sm:text-base
                                 hover:bg-[#c71d6a] transition-colors duration-200 inline-block' href="#">
                    Add to Cart
                  </a>
                </motion.button>
                <div className="mt-4 sm:mt-6 lg:mt-[30px] text-[#151875]">
                  <p className='font-semibold text-sm sm:text-base'>B&B Italian Sofa</p>
                  <p className='text-sm sm:text-base'>$32.00</p>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </Container>
    </section>
  )
}

export default Trending