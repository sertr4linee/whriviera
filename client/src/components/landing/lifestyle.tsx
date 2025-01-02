'use client'

import { LayoutGrid } from "../landing/layoutgrid"
import { motion } from 'framer-motion'
import React from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const LifestyleComp = () => {
    const { language } = useLanguage()
    const { t } = useTranslation(language)

    const cards = [
        {
            id: 1,
            content: (
                <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.panoramic.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.panoramic.description')}
                    </p>
                </div>
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
                <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.design.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.design.description')}
                    </p>
                </div>
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
                <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.living.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.living.description')}
                    </p>
                </div>
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
                <div className="text-white">
                    <h3 className="text-2xl md:text-3xl font-bold mb-2">
                        {t('components.lifestyle.kitchen.title')}
                    </h3>
                    <p className="text-sm md:text-base opacity-90">
                        {t('components.lifestyle.kitchen.description')}
                    </p>
                </div>
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
                    className="text-2xl sm:text-3xl md:text-4xl font-light text-center mb-8 sm:mb-12 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t('components.lifestyle.title')}
                </motion.h2>
                <div className="w-full">
                    <LayoutGrid cards={cards} />
                </div>
            </div>
        </section>
    )
}

export default LifestyleComp