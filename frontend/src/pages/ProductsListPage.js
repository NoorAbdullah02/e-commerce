import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProductsList } from '../actions/productActions'
import Message from '../components/Message'
import { Spinner, Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import { useHistory } from "react-router-dom";
import { CREATE_PRODUCT_RESET } from '../constants'


function ProductsListPage() {

    let history = useHistory()
    let searchTerm = history.location.search
    const dispatch = useDispatch()

    // products list reducer
    const productsListReducer = useSelector(state => state.productsListReducer)
    const { loading, error, products } = productsListReducer

    useEffect(() => {
        dispatch(getProductsList())
        dispatch({
            type: CREATE_PRODUCT_RESET
        })
        //dispatch(checkTokenValidation())
    }, [dispatch])

    // Improved filtering function
    const getFilteredProducts = () => {
        if (!searchTerm || searchTerm === "") {
            return products
        }

        try {
            // Extract search query from URL
            const urlParams = new URLSearchParams(searchTerm)
            const query = (urlParams.get('search') || '').toLowerCase().trim()

            if (!query) {
                return products
            }

            // Filter by name, description, or category
            return products.filter((product) => {
                const name = (product.name || '').toLowerCase()
                const description = (product.description || '').toLowerCase()
                const category = (product.category || '').toLowerCase()

                return (
                    name.includes(query) ||
                    description.includes(query) ||
                    category.includes(query)
                )
            })
        } catch (e) {
            console.error('Error filtering products:', e)
            return products
        }
    }

    const filteredProducts = getFilteredProducts()

    const showNothingMessage = () => {
        const query = new URLSearchParams(searchTerm).get('search')
        return (
            <div style={{ padding: '20px', textAlign: 'center' }}>
                {!loading ? (
                    <Message variant='info'>
                        {query ? `No products found for "${query}"` : 'No products to show'}
                    </Message>
                ) : ""}                
            </div>
        )
    }

    return (
        <div>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <span style={{ display: "flex" }}>
                <h5>Getting Products</h5>
                <span className="ml-2">
                    <Spinner animation="border" />
                </span>
            </span>}
            <div>
                {/* Search Results Header */}
                {searchTerm && (
                    <div style={{ marginBottom: '20px', padding: '15px', backgroundColor: '#f8f9fa', borderRadius: '5px' }}>
                        <p style={{ margin: 0, color: '#666' }}>
                            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} found for: <strong>"{new URLSearchParams(searchTerm).get('search')}"</strong>
                        </p>
                    </div>
                )}
                <Row>
                    {filteredProducts.length === 0 ? (
                        showNothingMessage()
                    ) : (
                        filteredProducts.map((product, idx) => (
                            <Col key={product.id} sm={12} md={6} lg={4} xl={3}>
                                <div className="mx-2"> 
                                    <Product product={product} />
                                </div>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </div>
    )
}

export default ProductsListPage
