"use client"
import React, { useEffect } from "react"
import "./profile.scss"
import { motion } from "framer-motion"
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { artist_profile } from "@/redux/features/profile/profile.thunk"



const page = () => {
    const dispatch = useDispatch()
    const { profile , loading } = useSelector(state => state.profile)
    useEffect(() => {
        dispatch(artist_profile())
    }, [dispatch])

    return (
        <>
            {
                !loading && profile && (
                    <motion.div
                        className="ArtistDetail"

                    >
                        <motion.section
                            className="artist-hero"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: .8, ease: "easeOut" }}
                        >
                            <div
                                className="hero-banner"
                                style={{ backgroundImage: profile.banner }}
                            />

                            <div className="hero-main">
                                <div className="avatar-wrapper">
                                    <img src={profile.avatar.url}  />
                                </div>

                                <div className="hero-info">
                                    <div className="hero-top">
                                        <div className="name-block">
                                            <h1>{profile.artist.name}</h1>
                                            <span className="username">@{profile.artist.username}</span>
                                        </div>
                                        <div className="meta">
                                            <span className="meta-item">
                                                <i className="ri-map-pin-line"></i>
                                                {profile.state}
                                            </span>
                                            <span className="meta-item">
                                                <i className="ri-calendar-line"></i>
                                                Joined {profile.joined}
                                            </span>
                                        </div>
                                    </div>

                                    <p className="tagline">{profile.tagline}</p>

                                    <div className="hero-actions">
                                        <button type="button" className="primary">
                                            Send message
                                        </button>
                                        <button type="button" className="ghost">
                                            Follow artist
                                        </button>
                                    </div>

                                    <div className="hero-stats">
                                        <div className="stat">
                                            <span className="stat-label">Artworks</span>
                                            <span className="stat-value">{"0"}</span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Rating</span>
                                            <span className="stat-value">
                                                {"0"}
                                                <span className="stat-unit">
                                                    <i className="ri-star-fill"></i>
                                                </span>
                                            </span>
                                        </div>
                                        <div className="stat">
                                            <span className="stat-label">Followers</span>
                                            <span className="stat-value">
                                                {profile.followers}
                                                <span className="stat-unit">k</span>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        <section className="artist-layout">
                            <motion.div
                                className="left-column"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0, amount: .9 }}
                                transition={{ duration: .8, ease: "easeOut" }}
                            >
                                <motion.section
                                    className="about-card"
                                >
                                    <h2>About the artist</h2>
                                    {profile.about && (
                                        <p>{profile.about}</p>
                                    )}

                                    <div className="pill-group">
                                        <div className="group-label">Specialties</div>
                                        <div className="pills">
                                            {profile.specialist.map((spec) => (
                                                <span key={spec} className="pill">
                                                    {spec}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pill-group">
                                        <div className="group-label">Style & themes</div>
                                        <div className="pills">
                                            {profile.stylesAndThemes.map((style) => (
                                                <span key={style} className="pill">
                                                    {style}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="pill-group">
                                        <div className="group-label">Languages</div>
                                        <div className="pills">
                                            {profile.languages.map((lang) => (
                                                <span key={lang} className="pill soft">
                                                    {lang}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </motion.section>

                                <motion.section
                                    className="info-card"
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                >
                                    <h3>Working on this platform</h3>
                                    <ul className="info-list">
                                        <li>
                                            <i className="ri-checkbox-circle-line"></i>
                                            Made-to-order digital illustrations for personal
                                            collections.
                                        </li>
                                        <li>
                                            <i className="ri-checkbox-circle-line"></i>
                                            Environment key art for indie games & storytelling
                                            projects.
                                        </li>
                                        <li>
                                            <i className="ri-checkbox-circle-line"></i>
                                            Album and cover artwork with cinematic lighting.
                                        </li>
                                        <li>
                                            <i className="ri-checkbox-circle-line"></i>
                                            Limited-edition prints of select pieces.
                                        </li>
                                    </ul>
                                </motion.section>
                            </motion.div>

                            <div className="right-column">
                                <motion.section
                                    className="artwork-header"
                                    initial={{ opacity: 0, y: 14 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.35, ease: "easeOut" }}
                                >
                                    <div>
                                        <h2>Featured work</h2>
                                        <p>
                                            A selection of pieces created by {profile.artist.name} here on the
                                            platform.
                                        </p>
                                    </div>
                                    <button type="button" className="ghost small">
                                        View all artworks
                                    </button>
                                </motion.section>

                                {/* <motion.section
                        className="artwork-grid"
                        initial={{ opacity: 0, x: 14 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                        {artist.artworks.map((art, index) => (
                            <motion.article
                                key={art.id}
                                className="art-card"
                                initial={{ opacity: 0, y: 18 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.3,
                                    delay: 0.06 * index,
                                }}
                                whileHover={{ y: -4 }}
                            >
                                <div className="thumb-wrapper">
                                    <img src={""} alt={art.title} />
                                    <span
                                        className={`status-badge ${art.status
                                            .toLowerCase()
                                            .replace(" ", "-")}`}
                                    >
                                        {art.status}
                                    </span>
                                </div>
                            </motion.article>
                        ))}
                    </motion.section> */}
                            </div>
                        </section>

                        <section className="back-link">
                            <Link href="/user/artists">
                                <i className="ri-arrow-left-line"></i>
                                Back to all artists
                            </Link>
                        </section>
                    </motion.div>

                )
            }
        </>
    )
}

export default page

