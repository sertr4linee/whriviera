'use client'

import { bentoImages } from '@/lib/constant'
import { motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const OffersComp = () => {
    const { language } = useLanguage()
    const { t } = useTranslation(language)
    const [startIndex, setStartIndex] = useState(0)
    const [itemsToShow, setItemsToShow] = useState(4)
    const [maxIndex, setMaxIndex] = useState(bentoImages.length - itemsToShow)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setItemsToShow(1)
            } else if (window.innerWidth < 768) {
                setItemsToShow(2)
            } else if (window.innerWidth < 1024) {
                setItemsToShow(3)
            } else {
                setItemsToShow(4)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        setMaxIndex(Math.max(0, bentoImages.length - itemsToShow))
        setStartIndex(prev => Math.min(prev, bentoImages.length - itemsToShow))
    }, [itemsToShow])

    const slideLeft = () => {
        setStartIndex(prev => Math.max(prev - 1, 0))
    }

    const slideRight = () => {
        setStartIndex(prev => Math.min(prev + 1, maxIndex))
    }

    return (
        <section className="py-10 sm:py-20 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t('components.offers.title')}
                </motion.h2>
                <div className="relative">
                    {/* Navigation buttons */}
                    <div className="absolute left-0 sm:left-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-16 sm:w-16">
                        <motion.button
                            className={`transition-opacity ${
                                startIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'opacity-75 hover:opacity-100 cursor-pointer'
                            }`}
                            onClick={slideLeft}
                            disabled={startIndex === 0}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronLeft className="w-10 h-10 sm:w-16 sm:h-16 text-white" strokeWidth={2.5} />
                        </motion.button>
                    </div>

                    <div className="absolute right-0 sm:right-4 top-1/2 -translate-y-1/2 z-10 h-10 w-10 sm:h-16 sm:w-16">
                        <motion.button
                            className={`transition-opacity ${
                                startIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'opacity-75 hover:opacity-100 cursor-pointer'
                            }`}
                            onClick={slideRight}
                            disabled={startIndex === maxIndex}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <ChevronRight className="w-10 h-10 sm:w-16 sm:h-16 text-white" strokeWidth={2.5} />
                        </motion.button>
                    </div>

                    <div className="overflow-hidden">
                        <motion.div 
                            className="flex gap-2 sm:gap-4"
                            animate={{ x: `${-startIndex * (100 / itemsToShow)}%` }}
                            transition={{ type: "spring", stiffness: 500, damping: 40, duration: 0.3 }}
                        >
                            {bentoImages.map((image, index) => (
                                <motion.div
                                    key={index}
                                    className={`relative flex-shrink-0 aspect-square ${
                                        itemsToShow === 1 ? 'w-full' :
                                        itemsToShow === 2 ? 'w-[calc(50%-4px)]' :
                                        itemsToShow === 3 ? 'w-[calc(33.333%-8px)]' :
                                        'w-[calc(25%-12px)]'
                                    }`}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Image
                                        src={image.src}
                                        alt={image.text}
                                        fill
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                                        className="object-cover rounded-lg"
                                        priority={index < itemsToShow}
                                    />
                                    <motion.div
                                        className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center p-2 sm:p-4 rounded-lg"
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <p className="text-white text-center text-sm sm:text-base font-light">{image.text}</p>
                                    </motion.div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default OffersComp

