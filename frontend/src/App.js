import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import ProductListPage from './pages/ProductsListPage'
import ProductDetailsPage from './pages/ProductDetailsPage'
import CheckoutPage from './pages/CheckoutPage'
import Chatbot from './components/Chatbot'
import PaymentStatus from './components/PaymentStatus'
import Login from './pages/LoginPage'
import Register from './pages/RegisterPage'
import CardUpdatePage from './pages/CardUpdatePage'
import CardDetailsPage from './pages/CardDetailsPage'
import AccountPage from './pages/AccountPage'
import AccountUpdatePage from './pages/AccountUpdatePage'
import DeleteUserAccountPage from './pages/DeleteUserAccountPage'
import AllAddressesOfUserPage from './pages/AllAddressesOfUserPage'
import AddressUpdatePage from './pages/AddressUpdatePage'
import OrdersListPage from './pages/OrdersListPage'
import ProductCreatePage from './pages/ProductCreatePage'
import ProductUpdatePage from './pages/ProductUpdatePage'
import NotFound from './pages/NotFoundPage'
import HomePage from './pages/HomePage'
import ContactPage from './pages/ContactPage'
import AboutPage from './pages/AboutPage'
import TermsAndConditionsPage from './pages/TermsAndConditionsPage'
import ModernNavbar from './components/ModernNavbar'
import { motion, AnimatePresence } from 'framer-motion'
import AOS from 'aos'
import 'aos/dist/aos.css'
import './App.css'

const App = () => {
  React.useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: true,
      offset: 100,
    })
  }, [])

  return (
    <Router>
      <AnimatePresence mode="wait">
        <div className="min-h-screen bg-light transition-colors duration-300">
          <ModernNavbar />
          <Chatbot />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className=""
          >
            <Switch>
              <Route path="/" component={HomePage} exact />
              <Route path="/products" component={ProductListPage} exact />
              <Route path="/new-product/" component={ProductCreatePage} exact />
              <Route path="/product/:id/" component={ProductDetailsPage} exact />
              <Route path="/product-update/:id/" component={ProductUpdatePage} exact />
              <Route path="/product/:id/checkout/" component={CheckoutPage} exact />
              <Route path="/payment-status" component={PaymentStatus} exact />
              <Route path="/login" component={Login} exact />
              <Route path="/register" component={Register} exact />
              <Route path="/account" component={AccountPage} exact />
              <Route path="/account/update/" component={AccountUpdatePage} exact />
              <Route path="/account/delete/" component={DeleteUserAccountPage} exact />
              <Route path="/stripe-card-details" component={CardDetailsPage} exact />
              <Route path="/stripe-card-update" component={CardUpdatePage} exact />
              <Route path="/all-addresses/" component={AllAddressesOfUserPage} exact />
              <Route path="/all-addresses/:id/" component={AddressUpdatePage} exact />
              <Route path="/all-orders/" component={OrdersListPage} exact />
              <Route path="/contact" component={ContactPage} exact />
              <Route path="/about" component={AboutPage} exact />
              <Route path="/terms" component={TermsAndConditionsPage} exact />
              <Route path="" component={NotFound} exact />
            </Switch>
          </motion.div>
        </div>
      </AnimatePresence>
    </Router>
  )
}

export default App
