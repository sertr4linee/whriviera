'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Lock, Star, Home, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const ServicesComp = () => {
    const { language } = useLanguage()
    const { t } = useTranslation(language)

    const topics = [
        {
            icon: Clock,
            title: t('components.services.services.support')
        },
        {
            icon: Lock,
            title: t('components.services.services.confidentiality')
        },
        {
            icon: Star,
            title: t('components.services.services.concierge')
        },
        {
            icon: Home,
            title: t('components.services.services.properties')
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                    <div className="w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left"
                        >
                            <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-6">
                                {t('components.services.title')}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                {t('components.services.subtitle')}
                            </h1>
                            <p className="text-gray-600 text-lg mb-12">
                                {t('components.services.description')}
                            </p>
                        </motion.div>

                        <div>
                            <h2 className="text-2xl font-semibold mb-6 text-center lg:text-left">
                                {t('components.services.mainServices')}
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto lg:mx-0">
                                {topics.map((topic, index) => (
                                    <motion.div
                                        key={topic.title}
                                        className="group relative p-4 bg-white rounded-2xl border border-gray-100 hover:border-gold/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                        viewport={{ once: true }}
                                    >
                                        <motion.div
                                            className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-gold/30 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                            animate={{
                                                background: [
                                                    "linear-gradient(0deg, rgba(184,134,11,0.1) 0%, rgba(184,134,11,0) 100%)",
                                                    "linear-gradient(90deg, rgba(184,134,11,0.1) 0%, rgba(184,134,11,0) 100%)",
                                                    "linear-gradient(180deg, rgba(184,134,11,0.1) 0%, rgba(184,134,11,0) 100%)",
                                                    "linear-gradient(270deg, rgba(184,134,11,0.1) 0%, rgba(184,134,11,0) 100%)",
                                                    "linear-gradient(0deg, rgba(184,134,11,0.1) 0%, rgba(184,134,11,0) 100%)",
                                                ],
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "linear"
                                            }}
                                        />
                                        
                                        <div className="relative flex items-center space-x-4">
                                            <div className="flex-shrink-0 w-12 h-12 bg-gold/10 rounded-xl flex items-center justify-center">
                                                <topic.icon className="w-6 h-6 text-gold" />
                                            </div>
                                            <h3 className="text-base font-medium text-gray-900">
                                                {topic.title}
                                            </h3>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="text-center lg:text-left">
                                <motion.button
                                    className="inline-flex items-center px-6 py-3 text-gray-600 rounded-lg border border-gray-200 hover:border-gold/20 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {t('components.services.cta')}
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </motion.button>
                            </div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                        <motion.div
                            className="relative aspect-[4/3] md:aspect-[16/9] lg:aspect-auto lg:h-full"
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                        >
                            <Image
                                src="/inside.png"
                                alt="Welkom Home Services"
                                className="w-full h-full object-cover rounded-2xl"
                                width={500}
                                height={500}
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesComp

