'use client'

import React from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Shield, Home, Star, CheckCircle } from 'lucide-react'
import { useInView } from 'react-intersection-observer'

const EngagementComp = () => {
    const engagements = [
        {
            icon: Shield,
            title: "Confiance",
            description: "Une relation privilégiée avec nos propriétaires",
            stats: "98%",
            statsLabel: "de satisfaction"
        },
        {
            icon: Home,
            title: "Exclusivité",
            description: "Des biens d'exception uniquement chez WelkomHOME",
            stats: "200+",
            statsLabel: "propriétés"
        },
        {
            icon: Star,
            title: "Excellence",
            description: "Un service premium sur mesure",
            stats: "24/7",
            statsLabel: "disponibilité"
        }
    ]

    const { scrollYProgress } = useScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.8, 1])
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0.5, 1])

    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    })

    return (
        <section ref={ref} className="relative py-32 overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-50">
            <motion.div 
                className="container relative mx-auto px-6"
                style={{ scale, opacity }}
            >
                <motion.div
                    className="flex flex-col items-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <span className="text-gold uppercase tracking-wider font-medium mb-4">
                        Notre philosophie
                    </span>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-light mb-6 text-center">
                        L&apos;engagement <span className="text-gold font-normal">WelkomHOME</span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {engagements.map((item, index) => {
                        const IconComponent = item.icon
                        return (
                            <motion.div
                                key={item.title}
                                className="group relative bg-white rounded-2xl p-8 hover:shadow-2xl transition-all duration-500 border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                animate={inView ? { opacity: 1, y: 0 } : {}}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                whileHover={{ y: -10 }}
                            >
                                <motion.div 
                                    className="absolute -top-4 -right-4"
                                    initial={{ scale: 0, rotate: -45 }}
                                    animate={inView ? { scale: 1, rotate: 0 } : {}}
                                    transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                                >
                                    <div className="bg-gold text-white px-4 py-2 rounded-full text-sm font-medium">
                                        {item.stats}
                                    </div>
                                </motion.div>
                                
                                <motion.div
                                    className="w-16 h-16 mb-6 relative"
                                    whileHover={{ scale: 1.1 }}
                                >
                                    <div className="relative w-full h-full bg-gold rounded-xl flex items-center justify-center">
                                        <IconComponent className="w-8 h-8 text-white" />
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
                    className="mt-20 max-w-4xl mx-auto"
                    initial={{ opacity: 0 }}
                    animate={inView ? { opacity: 1 } : {}}
                    transition={{ duration: 1 }}
                >
                    <div className="relative bg-white p-8 rounded-2xl border border-gold/20">
                        <div className="flex items-start space-x-4">
                            <div className="flex-shrink-0">
                                <CheckCircle className="w-8 h-8 text-gold" />
                            </div>
                            <p className="text-lg text-gray-700">
                            &quot;Notre engagement est simple : vous offrir une expérience unique 
                                dans des propriétés d&apos;exception. Chaque maison est sélectionnée 
                                avec soin pour garantir des moments inoubliables.&quot;
                            </p>
                        </div>
                    </div>
                </motion.div>
            </motion.div>
        </section>
    )
}

export default EngagementComp

