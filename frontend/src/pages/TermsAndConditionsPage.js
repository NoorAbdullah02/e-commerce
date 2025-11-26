import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const TermsAndConditionsPage = () => {
  const [expandedSection, setExpandedSection] = useState(0)

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By accessing and using this e-commerce platform, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service. We reserve the right to make changes to these terms at any time. Your continued use of the website following the posting of any changes will mean you accept those changes.`,
    },
    {
      title: '2. Use License',
      content: `Permission is granted to temporarily download one copy of the materials (information or software) on our e-commerce platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
      
• Modify or copy the materials
• Use the materials for any commercial purpose or for any public display
• Attempt to decompile or reverse engineer any software contained on the website
• Remove any copyright or other proprietary notations from the materials
• Transfer the materials to another person or "mirror" the materials on any other server`,
    },
    {
      title: '3. Disclaimer of Warranties',
      content: `The materials on our website are provided on an 'as is' basis. We make no warranties, expressed or implied, and hereby disclaim and negate all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.`,
    },
    {
      title: '4. Limitations of Liability',
      content: `In no event shall our company or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on our website, even if we or an authorized representative has been notified orally or in writing of the possibility of such damage.`,
    },
    {
      title: '5. Accuracy of Materials',
      content: `The materials appearing on our website could include technical, typographical, or photographic errors. We do not warrant that any of the materials on our website are accurate, complete, or current. We may make changes to the materials contained on our website at any time without notice. However, we do not make any commitment to update the materials.`,
    },
    {
      title: '6. Links to Third-Party Websites',
      content: `We have not reviewed all of the sites linked to our website and are not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by us of the site. Use of any such linked website is at the user's own risk.`,
    },
    {
      title: '7. Modifications to Terms',
      content: `We may revise these terms of service for our website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.`,
    },
    {
      title: '8. Governing Law',
      content: `These terms and conditions are governed by and construed in accordance with the laws of the jurisdiction in which we operate, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.`,
    },
    {
      title: '9. Product Information',
      content: `All product information, descriptions, and prices are subject to change without notice. We reserve the right to limit the quantity of any item and to discontinue any product at any time. Item descriptions, photographs, pricing, and availability are subject to change without notice.`,
    },
    {
      title: '10. User Responsibilities',
      content: `You are responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to immediately notify us of any unauthorized use of your account. You agree not to use the site for any unlawful or fraudulent purposes.`,
    },
    {
      title: '11. Payment Terms',
      content: `All prices are displayed in the currency specified on our website. We accept various payment methods as indicated on the checkout page. By placing an order, you authorize us to charge your selected payment method for the full amount of your purchase, including any applicable taxes and shipping fees.`,
    },
    {
      title: '12. Return and Refund Policy',
      content: `Products may be returned within 30 days of purchase in original, unused condition with all original packaging and documentation. Refunds will be processed within 7-10 business days after we receive and inspect the returned item. Shipping costs are non-refundable unless the return is due to our error or a defective product.`,
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16 px-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-4">Terms & Conditions</h1>
          <p className="text-lg opacity-90">
            Please read these terms carefully before using our service
          </p>
          <p className="text-sm opacity-75 mt-4">
            Last updated: November 2025
          </p>
        </div>
      </motion.div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Introduction */}
        <motion.div
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Welcome to Our E-Commerce Store
          </h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            These terms and conditions govern your use of our website and your purchase of products from us. By accessing our website and making purchases, you agree to comply with and be bound by these terms and conditions. If you do not agree with any part of these terms, please do not use our website or make purchases from us.
          </p>
        </motion.div>

        {/* Accordion Sections */}
        <motion.div
          className="space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {sections.map((section, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              <button
                onClick={() =>
                  setExpandedSection(
                    expandedSection === index ? -1 : index
                  )
                }
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition"
              >
                <h3 className="text-lg font-bold text-gray-900 dark:text-white text-left">
                  {section.title}
                </h3>
                <motion.div
                  animate={{ rotate: expandedSection === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="text-gray-600 dark:text-gray-400" />
                </motion.div>
              </button>

              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: expandedSection === index ? 'auto' : 0,
                  opacity: expandedSection === index ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-200 dark:border-gray-600">
                  <p className="text-gray-600 dark:text-gray-300 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>

        {/* Contact Section */}
        <motion.div
          className="mt-12 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl p-8 border border-blue-200 dark:border-gray-600"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Questions About Our Terms?
          </h3>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            If you have any questions or concerns about these terms and conditions, please don't hesitate to contact us.
          </p>
          <a
            href="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg transition transform hover:scale-105"
          >
            Contact Us
          </a>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          className="mt-8 text-center text-gray-600 dark:text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <p>
            © 2025 Your E-Commerce Store. All rights reserved. | Terms last updated: November 2025
          </p>
        </motion.div>
      </div>
    </div>
  )
}

export default TermsAndConditionsPage
