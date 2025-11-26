import React from 'react'
import { motion } from 'framer-motion'
import { Users, Zap, Award, Globe } from 'lucide-react'

const AboutPage = () => {
  const features = [
    {
      icon: Users,
      title: 'Rikta Islam',
      description: 'Join thousands of satisfied customers worldwide',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Zap,
      title: 'Parta Protim debnath',
      description: 'Quick shipping and instant customer support',
      color: 'from-yellow-500 to-yellow-600',
    },
    {
      icon: Award,
      title: 'Award Winning',
      description: 'Recognized for excellence and customer service',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Shipping to over 150 countries worldwide',
      color: 'from-green-500 to-green-600',
    },
  ]

  const team = [
    {
      name: 'John Smith',
      role: 'Founder & CEO',
      image: 'https://via.placeholder.com/300x300?text=John+Smith',
    },
    {
      name: 'Sarah Johnson',
      role: 'Chief Technology Officer',
      image: 'https://via.placeholder.com/300x300?text=Sarah+Johnson',
    },
    {
      name: 'Mike Chen',
      role: 'Head of Customer Service',
      image: 'https://via.placeholder.com/300x300?text=Mike+Chen',
    },
    {
      name: 'Emma Davis',
      role: 'Marketing Director',
      image: 'https://via.placeholder.com/300x300?text=Emma+Davis',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="text-center">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            About Our Store
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We're committed to providing the best shopping experience with quality products, exceptional service, and innovation at every step.
          </p>
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`bg-gradient-to-br ${feature.color} p-8 rounded-xl shadow-lg text-white transform hover:scale-105 transition-transform duration-300`}
            >
              <Icon size={40} className="mb-4" />
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-sm opacity-90">{feature.description}</p>
            </motion.div>
          )
        })}
      </motion.div>

      {/* Story Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <div>
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Our Story
          </h2>
          <div className="space-y-4 text-gray-600 dark:text-gray-300">
            <p>
              Founded in 2020, our e-commerce platform was born from a simple idea: to make quality shopping accessible and convenient for everyone.
            </p>
            <p>
              What started as a small startup has grown into a thriving marketplace serving customers across the globe. We pride ourselves on curating the best products and providing exceptional customer service.
            </p>
            <p>
              Today, we're passionate about innovation, sustainability, and creating positive impact in the communities we serve.
            </p>
          </div>
        </div>
        <motion.div
          className="relative"
          whileHover={{ scale: 1.05 }}
        >
          <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl p-1 shadow-xl">
            <img
              src="https://via.placeholder.com/500x400?text=Our+Store"
              alt="Our Store"
              className="rounded-xl w-full h-auto"
            />
          </div>
        </motion.div>
      </motion.div>

      {/* Mission & Vision */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Mission</h3>
          <p className="text-gray-600 dark:text-gray-300">
            To deliver exceptional value through quality products, competitive prices, and outstanding customer service. We strive to be the most trusted online marketplace where customers can find everything they need.
          </p>
        </motion.div>

        <motion.div
          className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Our Vision</h3>
          <p className="text-gray-600 dark:text-gray-300">
            To become a global leader in e-commerce by fostering innovation, sustainability, and community engagement. We envision a future where shopping is seamless, secure, and rewarding.
          </p>
        </motion.div>
      </div>

      {/* Team Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 mb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Meet Our Team
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {team.map((member, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Stats Section */}
      <motion.div
        className="bg-gradient-to-r from-blue-600 to-purple-600 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '10K+', label: 'Products' },
              { number: '150+', label: 'Countries' },
              { number: '24/7', label: 'Support' },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="text-center text-white"
              >
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Values Section */}
      <motion.div
        className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <h2 className="text-4xl font-bold text-center text-gray-900 dark:text-white mb-12">
          Our Core Values
        </h2>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {[
            {
              title: 'Integrity',
              description: 'We operate with honesty and transparency in all our dealings.',
            },
            {
              title: 'Excellence',
              description: 'We strive for the highest quality in products and services.',
            },
            {
              title: 'Innovation',
              description: 'We continuously improve and embrace new technologies.',
            },
            {
              title: 'Community',
              description: 'We build lasting relationships with our customers and partners.',
            },
            {
              title: 'Sustainability',
              description: 'We care about our environmental and social responsibility.',
            },
            {
              title: 'Customer Focus',
              description: 'Your satisfaction is our top priority in everything we do.',
            },
          ].map((value, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition"
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {value.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AboutPage
