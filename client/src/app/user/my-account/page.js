"use client"
import React, { useState } from 'react'
import "./account.scss"
import { motion } from "framer-motion"

const page = () => {
    // Dummy data - no actual data fetching
    const [userData] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        username: "johndoe",
        phone: "+1 (555) 123-4567",
        bio: "Digital art enthusiast and collector. Love supporting independent artists!",
        joinDate: "January 2023",
        avatar: "https://ui-avatars.com/api/?name=John+Doe&background=19183B&color=fff&size=200",
        location: "New York, USA",
        website: "https://johndoe.com"
    })

    const [personalInfo, setPersonalInfo] = useState({
        firstName: "John",
        lastName: "Doe",
        email: "john.doe@example.com",
        phone: "+1 (555) 123-4567",
        dateOfBirth: "1990-05-15",
        address: "123 Main Street",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "United States"
    })

    const [preferences, setPreferences] = useState({
        emailNotifications: true,
        smsNotifications: false,
        marketingEmails: true,
        orderUpdates: true,
        newsletter: false,
        language: "English",
        currency: "USD",
        theme: "Light"
    })

    const handleInputChange = (section, field, value) => {
        if (section === 'personal') {
            setPersonalInfo(prev => ({ ...prev, [field]: value }))
        } else if (section === 'preferences') {
            setPreferences(prev => ({ ...prev, [field]: value }))
        }
    }

    return (
        <div className="my-account">
            <div className="container">
                <motion.div
                    className="profile-header"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="avatar-section">
                        <div className="avatar">
                            <img src={userData.avatar} alt={userData.name} />
                            <button className="edit-avatar">
                                <i className="ri-camera-line"></i>
                            </button>
                        </div>
                        <div className="user-info">
                            <h1>{userData.name}</h1>
                            <p className="email">{userData.email}</p>
                            <p className="username">@{userData.username}</p>
                            <p className="join-date">Member since {userData.joinDate}</p>
                        </div>
                    </div>
                    <div className="stats">
                        <div className="stat-item">
                            <h3>12</h3>
                            <p>Orders</p>
                        </div>
                        <div className="stat-item">
                            <h3>45</h3>
                            <p>Favorites</p>
                        </div>
                        <div className="stat-item">
                            <h3>8</h3>
                            <p>Reviews</p>
                        </div>
                    </div>
                </motion.div>


                <div className="content-grid">

                    {/* Bio Section */}
                    <motion.div
                        className="section-card"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                    >
                        <div className="section-header">
                            <h2>
                                <i className="ri-file-text-line"></i>
                                About Me
                            </h2>
                            <button className="edit-btn">
                                <i className="ri-edit-line"></i>
                                Edit
                            </button>
                        </div>
                        <div className="section-content">
                            <div className="form-group">
                                <label>Bio</label>
                                <textarea
                                    rows="4"
                                    value={userData.bio}
                                    disabled
                                    placeholder="Tell us about yourself..."
                                />
                            </div>
                            <div className="form-group">
                                <label>Location</label>
                                <input
                                    type="text"
                                    value={userData.location}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Website</label>
                                <input
                                    type="url"
                                    value={userData.website}
                                    disabled
                                />
                            </div>
                        </div>
                    </motion.div>
                    {/* Personal Information Section */}
                    <motion.div
                        className="section-card"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                    >
                        <div className="section-header">
                            <h2>
                                <i className="ri-user-line"></i>
                                Personal Information
                            </h2>
                            <button className="edit-btn">
                                <i className="ri-edit-line"></i>
                                Edit
                            </button>
                        </div>
                        <div className="section-content">
                            <div className="form-group">
                                <label>First Name</label>
                                <input
                                    type="text"
                                    value={personalInfo.firstName}
                                    onChange={(e) => handleInputChange('personal', 'firstName', e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Last Name</label>
                                <input
                                    type="text"
                                    value={personalInfo.lastName}
                                    onChange={(e) => handleInputChange('personal', 'lastName', e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input
                                    type="email"
                                    value={personalInfo.email}
                                    onChange={(e) => handleInputChange('personal', 'email', e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Phone Number</label>
                                <input
                                    type="tel"
                                    value={personalInfo.phone}
                                    onChange={(e) => handleInputChange('personal', 'phone', e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="form-group">
                                <label>Date of Birth</label>
                                <input
                                    type="date"
                                    value={personalInfo.dateOfBirth}
                                    onChange={(e) => handleInputChange('personal', 'dateOfBirth', e.target.value)}
                                    disabled
                                />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        value={personalInfo.address}
                                        onChange={(e) => handleInputChange('personal', 'address', e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>City</label>
                                    <input
                                        type="text"
                                        value={personalInfo.city}
                                        onChange={(e) => handleInputChange('personal', 'city', e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>State</label>
                                    <input
                                        type="text"
                                        value={personalInfo.state}
                                        onChange={(e) => handleInputChange('personal', 'state', e.target.value)}
                                        disabled
                                    />
                                </div>
                                <div className="form-group">
                                    <label>Zip Code</label>
                                    <input
                                        type="text"
                                        value={personalInfo.zipCode}
                                        onChange={(e) => handleInputChange('personal', 'zipCode', e.target.value)}
                                        disabled
                                    />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Country</label>
                                <input
                                    type="text"
                                    value={personalInfo.country}
                                    onChange={(e) => handleInputChange('personal', 'country', e.target.value)}
                                    disabled
                                />
                            </div>
                        </div>
                    </motion.div>

                    {/* Account Settings Section */}
                    <motion.div
                        className="section-card"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                    >
                        <div className="section-header">
                            <h2>
                                <i className="ri-settings-3-line"></i>
                                Account Settings
                            </h2>
                        </div>
                        <div className="section-content">
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>Change Password</h3>
                                    <p>Update your password to keep your account secure</p>
                                </div>
                                <button className="action-btn">
                                    <i className="ri-lock-password-line"></i>
                                    Change
                                </button>
                            </div>
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>Two-Factor Authentication</h3>
                                    <p>Add an extra layer of security to your account</p>
                                </div>
                                <button className="action-btn">
                                    <i className="ri-shield-check-line"></i>
                                    Enable
                                </button>
                            </div>
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>Connected Accounts</h3>
                                    <p>Manage your social media connections</p>
                                </div>
                                <button className="action-btn">
                                    <i className="ri-link"></i>
                                    Manage
                                </button>
                            </div>
                            <div className="setting-item">
                                <div className="setting-info">
                                    <h3>Delete Account</h3>
                                    <p>Permanently delete your account and all data</p>
                                </div>
                                <button className="action-btn danger">
                                    <i className="ri-delete-bin-line"></i>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </motion.div>



                </div>
            </div>
        </div>
    )
}

export default page
