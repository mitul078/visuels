"use client"
import React from 'react'
import "./get_product.scss"
import { motion } from "framer-motion"

const GetProduct = () => {

    const products = [
        {
            _id: '1',
            title: 'Abstract Vision',
            description: 'A stunning abstract piece that captures the essence of modern art',
            price: 899,
            category: { name: 'Abstract' },
            images: [{ url: '', isPrimary: true }],
            status: 'AVAILABLE',
            createdAt: new Date()
        },
        {
            _id: '2',
            title: 'Nature\'s Symphony',
            description: 'Beautiful landscape painting inspired by nature',
            price: 1249,
            category: { name: 'Nature' },
            images: [{ url: '', isPrimary: true }],
            status: 'SOLD',
            createdAt: new Date()
        },
        {
            _id: '3',
            title: 'Urban Dreams',
            description: 'Contemporary urban art piece',
            price: 699,
            category: { name: 'Urban' },
            images: [{ url: '', isPrimary: true }],
            status: 'AVAILABLE',
            createdAt: new Date()
        }
    ];


    return (
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
                        <span className="stat-value">{products.length}</span>
                        <span className="stat-label">Total</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {products.filter(p => p.status === 'AVAILABLE').length}
                        </span>
                        <span className="stat-label">Available</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-value">
                            {products.filter(p => p.status === 'SOLD').length}
                        </span>
                        <span className="stat-label">Sold</span>
                    </div>
                </div>
            </div>

            {products.length === 0 ? (
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
                    {products.map((product, index) => (
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
                                    <i className="ri-image-line"></i>
                                </div>
                                <div className={`status-badge ${product.status.toLowerCase()}`}>
                                    {product.status}
                                </div>
                                <div className="card-actions">
                                    <button className="action-btn edit-btn" title="Edit">
                                        <i className="ri-pencil-line"></i>
                                    </button>
                                    <button className="action-btn delete-btn" title="Delete">
                                        <i className="ri-delete-bin-line"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="card-content">
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-description">{product.description}</p>
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
        </motion.div>
    )
}

export default GetProduct
