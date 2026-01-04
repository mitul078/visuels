"use client"

import React, { useState } from 'react'
import "./product.scss"
import { motion, AnimatePresence } from "framer-motion"
import CreateProduct from '@/components/Artist/AddProduct/CreateProduct'
import GetProduct from '@/components/Artist/GetProduct/GetProduct'

const page = () => {
    const [activeView, setActiveView] = useState('list'); // 'create' or 'list'



    return (
        <div className='Artist-product'>
            <div className="container">
                <div className="sidebar">
                    <div className="sidebar-wrap">
                        <motion.div
                            className={`box ${activeView === 'create' ? 'active' : ''}`}
                            onClick={() => setActiveView('create')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="icon"><i className="ri-apps-2-add-line"></i></div>
                            <h1>Create Product</h1>
                        </motion.div>
                        <motion.div
                            className={`box ${activeView === 'list' ? 'active' : ''}`}
                            onClick={() => setActiveView('list')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <div className="icon"><i className="ri-list-check-2"></i></div>
                            <h1>List Product</h1>
                        </motion.div>
                    </div>
                </div>

                <div className="main">
                    <AnimatePresence mode="wait">
                        {activeView === 'create' ? (<CreateProduct />) : (<GetProduct />)}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    )
}

export default page