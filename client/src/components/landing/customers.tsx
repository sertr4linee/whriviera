'use client'

import { testimonials } from '@/lib/constant';
import { motion, useAnimationControls } from 'framer-motion';
import { Star } from 'lucide-react';
import React, { useEffect, useMemo } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext'
import { useTranslation } from '@/lib/i18n/useTranslation'

const CustomersComp = () => {
    const { language } = useLanguage()
    const { t } = useTranslation(language)
    const controls = useAnimationControls()

    const translatedTestimonials = useMemo(() => testimonials.map(testimonial => {
        const translatedText = t(`components.customers.testimonials.${testimonial.id}.text`)
        const translatedName = t(`components.customers.testimonials.${testimonial.id}.name`)
        
        console.log('Translation keys:', {
            textKey: `components.customers.testimonials.${testimonial.id}.text`,
            nameKey: `components.customers.testimonials.${testimonial.id}.name`,
            text: translatedText,
            name: translatedName
        })

        return {
            ...testimonial,
            text: translatedText,
            name: translatedName
        }
    }), [t])

    // Créer un tableau plus long pour un défilement vraiment infini
    const duplicatedTestimonials = useMemo(() => {
        const singleSet = [...translatedTestimonials]
        return [...singleSet, ...singleSet, ...singleSet, ...singleSet] // 4 copies
    }, [translatedTestimonials])

    useEffect(() => {
        const startAnimation = async () => {
            while (true) {
                await controls.start({
                    x: [-350, -350 * duplicatedTestimonials.length / 2],
                    transition: {
                        duration: 40,
                        ease: "linear"
                    }
                })
                await controls.set({ x: -350 }) // Reset position
            }
        }

        startAnimation()
    }, [controls, duplicatedTestimonials.length])

    return (
        <section id="témoignages" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-light text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    {t('components.customers.title')}
                </motion.h2>
                <div className="relative w-full overflow-hidden">
                    <motion.div
                        className="flex gap-8"
                        animate={controls}
                        style={{
                            width: "fit-content"
                        }}
                    >
                        {duplicatedTestimonials.map((testimonial, index) => (
                            <motion.div
                                key={`${testimonial.id}-${index}`}
                                className="flex-shrink-0 w-[350px] bg-gray-50 p-6 rounded-lg shadow-md"
                                whileHover={{ scale: 1.03 }}
                            >
                                <p className="text-gray-600 mb-4">{testimonial.text}</p>
                                <div className="flex items-center justify-between">
                                    <span className="font-semibold">{testimonial.name}</span>
                                    <div className="flex">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="text-gold" size={16} fill="currentColor" />
                                        ))}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default CustomersComp
