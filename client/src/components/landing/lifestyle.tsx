'use client'

import { LayoutGrid } from "../landing/layoutgrid"
import { motion } from 'framer-motion'
import React from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const LifestyleComp = () => {
    const { language } = useLanguage()
    const { t } = useTranslation(language)

    const cards = [
        {
            id: 1,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.panoramic.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.panoramic.description')}
                    </p>
                </motion.div>
            ),
            className: "md:col-span-2",
            thumbnail: {
                src: "/kitchen.jpg",
                width: 1645,
                height: 625,
                alt: "Vue panoramique"
            }
        },
        {
            id: 2,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.design.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.design.description')}
                    </p>
                </motion.div>
            ),
            className: "col-span-1",
            thumbnail: {
                src: "/chair.png",
                width: 227,
                height: 303,
                alt: "Design & Confort"
            }
        },
        {
            id: 3,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.living.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.living.description')}
                    </p>
                </motion.div>
            ),
            className: "col-span-1",
            thumbnail: {
                src: "/salon.jpg",
                width: 285,
                height: 285,
                alt: "Espace de vie"
            }
        },
        {
            id: 4,
            content: (
                <motion.div 
                    className="text-white"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.kitchen.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.kitchen.description')}
                    </p>
                </motion.div>
            ),
            className: "md:col-span-2",
            thumbnail: {
                src: "/cuisine.jpg",
                width: 1785,
                height: 745,
                alt: "Cuisine équipée"
            }
        }
    ]

    return (
        <section className="py-12 sm:py-16 md:py-20 bg-gray-50 overflow-hidden">
            <div className="container mx-auto px-4 sm:px-6">
                <motion.h2
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 text-black"
                >
                    {t('components.lifestyle.title')}
                </motion.h2>
                <motion.div 
                    variants={fadeInUpVariants}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="w-full"
                >
                    <LayoutGrid cards={cards} />
                </motion.div>
            </div>
        </section>
    )
}

export default LifestyleComp