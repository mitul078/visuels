"use client"
import React, { useEffect, useState } from 'react'
import "./product.scss"
import { motion, AnimatePresence } from "framer-motion"
import { useDispatch, useSelector } from 'react-redux'
import { get_all_category, get_full_product, get_products } from '@/redux/features/product/product.thunk'
import toast from 'react-hot-toast'
import { clearState } from '@/redux/features/product/product.slice'
import { useRouter } from 'next/navigation'

const page = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);
    const { products, loading, error, success, categories, hasMore } = useSelector((state) => state.product)
    const router = useRouter()

    const dispatch = useDispatch()

    const [page, setPage] = useState(1)

    useEffect(() => {
        if (loading) return
        dispatch(get_products({ page, category: selectedCategory === "All" ? undefined : selectedCategory }))
        setPage(1)
    }, [dispatch, selectedCategory, page])

    useEffect(() => {
        dispatch(get_all_category())
    }, [dispatch])


    useEffect(() => {

        if (!error) return

        toast(error)

        dispatch(clearState())

    }, [])

    const handleRouting = (id) => {
        dispatch(get_full_product({ productId:id }))
        router.push(`/user/products/${id}`)
    }


    return (
        <div className='Product'>

            <motion.section
                className="product-hero"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="hero-content">
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                    >
                        Discover Premium Artworks
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Explore our curated collection of exceptional artworks from talented artists worldwide
                    </motion.p>
                </div>
            </motion.section>

            <motion.section
                className="product-controls"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
            >
                <div className="controls-wrapper">
                    <div className="category-filters">
                        <motion.button
                            className={`category-btn ${selectedCategory === "All" ? "active" : ""}`}
                            onClick={() => setSelectedCategory("All")}
                        >
                            All
                        </motion.button>
                        {categories.map((category, index) => (
                            <motion.button
                                key={category._id}
                                className={`category-btn ${selectedCategory === category.slug ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category.slug)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category.name}
                            </motion.button>
                        ))}
                    </div>

                    <div className="control-actions">
                        <motion.button
                            className="filter-toggle"
                            onClick={() => setShowFilters(!showFilters)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <i className="ri-filter-3-fill"></i>
                            Filters
                        </motion.button>
                        <select
                            className="sort-select"
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="featured">Featured</option>
                            <option value="price-low">Price: Low to High</option>
                            <option value="price-high">Price: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>
            </motion.section>

            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        className="filter-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowFilters(false)}
                    />
                )}
            </AnimatePresence>

            <motion.aside
                className={`filter-sidebar ${showFilters ? 'open' : ''}`}
                initial={false}
                animate={{ x: showFilters ? 0 : '-100%' }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
                <div className="sidebar-header">
                    <h2>Filters</h2>
                    <button onClick={() => setShowFilters(false)}>
                        <i className="ri-close-line"></i>
                    </button>
                </div>
                <div className="sidebar-content">
                    <div className="filter-group">
                        <h3>Price Range</h3>
                        <div className="price-range">
                            <input
                                type="range"
                                min="0"
                                max="10000"
                                value={priceRange[1]}
                                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            />
                            <div className="price-display">
                                <span>${priceRange[0]}</span>
                                <span>${priceRange[1]}</span>
                            </div>
                        </div>
                    </div>
                    <div className="filter-group">
                        <h3>Category</h3>
                        <div className="filter-options">
                            {categories.map(category => (
                                <label key={category._id} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategory === category.slug}
                                        onChange={() => setSelectedCategory(category.slug)}
                                    />
                                    <span>{category.name}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.aside>

            {products.length === 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: .4, ease: "easeOut" }}
                    className='fallback'
                >

                    <h1>No Product Found</h1>
                </motion.div>)}
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
                                <img src={product.images[0].url} alt="" />
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
                                <div className="product-btn">
                                    <button
                                        onClick={() => handleRouting(product._id)}
                                    >See Detail</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {
                products.length !== 0 && (

                    <motion.section
                        className="load-more-section"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.button
                            disabled={!hasMore || loading}
                            onClick={() => setPage(prev => prev + 1)}
                            className="load-more-btn"
                            whileHover={{ scale: !hasMore ? 1 : 1.05 }}
                            whileTap={{ scale: !hasMore ? 1 : 0.95 }}
                        >
                            {loading ? "Loading..." : hasMore ? "Load More Artworks" : "No More Artworks"}
                            {hasMore && <i className="ri-arrow-down-line"></i>}
                        </motion.button>
                    </motion.section>
                )
            }
        </div>
    )
}

export default page
