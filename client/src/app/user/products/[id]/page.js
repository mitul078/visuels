"use client"

import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { get_full_product, get_products } from '@/redux/features/product/product.thunk'
import { clearSelectedProduct } from '@/redux/features/product/product.slice'
import "./product_detail.scss"

const page = () => {
    const params = useParams()
    const router = useRouter()
    const dispatch = useDispatch()
    const { selectedProduct, loading, products } = useSelector(state => state.product)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)
    const [relatedProducts, setRelatedProducts] = useState([])

    useEffect(() => {
        if (params.id) {
            dispatch(get_full_product({ productId: params.id }))
        }
        return () => {
            dispatch(clearSelectedProduct())
        }
    }, [params.id, dispatch])

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setSelectedImageIndex(0)
        }
    }, [selectedProduct])

    useEffect(() => {
        dispatch(get_products({ page: 1 }))
    }, [dispatch])

    useEffect(() => {
        
        if (products && selectedProduct) {
            const filtered = products
                .filter(p => p._id !== selectedProduct._id)
                .slice(0, 4)
            setRelatedProducts(filtered)
        }
    }, [products, selectedProduct])

    const handleRelatedProductClick = (id) => {
        dispatch(get_full_product({ productId: id }))
        router.push(`/user/products/${id}`)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    if (loading && !selectedProduct) {
        return (
            <div className="product-detail-page">
                <div className="loading-state">
                    <div className="spinner"></div>
                    <p>Loading product details...</p>
                </div>
            </div>
        )
    }

    if (!selectedProduct) {
        return (
            <div className="product-detail-page">
                <div className="error-state">
                    <h2>Product not found</h2>
                    <button onClick={() => router.push('/user/products')}>
                        Back to Products
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="product-detail-page">
            <motion.div
                className="product-detail-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                {/* Back Button */}
                <motion.button
                    className="back-button"
                    onClick={() => router.push('/user/products')}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <i className="ri-arrow-left-line"></i>
                    Back to Products
                </motion.button>

                {/* Main Product Section */}
                <div className="product-main-section">
                    {/* Product Images */}
                    <div className="product-images-section">
                        <div className="main-image-container">
                            <img
                                src={
                                    selectedProduct.images?.[selectedImageIndex]?.url ||
                                    selectedProduct.images?.[0]?.url ||
                                    ""
                                }
                                alt={selectedProduct.title}
                                className="main-image"
                            />
                            {selectedProduct.images?.[selectedImageIndex]?.isPrimary && (
                                <div className="primary-badge">Primary</div>
                            )}
                        </div>
                        {selectedProduct.images?.length > 1 && (
                            <div className="thumbnail-grid">
                                {selectedProduct.images.map((image, index) => (
                                    <motion.button
                                        key={index}
                                        className={`thumbnail-item ${
                                            selectedImageIndex === index ? "active" : ""
                                        }`}
                                        onClick={() => setSelectedImageIndex(index)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <img src={image.url} alt={`${selectedProduct.title} ${index + 1}`} />
                                        {image.isPrimary && (
                                            <div className="primary-indicator">
                                                <i className="ri-star-fill"></i>
                                            </div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Details */}
                    <div className="product-details-section">
                        <div className="details-header">
                            <div className="title-section">
                                <h1 className="product-title">{selectedProduct.title}</h1>
                                <div className={`status-badge ${selectedProduct.status?.toLowerCase()}`}>
                                    {selectedProduct.status}
                                </div>
                            </div>
                            <div className="price-section">
                                <span className="currency">$</span>
                                <span className="amount">{selectedProduct.price?.toLocaleString()}</span>
                            </div>
                            <div className="order-btn">
                                <button>Place Order</button>
                            </div>
                        </div>

                        <div className="product-meta-info">
                            <div className="meta-item">
                                <i className="ri-folder-line"></i>
                                <span>{selectedProduct.category?.name || selectedProduct.category}</span>
                            </div>
                            <div className="meta-item">
                                <i className="ri-paint-brush-line"></i>
                                <span>{selectedProduct.material}</span>
                            </div>
                            <div className="meta-item">
                                <i className="ri-eye-line"></i>
                                <span>{selectedProduct.views || 0} views</span>
                            </div>
                            <div className="meta-item">
                                <i className="ri-heart-line"></i>
                                <span>{selectedProduct.likes || 0} likes</span>
                            </div>
                            {selectedProduct.rating > 0 && (
                                <div className="meta-item">
                                    <i className="ri-star-fill"></i>
                                    <span>{selectedProduct.rating.toFixed(1)} rating</span>
                                </div>
                            )}
                        </div>

                        <div className="product-descriptions">
                            <div className="description-item">
                                <label>
                                    <i className="ri-file-text-line"></i>
                                    Short Description
                                </label>
                                <p>{selectedProduct.shortDescription}</p>
                            </div>

                            <div className="description-item">
                                <label>
                                    <i className="ri-file-text-line"></i>
                                    Detailed Description
                                </label>
                                <p>{selectedProduct.description}</p>
                            </div>
                        </div>

                        {/* Quality Indicators */}
                        {(selectedProduct.certified || selectedProduct.handMade || selectedProduct.frameInclude) && (
                            <div className="quality-indicators">
                                <label>
                                    <i className="ri-verified-badge-line"></i>
                                    Quality Indicators
                                </label>
                                <div className="indicators-list">
                                    {selectedProduct.certified && (
                                        <div className="indicator-item">
                                            <i className="ri-verified-badge-fill"></i>
                                            <span>Certified Artwork</span>
                                        </div>
                                    )}
                                    {selectedProduct.handMade && (
                                        <div className="indicator-item">
                                            <i className="ri-hand-heart-line"></i>
                                            <span>Handmade</span>
                                        </div>
                                    )}
                                    {selectedProduct.frameInclude && (
                                        <div className="indicator-item">
                                            <i className="ri-square-line"></i>
                                            <span>Frame Included</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Dimensions */}
                        {selectedProduct.productDimension && (
                            <div className="dimensions-section">
                                <label>
                                    <i className="ri-ruler-line"></i>
                                    Dimensions
                                </label>
                                <div className="dimensions-grid">
                                    <div className="dimension-item">
                                        <span className="dim-label">Width</span>
                                        <span className="dim-value">
                                            {selectedProduct.productDimension.width} {selectedProduct.productDimension.unit}
                                        </span>
                                    </div>
                                    <div className="dimension-item">
                                        <span className="dim-label">Height</span>
                                        <span className="dim-value">
                                            {selectedProduct.productDimension.height} {selectedProduct.productDimension.unit}
                                        </span>
                                    </div>
                                    {selectedProduct.productDimension.depth && (
                                        <div className="dimension-item">
                                            <span className="dim-label">Depth</span>
                                            <span className="dim-value">
                                                {selectedProduct.productDimension.depth} {selectedProduct.productDimension.unit}
                                            </span>
                                        </div>
                                    )}
                                    <div className="dimension-item">
                                        <span className="dim-label">Orientation</span>
                                        <span className="dim-value">
                                            {selectedProduct.productDimension.orientation}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Artist Info */}
                        {selectedProduct.artistDetail && (
                            <div className="artist-section">
                                <label>
                                    <i className="ri-user-line"></i>
                                    Artist Information
                                </label>
                                <div className="artist-info">
                                    <div className="artist-item">
                                        <span className="artist-label">Name</span>
                                        <span className="artist-value">{selectedProduct.artistDetail.name}</span>
                                    </div>
                                    {selectedProduct.artistDetail.username && (
                                        <div className="artist-item">
                                            <span className="artist-label">Username</span>
                                            <span className="artist-value">@{selectedProduct.artistDetail.username}</span>
                                        </div>
                                    )}
                                    <div className="contact-btn">
                                        <button>Contact Artist</button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Artist Note */}
                        {selectedProduct.artistNote && (
                            <div className="artist-note-section">
                                <label>
                                    <i className="ri-quill-pen-line"></i>
                                    Artist Note
                                </label>
                                <p>{selectedProduct.artistNote}</p>
                            </div>
                        )}

                        {/* Story */}
                        {selectedProduct.story && (
                            <div className="story-section">
                                <label>
                                    <i className="ri-book-open-line"></i>
                                    Story Behind the Artwork
                                </label>
                                <p>{selectedProduct.story}</p>
                            </div>
                        )}

                        {/* Additional Info */}
                        <div className="additional-info">
                            <div className="info-item">
                                <span className="info-label">Created</span>
                                <span className="info-value">
                                    {new Date(selectedProduct.createdAt).toLocaleDateString()}
                                </span>
                            </div>
                            {selectedProduct.updatedAt && selectedProduct.updatedAt !== selectedProduct.createdAt && (
                                <div className="info-item">
                                    <span className="info-label">Last Updated</span>
                                    <span className="info-value">
                                        {new Date(selectedProduct.updatedAt).toLocaleDateString()}
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Related Products Section */}
                {relatedProducts.length > 0 && (
                    <motion.section
                        className="related-products-section"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h2 className="section-title">Related Products</h2>
                        <div className="related-products-grid">
                            {relatedProducts.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    className="related-product-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                    onClick={() => handleRelatedProductClick(product._id)}
                                >
                                    <div className="card-image-wrapper">
                                        <div className="product-image-placeholder">
                                            <img src={product.images?.[0]?.url || ""} alt={product.title} />
                                        </div>
                                        <div className={`status-badge ${product?.status?.toLowerCase()}`}>
                                            {product.status}
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <h3 className="product-title">{product.title}</h3>
                                        <p className="product-description">{product.shortDescription}</p>
                                        <div className="product-meta">
                                            <span className="product-category">
                                                <i className="ri-folder-line"></i>
                                                {product.category?.name || product.category}
                                            </span>
                                            <div className="product-stats">
                                                <span className="stat">
                                                    <i className="ri-eye-line"></i>
                                                    {product.views || 0}
                                                </span>
                                                <span className="stat">
                                                    <i className="ri-heart-line"></i>
                                                    {product.likes || 0}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="product-footer">
                                            <div className="price">
                                                <span className="currency">$</span>
                                                <span className="amount">{product.price.toLocaleString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>
                )}
            </motion.div>
        </div>
    )
}

export default page
