'use client'

import { motion } from 'framer-motion'
import { Mail, MapPin, Phone, Send } from 'lucide-react'
import React, { useState, useEffect } from 'react'
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const ContactFormComp = () => {
    const { language } = useLanguage()
    const { t } = useTranslation(language)
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        console.log('Current language:', language)
        console.log('Contact title:', t('components.contact.title'))
    }, [language, t])

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setIsSubmitting(true)
        
        // Simuler l'envoi
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsSubmitting(false)
        
        // Reset form
        const form = e.target as HTMLFormElement
        form.reset()
    }

    // Vérifier si les traductions sont disponibles
    if (!t('components.contact.title')) {
        return <div>Loading translations...</div>
    }

    return (
        <section id="contact" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-light text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t('components.contact.title')}
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-6xl mx-auto">
                    {/* Informations de contact */}
                    <motion.div
                        className="space-y-8"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div>
                            <h3 className="text-2xl font-light mb-6">{t('components.contact.contact_info.title')}</h3>
                            <p className="text-gray-600 mb-8">
                                {t('components.contact.subtitle')}
                            </p>
                        </div>
                        <div className="space-y-6">
                            <motion.div 
                                className="flex items-center gap-4"
                                whileHover={{ x: 5 }}
                            >
                                <div className="bg-gold/10 p-3 rounded-lg">
                                    <Mail className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="font-medium">{t('components.contact.contact_info.email.label')}</p>
                                    <a href={`mailto:${t('components.contact.contact_info.email.value')}`} className="text-gray-600 hover:text-gold">
                                        {t('components.contact.contact_info.email.value')}
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="flex items-center gap-4"
                                whileHover={{ x: 5 }}
                            >
                                <div className="bg-gold/10 p-3 rounded-lg">
                                    <Phone className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="font-medium">{t('components.contact.contact_info.phone.label')}</p>
                                    <a href={`tel:${t('components.contact.contact_info.phone.value').replace(/\s/g, '')}`} className="text-gray-600 hover:text-gold">
                                        {t('components.contact.contact_info.phone.value')}
                                    </a>
                                </div>
                            </motion.div>
                            <motion.div 
                                className="flex items-center gap-4"
                                whileHover={{ x: 5 }}
                            >
                                <div className="bg-gold/10 p-3 rounded-lg">
                                    <MapPin className="h-6 w-6 text-gold" />
                                </div>
                                <div>
                                    <p className="font-medium">{t('components.contact.contact_info.address.label')}</p>
                                    <p className="text-gray-600">
                                        {t('components.contact.contact_info.address.value')}
                                    </p>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Formulaire */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="bg-white rounded-2xl shadow-lg p-8"
                    >
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
                                    {t('components.contact.name')}
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="text"
                                    id="name"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">
                                    {t('components.contact.email')}
                                </label>
                                <motion.input
                                    whileFocus={{ scale: 1.01 }}
                                    type="email"
                                    id="email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all"
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-900">
                                    {t('components.contact.message')}
                                </label>
                                <motion.textarea
                                    whileFocus={{ scale: 1.01 }}
                                    id="message"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gold/50 transition-all resize-none"
                                    required
                                ></motion.textarea>
                            </div>
                            <motion.button
                                type="submit"
                                className="w-full bg-gold text-white py-3 rounded-lg hover:bg-gray-900 transition-colors flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Send className="h-5 w-5" />
                                        {t('components.contact.send')}
                                    </>
                                )}
                            </motion.button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default ContactFormComp
