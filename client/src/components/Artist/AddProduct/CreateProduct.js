"use client"
import ProductSkeleton from '@/components/Skeleton/ProductSkeleton'
import { clearState } from '@/redux/features/product/product.slice'
import { create_product } from '@/redux/features/product/product.thunk'
import { motion } from "framer-motion"
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import "./create_product.scss"


const CreateProduct = () => {
    const dispatch = useDispatch()
    const { error, loading, success } = useSelector((state) => state.product)

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        price: '',
        category: '',
        images: [],
        material: '',
        certified: false,
        handMade: false,
        frameInclude: false,
        artistNote: '',
        story: '',
        width: '',
        height: '',
        depth: '',
        orientation: 'LANDSCAPE',
        unit: 'CM'
    });
    const [imagePreviews, setImagePreviews] = useState([]);

    const categories = ['Abstract', 'Nature', 'Urban', 'Digital', 'Portrait', 'Landscape', 'Minimalist', 'Contemporary'];

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files).slice(0, 5);
        const newPreviews = [];

        files.forEach(file => {
            const reader = new FileReader();
            reader.onloadend = () => {
                newPreviews.push({
                    file,
                    preview: reader.result
                });
                if (newPreviews.length === files.length) {
                    setImagePreviews(prev =>
                        [...prev, ...newPreviews].slice(0, 5)
                    );

                }
            };
            reader.readAsDataURL(file);
        });
    };

    const removeImage = (index) => {
        setImagePreviews(imagePreviews.filter((_, i) => i !== index));
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault()

        if (loading) return

        if (imagePreviews.length === 0) {
            alert("At least one image is required");
            return;
        }

        const data = new FormData()

        data.append("title", formData.title)
        data.append("shortDescription", formData.description)
        data.append("price", formData.price)
        data.append("category", formData.category)
        data.append("material", formData.material)
        data.append("certified", formData.certified)
        data.append("handMade", formData.handMade)
        data.append("frameInclude", formData.frameInclude)
        if (formData.artistNote) data.append("artistNote", formData.artistNote)
        if (formData.story) data.append("story", formData.story)
        data.append("width", formData.width)
        data.append("height", formData.height)
        if (formData.depth) data.append("depth", formData.depth)
        data.append("orientation", formData.orientation)
        data.append("unit", formData.unit)

        imagePreviews.forEach((img) => (data.append("images", img.file)))

        console.log("FORM STATE 👉", formData);
        console.log("IMAGES 👉", imagePreviews);

        // dispatch(create_product(data))

    }

    useEffect(() => {
        if (!error) return

        toast.error(error)
        dispatch(clearState())
    }, [error, dispatch])

    useEffect(() => {
        if (!success) return

        toast.success(success)

        setFormData({
            title: '',
            description: '',
            price: '',
            category: '',
            material: '',
            certified: false,
            handMade: false,
            frameInclude: false,
            artistNote: '',
            story: '',
            width: '',
            height: '',
            depth: '',
            orientation: 'LANDSCAPE',
            unit: 'CM',
            shortDescription: ''
        })
        setImagePreviews([])
        // dispatch(clearState())

    }, [success, dispatch])



    return (
        <>
            {loading && <ProductSkeleton />}
            {
                !loading && (
                    <motion.div
                        key="create"
                        className="create-product-view"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="form-header">
                            <h1>Create New Product</h1>
                            <p>Add a new artwork to your collection</p>
                        </div>

                        <form className="product-form" onSubmit={onSubmit}>
                            <div className="form-section">
                                <label className="section-label">
                                    <i className="ri-image-add-line"></i>
                                    Product Images <span>(Up to 5 images)</span>
                                </label>
                                <div className="image-upload-area">
                                    <div className="image-preview-grid">
                                        {imagePreviews.map((img, index) => (
                                            <motion.div
                                                key={index}
                                                className="image-preview-item"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <img src={img.preview} alt={`Preview ${index + 1}`} />
                                                <button
                                                    type="button"
                                                    className="remove-image-btn"
                                                    onClick={() => removeImage(index)}
                                                >
                                                    <i className="ri-close-line"></i>
                                                </button>
                                                {index === 0 && (
                                                    <div className="primary-badge">Primary</div>
                                                )}
                                            </motion.div>
                                        ))}
                                        {imagePreviews.length < 5 && (
                                            <label className="image-upload-box">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    multiple
                                                    onChange={handleImageChange}
                                                    style={{ display: 'none' }}
                                                />
                                                <div className="upload-placeholder">
                                                    <i className="ri-add-line"></i>
                                                    <span>Add Image</span>
                                                </div>
                                            </label>
                                        )}
                                    </div>
                                    {imagePreviews.length === 0 && (
                                        <div className="upload-hint">
                                            <i className="ri-information-line"></i>
                                            <span>At least one image is required. First image will be set as primary.</span>
                                        </div>
                                    )}
                                </div>
                            </div>


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
                                    placeholder="Describe your artwork in Deatil..."
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
                                            {categories.map(cat => (
                                                <option key={cat} value={cat}>{cat}</option>
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
                                            Certified Artwork <span>*</span>
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
                            >
                                <i className="ri-check-line"></i>
                                Create Product
                            </motion.button>
                        </form>
                    </motion.div>

                )
            }
        </>
    )
}

export default CreateProduct
