import React, { useContext, useEffect, useState } from 'react'
import Container from '../component/Container'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { FaStar, FaStarHalfAlt, FaRegStar, FaShoppingCart, FaArrowLeft, FaFacebook, FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { useDispatch } from 'react-redux'
import { addToCart } from '../component/slice/productSlice'
import com from '../assets/company.png'
import { ApiData } from '../component/ContextApi'
import { initFlowbite } from 'flowbite'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const ProductDetails = () => {
  const info = useContext(ApiData)
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [singleProduct, setSingleProduct] = useState({})
  const [relatedProducts, setRelatedProducts] = useState([])
  const [imgLoaded, setImgLoaded] = useState(false)

  useEffect(() => {
    if (info.products.length > 0) {
      const product = info.products.find(item => item.id == id)
      setSingleProduct(product || {})
      setImgLoaded(false)
    }
  }, [info, id])

  useEffect(() => {
    if (singleProduct.id && info.products) {
      const related = info.products
        .filter(p => p.category === singleProduct.category && p.id !== singleProduct.id)
        .slice(0, 4)
      setRelatedProducts(related)
    }
  }, [singleProduct, info])

  useEffect(() => {
    if (typeof initFlowbite !== 'undefined') initFlowbite()
    // Re-init flowbite when product changes (accordion)
  }, [singleProduct.id])

  const discountPrice = () => {
    const discount = (singleProduct.price * singleProduct.discountPercentage) / 100
    return (singleProduct.price - discount).toFixed(2)
  }

  const clientRating = Array.from({ length: 5 }, (_, index) => {
    const number = index + 0.5
    return singleProduct.rating > index + 1
      ? <FaStar className='text-yellow-400' key={index} />
      : singleProduct.rating > number
        ? <FaStarHalfAlt className='text-yellow-400' key={index} />
        : <FaRegStar className='text-yellow-400' key={index} />
  })

  const handleCart = (item) => {
    dispatch(addToCart({ ...item, quantity: 1 }))
    toast.success(`${item.title} added to cart!`)
    setTimeout(() => navigate('/cart'), 1200)
  }

  if (!singleProduct.id) {
    return (
      <Container>
        <div className="flex justify-center items-center min-h-[400px]">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}
            className="w-10 h-10 border-4 border-[#FB2E86] border-t-transparent rounded-full"
          />
        </div>
      </Container>
    )
  }

  return (
    <Container>
      <div className="mt-[40px] py-[40px]">
        <h2 className='text-[#101750] text-[36px] font-semibold'>Product Details</h2>
        <h2 className='text-[#0D134E]'>
          <Link to="/"><span className='hover:text-[#FB2E86] transition-colors'>Home</span></Link>.Pages.
          <Link to="/allproduct"><span className='hover:text-[#FB2E86] transition-colors'>Products</span></Link>
        </h2>
      </div>

      <div className="min-h-screen py-8 font-josefin">
        <Link to="/allproduct">
          <motion.button
            whileHover={{ x: -3 }}
            className="flex items-center gap-2 text-gray-600 hover:text-[#FB2E86] cursor-pointer mb-6 transition-colors"
          >
            <FaArrowLeft />Back to Products
          </motion.button>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="relative overflow-hidden rounded-lg bg-gray-100">
              {!imgLoaded && (
                <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-lg" style={{ height: 400 }} />
              )}
              <motion.img
                key={singleProduct.thumbnail}
                initial={{ opacity: 0, scale: 1.03 }}
                animate={{ opacity: imgLoaded ? 1 : 0, scale: 1 }}
                transition={{ duration: 0.4 }}
                src={singleProduct.thumbnail}
                alt={singleProduct.title}
                className="h-[400px] w-[450px] object-cover rounded-lg"
                onLoad={() => setImgLoaded(true)}
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="space-y-6"
          >
            <div>
              <h1 className="text-3xl font-bold text-[#0D134E] mb-2">{singleProduct.title}</h1>
              <div className="flex items-center gap-2">
                <div className="flex text-yellow-400">{clientRating}</div>
                <span className="text-sm text-gray-600">({singleProduct.rating})</span>
              </div>
            </div>

            <div>
              {singleProduct.discountPercentage > 0 ? (
                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-blue-600">${discountPrice()}</span>
                  <span className="text-xl text-[#FB2E86] line-through">${singleProduct.price}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-semibold px-2 py-1 rounded-full">
                    -{singleProduct.discountPercentage}%
                  </span>
                </div>
              ) : (
                <span className="text-3xl font-bold text-blue-600">${singleProduct.price}</span>
              )}

              <div className="mt-4 space-y-1">
                <h2 className="text-gray-600 capitalize"><span className='text-pink-500 text-[18px] font-semibold'>Color: </span>{singleProduct.color}</h2>
                <h2 className="text-gray-600 capitalize"><span className='text-pink-500 text-[18px] font-semibold'>Category: </span>{singleProduct.category}</h2>
                <h2 className="text-gray-600 capitalize"><span className='text-pink-500 text-[18px] font-semibold'>Tag: </span>{Array.isArray(singleProduct.tags) ? singleProduct.tags.join(', ') : singleProduct.tags}</h2>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Description</h3>
              <p className="text-gray-600">{singleProduct.description}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => handleCart(singleProduct)}
              className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-800 transition-all duration-300 cursor-pointer font-semibold flex items-center justify-center w-full gap-2"
            >
              <FaShoppingCart />Add to Cart
            </motion.button>

            <div className="flex items-center gap-3">
              <span className="text-gray-600">Share:</span>
              <div className="flex gap-3">
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <FaFacebook className='text-blue-700 cursor-pointer text-xl' />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <FaXTwitter className='text-black cursor-pointer text-xl' />
                </motion.div>
                <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                  <FaInstagram className='text-red-500 cursor-pointer text-xl' />
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Accordions (unchanged — Flowbite handles these) */}
        <div className="mt-10">
          <div id="accordion-collapse" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-1">
              <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-black border border-gray-300 gap-3 hover:bg-gray-50 transition-colors" data-accordion-target="#accordion-collapse-body-1" aria-expanded="false" aria-controls="accordion-collapse-body-1">
                <p>Additional Info</p>
                <svg data-accordion-icon className="w-3 h-3 shrink-0" aria-hidden="true" xmlns="#" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>
              </button>
            </h2>
            <div id="accordion-collapse-body-1" className="hidden" aria-labelledby="accordion-collapse-heading-1">
              <div className="p-5 border border-gray-300">
                <p className="mb-2 text-gray-500"><span className='font-semibold'>Rating:</span> {singleProduct.rating}</p>
                <p className="mb-2 text-gray-500"><span className='font-semibold'>Weight:</span> {singleProduct.weight}kg</p>
                <p className="mb-2 text-gray-500"><span className='font-semibold'>SKU:</span> {singleProduct.sku}</p>
                <p className="mb-2 text-gray-500"><span className='font-semibold'>Warranty:</span> {singleProduct.warrantyInformation}</p>
                <p className="mb-2 text-gray-500"><span className='font-semibold'>Shipping:</span> {singleProduct.shippingInformation}</p>
                <p className="mb-2 text-gray-500"><span className='font-semibold'>Policy:</span> {singleProduct.returnPolicy}</p>
                <p className="mb-2 text-gray-500"><span className='font-semibold'>In Stock:</span> {singleProduct.stock}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-1">
          <div id="accordion-collapse-2" data-accordion="collapse">
            <h2 id="accordion-collapse-heading-2">
              <button type="button" className="flex items-center justify-between w-full p-5 font-medium text-black border border-gray-300 gap-3 hover:bg-gray-50 transition-colors" data-accordion-target="#accordion-collapse-body-2" aria-expanded="false" aria-controls="accordion-collapse-body-2">
                <p>Description & Reviews</p>
                <svg data-accordion-icon className="w-3 h-3 shrink-0" aria-hidden="true" xmlns="#" fill="none" viewBox="0 0 10 6">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
                </svg>
              </button>
            </h2>
            <div id="accordion-collapse-body-2" className="hidden" aria-labelledby="accordion-collapse-heading-2">
              <div className="p-5 border border-gray-300">
                <h2 className='text-[18px] font-semibold text-blue-700 mb-3'>Description</h2>
                <p className="mb-2 text-gray-500">{singleProduct.description}</p>
                <h2 className='text-[18px] mt-4 font-semibold text-blue-700 mb-3'>Customer Reviews</h2>
                {singleProduct.reviews?.map((review, index) => (
                  <div key={index} className="mb-4 p-3 bg-gray-50 rounded-lg">
                    <p className='text-pink-600 font-medium'>{review.comment}</p>
                    <p className='text-sm text-gray-500 mt-1'>{review.reviewerName} · {new Date(review.date).toLocaleDateString()}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-[#0D134E] mb-6">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {relatedProducts.map((rp, i) => (
                <motion.div
                  key={rp.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: i * 0.07 }}
                  whileHover={{ y: -4, boxShadow: '0 10px 24px rgba(0,0,0,0.1)' }}
                  className="rounded-lg p-4 cursor-pointer bg-white transition-shadow"
                  onClick={() => navigate(`/productdetails/${rp.id}`)}
                >
                  <img src={rp.thumbnail} alt={rp.title} className="w-full h-48 object-cover rounded-md mb-4" />
                  <h3 className="font-semibold text-[#0D134E] mb-2 line-clamp-2">{rp.title}</h3>
                  <div className="flex justify-between items-center">
                    <span className="text-[#0D134E] font-bold">${rp.price}</span>
                    <div className="flex items-center gap-1">
                      <FaStar className="text-yellow-400" />
                      <span className="text-sm text-gray-600">{rp.rating}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-center cursor-pointer">
        <img src={com} alt="" />
      </div>
    </Container>
  )
}

export default ProductDetails