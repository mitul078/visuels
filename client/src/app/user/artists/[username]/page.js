"use client"
import React from "react"
import "./artist-detail.scss"
import { useParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"


const ARTISTS = [
    {
        username: "ameliahart",
        name: "Amelia Hart",
        avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        banner: "linear-gradient(135deg, #1f1c2c, #928dab)",
        tagline: "Digital painter crafting dreamy, cinematic landscapes.",
        location: "Berlin, Germany",
        joined: "March 2022",
        specialties: ["Digital Art", "Concept", "Illustration"],
        stats: {
            artworks: 86,
            commissions: 34,
            rating: 4.9,
            followers: 12.4,
        },
        about: `Amelia is a digital illustrator focusing on atmospheric environments and
story-driven compositions. Her work blends cinematic lighting with soft color
palettes to create immersive scenes that feel like frames from a film.`,
        styles: ["Cinematic", "Pastel", "Dreamy", "Narrative"],
        languages: ["English", "German"],
        artworks: [
            {
                id: 1,
                title: "Golden Hour Over Echo Ridge",
                thumb: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
                category: "Environment",
                status: "Available",
            },
            {
                id: 2,
                title: "Neon Rain In District 7",
                thumb: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=900&q=80",
                category: "Concept",
                status: "Booked",
            },
            {
                id: 3,
                title: "Silent Forest Observatory",
                thumb: "https://images.unsplash.com/photo-1500534314211-0a24cd03f2c0?auto=format&fit=crop&w=900&q=80",
                category: "Environment",
                status: "Available",
            },
            {
                id: 4,
                title: "Midnight City Rooftops",
                thumb: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=80",
                category: "Key Art",
                status: "Available",
            },
        ],
    },
]

const getArtistByUsername = (username) => {
    return ARTISTS.find((artist) => artist.username === username) || ARTISTS[0]
}

const page = () => {
    const params = useParams()
    const username = params?.username
    const artist = getArtistByUsername(username)

    return (
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
                    style={{ backgroundImage: artist.banner }}
                />

                <div className="hero-main">
                    <div className="avatar-wrapper">
                        <img src={artist.avatar} alt={artist.name} />
                    </div>

                    <div className="hero-info">
                        <div className="hero-top">
                            <div className="name-block">
                                <h1>{artist.name}</h1>
                                <span className="username">@{artist.username}</span>
                            </div>
                            <div className="meta">
                                <span className="meta-item">
                                    <i className="ri-map-pin-line"></i>
                                    {artist.location}
                                </span>
                                <span className="meta-item">
                                    <i className="ri-calendar-line"></i>
                                    Joined {artist.joined}
                                </span>
                            </div>
                        </div>

                        <p className="tagline">{artist.tagline}</p>

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
                                <span className="stat-value">{artist.stats.artworks}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Commissions</span>
                                <span className="stat-value">
                                    {artist.stats.commissions}
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Rating</span>
                                <span className="stat-value">
                                    {artist.stats.rating}
                                    <span className="stat-unit">
                                        <i className="ri-star-fill"></i>
                                    </span>
                                </span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Followers</span>
                                <span className="stat-value">
                                    {artist.stats.followers}
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
                    whileInView={{ opacity: 1, x: 0, amount: .9  }}
                    transition={{ duration: .8, ease: "easeOut" }}
                >
                    <motion.section
                        className="about-card"
                    >
                        <h2>About the artist</h2>
                        <p>{artist.about}</p>

                        <div className="pill-group">
                            <div className="group-label">Specialties</div>
                            <div className="pills">
                                {artist.specialties.map((spec) => (
                                    <span key={spec} className="pill">
                                        {spec}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pill-group">
                            <div className="group-label">Style & themes</div>
                            <div className="pills">
                                {artist.styles.map((style) => (
                                    <span key={style} className="pill">
                                        {style}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="pill-group">
                            <div className="group-label">Languages</div>
                            <div className="pills">
                                {artist.languages.map((lang) => (
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
                                A selection of pieces created by {artist.name} here on the
                                platform.
                            </p>
                        </div>
                        <button type="button" className="ghost small">
                            View all artworks
                        </button>
                    </motion.section>

                    <motion.section
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
                                    <img src={art.thumb} alt={art.title} />
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
                    </motion.section>
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

export default page

