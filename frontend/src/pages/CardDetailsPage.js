import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { savedCardsList } from '../actions/cardActions'
import { checkTokenValidation, logout } from '../actions/userActions'
import { useHistory } from 'react-router-dom'
import DeleteCardComponent from '../components/DeleteCardComponent'

// You can install lucide-react for icons: npm install lucide-react
// Or use your existing icon library
import { CreditCard, Plus, Edit2, Trash2, MapPin } from 'lucide-react'

const CardDetailsPage = () => {
    let history = useHistory()
    const dispatch = useDispatch()
    const [userId, setUserId] = useState(0)
    const [runCardDeleteHandler, setRunCardDeleteHandler] = useState(false)
    const [deleteCardNumber, setDeleteCardNumber] = useState("")
    const [hoveredCard, setHoveredCard] = useState(null)

    // Redux selectors
    const userLoginReducer = useSelector(state => state.userLoginReducer)
    const { userInfo } = userLoginReducer

    const checkTokenValidationReducer = useSelector(state => state.checkTokenValidationReducer)
    const { error: tokenError } = checkTokenValidationReducer

    const savedCardsListReducer = useSelector(state => state.savedCardsListReducer)
    const { stripeCards, loading } = savedCardsListReducer

    const deleteSavedCardReducer = useSelector(state => state.deleteSavedCardReducer)
    const { success } = deleteSavedCardReducer

    const toggleRunCardDeleteHandler = () => {
        setRunCardDeleteHandler(!runCardDeleteHandler)
    }

    useEffect(() => {
        if (!userInfo) {
            history.push("/login")
        } else {
            dispatch(checkTokenValidation())
            dispatch(savedCardsList())
        }
    }, [dispatch, history, userInfo])

    if (userInfo && tokenError === "Request failed with status code 401") {
        alert("Session expired, please login again.")
        dispatch(logout())
        history.push("/login")
        window.location.reload()
    }

    if (success) {
        alert("Card successfully deleted.")
        window.location.reload()
    }

    const getCardBrand = (number) => {
        if (!number) return 'default'
        const firstDigit = number.toString()[0]
        if (firstDigit === '4') return 'visa'
        if (firstDigit === '5') return 'mastercard'
        if (firstDigit === '3') return 'amex'
        return 'default'
    }

    const getCardGradient = (brand) => {
        const gradients = {
            visa: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
            mastercard: 'linear-gradient(135deg, #ef4444 0%, #f59e0b 100%)',
            amex: 'linear-gradient(135deg, #14b8a6 0%, #3b82f6 100%)',
            default: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)'
        }
        return gradients[brand] || gradients.default
    }

    const styles = {
        pageContainer: {
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            padding: '2rem 1rem'
        },
        header: {
            maxWidth: '1280px',
            margin: '0 auto 2rem',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '1rem'
        },
        headerTitle: {
            fontSize: '2.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '0.5rem'
        },
        headerSubtitle: {
            color: '#6b7280',
            fontSize: '1rem'
        },
        addButton: {
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(135deg, #3b82f6 0%, #4f46e5 100%)',
            color: 'white',
            padding: '0.75rem 1.5rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 10px 15px -3px rgba(59, 130, 246, 0.3)',
            transition: 'all 0.2s',
        },
        loadingContainer: {
            maxWidth: '1280px',
            margin: '0 auto',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '3rem',
            textAlign: 'center'
        },
        spinner: {
            width: '48px',
            height: '48px',
            border: '4px solid #e5e7eb',
            borderTopColor: '#3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
        },
        cardsGrid: {
            maxWidth: '1280px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '1.5rem'
        },
        cardContainer: {
            position: 'relative',
            transition: 'transform 0.3s'
        },
        cardVisual: {
            position: 'relative',
            borderRadius: '16px',
            padding: '2rem',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s',
            overflow: 'hidden'
        },
        cardPattern: {
            position: 'absolute',
            inset: 0,
            opacity: 0.1,
            pointerEvents: 'none'
        },
        cardContent: {
            position: 'relative',
            zIndex: 10
        },
        cardHeader: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: '2rem'
        },
        cardBrand: {
            color: 'white',
            fontSize: '0.875rem',
            fontWeight: '600',
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.25rem 0.75rem',
            borderRadius: '9999px',
            backdropFilter: 'blur(8px)'
        },
        cardNumber: {
            color: 'white',
            fontSize: '1.5rem',
            fontFamily: 'monospace',
            letterSpacing: '0.1em',
            marginBottom: '1.5rem'
        },
        cardFooter: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
        },
        cardLabel: {
            color: 'rgba(255, 255, 255, 0.7)',
            fontSize: '0.75rem',
            marginBottom: '0.25rem'
        },
        cardValue: {
            color: 'white',
            fontWeight: '600',
            fontSize: '1.125rem'
        },
        detailsPanel: {
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '1.5rem',
            marginTop: '1rem',
            transition: 'all 0.3s'
        },
        detailsHeader: {
            fontSize: '1.125rem',
            fontWeight: 'bold',
            color: '#1f2937',
            marginBottom: '1rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
        },
        addressGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
            marginBottom: '1.5rem'
        },
        addressItem: {
            background: '#f9fafb',
            borderRadius: '12px',
            padding: '0.75rem'
        },
        addressLabel: {
            fontSize: '0.75rem',
            color: '#6b7280',
            marginBottom: '0.25rem'
        },
        addressValue: {
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#1f2937'
        },
        actionButtons: {
            display: 'flex',
            gap: '0.75rem'
        },
        updateButton: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: '#3b82f6',
            color: 'white',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
        },
        deleteButton: {
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
            background: '#fef2f2',
            color: '#dc2626',
            padding: '0.75rem 1rem',
            borderRadius: '12px',
            border: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background 0.2s'
        },
        emptyState: {
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: '600px',
            margin: '0 auto'
        },
        emptyIcon: {
            width: '96px',
            height: '96px',
            background: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
        },
        securityNotice: {
            maxWidth: '1280px',
            margin: '2rem auto 0',
            background: 'linear-gradient(135deg, #f0fdf4 0%, #d1fae5 100%)',
            border: '1px solid #86efac',
            borderRadius: '12px',
            padding: '1rem',
            display: 'flex',
            gap: '0.75rem'
        },
        securityIcon: {
            width: '32px',
            height: '32px',
            background: '#dcfce7',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }
    }

    return (
        <div style={styles.pageContainer}>
            {/* Keyframe animation for spinner */}
            <style>{`
                @keyframes spin {
                    to { transform: rotate(360deg); }
                }
                button:hover {
                    transform: translateY(-2px);
                }
            `}</style>

            {/* Header Section */}
            <div style={styles.header}>
                <div>
                    <h1 style={styles.headerTitle}>Payment Methods</h1>
                    <p style={styles.headerSubtitle}>Manage your saved cards securely</p>
                </div>
                <button
                    style={styles.addButton}
                    onClick={() => history.push('/add-card')}
                    onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
                    onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                >
                    <Plus size={20} />
                    Add New Card
                </button>
            </div>

            {/* Loading State */}
            {loading && (
                <div style={styles.loadingContainer}>
                    <div style={styles.spinner}></div>
                    <p style={{ color: '#6b7280', fontWeight: '500' }}>Loading your cards...</p>
                </div>
            )}

            {/* Delete Modal */}
            <DeleteCardComponent
                userId={userId}
                deleteCardNumber={deleteCardNumber}
                runCardDeleteHandler={runCardDeleteHandler}
                toggleRunCardDeleteHandler={toggleRunCardDeleteHandler}
            />

            {/* Cards Grid */}
            {stripeCards && stripeCards.length > 0 ? (
                <div style={styles.cardsGrid}>
                    {stripeCards.map((card, idx) => {
                        const brand = getCardBrand(card.card_number)
                        const gradient = getCardGradient(brand)
                        
                        return (
                            <div
                                key={idx}
                                style={{
                                    ...styles.cardContainer,
                                    transform: hoveredCard === idx ? 'scale(1.02)' : 'scale(1)'
                                }}
                                onMouseEnter={() => setHoveredCard(idx)}
                                onMouseLeave={() => setHoveredCard(null)}
                            >
                                {/* Card Visual */}
                                <div style={{ ...styles.cardVisual, background: gradient }}>
                                    {/* Card Pattern Overlay */}
                                    <div style={styles.cardPattern}>
                                        <div style={{
                                            position: 'absolute',
                                            top: '-8rem',
                                            right: '-8rem',
                                            width: '16rem',
                                            height: '16rem',
                                            background: 'white',
                                            borderRadius: '50%'
                                        }}></div>
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '-6rem',
                                            left: '-6rem',
                                            width: '12rem',
                                            height: '12rem',
                                            background: 'white',
                                            borderRadius: '50%'
                                        }}></div>
                                    </div>

                                    {/* Card Content */}
                                    <div style={styles.cardContent}>
                                        <div style={styles.cardHeader}>
                                            <CreditCard size={48} color="white" opacity={0.8} />
                                            <div style={styles.cardBrand}>
                                                {brand.toUpperCase()}
                                            </div>
                                        </div>

                                        <div>
                                            <div style={{ ...styles.cardLabel }}>Card Number</div>
                                            <div style={styles.cardNumber}>
                                                •••• •••• •••• {card.card_number ? card.card_number.toString().slice(-4) : '••••'}
                                            </div>
                                        </div>

                                        <div style={styles.cardFooter}>
                                            <div>
                                                <div style={styles.cardLabel}>Cardholder</div>
                                                <div style={styles.cardValue}>
                                                    {card.name_on_card || 'Not Set'}
                                                </div>
                                            </div>
                                            <div>
                                                <div style={styles.cardLabel}>Expires</div>
                                                <div style={{ ...styles.cardValue, fontFamily: 'monospace' }}>
                                                    {card.exp_month || '••'}/{card.exp_year ? card.exp_year.toString().slice(-2) : '••'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card Details Panel */}
                                <div style={styles.detailsPanel}>
                                    <h3 style={styles.detailsHeader}>
                                        <MapPin size={20} color="#3b82f6" />
                                        Billing Address
                                    </h3>
                                    
                                    <div style={styles.addressGrid}>
                                        <div style={styles.addressItem}>
                                            <div style={styles.addressLabel}>City</div>
                                            <div style={styles.addressValue}>
                                                {card.address_city || 'Not Set'}
                                            </div>
                                        </div>
                                        <div style={styles.addressItem}>
                                            <div style={styles.addressLabel}>State</div>
                                            <div style={styles.addressValue}>
                                                {card.address_state || 'Not Set'}
                                            </div>
                                        </div>
                                        <div style={styles.addressItem}>
                                            <div style={styles.addressLabel}>Country</div>
                                            <div style={styles.addressValue}>
                                                {card.address_country || 'Not Set'}
                                            </div>
                                        </div>
                                        <div style={styles.addressItem}>
                                            <div style={styles.addressLabel}>ZIP Code</div>
                                            <div style={styles.addressValue}>
                                                {card.address_zip || 'Not Set'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div style={styles.actionButtons}>
                                        <button
                                            style={styles.updateButton}
                                            onClick={() => history.push('/stripe-card-update/')}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#2563eb'}
                                            onMouseOut={(e) => e.currentTarget.style.background = '#3b82f6'}
                                        >
                                            <Edit2 size={16} />
                                            Update
                                        </button>
                                        <button
                                            style={styles.deleteButton}
                                            onClick={() => {
                                                setDeleteCardNumber(card.card_number)
                                                setUserId(card.user)
                                                setRunCardDeleteHandler(!runCardDeleteHandler)
                                            }}
                                            onMouseOver={(e) => e.currentTarget.style.background = '#fee2e2'}
                                            onMouseOut={(e) => e.currentTarget.style.background = '#fef2f2'}
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            ) : !loading && (
                <div style={styles.emptyState}>
                    <div style={styles.emptyIcon}>
                        <CreditCard size={48} color="#3b82f6" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.75rem' }}>
                        No Cards Found
                    </h3>
                    <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
                        Add your first payment method to get started
                    </p>
                    <button
                        style={styles.addButton}
                        onClick={() => history.push('/add-card')}
                    >
                        <Plus size={20} />
                        Add Your First Card
                    </button>
                </div>
            )}

            {/* Security Notice */}
            <div style={styles.securityNotice}>
                <div style={styles.securityIcon}>
                    <svg width="20" height="20" fill="#16a34a" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h4 style={{ fontWeight: '600', color: '#065f46', marginBottom: '0.25rem' }}>
                        Your data is secure
                    </h4>
                    <p style={{ fontSize: '0.875rem', color: '#047857' }}>
                        All payment information is encrypted and stored securely according to PCI DSS standards.
                    </p>
                </div>
            </div>
        </div>
    )
}

export default CardDetailsPage