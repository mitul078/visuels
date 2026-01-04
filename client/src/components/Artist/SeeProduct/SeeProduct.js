"use client"

import React, { useEffect, useState } from "react"
import "./see_product.scss"
import { useDispatch, useSelector } from "react-redux"
import { clearSelectedProduct } from "@/redux/features/product/product.slice"
import { get_full_product } from "@/redux/features/product/product.thunk"
import { motion, AnimatePresence } from "framer-motion"

const SeeProduct = ({ open, onClose, productId }) => {
    const dispatch = useDispatch()
    const { selectedProduct, loading } = useSelector((state) => state.product)
    const [selectedImageIndex, setSelectedImageIndex] = useState(0)

    useEffect(() => {
        if (open && productId) {
            dispatch(get_full_product({ productId }))
        }
    }, [open, productId, dispatch])

    useEffect(() => {
        if (selectedProduct?.images?.length > 0) {
            setSelectedImageIndex(0)
        }
    }, [selectedProduct])

    const handleClose = () => {
        dispatch(clearSelectedProduct())
        onClose()
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="See-product"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="see-product-container"
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="see-product-header">
                            <h1>Product Details</h1>
                            <button className="close-btn" onClick={handleClose}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>

                        {loading ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Loading product details...</p>
                            </div>
                        ) : (
                            selectedProduct && (
                                <div className="see-product-content">
                                    {/* Image Gallery Section */}
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

                                    {/* Product Details Section */}
                                    <div className="product-details-section">
                                        <div className="details-header">
                                            <div className="title-section">
                                                <h2 className="product-title">{selectedProduct.title}</h2>
                                                <div className={`status-badge ${selectedProduct.status?.toLowerCase()}`}>
                                                    {selectedProduct.status}
                                                </div>
                                            </div>
                                            <div className="price-section">
                                                <span className="currency">$</span>
                                                <span className="amount">{selectedProduct.price?.toLocaleString()}</span>
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
                            )
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default SeeProduct
