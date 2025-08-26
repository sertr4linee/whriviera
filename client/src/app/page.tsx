'use client'

import { images, languages } from "@/lib/constant";
import { Menu, X, Instagram, Facebook, ChevronDown, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import EngagementComp from "@/components/landing/engagement";
import CustomersComp from "@/components/landing/customers"
import ContactFormComp from "@/components/landing/contact";
import LifestyleComp from "@/components/landing/lifestyle";
import ServicesComp from "@/components/landing/services";
import { useState, useEffect } from 'react';
import OffersComp from "@/components/landing/offers";
import Link from 'next/link';

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.2], [1, 0.8])
  const [windowWidth, setWindowWidth] = useState(0)
  const [currentLanguage, setCurrentLanguage] = useState('fr')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 5000)

    window.addEventListener('scroll', handleScroll)
    return () => {
      clearInterval(timer)
      window.removeEventListener('scroll', handleScroll)
    }
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
    document.body.style.overflow = isMenuOpen ? 'auto' : 'hidden'
  }

  useEffect(() => {
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  // const handleLanguageChange = (langCode: string) => {
  //   setCurrentLanguage(langCode)
  //   setLanguage(langCode as 'fr' | 'en')
  // }

  return (
    <div className="min-h-screen bg-neutral-50">
      <motion.nav
        className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'backdrop-blur-xl bg-black/20 shadow-2xl border-b border-white/10' : 'bg-transparent'
          }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <motion.div
              className="text-2xl font-light tracking-wide"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/" className={`${scrolled ? 'text-white' : 'text-white'} transition-colors duration-300`}>
                Welkom Home
              </Link>
            </motion.div>
            
            <div className="hidden md:flex items-center space-x-8">
              {[
                { key: 'Nos Hôtes', href: '/our-guests' },
                { key: 'Nous Rejoindre', href: '/join-us' },
                { key: 'À Propos', href: '/about' }
              ].map((item) => (
                <motion.div 
                  key={item.key} 
                  whileHover={{ y: -2 }} 
                  transition={{ duration: 0.2 }}
                >
                  <Link
                    href={item.href}
                    className={`${scrolled ? 'text-white hover:text-white' : 'text-white/90 hover:text-white'} 
                    text-sm font-light tracking-wide transition-all duration-300 hover:bg-white/10 px-4 py-2 rounded-full backdrop-blur-sm`}
                  >
                    {item.key}
                  </Link>
                </motion.div>
              ))}
              
              <div className="flex items-center space-x-4 ml-8 pl-8 border-l border-white/20">
                <motion.a
                  href="https://www.instagram.com/welkomhome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${scrolled ? 'text-white hover:text-white' : 'text-white/80 hover:text-white'
                    } transition-all duration-300 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm`}
                  whileHover={{ scale: 1.1, y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Instagram size={18} />
                </motion.a>
                <motion.a
                  href="https://www.facebook.com/welkomhome"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${scrolled ? 'text-white hover:text-white' : 'text-white/80 hover:text-white'
                    } transition-all duration-300 p-2 rounded-full hover:bg-white/10 backdrop-blur-sm`}
                  whileHover={{ scale: 1.1, y: -1 }}
                  transition={{ duration: 0.2 }}
                >
                  <Facebook size={18} />
                </motion.a>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <motion.button
                      className={`flex items-center ${scrolled ? 'text-neutral-600 hover:text-neutral-900' : 'text-white/80 hover:text-white'
                        } transition-all duration-300 text-sm`}
                      whileHover={{ y: -1 }}
                      transition={{ duration: 0.2 }}
                    >
                      {languages.find(lang => lang.code === currentLanguage)?.flag}
                      <ChevronDown size={14} className="ml-1" />
                    </motion.button>
                  </PopoverTrigger>
                  <PopoverContent className="w-36 bg-white/95 backdrop-blur-md border border-neutral-200">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        className="flex items-center w-full px-3 py-2 hover:bg-neutral-100 text-sm text-neutral-700 hover:text-neutral-900 transition-colors"
                      >
                        <span className="mr-2">{lang.flag}</span>
                        {lang.name}
                      </button>
                    ))}
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className={`${scrolled ? 'text-neutral-900' : 'text-white'} focus:outline-none transition-colors duration-300`}
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-md"
          >
            <div className="flex flex-col h-full">
              <div className="flex justify-between items-center p-6 border-b border-neutral-200">
                <span className="text-xl font-light text-neutral-900">Menu</span>
                <button
                  onClick={toggleMenu}
                  className="text-neutral-900 focus:outline-none"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="flex-1 flex flex-col justify-center px-6">
                <div className="space-y-8">
                  {[
                    { key: 'Nos Hôtes', href: '/our-guests' },
                    { key: 'Nous Rejoindre', href: '/join-us' },
                    { key: 'À Propos', href: '/about' }
                  ].map((item, index) => (
                    <motion.div 
                      key={item.key}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className="block text-3xl font-light text-neutral-900 hover:text-neutral-600 transition-colors duration-300"
                        onClick={toggleMenu}
                      >
                        {item.key}
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              <div className="p-6 border-t border-neutral-200">
                <div className="flex items-center justify-center space-x-6">
                  <motion.a
                    href="https://www.instagram.com/welkomhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    whileHover={{ scale: 1.1, y: -1 }}
                    onClick={toggleMenu}
                  >
                    <Instagram size={20} />
                  </motion.a>
                  <motion.a
                    href="https://www.facebook.com/welkomhome"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-neutral-600 hover:text-neutral-900 transition-colors"
                    whileHover={{ scale: 1.1, y: -1 }}
                    onClick={toggleMenu}
                  >
                    <Facebook size={20} />
                  </motion.a>
                  
                  <div className="relative">
                    <button
                      className="flex items-center text-neutral-600 hover:text-neutral-900 transition-colors text-sm"
                      onClick={() => {
                        const dropdown = document.getElementById('language-dropdown-mobile')
                        if (dropdown) {
                          dropdown.classList.toggle('hidden')
                        }
                      }}
                    >
                      {languages.find(lang => lang.code === currentLanguage)?.flag}
                      <span className="ml-2">{languages.find(lang => lang.code === currentLanguage)?.name}</span>
                      <ChevronDown size={14} className="ml-1" />
                    </button>
                    <div id="language-dropdown-mobile" className="absolute bottom-full left-0 mb-2 w-36 bg-white/95 backdrop-blur-md border border-neutral-200 rounded-lg hidden">
                      {languages.map((lang) => (
                        <button
                          key={lang.code}
                          className="flex items-center w-full px-3 py-2 text-left hover:bg-neutral-100 text-sm text-neutral-700 first:rounded-t-lg last:rounded-b-lg"
                          onClick={() => {
                            const dropdown = document.getElementById('language-dropdown-mobile')
                            if (dropdown) {
                              dropdown.classList.add('hidden')
                            }
                            toggleMenu()
                          }}
                        >
                          <span className="mr-2">{lang.flag}</span>
                          {lang.name}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>


      <motion.div
        className="relative h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        <AnimatePresence initial={false}>
          <motion.div
            key={currentIndex}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
            <img
              src={images[currentIndex]}
              alt={`Villa ${currentIndex + 1}`}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-neutral-900/30" />
          </motion.div>
        </AnimatePresence>
        
        <div className="relative z-20 text-center max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <h1 className="text-6xl md:text-8xl font-light text-white mb-8 tracking-wide leading-none">
              Welkom
              <br />
              <span className="font-extralight italic">Home</span>
            </h1>
            <p className="text-xl md:text-2xl font-light text-white/90 mb-12 max-w-2xl mx-auto leading-relaxed">
              Une expérience de luxe intentionnelle dans le Golfe de Saint-Tropez
            </p>
            <motion.button
              className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 
              text-white text-sm tracking-widest uppercase font-light rounded-full transition-all duration-500 
              flex items-center gap-3 mx-auto"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.2 }}
            >
              <span>Découvrir</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </motion.button>
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
        >
          <div className="w-px h-16 bg-white/40 mx-auto" />
          <p className="text-white/60 text-xs tracking-widest uppercase mt-4">Scroll</p>
        </motion.div>
      </motion.div>
      <EngagementComp />
      <ServicesComp />
      <OffersComp />
      <CustomersComp />
      <LifestyleComp />
      <ContactFormComp />
    </div>
  )
}