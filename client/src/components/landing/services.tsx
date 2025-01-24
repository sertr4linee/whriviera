'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Clock, Lock, Star, Home, ArrowRight } from 'lucide-react'
import { DirectionAwareHover } from '@/components/directioncard'

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const fadeInRightVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 }
}

const ServicesComp = () => {
    const topics = [
        {
            icon: Clock,
            title: 'Service 24/7'
        },
        {
            icon: Lock,
            title: 'Confidentialité garantie'
        },
        {
            icon: Star,
            title: 'Conciergerie de luxe'
        },
        {
            icon: Home,
            title: 'Propriétés d\'exception'
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
                    <div className="w-full lg:w-1/2 max-w-2xl mx-auto lg:mx-0">
                        <motion.div
                            variants={fadeInUpVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                            className="text-center lg:text-left"
                        >
                            <span className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-6">
                                NOS SERVICES
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold mb-6">
                                Une expérience sur mesure
                            </h1>
                            <p className="text-gray-600 text-lg mb-12">
                                Découvrez notre gamme complète de services haut de gamme, conçue pour répondre à toutes vos attentes et vous offrir une expérience incomparable dans le Golfe de Saint-Tropez.
                            </p>
                        </motion.div>

                        <div>
                            <motion.h2 
                                variants={fadeInUpVariants}
                                initial="hidden"
                                whileInView="visible"
                                transition={{ duration: 0.6, delay: 0.2 }}
                                viewport={{ once: true }}
                                className="text-2xl font-semibold mb-6 text-center lg:text-left"
                            >
                                Services principaux
                            </motion.h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 max-w-xl mx-auto lg:mx-0">
                                {topics.map((topic, index) => (
                                    <motion.div
                                        key={topic.title}
                                        variants={fadeInUpVariants}
                                        initial="hidden"
                                        whileInView="visible"
                                        transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                                        viewport={{ once: true }}
                                        className="group relative p-4 bg-white rounded-2xl border border-gray-100 hover:border-gold/20 shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
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

                            <motion.div 
                                variants={fadeInUpVariants}
                                initial="hidden"
                                whileInView="visible"
                                transition={{ duration: 0.6, delay: 0.6 }}
                                viewport={{ once: true }}
                                className="text-center lg:text-left"
                            >
                                <motion.button
                                    className="inline-flex items-center px-6 py-3 text-gray-600 rounded-lg border border-gray-200 hover:border-gold/20 transition-colors"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        window.location.href = '/our-guests'
                                    }}
                                >
                                    Découvrir nos services
                                    <ArrowRight className="ml-2 w-4 h-4" />
                                </motion.button>
                            </motion.div>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
                        <motion.div
                            variants={fadeInRightVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="h-full"
                        >
                            <DirectionAwareHover
                                imageUrl="/inside.png"
                                className="w-full h-[500px] md:h-[600px]"
                            >
                                <div className="space-y-2">
                                    <h3 className="font-semibold text-2xl text-white">
                                        Villa Bellaudiere
                                    </h3>
                                    <p className="text-gray-200 text-sm max-w-[10rem]">
                                        3900€ at 9000€ / week
                                    </p>
                                </div>
                            </DirectionAwareHover>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ServicesComp

