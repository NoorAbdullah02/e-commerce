import React, { useEffect, useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetails } from '../actions/productActions'
import CreateCardComponent from '../components/CreateCardComponent'
import ChargeCardComponent from '../components/ChargeCardComponent'
import Message from '../components/Message'
import { savedCardsList } from '../actions/cardActions'
import UserAddressComponent from '../components/UserAddressComponent'
import { checkTokenValidation, logout } from '../actions/userActions'
import { CHARGE_CARD_RESET } from '../constants/index'

// Icons - install with: npm install lucide-react
import { ShoppingBag, CreditCard, MapPin, Shield, CheckCircle, Edit3, ChevronRight } from 'lucide-react'

const CheckoutPage = ({ match }) => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [addressSelected, setAddressSelected] = useState(false)
    const [selectedAddressId, setSelectedAddressId] = useState(0)

    // Set address id handler
    const handleAddressId = (id) => {
        if (id) {
            setAddressSelected(true)
        }
        setSelectedAddressId(id)
    }

    // Redux selectors
    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const productDetailsReducer = useSelector(state => state.productDetailsReducer)
    const { loading, error, product } = productDetailsReducer

    const createCardReducer = useSelector(state => state.createCardReducer)
    const { error: cardCreationError, success, loading: cardCreationLoading } = createCardReducer

    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards } = savedCardsListReducer

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(getProductDetails(match.params.id))
            dispatch(savedCardsList())
            dispatch({
                type: CHARGE_CARD_RESET
            })
        }
    }, [dispatch, match, history, success, userInfo])

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
            maxWidth: '1400px',
            margin: '0 auto'
        },
        header: {
            marginBottom: '2rem'
        },
        headerTitle: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem'
        },
        breadcrumb: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem',
            color: '#6b7280'
        },
        mainContent: {
            display: 'grid',
            gridTemplateColumns: '1fr 480px',
            gap: '2rem',
            alignItems: 'start'
        },
        leftColumn: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
        },
        rightColumn: {
            position: 'sticky',
            top: '2rem'
        },
        card: {
            background: 'white',
            borderRadius: '20px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            padding: '1.5rem',
            transition: 'all 0.3s'
        },
        sectionHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem'
        },
        sectionTitle: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        editLink: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem',
            color: '#3b82f6',
            textDecoration: 'none',
            fontSize: '0.875rem',
            fontWeight: '600',
            transition: 'color 0.2s'
        },
        productCard: {
            display: 'flex',
            gap: '1.5rem',
            padding: '1.5rem',
            background: 'linear-gradient(135deg, #fafafa 0%, #f3f4f6 100%)',
            borderRadius: '16px',
            border: '2px solid #e5e7eb'
        },
        productImage: {
            width: '120px',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '12px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        },
        productInfo: {
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
        },
        productName: {
            fontSize: '1.25rem',
            fontWeight: '600',
            color: '#1f2937',
            marginBottom: '0.5rem',
            textTransform: 'capitalize'
        },
        productPrice: {
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#10b981',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
        },
        stepIndicator: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
            borderRadius: '12px',
            marginBottom: '1rem'
        },
        step: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            flex: 1
        },
        stepNumber: {
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '0.875rem'
        },
        stepActive: {
            background: '#3b82f6',
            color: 'white'
        },
        stepComplete: {
            background: '#10b981',
            color: 'white'
        },
        stepInactive: {
            background: '#e5e7eb',
            color: '#9ca3af'
        },
        stepText: {
            fontSize: '0.875rem',
            fontWeight: '600'
        },
        stepDivider: {
            flex: 1,
            height: '2px',
            background: '#e5e7eb'
        },
        loadingContainer: {
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            padding: '2rem',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
        },
        spinner: {
            width: '40px',
            height: '40px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
        },
        securityBadge: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)',
            borderRadius: '12px',
            border: '1px solid #86efac'
        },
        securityIcon: {
            width: '40px',
            height: '40px',
            background: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        orderSummary: {
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            color: 'white',
            borderRadius: '20px',
            padding: '1.5rem',
            marginTop: '1.5rem'
        },
        summaryRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.75rem 0',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        },
        summaryLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.875rem'
        },
        summaryValue: {
            fontWeight: '600',
            fontSize: '1rem'
        },
        totalRow: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 0 0',
            marginTop: '0.5rem'
        },
        totalLabel: {
            fontSize: '1.125rem',
            fontWeight: 'bold'
        },
        totalValue: {
            fontSize: '1.75rem',
            fontWeight: 'bold',
            color: '#10b981'
        }
    }

    // Calculate steps
    const currentStep = addressSelected ? (success ? 3 : 2) : 1

    return (
        <div style={styles.pageContainer}>
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                @media (max-width: 1024px) {
                    .main-content {
                        grid-template-columns: 1fr !important;
                    }
                    .right-column {
                        position: static !important;
                    }
                }
            `}</style>

            <div style={styles.container}>
                {/* Header */}
                <div style={styles.header}>
                    <h1 style={styles.headerTitle}>
                        <ShoppingBag size={40} color="#3b82f6" />
                        Secure Checkout
                    </h1>
                    <div style={styles.breadcrumb}>
                        <span>Shop</span>
                        <ChevronRight size={16} />
                        <span>Product</span>
                        <ChevronRight size={16} />
                        <span style={{ color: '#3b82f6', fontWeight: '600' }}>Checkout</span>
                    </div>
                </div>

                {/* Error Messages */}
                {cardCreationError && <Message variant='danger'>{cardCreationError}</Message>}
                {error && <Message variant='danger'>{error}</Message>}

                {/* Loading States */}
                {loading && (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        <div>
                            <h5 style={{ margin: 0, marginBottom: '0.25rem' }}>Getting Checkout Info</h5>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Please wait...</p>
                        </div>
                    </div>
                )}

                {!loading && cardCreationLoading && (
                    <div style={styles.loadingContainer}>
                        <div style={styles.spinner}></div>
                        <div>
                            <h5 style={{ margin: 0, marginBottom: '0.25rem' }}>Verifying Card</h5>
                            <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280' }}>Securing your payment...</p>
                        </div>
                    </div>
                )}

                {/* Main Content */}
                {!loading && !error && (
                    <div style={styles.mainContent} className="main-content">
                        {/* Left Column */}
                        <div style={styles.leftColumn}>
                            {/* Progress Steps */}
                            <div style={styles.stepIndicator}>
                                <div style={styles.step}>
                                    <div style={{
                                        ...styles.stepNumber,
                                        ...(currentStep >= 1 ? styles.stepComplete : styles.stepInactive)
                                    }}>
                                        {currentStep > 1 ? <CheckCircle size={16} /> : '1'}
                                    </div>
                                    <span style={styles.stepText}>Address</span>
                                </div>
                                <div style={styles.stepDivider}></div>
                                <div style={styles.step}>
                                    <div style={{
                                        ...styles.stepNumber,
                                        ...(currentStep === 2 ? styles.stepActive : currentStep > 2 ? styles.stepComplete : styles.stepInactive)
                                    }}>
                                        {currentStep > 2 ? <CheckCircle size={16} /> : '2'}
                                    </div>
                                    <span style={styles.stepText}>Payment</span>
                                </div>
                                <div style={styles.stepDivider}></div>
                                <div style={styles.step}>
                                    <div style={{
                                        ...styles.stepNumber,
                                        ...(currentStep === 3 ? styles.stepActive : styles.stepInactive)
                                    }}>
                                        {currentStep > 3 ? <CheckCircle size={16} /> : '3'}
                                    </div>
                                    <span style={styles.stepText}>Confirm</span>
                                </div>
                            </div>

                            {/* Product Summary */}
                            <div style={styles.card}>
                                <div style={styles.sectionHeader}>
                                    <h2 style={styles.sectionTitle}>
                                        <ShoppingBag size={24} color="#3b82f6" />
                                        Order Summary
                                    </h2>
                                </div>
                                <div style={styles.productCard}>
                                    <img
                                        src={product.image}
                                        alt={product.name}
                                        style={styles.productImage}
                                    />
                                    <div style={styles.productInfo}>
                                        <h3 style={styles.productName}>{product.name}</h3>
                                        <div style={styles.productPrice}>
                                            <span style={{ fontSize: '1.25rem' }}>৳</span>
                                            {product.price}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Billing Address */}
                            <div style={styles.card}>
                                <div style={styles.sectionHeader}>
                                    <h2 style={styles.sectionTitle}>
                                        <MapPin size={24} color="#3b82f6" />
                                        Billing Address
                                    </h2>
                                    <Link
                                        to="/all-addresses/"
                                        style={styles.editLink}
                                        onMouseOver={(e) => e.currentTarget.style.color = '#2563eb'}
                                        onMouseOut={(e) => e.currentTarget.style.color = '#3b82f6'}
                                    >
                                        <Edit3 size={16} />
                                        Edit/Add
                                    </Link>
                                </div>
                                <UserAddressComponent handleAddressId={handleAddressId} />
                            </div>

                            {/* Security Badge */}
                            <div style={styles.securityBadge}>
                                <div style={styles.securityIcon}>
                                    <Shield size={20} color="#10b981" />
                                </div>
                                <div>
                                    <h4 style={{ margin: 0, fontSize: '0.875rem', fontWeight: '600', color: '#065f46', marginBottom: '0.25rem' }}>
                                        Secure Payment
                                    </h4>
                                    <p style={{ margin: 0, fontSize: '0.75rem', color: '#047857' }}>
                                        Your payment information is encrypted and secure
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Payment */}
                        <div style={styles.rightColumn} className="right-column">
                            <div style={styles.card}>
                                <div style={styles.sectionHeader}>
                                    <h2 style={styles.sectionTitle}>
                                        <CreditCard size={24} color="#3b82f6" />
                                        Payment Method
                                    </h2>
                                </div>

                                {success ? (
                                    <ChargeCardComponent
                                        selectedAddressId={selectedAddressId}
                                        addressSelected={addressSelected}
                                        product={product}
                                    />
                                ) : (
                                    <CreateCardComponent
                                        addressSelected={addressSelected}
                                        stripeCards={stripeCards}
                                    />
                                )}
                            </div>

                            {/* Order Total Summary */}
                            <div style={styles.orderSummary}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                                    Order Total
                                </h3>
                                <div style={styles.summaryRow}>
                                    <span style={styles.summaryLabel}>Subtotal</span>
                                    <span style={styles.summaryValue}>৳ {product.price}</span>
                                </div>
                                <div style={styles.summaryRow}>
                                    <span style={styles.summaryLabel}>Shipping</span>
                                    <span style={styles.summaryValue}>৳ 0</span>
                                </div>
                                <div style={styles.summaryRow}>
                                    <span style={styles.summaryLabel}>Tax</span>
                                    <span style={styles.summaryValue}>৳ 0</span>
                                </div>
                                <div style={styles.totalRow}>
                                    <span style={styles.totalLabel}>Total</span>
                                    <span style={styles.totalValue}>৳ {product.price}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CheckoutPage