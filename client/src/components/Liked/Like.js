import React from 'react'
import { motion, AnimatePresence } from "framer-motion";
import "./like.scss"
const Like = ({ OLike, OnCloseLike }) => {
    return (
        <AnimatePresence>
            {
                OLike && (
                    <motion.div
                        className='Like'
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={OnCloseLike}
                    >

                        <motion.div
                            className="container"
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", stiffness: 600, damping: 30 }}
                            onClick={(e) => e.stopPropagation()}
                        >

                            <div className="header">
                                <h1>Liked Products</h1>
                                <i onClick={OnCloseLike} className="ri-close-fill"></i>
                            </div>

                            <div className="grid-container">
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>
                                <div className="box"></div>

                            </div>

                        </motion.div>

                    </motion.div>

                )
            }

        </AnimatePresence>
    )
}

export default Like
