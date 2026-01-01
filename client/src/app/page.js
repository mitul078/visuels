"use client"
import React, { useEffect, useState } from 'react'
import "./home.scss"
import Link from 'next/link'
import { motion } from "framer-motion"
const page = () => {

  return (
    <div className='Home'>
      <section className='nav'>
        <div className="box"><h1><Link href={"/"}>Home</Link></h1></div>
        <div className="box"><h1><Link href={"/products"}>Products</Link></h1></div>
        <div className="box"><h1><Link href={"/artists"}>Artists</Link></h1></div>
        <div className="box"><h1><Link href={"/orders"}>Orders</Link></h1></div>
        <div className="box"><h1><Link href={"/messages"}>Messages</Link></h1></div>
      </section>

      <section className='content'>


        <div className='hero'>
          <div className='hero-content'>
            <motion.h1
              className='hero-title'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, ease: "easeOut" }}
            >
              Discover. Create. Connect.
            </motion.h1>
            <motion.p
              className='hero-subtitle'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, ease: "easeOut" }}
            >
              A creative space where artists showcase their work and people discover, follow, and support original creations.
            </motion.p>
            <motion.div
              className='hero-buttons'
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: .8, ease: "easeOut" }}
            >
              <Link href="/products" className='btn-primary'>Explore Artworks</Link>
              <h1 className='btn-secondary'>Join as Artist</h1>
            </motion.div>
          </div>
          <div className='hero-image'>
            <div className="hero-grid">

              <motion.div
                className="box left"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30, scale: .96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .8, ease: "easeOut" }}
              ></motion.div>

              <motion.div
                className="box top-right"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30, scale: .96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .8, ease: "easeOut" }}
              >

              </motion.div>
              <motion.div
                className="box top-bottom"
                whileHover={{ y: -10 }}
                initial={{ opacity: 0, y: 30, scale: .96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: .8, ease: "easeOut" }}
              >

              </motion.div>
            </div>
          </div>
        </div>

        <div className="featured">
          <motion.h1
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.2 }}
            className='featured-heading'
          >
            Featured Artworks
          </motion.h1>
          <motion.div
            variants={{
              hidden: {},
              show: {
                transition: { staggerChildren: .15 }
              }
            }}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-120px" }}
            className="featured-grid"
          >
            <motion.div
              className="featured-box"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <div className="featured-image"></div>
              <div className="featured-data">
                <h1 className='featured-title'>Ronaldo</h1>
                <div className="featured-artist">
                  <div className="avatar"></div>
                  <div className="name">by Artist</div>
                </div>
                <div className="featured-category">
                  <small>Player</small>
                </div>
                <div className="featured-bottom">
                  <h1 className='price'>$499</h1>
                  <button className='btn-save'>Save it</button>
                </div>

              </div>
            </motion.div>
            <motion.div
              className="featured-box"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}

            >
              <div className="featured-image"></div>
              <div className="featured-data">
                <h1 className='featured-title'>Ronaldo</h1>
                <div className="featured-artist">
                  <div className="avatar"></div>
                  <div className="name">by Artist</div>
                </div>
                <div className="featured-category">
                  <small>Player</small>
                </div>
                <div className="featured-bottom">
                  <h1 className='price'>$499</h1>
                  <button className='btn-save'>Save it</button>
                </div>

              </div>
            </motion.div>
            <motion.div
              className="featured-box"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <div className="featured-image"></div>
              <div className="featured-data">
                <h1 className='featured-title'>Ronaldo</h1>
                <div className="featured-artist">
                  <div className="avatar"></div>
                  <div className="name">by Artist</div>
                </div>
                <div className="featured-category">
                  <small>Player</small>
                </div>
                <div className="featured-bottom">
                  <h1 className='price'>$499</h1>
                  <button className='btn-save'>Save it</button>
                </div>

              </div>
            </motion.div>
            <motion.div
              className="featured-box"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <div className="featured-image"></div>
              <div className="featured-data">
                <h1 className='featured-title'>Ronaldo</h1>
                <div className="featured-artist">
                  <div className="avatar"></div>
                  <div className="name">by Artist</div>
                </div>
                <div className="featured-category">
                  <small>Player</small>
                </div>
                <div className="featured-bottom">
                  <h1 className='price'>$499</h1>
                  <button className='btn-save'>Save it</button>
                </div>

              </div>
            </motion.div>
            <motion.div
              className="featured-box"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <div className="featured-image"></div>
              <div className="featured-data">
                <h1 className='featured-title'>Ronaldo</h1>
                <div className="featured-artist">
                  <div className="avatar"></div>
                  <div className="name">by Artist</div>
                </div>
                <div className="featured-category">
                  <small>Player</small>
                </div>
                <div className="featured-bottom">
                  <h1 className='price'>$499</h1>
                  <button className='btn-save'>Save it</button>
                </div>

              </div>
            </motion.div>
            <motion.div
              className="featured-box"
              variants={{
                hidden: { opacity: 0, y: 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 22,
              }}
              whileHover={{
                y: -6,
                boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                transition: { duration: 0.15, ease: "easeOut" },
              }}
            >
              <div className="featured-image"></div>
              <div className="featured-data">
                <h1 className='featured-title'>Ronaldo</h1>
                <div className="featured-artist">
                  <div className="avatar"></div>
                  <div className="name">by Artist</div>
                </div>
                <div className="featured-category">
                  <small>Player</small>
                </div>
                <div className="featured-bottom">
                  <h1 className='price'>$499</h1>
                  <button className='btn-save'>Save it</button>
                </div>

              </div>
            </motion.div>


          </motion.div>
        </div>



        {/* <div className='categories'>
          <h2 className='section-title'>Browse by Category</h2>
          <div className='categories-grid'>
            <div className='category-card'>
              <div className='category-icon'>🎨</div>
              <h3>Paintings</h3>
            </div>
            <div className='category-card'>
              <div className='category-icon'>📸</div>
              <h3>Photography</h3>
            </div>
            <div className='category-card'>
              <div className='category-icon'>✏️</div>
              <h3>Drawings</h3>
            </div>
            <div className='category-card'>
              <div className='category-icon'>🗿</div>
              <h3>Sculptures</h3>
            </div>
            <div className='category-card'>
              <div className='category-icon'>🖼️</div>
              <h3>Digital Art</h3>
            </div>
            <div className='category-card'>
              <div className='category-icon'>🎭</div>
              <h3>Mixed Media</h3>
            </div>
          </div>
        </div>

        <div className='featured'>
          <h2 className='section-title'>Featured Artworks</h2>
          <div className='products-grid'>
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className='product-card'>
                <div className='product-image'>
                  <div className='image-placeholder'></div>
                </div>
                <div className='product-info'>
                  <h3 className='product-title'>Artwork Title {item}</h3>
                  <p className='product-artist'>By Artist Name</p>
                  <div className='product-footer'>
                    <span className='product-price'>${(299 + item * 50).toFixed(2)}</span>
                    <span className='product-rating'>⭐ 4.{item}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className='view-all'>
            <Link href="/products" className='btn-link'>View All Products →</Link>
          </div>
        </div> */}
      </section>
    </div>
  )
}

export default page
