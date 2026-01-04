"use client"

import React, { useEffect, useState } from "react"
import "./update_product.scss"
import { useDispatch, useSelector } from "react-redux"
import { clearSelectedProduct, clearState } from "@/redux/features/product/product.slice"
import { get_artist_product, update_product } from "@/redux/features/product/product.thunk"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"

const UpdateProduct = ({ open, onClose }) => {
    const [initialData, setInitialData] = useState(null)
    const dispatch = useDispatch()
    const { selectedProduct, loading, success, error } = useSelector(
        (state) => state.product
    )


    const categories = ["Abstract", "Nature", "Urban", "Digital", "Portrait", "Landscape", "Minimalist", "Contemporary",]

    const [formData, setFormData] = useState({
        title: "",
        shortDescription: "",
        description: "",
        price: "",
        category: "",
        material: "",
        certified: false,
        handMade: false,
        frameInclude: false,
        artistNote: "",
        story: "",
        width: "",
        height: "",
        depth: "",
        orientation: "LANDSCAPE",
        unit: "CM",
    })
    useEffect(() => {
        if (!selectedProduct) return

        const mappedData = {
            title: selectedProduct.title || "",
            shortDescription: selectedProduct.shortDescription || "",
            description: selectedProduct.description || "",
            price: selectedProduct.price || "",
            category: selectedProduct.category?.name || selectedProduct.category || "",
            material: selectedProduct.material || "",
            certified: selectedProduct.certified || false,
            handMade: selectedProduct.handMade || false,
            frameInclude: selectedProduct.frameInclude || false,
            artistNote: selectedProduct.artistNote || "",
            story: selectedProduct.story || "",
            width: selectedProduct.productDimension?.width || "",
            height: selectedProduct.productDimension?.height || "",
            depth: selectedProduct.productDimension?.depth || "",
            orientation: selectedProduct.productDimension?.orientation || "LANDSCAPE",
            unit: selectedProduct.productDimension?.unit || "CM",
        }

        setFormData(mappedData)
        setInitialData(mappedData)
    }, [selectedProduct])

    const getChangedFields = () => {
        const changed = {}
        Object.keys(formData).forEach((key) => {
            if (formData[key] !== initialData[key]) {
                changed[key] = formData[key]
            }
        })
        return changed
    }




    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
    }

    const handleClose = () => {
        dispatch(clearSelectedProduct())
        dispatch(clearState())
        onClose()
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (loading) return

        const changedFields = getChangedFields()

        if (Object.keys(changedFields).length === 0) {
            alert("No changes detected")
            return
        }

        dispatch(
            update_product({
                productId: selectedProduct._id,
                data: changedFields, // ✅ ONLY DIFF
            })
        )
    }

    useEffect(() => {
        if (!error) return
        toast.error(error)
        setTimeout(() => {
            handleClose()
        }, 300)
    }, [error])

    useEffect(() => {
        if (!success) return

        toast.success(success)

        dispatch(get_artist_product())

        setTimeout(() => {
            handleClose()
        }, 300)
    }, [success])


    return (
        <AnimatePresence>
            {open && selectedProduct && (
                <motion.div
                    className="Update-box"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleClose}
                >
                    <motion.div
                        className="update-modal-container"
                        initial={{ scale: 0.9, opacity: 0, y: 50 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="update-modal-header">
                            <h1>Update Product</h1>
                            <button className="update-close-btn" onClick={handleClose}>
                                <i className="ri-close-line"></i>
                            </button>
                        </div>

                        <div className="update-modal-content">
                            <form className="product-form" onSubmit={onSubmit}>
                                <div className="form-section">
                                    <label className="form-label">
                                        <i className="ri-text"></i>
                                        Product Title <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter product title"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-section">
                                    <label className="form-label">
                                        <i className="ri-file-text-line"></i>
                                        Short Description <span>*</span>
                                    </label>
                                    <textarea
                                        name="shortDescription"
                                        value={formData.shortDescription}
                                        onChange={handleInputChange}
                                        placeholder="Describe your artwork in Short..."
                                        className="form-textarea-short"
                                        rows="2"
                                        required
                                    />
                                </div>

                                <div className="form-section">
                                    <label className="form-label">
                                        <i className="ri-file-text-line"></i>
                                        Describe in Detail <span>*</span>
                                    </label>
                                    <textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Describe your artwork in Detail..."
                                        className="form-textarea-long"
                                        rows="6"
                                        required
                                    />
                                </div>

                                <div className="form-row">
                                    <div className="form-section">
                                        <label className="form-label">
                                            <i className="ri-money-dollar-circle-line"></i>
                                            Price <span>*</span>
                                        </label>
                                        <div className="price-input-wrapper">
                                            <span className="currency">$</span>
                                            <input
                                                type="number"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleInputChange}
                                                placeholder="0.00"
                                                className="form-input price-input"
                                                min="0"
                                                step="0.01"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-section">
                                        <label className="form-label">
                                            <i className="ri-folder-line"></i>
                                            Category <span>*</span>
                                        </label>
                                        <div className="select-wrapper">
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleInputChange}
                                                className="form-select"
                                                required
                                            >
                                                <option value="">Select a category</option>
                                                {categories.map((cat) => (
                                                    <option key={cat} value={cat}>
                                                        {cat}
                                                    </option>
                                                ))}
                                            </select>
                                            <i className="ri-arrow-down-s-line select-arrow"></i>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <label className="form-label">
                                        <i className="ri-paint-brush-line"></i>
                                        Material <span>*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="material"
                                        value={formData.material}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Oil on Canvas, Acrylic, Watercolor"
                                        className="form-input"
                                        required
                                    />
                                </div>

                                <div className="form-section">
                                    <label className="section-label">
                                        <i className="ri-verified-badge-line"></i>
                                        Trust & Quality Indicators
                                    </label>
                                    <div className="checkbox-group">
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="certified"
                                                checked={formData.certified}
                                                onChange={handleInputChange}
                                                className="checkbox-input"
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span className="checkbox-text">
                                                <i className="ri-verified-badge-fill"></i>
                                                Certified Artwork
                                            </span>
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="handMade"
                                                checked={formData.handMade}
                                                onChange={handleInputChange}
                                                className="checkbox-input"
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span className="checkbox-text">
                                                <i className="ri-hand-heart-line"></i>
                                                Handmade
                                            </span>
                                        </label>
                                        <label className="checkbox-label">
                                            <input
                                                type="checkbox"
                                                name="frameInclude"
                                                checked={formData.frameInclude}
                                                onChange={handleInputChange}
                                                className="checkbox-input"
                                            />
                                            <span className="checkbox-custom"></span>
                                            <span className="checkbox-text">
                                                <i className="ri-square-line"></i>
                                                Frame Included
                                            </span>
                                        </label>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <label className="section-label">
                                        <i className="ri-ruler-line"></i>
                                        Product Dimensions <span>*</span>
                                    </label>
                                    <div className="form-row">
                                        <div className="form-section">
                                            <label className="form-label">Width</label>
                                            <input
                                                type="number"
                                                name="width"
                                                value={formData.width}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                                className="form-input"
                                                min="0"
                                                step="0.1"
                                                required
                                            />
                                        </div>
                                        <div className="form-section">
                                            <label className="form-label">Height</label>
                                            <input
                                                type="number"
                                                name="height"
                                                value={formData.height}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                                className="form-input"
                                                min="0"
                                                step="0.1"
                                                required
                                            />
                                        </div>
                                        <div className="form-section">
                                            <label className="form-label">Depth (Optional)</label>
                                            <input
                                                type="number"
                                                name="depth"
                                                value={formData.depth}
                                                onChange={handleInputChange}
                                                placeholder="0"
                                                className="form-input"
                                                min="0"
                                                step="0.1"
                                            />
                                        </div>
                                    </div>
                                    <div className="form-row">
                                        <div className="form-section">
                                            <label className="form-label">Orientation</label>
                                            <div className="select-wrapper">
                                                <select
                                                    name="orientation"
                                                    value={formData.orientation}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                    required
                                                >
                                                    <option value="LANDSCAPE">Landscape</option>
                                                    <option value="PORTRAIT">Portrait</option>
                                                    <option value="SQUARE">Square</option>
                                                </select>
                                                <i className="ri-arrow-down-s-line select-arrow"></i>
                                            </div>
                                        </div>
                                        <div className="form-section">
                                            <label className="form-label">Unit</label>
                                            <div className="select-wrapper">
                                                <select
                                                    name="unit"
                                                    value={formData.unit}
                                                    onChange={handleInputChange}
                                                    className="form-select"
                                                    required
                                                >
                                                    <option value="CM">CM</option>
                                                    <option value="INCH">INCH</option>
                                                </select>
                                                <i className="ri-arrow-down-s-line select-arrow"></i>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="form-section">
                                    <label className="form-label">
                                        <i className="ri-quill-pen-line"></i>
                                        Artist Note
                                    </label>
                                    <textarea
                                        name="artistNote"
                                        value={formData.artistNote}
                                        onChange={handleInputChange}
                                        placeholder="Add a personal note about this artwork..."
                                        className="form-textarea-long"
                                        rows="4"
                                    />
                                </div>

                                <div className="form-section">
                                    <label className="form-label">
                                        <i className="ri-book-open-line"></i>
                                        Story Behind the Artwork
                                    </label>
                                    <textarea
                                        name="story"
                                        value={formData.story}
                                        onChange={handleInputChange}
                                        placeholder="Tell the story and inspiration behind this artwork..."
                                        className="form-textarea-long"
                                        rows="5"
                                    />
                                </div>

                                <motion.button
                                    type="submit"
                                    className="submit-btn"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    disabled={loading}
                                >
                                    <i className="ri-check-line"></i>
                                    {loading ? "Updating..." : "Update Product"}
                                </motion.button>
                            </form>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default UpdateProduct
