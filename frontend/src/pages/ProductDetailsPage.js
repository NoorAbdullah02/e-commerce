import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteProduct, getProductDetails } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col, Container, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { CREATE_PRODUCT_RESET, DELETE_PRODUCT_RESET, UPDATE_PRODUCT_RESET, CARD_CREATE_RESET } from '../constants'
import './ProductDetailsPage.css'

function ProductDetailsPage({ history, match }) {
    const dispatch = useDispatch()
    const [show, setShow] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const [zoomLevel, setZoomLevel] = useState(1)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    
    const handleClose = () => setShow(false)
    const handleShow = () => setShow(true)

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const deleteProductReducer = useSelector(state => state.deleteProductReducer)
    const { success: productDeletionSuccess } = deleteProductReducer

    useEffect(() => {
        dispatch(getProductDetails(match.params.id))
        dispatch({ type: UPDATE_PRODUCT_RESET })
        dispatch({ type: CREATE_PRODUCT_RESET })
        dispatch({ type: CARD_CREATE_RESET })
    }, [dispatch, match])

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        window.addEventListener('mousemove', handleMouseMove)
        return () => window.removeEventListener('mousemove', handleMouseMove)
    }, [])

    const confirmDelete = () => {
        dispatch(deleteProduct(match.params.id))
        handleClose()
    }

    const handleZoomIn = () => {
        setZoomLevel(prev => Math.min(prev + 0.2, 3))
    }

    const handleZoomOut = () => {
        setZoomLevel(prev => Math.max(prev - 0.2, 1))
    }

    const handleResetZoom = () => {
        setZoomLevel(1)
    }

    if (productDeletionSuccess) {
        alert("Product successfully deleted.")
        history.push("/")
        dispatch({ type: DELETE_PRODUCT_RESET })
    }

    return (
        <div className="product-details-page">
            {/* Animated Background Effects */}
            <div className="background-container">
                {/* Gradient Orbs */}
                <div className="gradient-orb orb-1"></div>
                <div className="gradient-orb orb-2"></div>
                <div className="gradient-orb orb-3"></div>
                
                {/* Grid Pattern */}
                <div className="grid-pattern"></div>
                
                {/* Mouse Follower Light */}
                <div 
                    className="mouse-follower"
                    style={{
                        left: `${mousePosition.x - 192}px`,
                        top: `${mousePosition.y - 192}px`,
                    }}
                ></div>

                {/* Floating Particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="floating-particle"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDuration: `${5 + Math.random() * 10}s`,
                            animationDelay: `${Math.random() * 5}s`
                        }}
                    ></div>
                ))}
            </div>

            {/* Enhanced Modal */}
            <Modal 
                show={show} 
                onHide={handleClose}
                centered
                className="custom-modal"
            >
                <div className="modal-content-wrapper">
                    <Modal.Header closeButton className="modal-header-custom">
                        <Modal.Title className="modal-title-custom">
                            <div className="warning-icon">
                                <i className="fas fa-exclamation-triangle"></i>
                            </div>
                            <span>Delete Confirmation</span>
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body className="modal-body-custom">
                        <p className="modal-text">
                            Are you sure you want to delete{' '}
                            <strong className="product-name-delete">"{product.name}"</strong>?
                            <br />
                            <small className="warning-text">This action cannot be undone.</small>
                        </p>
                    </Modal.Body>
                    <Modal.Footer className="modal-footer-custom">
                        <Button 
                            variant="outline-secondary" 
                            onClick={handleClose}
                            className="btn-cancel"
                        >
                            Cancel
                        </Button>
                        <Button 
                            variant="danger" 
                            onClick={confirmDelete}
                            className="btn-delete"
                        >
                            <i className="fas fa-trash mr-2"></i>
                            Confirm Delete
                        </Button>
                    </Modal.Footer>
                </div>
            </Modal>

            {/* Loading State */}
            {loading && (
                <div className="loading-container">
                    <div className="loading-content">
                        <div className="spinner-wrapper">
                            <Spinner animation="border" variant="primary" />
                            <div className="spinner-glow"></div>
                        </div>
                        <h5 className="loading-text">Loading Product Details...</h5>
                    </div>
                </div>
            )}

            {/* Error State */}
            {error && (
                <Container className="error-container">
                    <Message variant='danger'>{error}</Message>
                </Container>
            )}

            {/* Product Content */}
            {!loading && !error && product && (
                <div className="product-content">
                    <Container fluid className="product-container">
                        {/* Breadcrumb */}
                        <div className="breadcrumb-nav">
                            <Link to="/" className="breadcrumb-link">
                                <i className="fas fa-home"></i>
                                <span>Home</span>
                            </Link>
                            <span className="breadcrumb-separator">/</span>
                            <span className="breadcrumb-current">{product.name}</span>
                        </div>

                        <Row>
                            {/* Product Image Section */}
                            <Col lg={6} className="image-column">
                                <div className="image-section">
                                    {/* Zoom Controls */}
                                    <div className="zoom-controls">
                                        <button 
                                            className="zoom-btn"
                                            onClick={handleZoomOut}
                                            disabled={zoomLevel <= 1}
                                        >
                                            <i className="fas fa-minus"></i>
                                        </button>
                                        <span className="zoom-level">
                                            {Math.round(zoomLevel * 100)}%
                                        </span>
                                        <button 
                                            className="zoom-btn"
                                            onClick={handleZoomIn}
                                            disabled={zoomLevel >= 3}
                                        >
                                            <i className="fas fa-plus"></i>
                                        </button>
                                        <button 
                                            className="zoom-btn reset-btn"
                                            onClick={handleResetZoom}
                                        >
                                            <i className="fas fa-redo"></i>
                                        </button>
                                    </div>

                                    {/* Image Container */}
                                    <div className="image-container-wrapper">
                                        <div className="image-container">
                                            {/* Shimmer Effect */}
                                            <div className="shimmer-effect"></div>
                                            
                                            {!imageLoaded && (
                                                <div className="image-loader">
                                                    <Spinner animation="border" variant="primary" />
                                                    <div className="loader-glow"></div>
                                                </div>
                                            )}
                                            
                                            <div className="image-wrapper">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className={`product-image ${imageLoaded ? 'loaded' : ''}`}
                                                    style={{ 
                                                        transform: `scale(${zoomLevel})`,
                                                    }}
                                                    onLoad={() => setImageLoaded(true)}
                                                />
                                            </div>
                                            
                                            {/* Admin Controls Overlay */}
                                            {userInfo && userInfo.admin && (
                                                <div className="admin-controls">
                                                    <button
                                                        className="admin-btn delete-btn"
                                                        onClick={handleShow}
                                                    >
                                                        <i className="fas fa-trash"></i>
                                                        Delete
                                                    </button>
                                                    <button
                                                        className="admin-btn edit-btn"
                                                        onClick={() => history.push(`/product-update/${product.id}/`)}
                                                    >
                                                        <i className="fas fa-edit"></i>
                                                        Edit
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </Col>

                            {/* Product Info Section */}
                            <Col lg={6}>
                                <div className="info-section">
                                    {/* Product Name */}
                                    <h1 className="product-name">
                                        {product.name}
                                    </h1>

                                    {/* Stock Badge */}
                                    <div className="stock-badge-wrapper">
                                        {product.stock ? (
                                            <span className="stock-badge in-stock">
                                                <i className="fas fa-check-circle"></i>
                                                In Stock
                                            </span>
                                        ) : (
                                            <span className="stock-badge out-of-stock">
                                                <i className="fas fa-times-circle"></i>
                                                Out of Stock
                                            </span>
                                        )}
                                    </div>

                                    {/* Price Card */}
                                    <div className="price-card">
                                        <div className="price-label">Price</div>
                                        <div className="price-amount">
                                            ৳ {product.price}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <div className="description-section">
                                        <h3 className="section-title">Description</h3>
                                        <p className="product-description">
                                            {product.description}
                                        </p>
                                    </div>

                                    {/* Purchase Section */}
                                    <div className="purchase-section">
                                        {product.stock ? (
                                            <Link to={`/product/${product.id}/checkout/`}>
                                                <button className="checkout-btn">
                                                    <div className="btn-shine"></div>
                                                    <span className="btn-content">
                                                        <i className="fab fa-stripe"></i>
                                                        <span>Proceed to Checkout</span>
                                                        <i className="fas fa-arrow-right"></i>
                                                    </span>
                                                </button>
                                            </Link>
                                        ) : (
                                            <div className="out-of-stock-message">
                                                <i className="fas fa-exclamation-circle"></i>
                                                This product is currently unavailable
                                            </div>
                                        )}
                                    </div>

                                    {/* Share Product Section */}
                                    <div className="share-section">
                                        <h4 className="share-title">Share This Product</h4>
                                        <div className="share-buttons">
                                            <button 
                                                className="share-btn share-facebook"
                                                onClick={() => {
                                                    const url = `${window.location.origin}/product/${product.id}/`;
                                                    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
                                                }}
                                                title="Share on Facebook"
                                            >
                                                <i className="fab fa-facebook-f"></i>
                                            </button>
                                            <button 
                                                className="share-btn share-twitter"
                                                onClick={() => {
                                                    const url = `${window.location.origin}/product/${product.id}/`;
                                                    const text = `Check out this amazing product: ${product.name}`;
                                                    window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`, '_blank');
                                                }}
                                                title="Share on Twitter"
                                            >
                                                <i className="fab fa-twitter"></i>
                                            </button>
                                            <button 
                                                className="share-btn share-whatsapp"
                                                onClick={() => {
                                                    const url = `${window.location.origin}/product/${product.id}/`;
                                                    const text = `Check out this product: ${product.name} - ${url}`;
                                                    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
                                                }}
                                                title="Share on WhatsApp"
                                            >
                                                <i className="fab fa-whatsapp"></i>
                                            </button>
                                            <button 
                                                className="share-btn share-copy"
                                                onClick={() => {
                                                    const url = `${window.location.origin}/product/${product.id}/`;
                                                    navigator.clipboard.writeText(url);
                                                    alert('Product link copied to clipboard!');
                                                }}
                                                title="Copy Link"
                                            >
                                                <i className="fas fa-link"></i>
                                            </button>
                                        </div>
                                    </div>

                                    {/* Additional Info */}
                                    <div className="additional-info">
                                        <div className="info-item">
                                            <i className="fas fa-shield-alt"></i>
                                            <span>Secure Payment</span>
                                        </div>
                                        <div className="info-item">
                                            <i className="fas fa-truck"></i>
                                            <span>Fast Delivery</span>
                                        </div>
                                        <div className="info-item">
                                            <i className="fas fa-undo"></i>
                                            <span>Easy Returns</span>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            )}
        </div>
    )
}

export default ProductDetailsPage