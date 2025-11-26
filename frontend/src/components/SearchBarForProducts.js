import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import './SearchBarForProducts.css'

function SearchBarForProducts() {
    let history = useHistory()
    const [searchTerm, setSearchTerm] = useState("")
    const [showSuggestions, setShowSuggestions] = useState(false)
    const [filteredSuggestions, setFilteredSuggestions] = useState([])
    
    // Get products from Redux store
    const productsListReducer = useSelector(state => state.productsListReducer)
    const { products = [] } = productsListReducer

    // Generate unique product suggestions
    useEffect(() => {
        if (searchTerm.trim().length > 0) {
            const uniqueSuggestions = []
            const seen = new Set()
            
            products.forEach(product => {
                const name = product.name.toLowerCase()
                if (name.includes(searchTerm.toLowerCase()) && !seen.has(product.name)) {
                    seen.add(product.name)
                    uniqueSuggestions.push(product)
                }
            })
            
            setFilteredSuggestions(uniqueSuggestions.slice(0, 8)) // Show max 8 suggestions
            setShowSuggestions(true)
        } else {
            setFilteredSuggestions([])
            setShowSuggestions(false)
        }
    }, [searchTerm, products])

    const onSubmit = (e) => {
        e.preventDefault()
        if (searchTerm.trim()) {
            history.push(`/products?search=${encodeURIComponent(searchTerm)}`)
            setShowSuggestions(false)
            setSearchTerm("")
        }
    }

    const handleSuggestionClick = (productName, productId) => {
        history.push(`/product/${productId}/`)
        setShowSuggestions(false)
        setSearchTerm("")
    }

    const handleInputBlur = () => {
        // Delay hiding to allow click on suggestion
        setTimeout(() => setShowSuggestions(false), 200)
    }

    return (
        <div className="search-container">
            <form onSubmit={onSubmit} className="search-form">
                <div className="search-input-wrapper">
                    <input
                        type="text"
                        value={searchTerm}
                        placeholder="Search products... (e.g., laptop, mobile)"
                        className="search-input"
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm && setShowSuggestions(true)}
                        onBlur={handleInputBlur}
                    />
                    <button
                        type="submit"
                        className="search-button"
                        title="Search products"
                    >
                        <i className="fas fa-search"></i>
                    </button>
                </div>

                {/* Suggestions Dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                    <div className="suggestions-dropdown">
                        <div className="suggestions-header">
                            Found {filteredSuggestions.length} product{filteredSuggestions.length !== 1 ? 's' : ''}
                        </div>
                        <ul className="suggestions-list">
                            {filteredSuggestions.map((product) => (
                                <li
                                    key={product.id}
                                    className="suggestion-item"
                                    onClick={() => handleSuggestionClick(product.name, product.id)}
                                >
                                    <div className="suggestion-content">
                                        <div className="suggestion-name">{product.name}</div>
                                        <div className="suggestion-price">₹{product.price}</div>
                                    </div>
                                    <i className="fas fa-arrow-right"></i>
                                </li>
                            ))}
                        </ul>
                        <div className="suggestions-footer">
                            Press Enter to see all results for "{searchTerm}"
                        </div>
                    </div>
                )}

                {/* No Results Message */}
                {showSuggestions && searchTerm && filteredSuggestions.length === 0 && (
                    <div className="suggestions-dropdown">
                        <div className="no-results">
                            <i className="fas fa-search"></i>
                            <p>No products found for "{searchTerm}"</p>
                            <small>Try searching for: laptop, mobile, tablet...</small>
                        </div>
                    </div>
                )}
            </form>
        </div>
    )
}

export default SearchBarForProducts
