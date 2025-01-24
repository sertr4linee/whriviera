'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY
            setScrolled(offset > 50)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-4' : 'bg-transparent py-6'}`}>
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        Welkome
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/our-guests" className="text-gray-600 hover:text-gold">
                            Nos Hôtes
                        </Link>
                        <Link href="/join" className="text-gray-600 hover:text-gold">
                            Nous Rejoindre
                        </Link>
                        <Link href="/about" className="text-gray-600 hover:text-gold">
                            A propos
                        </Link>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-gray-600 hover:text-gold"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="md:hidden"
                        >
                            <div className="flex flex-col space-y-4 py-4">
                                <Link href="/our-guests" className="text-gray-600 hover:text-gold">
                                    Nos Hôtes
                                </Link>
                                <Link href="/join" className="text-gray-600 hover:text-gold">
                                    Nous Rejoindre
                                </Link>
                                <Link href="/about" className="text-gray-600 hover:text-gold">
                                    A propos
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    )
}

export default Navbar