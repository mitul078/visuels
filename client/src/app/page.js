"use client"
import React, { useEffect, useState } from 'react'
import "./home.scss"
import Link from 'next/link'
import { motion } from "framer-motion"
import TopArtist from '@/pages/top_artist/TopArtist'
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

        <div className="artist">
          <motion.h1
            className='artist-heading'
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease: "easeOut" }}
            viewport={{ once: true, amount: .2 }}
          >
            Top Verified Artists</motion.h1>
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: .8, ease: "easeOut" }}
            viewport={{ once: true, amount: .2 }}
            className="artist-container"
          >
            <TopArtist />
          </motion.div>
        </div>

      </section>
    </div>
  )
}

export default page
