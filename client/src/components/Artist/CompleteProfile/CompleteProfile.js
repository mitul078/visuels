"use client"
import React from 'react'
import "./complete_profile.scss"
import { useDispatch, useSelector } from 'react-redux'
import { complete_profile } from '@/redux/features/profile/profile.thunk'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { clearState } from '@/redux/features/profile/profile.slice'
import { motion } from "framer-motion"
import { useRouter } from 'next/navigation'

const CompleteProfile = () => {
    const SPECIALIST_OPTIONS = [
        "Painter",
        "Digital Artist",
        "Sculptor",
        "Illustrator",
        "Photographer"
    ]

    const STYLES_OPTIONS = [
        "Abstract",
        "Realism",
        "Minimal",
        "Surreal",
        "Modern"
    ]

    const LANGUAGES_OPTIONS = [
        "English",
        "Hindi",
        "Gujarati",
        "Marathi",
        "Tamil"
    ]

    const COUNTRY_OPTIONS = ["India"]

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

    const dispatch = useDispatch()

    const [step, setStep] = useState(1)

    const [formData, setFormData] = useState({
        bio: "",
        city: "",
        state: "",
        country: "",
        about: "",
        specialist: [],
        stylesAndThemes: [],
        languages: [],
        avatar: null,
        banner: null
    })

    const [avatarPreview, setAvatarPreview] = useState(null)
    const [bannerPreview, setBannerPreview] = useState(null)

    const { error, loading, success } = useSelector(state => state.profile)
    const router = useRouter()


    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const toggleSelect = (key, value) => {
        setFormData(prev => ({
            ...prev,
            [key]: prev[key].includes(value)
                ? prev[key].filter(v => v !== value)
                : [...prev[key], value]
        }))
    }

    const handleFileChange = (e) => {
        const file = e.target.files[0]
        const name = e.target.name

        if (file) {
            setFormData(prev => ({
                ...prev,
                [name]: file
            }))


            const reader = new FileReader()
            reader.onloadend = () => {
                if (name === 'avatar') {
                    setAvatarPreview(reader.result)
                } else if (name === 'banner') {
                    setBannerPreview(reader.result)
                }
            }
            reader.readAsDataURL(file)
        }
    }

    const removeImagePreview = (key) => {
        if (key === 'avatar') {
            setAvatarPreview(null)
            setFormData(prev => ({ ...prev, avatar: null }))
        } else if (key === 'banner') {
            setBannerPreview(null)
            setFormData(prev => ({ ...prev, banner: null }))
        }
    }

    const validateStep = () => {
        if (step === 1) {
            return true
        }

        if (step === 2) {
            if (!formData.bio || !formData.city || !formData.state || !formData.country) {
                toast.error("Please fill bio, city, state and country")
                return false
            }
            return true
        }

        if (step === 3) {
            if (
                !formData.specialist.length ||
                !formData.stylesAndThemes.length ||
                !formData.languages.length
            ) {
                toast.error("Please select at least one option in each section")
                return false
            }
            return true
        }

        return true
    }

    const handleNext = () => {
        if (loading) return
        if (!validateStep()) return
        setStep(prev => Math.min(prev + 1, 3))
    }

    const handleBack = () => {
        if (loading) return
        setStep(prev => Math.max(prev - 1, 1))
    }


    const onSubmit = (e) => {
        e.preventDefault()
        if (loading) return
        if (!validateStep()) return

        const data = new FormData()

        data.append("bio", formData.bio)
        data.append("city", formData.city)
        data.append("state", formData.state)
        data.append("country", formData.country)
        data.append("about", formData.about)

        data.append("specialist", formData.specialist.join(","))
        data.append("stylesAndThemes", formData.stylesAndThemes.join(","))
        data.append("languages", formData.languages.join(","))

        if (formData.avatar) data.append("avatar", formData.avatar)
        if (formData.banner) data.append("banner", formData.banner)

        dispatch(complete_profile(data))
    }

    useEffect(() => {
        if (!error) return
        toast.error(error)

        const timer = setTimeout(() => {
            dispatch(clearState())
        }, 0)

        return () => clearTimeout(timer)

    }, [error, dispatch])


    useEffect(() => {
        if (!success) return
        toast.success(success)
        const timer = setTimeout(() => {
            dispatch(clearState())
        }, 0)

        return () => clearTimeout(timer)
    }, [success, dispatch])

    return (
        <motion.div
            className="complete-profile-view"
        >
            <div className="form-header">
                <h1>Complete Artist Profile</h1>
                <p>This information is required before continuing</p>
                <div className="step-indicator">
                    <span className={step === 1 ? "active" : ""}>1. Photos</span>
                    <span className={step === 2 ? "active" : ""}>2. Basics</span>
                    <span className={step === 3 ? "active" : ""}>3. Expertise</span>
                </div>
            </div>

            <form className="product-form" onSubmit={onSubmit}>

                {step === 1 && (
                    <>
                        <div className="form-row">
                            <div className="form-section">
                                <label className="form-label">
                                    <i className="ri-user-avatar-line"></i>
                                    Avatar <small className='opacity-[.6]'>*(optional)</small>
                                </label>
                                <div className="file-upload-wrapper">
                                    {avatarPreview ? (
                                        <div className="image-preview">
                                            <img src={avatarPreview} alt="Avatar preview" />
                                            <button
                                                type="button"
                                                className="remove-image-btn"
                                                onClick={() => removeImagePreview('avatar')}
                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="file-upload-label">
                                            <input
                                                type="file"
                                                name="avatar"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="file-input"
                                            />
                                            <div className="file-upload-content">
                                                <i className="ri-image-add-line"></i>
                                                <span>Choose Avatar</span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                            <div className="form-section">
                                <label className="form-label">
                                    <i className="ri-image-line"></i>
                                    Banner <small className='opacity-[.6]'>*(optional)</small>
                                </label>
                                <div className="file-upload-wrapper">
                                    {bannerPreview ? (
                                        <div className="image-preview banner-preview">
                                            <img src={bannerPreview} alt="Banner preview" />
                                            <button
                                                type="button"
                                                className="remove-image-btn"
                                                onClick={() => removeImagePreview('banner')}
                                            >
                                                <i className="ri-close-line"></i>
                                            </button>
                                        </div>
                                    ) : (
                                        <label className="file-upload-label">
                                            <input
                                                type="file"
                                                name="banner"
                                                accept="image/*"
                                                onChange={handleFileChange}
                                                className="file-input"
                                            />
                                            <div className="file-upload-content">
                                                <i className="ri-image-add-line"></i>
                                                <span>Choose Banner</span>
                                            </div>
                                        </label>
                                    )}
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <>
                        <div className="form-section">
                            <label className="form-label">
                                <i className="ri-user-line"></i>
                                Bio <span>*</span>
                            </label>
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleInputChange}
                                className="form-textarea-long"
                                rows="2"
                                placeholder="Tell something about yourself"
                                required
                            />
                        </div>

                        <div className="form-row">
                            <div className="form-section">
                                <label className="form-label">City *</label>
                                <select
                                    name="city"
                                    value={formData.city}
                                    onChange={handleInputChange}
                                    className="form-input"
                                >
                                    <option value="">Select city</option>
                                    {CITY_OPTIONS.map((city) => (
                                        <option key={city} value={city}>
                                            {city}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-section">
                                <label className="form-label">State *</label>
                                <select
                                    name="state"
                                    value={formData.state}
                                    onChange={handleInputChange}
                                    className="form-input"
                                >
                                    <option value="">Select state</option>
                                    {STATE_OPTIONS.map((state) => (
                                        <option key={state} value={state}>
                                            {state}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="form-section">
                                <label className="form-label">Country *</label>
                                <select
                                    name="country"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="form-input"
                                >
                                    <option value="">Select country</option>
                                    {COUNTRY_OPTIONS.map((country) => (
                                        <option key={country} value={country}>
                                            {country}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label">
                                <i className="ri-file-text-line"></i>
                                About <small className='opacity-[.6]'>*(optional)</small>
                            </label>
                            <textarea
                                name="about"
                                value={formData.about}
                                onChange={handleInputChange}
                                className="form-textarea-long"
                                rows="5"
                                placeholder="Tell us more about your artistic journey and inspiration"
                            />
                        </div>
                    </>
                )}

                {step === 3 && (
                    <>
                        <div className="form-section">
                            <label className="form-label">
                                <i className="ri-palette-line"></i>
                                Specialist <span>*</span>
                            </label>
                            <div className="checkbox-group">
                                {SPECIALIST_OPTIONS.map((option) => (
                                    <label key={option} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.specialist.includes(option)}
                                            onChange={() => toggleSelect("specialist", option)}
                                            className="checkbox-input"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label">
                                <i className="ri-brush-line"></i>
                                Styles & Themes <span>*</span>
                            </label>
                            <div className="checkbox-group">
                                {STYLES_OPTIONS.map((option) => (
                                    <label key={option} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.stylesAndThemes.includes(option)}
                                            onChange={() => toggleSelect("stylesAndThemes", option)}
                                            className="checkbox-input"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div className="form-section">
                            <label className="form-label">
                                <i className="ri-global-line"></i>
                                Languages <span>*</span>
                            </label>
                            <div className="checkbox-group">
                                {LANGUAGES_OPTIONS.map((option) => (
                                    <label key={option} className="checkbox-label">
                                        <input
                                            type="checkbox"
                                            checked={formData.languages.includes(option)}
                                            onChange={() => toggleSelect("languages", option)}
                                            className="checkbox-input"
                                        />
                                        <span className="checkbox-custom"></span>
                                        <span className="checkbox-text">{option}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                <div className="wizard-actions">
                    {step > 1 && (
                        <button
                            type="button"
                            className="secondary-btn"
                            onClick={handleBack}
                            disabled={loading}
                        >
                            Back
                        </button>
                    )}

                    {step < 3 && (
                        <button
                            type="button"
                            className="primary-btn"
                            onClick={handleNext}
                            disabled={loading}
                        >
                            Next
                        </button>
                    )}

                    {step === 3 && (
                        <motion.button
                            type="submit"
                            className="submit-btn"
                            disabled={loading}
                            whileHover={{ scale: loading ? 1 : 1.02 }}
                            whileTap={{ scale: loading ? 1 : 0.97 }}
                        >
                            {loading ? (
                                <>
                                    <i className="ri-loader-4-line spinning"></i>
                                    Completing...
                                </>
                            ) : (
                                <>
                                    <i className="ri-check-line"></i>
                                    Complete Profile
                                </>
                            )}
                        </motion.button>
                    )}
                </div>
            </form>
        </motion.div>
    )
}




export default CompleteProfile
