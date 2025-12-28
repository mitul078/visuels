import React from 'react'
import "./menu.scss"
import { motion, AnimatePresence } from "framer-motion";


const Menu = ({ open, onClose }) => {
    return (

        <AnimatePresence>
            {
                open && (
                    <motion.div
                        className="Menu"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
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
                                <h1>Menu</h1>
                                <i onClick={onClose} className="ri-close-fill"></i>
                            </div>

                            <div className="mini-container">
                                <div className="box"><h1>Account</h1></div>
                                <div className="box"><h1>Orders</h1></div>
                                <div className="box"><h1>Setting</h1></div>
                                <div className="box"><h1>Logout</h1></div>
                            </div>
                        </motion.div>
                    </motion.div>

                )
            }

        </AnimatePresence>

    )
}

export default Menu
