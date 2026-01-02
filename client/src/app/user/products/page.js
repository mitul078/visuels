"use client"
import React, { useState } from 'react'
import "./product.scss"
import { motion, AnimatePresence } from "framer-motion"

const page = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [sortBy, setSortBy] = useState('featured');
    const [showFilters, setShowFilters] = useState(false);

    // Sample product data - replace with actual data from API
    const products = [
        { id: 1, title: "Abstract Vision", artist: "Sarah Chen", price: 899, category: "Abstract", image: "" },
        { id: 2, title: "Nature's Symphony", artist: "Michael Torres", price: 1249, category: "Nature", image: "" },
        { id: 3, title: "Urban Dreams", artist: "Emma Wilson", price: 699, category: "Urban", image: "" },
        { id: 4, title: "Ocean Depths", artist: "James Park", price: 1599, category: "Nature", image: "" },
        { id: 5, title: "Digital Fusion", artist: "Alex Rivera", price: 1099, category: "Digital", image: "" },
        { id: 6, title: "Minimalist Flow", artist: "Lisa Zhang", price: 549, category: "Abstract", image: "" },
        { id: 7, title: "City Lights", artist: "David Kim", price: 1799, category: "Urban", image: "" },
        { id: 8, title: "Serene Landscape", artist: "Maria Garcia", price: 999, category: "Nature", image: "" },
        { id: 9, title: "Geometric Harmony", artist: "Chris Brown", price: 799, category: "Abstract", image: "" },
        { id: 10, title: "Futuristic Vision", artist: "Taylor Swift", price: 1399, category: "Digital", image: "" },
        { id: 11, title: "Mountain Peak", artist: "Robert Lee", price: 1199, category: "Nature", image: "" },
        { id: 12, title: "Neon Nights", artist: "Jessica Martinez", price: 949, category: "Urban", image: "" },
    ];

    const categories = ['All', 'Abstract', 'Nature', 'Urban', 'Digital'];

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
                        {categories.map((category, index) => (
                            <motion.button
                                key={category}
                                className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
                                onClick={() => setSelectedCategory(category)}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.3 }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                {category}
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
                            {categories.slice(1).map(category => (
                                <label key={category} className="filter-option">
                                    <input
                                        type="checkbox"
                                        checked={selectedCategory === category}
                                        onChange={() => setSelectedCategory(category)}
                                    />
                                    <span>{category}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.aside>

            <section className="products-section">
                <motion.div
                    className="products-grid"
                    variants={{
                        hidden: {},
                        show: {
                            transition: { staggerChildren: 0.1 }
                        }
                    }}
                    initial="hidden"
                    animate="show"
                >
                    {products.map((product, index) => (
                        <motion.div
                            key={product.id}
                            className="product-card"
                            variants={{
                                hidden: { opacity: 0, y: 40, scale: 0.95 },
                                show: {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    transition: {
                                        type: "spring",
                                        stiffness: 260,
                                        damping: 22
                                    }
                                }
                            }}
                            whileHover={{
                                y: -8,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <div className="card-image-wrapper">
                                <div className="product-image"></div>
                                <div className="card-overlay">
                                    <motion.button
                                        className="quick-view-btn"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <i className="ri-eye-line"></i>
                                        Quick View
                                    </motion.button>
                                    <motion.button
                                        className="like-btn"
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <i className="ri-heart-line"></i>
                                    </motion.button>
                                </div>
                                {index < 3 && (
                                    <div className="badge featured-badge">
                                        <i className="ri-star-fill"></i>
                                        Featured
                                    </div>
                                )}
                            </div>
                            <div className="card-content">
                                <div className="product-info">
                                    <h3 className="product-title">{product.title}</h3>
                                    <div className="product-artist">
                                        <div className="artist-avatar"></div>
                                        <span className="artist-name">by {product.artist}</span>
                                    </div>
                                    <div className="product-category">
                                        <span>{product.category}</span>
                                    </div>
                                </div>
                                <div className="product-footer">
                                    <div className="product-price">
                                        <span className="price-amount">${product.price}</span>
                                    </div>
                                    <motion.button
                                        className="add-to-cart-btn"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <i className="ri-shopping-cart-line"></i>
                                        See detail
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </section>

            {/* Load More Section */}
            <motion.section
                className="load-more-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
            >
                <motion.button
                    className="load-more-btn"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                >
                    Load More Artworks
                    <i className="ri-arrow-down-line"></i>
                </motion.button>
            </motion.section>
        </div>
    )
}

export default page
