"use client"
import React from 'react'
import "./nav.scss"
import { motion } from "motion/react"
import { useState } from 'react'
import Menu from '../Menu/Menu'
import Like from '../Liked/Like'

const Nav = () => {

    const [isHover, setIsHover] = useState(false);
    const [isFocus, setIsFocus] = useState(false);
    const [value, setValue] = useState("");
    const [menuOpen, setMenuOpen] = useState(false);
    const [likeOpen, setLikeOpen] = useState(false)


    const expanded = isHover || isFocus || value.length > 0;

    return (
        <>
            <div className='Nav'>
                <div className="left">
                    <h1 className='select-none'><span className='cursor-pointer'>Visuels</span> -where arts connect</h1>
                </div>
                <div className="right">
                    <motion.div
                        className="input-box"
                        animate={{ width: expanded ? "20rem" : "2.5rem" }}
                        transition={{ type: "spring", stiffness: 500, damping: 50 }}
                        onHoverStart={() => setIsHover(true)}
                        onHoverEnd={() => setIsHover(false)}
                    >
                        <i className="search ri-search-fill"></i>

                        <input
                            type="text"
                            placeholder="Type here..."
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                            onFocus={() => setIsFocus(true)}
                            onBlur={() => setIsFocus(false)}
                        />
                    </motion.div>

                    <div className="icon-box">
                        <i onClick={() => setLikeOpen(true)} className="icon ri-heart-add-2-fill"></i>
                        <i onClick={() => setMenuOpen(true)} className="icon ri-account-circle-fill"></i>
                    </div>
                </div>
            </div>

            <Menu open={menuOpen} onClose={() => setMenuOpen(false)} />
            <Like OLike={likeOpen} OnCloseLike={() => setLikeOpen(false)} />
        </>

    )
}

export default Nav
