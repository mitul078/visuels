"use client"
import React, { useEffect, useState } from 'react'
import "./get_product.scss"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { get_artist_product, get_full_product } from '@/redux/features/product/product.thunk'
import UpdateProduct from '../UpdateProduct/UpdateProduct'
import GetProductSkeleton from '@/components/Skeleton/GetProductSkeleton'


const GetProduct = () => {

    const dispatch = useDispatch()
    useEffect(() => {

        dispatch(get_artist_product())

    }, [dispatch])

    const { artistProducts, loading } = useSelector((state) => state.product)

    const [open, setOpen] = useState(false) //update-box
    const handleUpdate = (productId) => {
        dispatch(get_full_product({ productId }))
        setOpen(true)
    }

    return (
        <>
            {loading && <GetProductSkeleton />}
            {!loading && (
                <motion.div
                    key="list"
                    className="list-product-view"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="list-header">
                        <div>
                            <h1>My Products</h1>
                            <p>Manage your artwork collection</p>
                        </div>
                        <div className="list-stats">
                            <div className="stat-item">
                                <span className="stat-value">{artistProducts.length}</span>
                                <span className="stat-label">Total</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">
                                    {artistProducts.filter(p => p.status === 'AVAILABLE').length}
                                </span>
                                <span className="stat-label">Available</span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-value">
                                    {artistProducts.filter(p => p.status === 'SOLD').length}
                                </span>
                                <span className="stat-label">Sold</span>
                            </div>
                        </div>
                    </div>

                    {artistProducts?.length === 0 ? (
                        <div className="empty-state">
                            <div className="empty-icon">
                                <i className="ri-inbox-line"></i>
                            </div>
                            <h2>No Products Yet</h2>
                            <p>Start building your collection by creating your first product</p>
                            <motion.button
                                className="empty-action-btn"
                                onClick={() => setActiveView('create')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <i className="ri-add-line"></i>
                                Create Product
                            </motion.button>
                        </div>
                    ) : (
                        <div className="products-grid">
                            {artistProducts.map((product, index) => (
                                <motion.div
                                    key={product._id}
                                    className="product-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    whileHover={{ y: -5 }}
                                >
                                    <div className="card-image-wrapper">
                                        <div className="product-image-placeholder">
                                            <img src={product.images[0].url} alt="" />
                                        </div>
                                        <div className={`status-badge ${product.status.toLowerCase()}`}>
                                            {product.status}
                                        </div>
                                        <div className="card-actions">
                                            <button className="action-btn edit-btn" title="Edit">
                                                <i onClick={() => handleUpdate(product._id)} className="ri-pencil-line"></i>
                                            </button>
                                            <button className="action-btn delete-btn" title="Delete">
                                                <i className="ri-delete-bin-line"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-content">
                                        <h3 className="product-title">{product.title}</h3>
                                        <p className="product-description">{product.shortDescription}</p>
                                        <div className="product-meta">
                                            <span className="product-category">
                                                <i className="ri-folder-line"></i>
                                                {product.category.name}
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
                                            <div className="product-date">
                                                {new Date(product.createdAt).toLocaleDateString()}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    )}
                    <UpdateProduct open={open} onClose={() => setOpen(false)} />
                </motion.div>
            )}
        </>

    )
}

export default GetProduct
