"use client"
import React from "react"
import "./artist.scss"
import { motion } from "framer-motion"
import Link from "next/link"

const artists = [
    {
        id: 1,
        name: "Amelia Hart",
        username: "ameliahart",
        avatar: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=400&q=80",
        banner: "linear-gradient(135deg, #1f1c2c, #928dab)",
        tagline: "Digital painter crafting dreamy landscapes",
        specialties: ["Digital Art", "Concept", "Illustration"],
        location: "Berlin, Germany",
        artworks: 86,
        followers: 12.4,
    },
    {
        id: 2,
        name: "Kenji Watanabe",
        username: "kenji.studio",
        avatar: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=400&q=80",
        banner: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        tagline: "Minimal 3D forms with bold color stories",
        specialties: ["3D", "Product", "Branding"],
        location: "Tokyo, Japan",
        artworks: 64,
        followers: 9.8,
    },
    {
        id: 3,
        name: "Lina Flores",
        username: "linadraws",
        avatar: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80",
        banner: "linear-gradient(135deg, #3a1c71, #d76d77, #ffaf7b)",
        tagline: "Vibrant portraits inspired by music & fashion",
        specialties: ["Portrait", "Fashion", "Color"],
        location: "Mexico City, MX",
        artworks: 104,
        followers: 15.2,
    },
    {
        id: 4,
        name: "Noah Clarke",
        username: "noahc",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
        banner: "linear-gradient(135deg, #141e30, #243b55)",
        tagline: "Moody street photography & cinematic edits",
        specialties: ["Photography", "Street", "Cinematic"],
        location: "Toronto, Canada",
        artworks: 73,
        followers: 11.1,
    },
]

const page = () => {
    return (
        <div className="Artists">
            <motion.section
                className="artist-hero"
                initial={{ opacity: 0, y: -16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <div className="hero-content">
                    <motion.p
                        className="eyebrow"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 }}
                    >
                        Meet the creators behind the marketplace
                    </motion.p>
                    <motion.h1
                        className="hero-title"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.15 }}
                    >
                        Discover talented artists
                    </motion.h1>
                    <motion.p
                        className="hero-subtitle"
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        Browse a curated list of artists. Tap into their style and view
                        full profiles for more details.
                    </motion.p>
                </div>
            </motion.section>

            <section className="artist-grid">
                {artists.map((artist, index) => (
                    <motion.article
                        key={artist.id}
                        className="artist-card"
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.06 }}
                        whileHover={{ translateY: -6 }}
                    >
                        <div
                            className="artist-banner"
                            style={{ backgroundImage: artist.banner }}
                        />
                        <div className="artist-avatar">
                            <img src={artist.avatar} alt={`${artist.name} avatar`} />
                        </div>
                        <div className="artist-body">
                            <div className="artist-header">
                                <div>
                                    <h3>{artist.name}</h3>
                                    <span className="username">@{artist.username}</span>
                                </div>
                                <span className="location">
                                    <i className="ri-map-pin-line"></i>
                                    {artist.location}
                                </span>
                            </div>

                            <p className="tagline">{artist.tagline}</p>

                            <div className="specialties">
                                {artist.specialties.map((skill) => (
                                    <span key={skill} className="pill">
                                        {skill}
                                    </span>
                                ))}
                            </div>

                            <div className="artist-stats">
                                <div className="stat">
                                    <i className="ri-brush-line"></i>
                                    <div>
                                        <span className="stat-value">{artist.artworks}</span>
                                        <span className="stat-label">Artworks</span>
                                    </div>
                                </div>
                                <div className="stat">
                                    <i className="ri-user-smile-line"></i>
                                    <div>
                                        <span className="stat-value">
                                            {artist.followers}k
                                        </span>
                                        <span className="stat-label">Followers</span>
                                    </div>
                                </div>
                            </div>

                            <div className="artist-actions">
                                <Link href={`/user/artists/${artist.username}`} className="primary">
                                    View profile
                                </Link>
                                <button type="button" className="ghost">
                                    Follow
                                </button>
                            </div>
                        </div>
                    </motion.article>
                ))}
            </section>
        </div>
    )
}

export default page
