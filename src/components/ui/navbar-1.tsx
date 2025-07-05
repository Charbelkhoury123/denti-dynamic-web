"use client"

import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Menu, X, ChevronDown } from "lucide-react"
import { Link, useParams, useLocation } from "react-router-dom"

type Navbar1Props = {
  services?: string[]
}

const slugify = (str: string) =>
  str.toLowerCase().replace(/\s+/g, "-");

const navLinks = [
  { name: "Home", to: "" }, // Empty string for home route
  { name: "About", to: "about" },
  { name: "Services", to: "services" }, // Will be handled specially
  { name: "FAQs", to: "faqs" },
  { name: "Contact", to: "contact" },
]

const Navbar1 = ({ services }: Navbar1Props) => {
  console.log("Navbar1 services prop:", services);
  const [isOpen, setIsOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false)
  const closeTimeout = React.useRef<NodeJS.Timeout | null>(null);
  const { slug: clinicSlug } = useParams();
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen)
  
  const handleServicesMouseEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setServicesOpen(true);
  };
  
  const handleServicesMouseLeave = () => {
    closeTimeout.current = setTimeout(() => setServicesOpen(false), 150);
  };

  // Helper function to build proper URLs with slug preservation
  const buildUrl = (path: string) => {
    if (!clinicSlug) {
      // If no clinic slug, use root paths
      return path === "" ? "/" : `/${path}`;
    }
    // If clinic slug exists, preserve it in the URL
    return path === "" ? `/${clinicSlug}` : `/${clinicSlug}/${path}`;
  };

  // Helper function to build service URLs
  const buildServiceUrl = (serviceName: string) => {
    const serviceSlug = slugify(serviceName);
    if (!clinicSlug) {
      return `/services/${serviceSlug}`;
    }
    return `/${clinicSlug}/services/${serviceSlug}`;
  };

  // Check if current path matches the nav item
  const isActiveLink = (path: string) => {
    const expectedPath = buildUrl(path);
    return location.pathname === expectedPath;
  };

  // Close mobile menu when clicking on a link
  const handleMobileLinkClick = () => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  };

  return (
    <div className="flex justify-center w-full py-2 sm:py-4 lg:py-6 px-4">
      <div className="flex items-center justify-between px-3 sm:px-4 lg:px-6 py-2 sm:py-3 bg-white rounded-full shadow-lg w-full max-w-4xl relative z-10">
        <div className="flex items-center">
          <motion.div
            className="w-6 h-6 sm:w-8 sm:h-8 mr-2 sm:mr-3 lg:mr-6"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            whileHover={{ rotate: 10 }}
            transition={{ duration: 0.3 }}
          >
            <Link to={buildUrl("")} className="block">
              <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full sm:w-8 sm:h-8">
                <circle cx="16" cy="16" r="16" fill="url(#paint0_linear)" />
                <defs>
                  <linearGradient id="paint0_linear" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                    <stop stopColor="#FF9966" />
                    <stop offset="1" stopColor="#FF5E62" />
                  </linearGradient>
                </defs>
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          {navLinks.map((item) => {
            if (item.name === "Services" && services && services.length > 0) {
              return (
                <div
                  key="Services"
                  className="relative"
                  onMouseEnter={handleServicesMouseEnter}
                  onMouseLeave={handleServicesMouseLeave}
                >
                  <span className={`text-sm xl:text-base hover:text-gray-600 transition-colors font-medium cursor-pointer flex items-center ${
                    location.pathname.includes('/services') ? 'text-primary font-semibold' : 'text-gray-900'
                  }`}>
                    Services
                    <ChevronDown className="ml-1 h-3 w-3" />
                  </span>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 top-full mt-2 w-56 bg-white rounded-lg shadow-lg border z-20"
                      >
                        {services.map((service) => (
                          <Link
                            key={service}
                            to={buildServiceUrl(service)}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors first:rounded-t-lg last:rounded-b-lg"
                            onClick={() => setServicesOpen(false)}
                          >
                            {service}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
              >
                <Link
                  to={buildUrl(item.to)}
                  className={`text-sm xl:text-base hover:text-gray-600 transition-colors font-medium ${
                    isActiveLink(item.to) ? 'text-primary font-semibold' : 'text-gray-900'
                  }`}
                >
                  {item.name}
                </Link>
              </motion.div>
            );
          })}
        </nav>

        {/* Desktop CTA Button */}
        <motion.div
          className="hidden lg:block"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.2 }}
          whileHover={{ scale: 1.05 }}
        >
          <Link
            to={buildUrl("contact")}
            className="inline-flex items-center justify-center px-4 xl:px-6 py-2 xl:py-2.5 text-sm xl:text-base bg-white text-primary border border-primary rounded-full hover:bg-primary-50 transition-colors min-h-[40px] xl:min-h-[44px]"
          >
            Book Appointment
          </Link>
        </motion.div>

        {/* Mobile Menu Button */}
        <motion.button 
          className="lg:hidden flex items-center justify-center p-2 min-h-[44px] min-w-[44px] rounded-full hover:bg-gray-100 transition-colors" 
          onClick={toggleMenu} 
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle mobile menu"
        >
          {isOpen ? (
            <X className="h-5 w-5 text-gray-900" />
          ) : (
            <Menu className="h-5 w-5 text-gray-900" />
          )}
        </motion.button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/20 z-40 lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
            
            {/* Mobile Menu */}
            <motion.div
              className="fixed inset-x-4 top-20 bg-white rounded-2xl shadow-2xl z-50 lg:hidden max-h-[calc(100vh-6rem)] overflow-y-auto"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
            >
              <div className="p-6">
                <div className="space-y-1">
                  {navLinks.map((item, i) => {
                    if (item.name === "Services" && services && services.length > 0) {
                      return (
                        <motion.div
                          key="Services"
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 + 0.1 }}
                        >
                          <button
                            onClick={() => setMobileServicesOpen(!mobileServicesOpen)}
                            className="flex items-center justify-between w-full px-4 py-3 text-left text-base font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors min-h-[48px]"
                          >
                            <span className={location.pathname.includes('/services') ? 'text-primary font-semibold' : ''}>
                              Services
                            </span>
                            <ChevronDown className={`h-4 w-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                          </button>
                          
                          <AnimatePresence>
                            {mobileServicesOpen && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.2 }}
                                className="overflow-hidden"
                              >
                                <div className="pl-4 space-y-1 mt-1">
                                  {services.map((service) => (
                                    <Link
                                      key={service}
                                      to={buildServiceUrl(service)}
                                      className="block px-4 py-2.5 text-sm text-gray-600 hover:text-primary hover:bg-gray-50 rounded-lg transition-colors min-h-[44px] flex items-center"
                                      onClick={handleMobileLinkClick}
                                    >
                                      {service}
                                    </Link>
                                  ))}
                                </div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </motion.div>
                      );
                    }

                    return (
                      <motion.div
                        key={item.name}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.1 + 0.1 }}
                      >
                        <Link
                          to={buildUrl(item.to)}
                          className={`block px-4 py-3 text-base font-medium transition-colors hover:bg-gray-50 rounded-lg min-h-[48px] flex items-center ${
                            isActiveLink(item.to) ? 'text-primary font-semibold bg-primary/5' : 'text-gray-900'
                          }`}
                          onClick={handleMobileLinkClick}
                        >
                          {item.name}
                        </Link>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Mobile CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="pt-6 mt-6 border-t border-gray-100"
                >
                  <Link
                    to={buildUrl("contact")}
                    className="flex items-center justify-center w-full px-6 py-4 text-base font-semibold bg-primary text-white rounded-xl hover:bg-primary-hover transition-colors min-h-[52px]"
                    onClick={handleMobileLinkClick}
                  >
                    Book Appointment
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Navbar1 }