'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Star, CheckCircle } from 'lucide-react'

const EngagementComp = () => {
    const stats = [
        {
            title: 'Confiance',
            description: 'Une relation privilégiée avec nos propriétaires',
            stats: '98%',
            statsLabel: 'de satisfaction'
        },
        {
            title: 'Exclusivité',
            description: 'Des biens d\'exception uniquement chez WelkomHOME',
            stats: '200+',
            statsLabel: 'propriétés'
        },
        {
            title: 'Excellence',
            description: 'Un service premium sur mesure',
            stats: '24/7',
            statsLabel: 'disponibilité'
        }
    ]

    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="inline-block px-3 py-1 bg-gold/10 text-gold rounded-full text-sm font-medium mb-6"
                    >
                        Notre philosophie
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="text-4xl font-bold mb-8"
                    >
                        L'engagement WelkomHOME
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {stats.map((item, index) => {
                        return (
                            <motion.div
                                key={item.title}
                                initial="hidden"
                                whileInView="visible"
                                variants={{
                                    hidden: { opacity: 0, y: 20 },
                                    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
                                }}
                                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                whileHover={{ y: -10 }}
                            >
                                <motion.div 
                                    className="absolute -top-4 -right-4"
                                    initial="hidden"
                                    whileInView="visible"
                                    variants={{
                                        hidden: { scale: 0, rotate: -45 },
                                        visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 20 } }
                                    }}
                                    transition={{ delay: 0.5 + index * 0.2 }}
                                >
                                    <div className="bg-gold text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {item.stats}
                                    </div>
                                </motion.div>
                                
                                <motion.div
                                    className="w-16 h-16 mb-6 relative"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <div className="relative w-full h-full bg-gold rounded-xl flex items-center justify-center">
                                        {index === 0 ? (
                                            <Shield className="w-8 h-8 text-white" />
                                        ) : index === 1 ? (
                                            <Star className="w-8 h-8 text-white" />
                                        ) : (
                                            <CheckCircle className="w-8 h-8 text-white" />
                                        )}
                                    </div>
                                </motion.div>
                                
                                <h3 className="text-2xl font-semibold mb-3">{item.title}</h3>
                                <p className="text-black mb-4">{item.description}</p>
                                <p className="text-sm text-gold font-medium">{item.statsLabel}</p>
                            </motion.div>
                        )
                    })}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mt-20 max-w-4xl mx-auto"
                >
                    <div className="relative bg-white p-8 rounded-2xl border border-gold/20">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-8 h-8 text-gold" />
                            </div>
                            <motion.p 
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.8 }}
                                className="text-lg text-gray-700"
                            >
                                "Notre engagement est simple : vous offrir une expérience unique dans des propriétés d'exception. Chaque maison est sélectionnée avec soin pour garantir des moments inoubliables."
                            </motion.p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}

export default EngagementComp

