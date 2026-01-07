"use client"
import React, { useEffect, useState } from "react"
import "./account.scss"
import { motion } from "framer-motion"
import { useDispatch, useSelector } from "react-redux"
import toast from "react-hot-toast"
import { clearState } from "@/redux/features/profile/profile.slice"
import { update_user_profile, user_profile } from "@/redux/features/profile/profile.thunk"
import AccountSkeleton from "@/components/Skeleton/AccountSkeleton"

const page = () => {
    const dispatch = useDispatch()

    const COUNTRY_OPTIONS = ["India", "United States", "United Kingdom"]
    const STATE_OPTIONS = [
        "Gujarat",
        "Maharashtra",
        "Rajasthan",
        "Delhi",
        "Karnataka"
    ]
    const CITY_OPTIONS = [
        "Ahmedabad",
        "Surat",
        "Mumbai",
        "Pune",
        "Jaipur",
        "Delhi",
        "Bengaluru"
    ]
    const { profile, error, success, loading } = useSelector(state => state.profile)
    const { user } = useSelector((state) => state.auth)
    const [isEdit, setIsEdit] = useState(false)
    const [data, setData] = useState({})

    useEffect(() => {
        if (profile) {
            setData(profile)
        }
    }, [profile])


    useEffect(() => {
        dispatch(user_profile())
    }, [dispatch])

    useEffect(() => {
        if (!error) return
        toast.error(error)
        dispatch(clearState())

    }, [error, dispatch])
    useEffect(() => {
        if (!success) return
        toast.success(success)
        dispatch(clearState())

    }, [success, dispatch])

    const handleEditProfile = () => {
        setIsEdit(true)
    }
    const handleCancelEdit = () => {
        setIsEdit(false)
        setData(profile)
    }

    const handleSaveProfile = () => {
        dispatch(update_user_profile(data))
        setIsEdit(false)
    }


    const handleChange = (e) => {
        const { name, value } = e.target
        setData(prev => ({
            ...prev,
            [name]: value
        }))
    }


    return (
        <>
            {loading && <AccountSkeleton />}
            {
                !loading && user && profile && (
                    <div className="my-account">
                        <div className="container">

                            <motion.div
                                className="profile-header"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.3 }}
                                viewport={{ amount: .4, once: true }}
                            >
                                <div className="profile-header-content">
                                    <div className="avatar-section">
                                        <div className="avatar">
                                            <img
                                                src="/user_avatar.webp"
                                                alt="Profile"
                                            />
                                            <div className="avatar-overlay">
                                                <i className="ri-camera-line"></i>
                                            </div>
                                        </div>

                                        <div className="user-info">
                                            <h1>{user.name}</h1>
                                            <p className="email">{user.email}</p>
                                            <p className="username">@{user.username}</p>
                                            <p className="join-date">
                                                <i className="ri-calendar-line"></i>
                                                Member since {new Date(user.joinDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="stats">
                                    <div className="stat-item">
                                        <div className="stat-icon">
                                            <i className="ri-shopping-bag-line"></i>
                                        </div>
                                        <div className="stat-content">
                                            <h3>12</h3>
                                            <p>Orders</p>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-icon">
                                            <i className="ri-heart-line"></i>
                                        </div>
                                        <div className="stat-content">
                                            <h3>45</h3>
                                            <p>Favorites</p>
                                        </div>
                                    </div>
                                    <div className="stat-item">
                                        <div className="stat-icon">
                                            <i className="ri-star-line"></i>
                                        </div>
                                        <div className="stat-content">
                                            <h3>8</h3>
                                            <p>Reviews</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="content-grid">
                                <motion.div
                                    className="section-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: .1, once: true }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="section-header">
                                        <h2>
                                            <i className="ri-user-line"></i>
                                            Personal Information
                                        </h2>
                                        {isEdit ? (
                                            <div className="edit-actions edit">
                                                <button className="edit-profile-btn" onClick={handleSaveProfile}>
                                                    <i className="ri-save-line"></i>
                                                    Save
                                                </button>
                                                <button className="cancel-btn" onClick={handleCancelEdit}>
                                                    Cancel
                                                </button>
                                            </div>
                                        ) : (
                                            <button className="edit-profile-btn" onClick={handleEditProfile}>
                                                <i className="ri-edit-line"></i>
                                                Edit
                                            </button>
                                        )}

                                    </div>
                                    <div className="section-content info-view">
                                        <div className="info-grid">
                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-user-3-line"></i>
                                                    First Name
                                                </span>
                                                {
                                                    !isEdit ? (
                                                        <span className="value">{profile.firstName}</span>
                                                    ) : (
                                                        <input
                                                            className="in"
                                                            type="text"
                                                            name="firstName"
                                                            value={data.firstName || ""}
                                                            onChange={handleChange}
                                                        />
                                                    )
                                                }

                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-user-3-line"></i>
                                                    Last Name
                                                </span>
                                                {
                                                    !isEdit ? (
                                                        <span className="value">{profile.lastName}</span>
                                                    ) : (
                                                        <input
                                                            className="in"
                                                            type="text"
                                                            name="lastName"
                                                            value={data.lastName || ""}
                                                            onChange={handleChange}
                                                        />
                                                    )
                                                }

                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-mail-line"></i>
                                                    Email
                                                </span>
                                                <span className="value">{user.email}</span>
                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-phone-line"></i>
                                                    Phone
                                                </span>
                                                {
                                                    !isEdit ? (<span className="value">{profile.phone}</span>) : (
                                                        <input
                                                            className="in"
                                                            type="text"
                                                            name="phone"
                                                            value={data.phone || ""}
                                                            onChange={handleChange}
                                                        />
                                                    )
                                                }

                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-calendar-event-line"></i>
                                                    Date of Birth
                                                </span>
                                                {!isEdit ? (
                                                    <span className="value">
                                                        {new Date(profile.dateOfBirth).toLocaleDateString()}
                                                    </span>
                                                ) : (
                                                    <input
                                                        className="in"
                                                        type="date"
                                                        name="dateOfBirth"
                                                        value={data.dateOfBirth?.slice(0, 10) || ""}
                                                        onChange={handleChange}
                                                    />
                                                )}
                                            </div>

                                            <div className="info-item full-width">
                                                <span className="label">
                                                    <i className="ri-home-line"></i>
                                                    Address
                                                </span>
                                                {
                                                    !isEdit ? (<span className="value">{profile.address}</span>) : (
                                                        <input
                                                            className="in"
                                                            type="text"
                                                            name="address"
                                                            value={data.address || ""}
                                                            onChange={handleChange}
                                                        />
                                                    )
                                                }

                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-building-line"></i>
                                                    City
                                                </span>
                                                {
                                                    !isEdit ? (
                                                        <span className="value">{profile.city}</span>
                                                    ) : (
                                                        <select
                                                            className="in"
                                                            name="city"
                                                            value={data.city || ""}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select city</option>
                                                            {CITY_OPTIONS.map(city => (
                                                                <option key={city} value={city}>
                                                                    {city}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                }

                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-map-pin-2-line"></i>
                                                    State
                                                </span>
                                                {
                                                    !isEdit ? (
                                                        <span className="value">{profile.state}</span>
                                                    ) : (
                                                        <select
                                                            className="in"
                                                            name="state"
                                                            value={data.state || ""}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select state</option>
                                                            {STATE_OPTIONS.map(state => (
                                                                <option key={state} value={state}>
                                                                    {state}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                }
                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-mail-send-line"></i>
                                                    Pin Code
                                                </span>
                                                {
                                                    !isEdit ? (<span className="value">{profile.pinCode}</span>) : (
                                                        <input
                                                            className="in"
                                                            type="text"
                                                            name="pinCode"
                                                            value={data.pinCode || ""}
                                                            onChange={handleChange}
                                                        />
                                                    )
                                                }
                                            </div>

                                            <div className="info-item">
                                                <span className="label">
                                                    <i className="ri-global-line"></i>
                                                    Country
                                                </span>
                                                {
                                                    !isEdit ? (
                                                        <span className="value">{profile.country}</span>
                                                    ) : (
                                                        <select
                                                            className="in"
                                                            name="country"
                                                            value={data.country || ""}
                                                            onChange={handleChange}
                                                        >
                                                            <option value="">Select country</option>
                                                            {COUNTRY_OPTIONS.map(country => (
                                                                <option key={country} value={country}>
                                                                    {country}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Account Settings Section */}
                                <motion.div
                                    className="section-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ amount: .1, once: true }}
                                    transition={{ duration: 0.3 }}
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
                                                <h3>Privacy Settings</h3>
                                                <p>Manage your privacy and data preferences</p>
                                            </div>
                                            <button className="action-btn">
                                                <i className="ri-privacy-policy-line"></i>
                                                Manage
                                            </button>
                                        </div>

                                        <div className="setting-item danger-item">
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
        </>
    )
}

export default page
