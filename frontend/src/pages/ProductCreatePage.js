import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../actions/productActions'
import { useHistory } from 'react-router'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CREATE_PRODUCT_RESET } from '../constants'
import Message from '../components/Message'

// Icons - install with: npm install lucide-react
import { Package, DollarSign, FileText, Image as ImageIcon, Check, X, Upload, Eye, AlertCircle } from 'lucide-react'

const ProductCreatePage = () => {
    let history = useHistory()
    const dispatch = useDispatch()

    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [price, setPrice] = useState("")
    const [stock, setStock] = useState(false)
    const [image, setImage] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [dragActive, setDragActive] = useState(false)

    // Redux selectors
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const createProductReducer = useSelector(state => state.createProductReducer)
    const { product, success: productCreationSuccess, error: productCreationError } = createProductReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        }
        dispatch(checkTokenValidation())
    }, [dispatch, userInfo, history])

    const handleImageChange = (file) => {
        if (file) {
            setImage(file)
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)
            }
            reader.readAsDataURL(file)
        }
    }

    const handleDrag = (e) => {
        e.preventDefault()
        e.stopPropagation()
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true)
        } else if (e.type === "dragleave") {
            setDragActive(false)
        }
    }

    const handleDrop = (e) => {
        e.preventDefault()
        e.stopPropagation()
        setDragActive(false)
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageChange(e.dataTransfer.files[0])
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()

        let form_data = new FormData()
        form_data.append('name', name)
        form_data.append('description', description)
        form_data.append('price', price)
        form_data.append('stock', stock)
        form_data.append('image', image)

        dispatch(createProduct(form_data))
    }

    if (productCreationSuccess) {
        alert("Product successfully created.")
        history.push(`/product/${product.id}/`)
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
    }

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    const styles = {
        pageContainer: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 50%, #fce7f3 100%)',
            padding: '2rem 1rem'
        },
        container: {
            maxWidth: '900px',
            margin: '0 auto'
        },
        header: {
            textAlign: 'center',
            marginBottom: '3rem'
        },
        headerIcon: {
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem',
            boxShadow: '0 10px 25px -5px rgba(59, 130, 246, 0.4)'
        },
        title: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
        },
        subtitle: {
            fontSize: '1rem',
            color: '#6b7280'
        },
        formCard: {
            background: 'white',
            borderRadius: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            padding: '2.5rem',
            marginBottom: '2rem'
        },
        formGrid: {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '1.5rem',
            marginBottom: '1.5rem'
        },
        formGroup: {
            marginBottom: '1.5rem'
        },
        label: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#374151',
            marginBottom: '0.5rem'
        },
        input: {
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            transition: 'all 0.2s',
            outline: 'none'
        },
        textarea: {
            width: '100%',
            padding: '0.75rem 1rem',
            fontSize: '1rem',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            transition: 'all 0.2s',
            outline: 'none',
            minHeight: '120px',
            resize: 'vertical',
            fontFamily: 'inherit'
        },
        checkboxContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '12px',
            border: '2px solid #86efac',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        checkbox: {
            width: '24px',
            height: '24px',
            cursor: 'pointer',
            accentColor: '#10b981'
        },
        checkboxLabel: {
            fontSize: '1rem',
            fontWeight: '600',
            color: '#065f46',
            cursor: 'pointer',
            userSelect: 'none'
        },
        imageUploadArea: {
            border: '3px dashed #cbd5e1',
            borderRadius: '16px',
            padding: '2rem',
            textAlign: 'center',
            transition: 'all 0.3s',
            cursor: 'pointer',
            background: '#f8fafc'
        },
        imageUploadAreaActive: {
            borderColor: '#3b82f6',
            background: '#eff6ff',
            transform: 'scale(1.02)'
        },
        imagePreview: {
            width: '100%',
            maxHeight: '300px',
            objectFit: 'contain',
            borderRadius: '12px',
            marginTop: '1rem'
        },
        uploadIcon: {
            width: '60px',
            height: '60px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
        },
        buttonGroup: {
            display: 'flex',
            gap: '1rem',
            justifyContent: 'center',
            marginTop: '2rem'
        },
        submitButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: 'white',
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s',
            boxShadow: '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
        },
        cancelButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '1rem 2.5rem',
            fontSize: '1rem',
            fontWeight: '600',
            color: '#374151',
            background: 'white',
            border: '2px solid #e5e7eb',
            borderRadius: '12px',
            cursor: 'pointer',
            transition: 'all 0.2s'
        },
        featureGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginTop: '2rem'
        },
        featureCard: {
            padding: '1rem',
            background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)',
            borderRadius: '12px',
            textAlign: 'center'
        },
        featureIcon: {
            width: '40px',
            height: '40px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 0.75rem'
        },
        featureTitle: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '0.25rem'
        },
        featureDesc: {
            fontSize: '0.75rem',
            color: '#6b7280'
        }
    }

    return (
        <div style={styles.pageContainer}>
            <style>{`
                input:focus, textarea:focus {
                    border-color: #3b82f6 !important;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                }
                button:hover {
                    transform: translateY(-2px);
                }
                @media (max-width: 768px) {
                    .form-grid {
                        grid-template-columns: 1fr !important;
                    }
                    .feature-grid {
                        grid-template-columns: 1fr !important;
                    }
                }
            `}</style>

            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <div style={styles.headerIcon}>
                        <Package size={40} color="white" />
                    </div>
                    <h1 style={styles.title}>Create New Product</h1>
                    <p style={styles.subtitle}>Add a new product to your inventory</p>
                </div>

                {/* Error Message */}
                {productCreationError && (
                    <div style={{ marginBottom: '1.5rem' }}>
                        <Message variant='danger'>
                            {productCreationError.image ? productCreationError.image[0] : 'An error occurred'}
                        </Message>
                    </div>
                )}

                {/* Form Card */}
                <div style={styles.formCard}>
                    <form onSubmit={onSubmit}>
                        {/* Basic Information */}
                        <div style={styles.formGrid} className="form-grid">
                            {/* Product Name */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <Package size={16} color="#3b82f6" />
                                    Product Name *
                                </label>
                                <input
                                    required
                                    autoFocus
                                    type="text"
                                    value={name}
                                    placeholder="Enter product name"
                                    onChange={(e) => setName(e.target.value)}
                                    style={styles.input}
                                />
                            </div>

                            {/* Price */}
                            <div style={styles.formGroup}>
                                <label style={styles.label}>
                                    <DollarSign size={16} color="#3b82f6" />
                                    Price (৳) *
                                </label>
                                <input
                                    required
                                    type="text"
                                    pattern="[0-9]+(\.[0-9]{1,2})?%?"
                                    value={price}
                                    placeholder="199.99"
                                    step="0.01"
                                    maxLength="8"
                                    onChange={(e) => setPrice(e.target.value)}
                                    style={styles.input}
                                />
                            </div>
                        </div>

                        {/* Description */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <FileText size={16} color="#3b82f6" />
                                Product Description *
                            </label>
                            <textarea
                                required
                                value={description}
                                placeholder="Enter detailed product description..."
                                onChange={(e) => setDescription(e.target.value)}
                                style={styles.textarea}
                            />
                        </div>

                        {/* Stock Status */}
                        <div style={styles.formGroup}>
                            <label
                                style={{
                                    ...styles.checkboxContainer,
                                    borderColor: stock ? '#86efac' : '#e5e7eb',
                                    background: stock ? 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)' : '#f9fafb'
                                }}
                                onClick={() => setStock(!stock)}
                            >
                                <input
                                    type="checkbox"
                                    checked={stock}
                                    onChange={() => setStock(!stock)}
                                    style={styles.checkbox}
                                />
                                <span style={{
                                    ...styles.checkboxLabel,
                                    color: stock ? '#065f46' : '#6b7280'
                                }}>
                                    {stock ? '✓ Product is in stock' : 'Product is out of stock'}
                                </span>
                            </label>
                        </div>

                        {/* Image Upload */}
                        <div style={styles.formGroup}>
                            <label style={styles.label}>
                                <ImageIcon size={16} color="#3b82f6" />
                                Product Image *
                            </label>
                            
                            <div
                                style={{
                                    ...styles.imageUploadArea,
                                    ...(dragActive ? styles.imageUploadAreaActive : {})
                                }}
                                onDragEnter={handleDrag}
                                onDragLeave={handleDrag}
                                onDragOver={handleDrag}
                                onDrop={handleDrop}
                                onClick={() => document.getElementById('file-input').click()}
                            >
                                {!imagePreview ? (
                                    <>
                                        <div style={styles.uploadIcon}>
                                            <Upload size={24} color="#3b82f6" />
                                        </div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#1f2937', marginBottom: '0.5rem' }}>
                                            Upload Product Image
                                        </h3>
                                        <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
                                            Drag and drop or click to browse
                                        </p>
                                        <p style={{ fontSize: '0.75rem', color: '#9ca3af' }}>
                                            PNG, JPG up to 10MB
                                        </p>
                                    </>
                                ) : (
                                    <div>
                                        <div style={{ position: 'relative', display: 'inline-block' }}>
                                            <img
                                                src={imagePreview}
                                                alt="Preview"
                                                style={styles.imagePreview}
                                            />
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    setImage(null)
                                                    setImagePreview(null)
                                                }}
                                                style={{
                                                    position: 'absolute',
                                                    top: '1rem',
                                                    right: '1rem',
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    border: 'none',
                                                    borderRadius: '50%',
                                                    width: '32px',
                                                    height: '32px',
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                    cursor: 'pointer',
                                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)'
                                                }}
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                        <p style={{ fontSize: '0.875rem', color: '#10b981', marginTop: '1rem', fontWeight: '600' }}>
                                            ✓ Image uploaded successfully
                                        </p>
                                    </div>
                                )}
                                <input
                                    id="file-input"
                                    required
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => handleImageChange(e.target.files[0])}
                                    style={{ display: 'none' }}
                                />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div style={styles.buttonGroup}>
                            <button
                                type="submit"
                                style={styles.submitButton}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)'
                                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgba(16, 185, 129, 0.5)'
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)'
                                    e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(16, 185, 129, 0.4)'
                                }}
                            >
                                <Check size={20} />
                                Create Product
                            </button>
                            <button
                                type="button"
                                onClick={() => history.push("/")}
                                style={styles.cancelButton}
                                onMouseOver={(e) => {
                                    e.currentTarget.style.background = '#f9fafb'
                                }}
                                onMouseOut={(e) => {
                                    e.currentTarget.style.background = 'white'
                                }}
                            >
                                <X size={20} />
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>

                {/* Feature Cards */}
                <div style={styles.featureGrid} className="feature-grid">
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            <Eye size={20} color="#3b82f6" />
                        </div>
                        <h4 style={styles.featureTitle}>Preview</h4>
                        <p style={styles.featureDesc}>See how it looks</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            <AlertCircle size={20} color="#3b82f6" />
                        </div>
                        <h4 style={styles.featureTitle}>Validation</h4>
                        <p style={styles.featureDesc}>Auto-checked fields</p>
                    </div>
                    <div style={styles.featureCard}>
                        <div style={styles.featureIcon}>
                            <Upload size={20} color="#3b82f6" />
                        </div>
                        <h4 style={styles.featureTitle}>Easy Upload</h4>
                        <p style={styles.featureDesc}>Drag & drop support</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCreatePage