"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useParams, useLocation } from "react-router-dom"

interface ResponsiveNavbarProps {
  services?: string[]
}

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

const navLinks = [
  { name: "Home", to: "", ariaLabel: "Go to home page" },
  { name: "About", to: "about", ariaLabel: "Learn about our practice" },
  { name: "Services", to: "services", ariaLabel: "View our dental services" },
  { name: "FAQs", to: "faqs", ariaLabel: "Frequently asked questions" },
  { name: "Contact", to: "contact", ariaLabel: "Contact us" },
]

const ResponsiveNavbar = ({ services }: ResponsiveNavbarProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null)
  const { slug: clinicSlug } = useParams()
  const location = useLocation()

  // Handle mounting for SSR compatibility
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false)
    setMobileServicesOpen(false)
  }, [location.pathname])

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false)
        setMobileServicesOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const handleServicesMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current)
    setServicesOpen(true)
  }
  
  const handleServicesMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 150)
  }

  // Helper function to build proper URLs with slug preservation
  const buildUrl = (path: string) => {
    if (!clinicSlug) {
      return path === "" ? "/" : `/${path}`
    }
    return path === "" ? `/${clinicSlug}` : `/${clinicSlug}/${path}`
  }

  // Helper function to build service URLs
  const buildServiceUrl = (serviceName: string) => {
    const serviceSlug = slugify(serviceName)
    if (!clinicSlug) {
      return `/services/${serviceSlug}`
    }
    return `/${clinicSlug}/services/${serviceSlug}`
  }

  // Check if current path matches the nav item
  const isActiveLink = (path: string) => {
    const expectedPath = buildUrl(path)
    return location.pathname === expectedPath
  }

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setIsOpen(false)
    setMobileServicesOpen(false)
  }

  if (!isMounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 dark:bg-background/95 backdrop-blur-sm border-b border-gray-100 dark:border-border transition-colors duration-300" role="banner">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" role="navigation" aria-label="Main navigation">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <Link 
                to={buildUrl("")} 
                className="flex items-center space-x-2"
                aria-label="Go to homepage"
              >
                <svg 
                  width="32" 
                  height="32" 
                  viewBox="0 0 32 32" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-8 h-8 lg:w-10 lg:h-10"
                  aria-hidden="true"
                >
                  <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)" />
                  <path d="M16 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 12c-2.2 0-4-1.8-4-4s1.8-4 4-4 4 1.8 4 4-1.8 4-4 4z" fill="white"/>
                  <defs>
                    <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#2563eb" />
                      <stop offset="1" stopColor="#1d4ed8" />
                    </linearGradient>
                  </defs>
                </svg>
                <span className="hidden sm:block text-xl lg:text-2xl font-bold text-primary">
                  DentalCare
                </span>
              </Link>
            </motion.div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:items-center lg:space-x-8">
            {navLinks.map((item) => {
              if (item.name === "Services" && services && services.length > 0) {
                return (
                  <div
                    key="Services"
                    className="relative"
                    onMouseEnter={handleServicesMouseEnter}
                    onMouseLeave={handleServicesMouseLeave}
                  >
                    <button
                      className={`flex items-center space-x-1 px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                        location.pathname.includes('/services') 
                          ? 'text-primary bg-primary/5' 
                          : 'text-foreground'
                      }`}
                      aria-expanded={servicesOpen}
                      aria-haspopup="true"
                      aria-label={item.ariaLabel}
                    >
                      <span>Services</span>
                      <ChevronDown 
                        className={`w-4 h-4 transition-transform duration-200 ${
                          servicesOpen ? 'rotate-180' : ''
                        }`}
                        aria-hidden="true"
                      />
                    </button>
                    
                    <AnimatePresence>
                      {servicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-card rounded-lg shadow-lg border border-gray-200 dark:border-border py-2"
                          role="menu"
                          aria-label="Services submenu"
                        >
                          {services.map((service, index) => (
                            <Link
                              key={service}
                              to={buildServiceUrl(service)}
                              className="block px-4 py-3 text-sm text-foreground hover:bg-primary/5 hover:text-primary transition-colors duration-150 focus:outline-none focus:bg-primary/5 focus:text-primary"
                              onClick={() => setServicesOpen(false)}
                              role="menuitem"
                              tabIndex={servicesOpen ? 0 : -1}
                            >
                              {service}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )
              }

              return (
                <Link
                  key={item.name}
                  to={buildUrl(item.to)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 rounded-md hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                    isActiveLink(item.to) 
                      ? 'text-primary bg-primary/5' 
                      : 'text-foreground'
                  }`}
                  aria-label={item.ariaLabel}
                  aria-current={isActiveLink(item.to) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              )
            })}
          </div>

          {/* Desktop CTA Button */}
          <div className="hidden lg:flex lg:items-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                to={buildUrl("contact")}
                className="inline-flex items-center justify-center px-6 py-2.5 text-sm font-semibold text-white bg-primary border border-transparent rounded-full shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                aria-label="Book an appointment"
              >
                Book Appointment
              </Link>
            </motion.div>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <motion.button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colors duration-200"
              aria-controls="mobile-menu"
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close main menu" : "Open main menu"}
              onClick={toggleMenu}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">
                {isOpen ? "Close main menu" : "Open main menu"}
              </span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </motion.button>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                className="fixed inset-0 bg-black/20 backdrop-blur-sm lg:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={toggleMenu}
                aria-hidden="true"
              />
              
              {/* Mobile menu panel */}
              <motion.div
                id="mobile-menu"
                className="absolute top-full left-0 right-0 bg-white dark:bg-card border-t border-gray-200 dark:border-border shadow-lg lg:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                role="menu"
                aria-label="Mobile navigation menu"
              >
                <div className="px-4 py-6 space-y-1">
                  {navLinks.map((item, index) => {
                    if (item.name === "Services" && services && services.length > 0) {
                      return (
                        <div key="Services" className="space-y-1">
                          <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className={`flex items-center justify-between w-full px-3 py-3 text-base font-medium text-left rounded-md transition-colors duration-200 hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                              location.pathname.includes('/services') 
                                ? 'text-primary bg-primary/5' 
                                : 'text-foreground'
                            }`}
                            aria-expanded={mobileServicesOpen}
                            aria-controls="mobile-services-menu"
                            role="menuitem"
                          >
                            <span>Services</span>
                            <ChevronDown 
                              className={`w-5 h-5 transition-transform duration-200 ${
                                mobileServicesOpen ? 'rotate-180' : ''
                              }`}
                              aria-hidden="true"
                            />
                          </motion.button>
                          
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                id="mobile-services-menu"
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden pl-4 space-y-1"
                                role="menu"
                                aria-label="Services submenu"
                              >
                                {services.map((service) => (
                                  <Link
                                    key={service}
                                    to={buildServiceUrl(service)}
                                    className="block px-3 py-2 text-sm text-muted-foreground rounded-md hover:text-primary hover:bg-primary/5 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                                    onClick={handleMobileLinkClick}
                                    role="menuitem"
                                  >
                                    {service}
                                  </Link>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      )
                    }

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Link
                          to={buildUrl(item.to)}
                          className={`block px-3 py-3 text-base font-medium rounded-md transition-colors duration-200 hover:text-primary hover:bg-primary/5 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 ${
                            isActiveLink(item.to) 
                              ? 'text-primary bg-primary/5' 
                              : 'text-foreground'
                          }`}
                          onClick={handleMobileLinkClick}
                          aria-label={item.ariaLabel}
                          aria-current={isActiveLink(item.to) ? 'page' : undefined}
                          role="menuitem"
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    )
                  })}
                  
                  {/* Mobile CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4 mt-4 border-t border-gray-200 dark:border-border"
                  >
                    <Link
                      to={buildUrl("contact")}
                      className="flex items-center justify-center w-full px-6 py-3 text-base font-semibold text-white bg-primary border border-transparent rounded-full shadow-sm hover:bg-primary-hover focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 transition-all duration-200"
                      onClick={handleMobileLinkClick}
                      aria-label="Book an appointment"
                      role="menuitem"
                    >
                      Book Appointment
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  )
}

export { ResponsiveNavbar }