'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { DirectionAwareHover } from '@/components/directioncard'
import { LayoutGrid } from "../landing/layoutgrid"

const fadeInUpVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
}

const LifestyleComp = () => {
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
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Vue Panoramique
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Profitez d'une vue imprenable sur le Golfe de Saint-Tropez depuis votre terrasse. Un cadre exceptionnel pour des moments inoubliables.
                        </p>
                    </div>
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
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Design & Confort
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Un mobilier soigneusement sélectionné alliant élégance et confort pour une expérience de séjour unique.
                        </p>
                    </div>
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
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Espace de Vie
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Des espaces de vie lumineux et spacieux, pensés pour votre confort et agencés avec goût.
                        </p>
                    </div>
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
                    <div className="space-y-2">
                        <h3 className="font-semibold text-2xl text-white">
                            Cuisine Équipée
                        </h3>
                        <p className="text-gray-200 text-sm max-w-[10rem]">
                            Des cuisines modernes entièrement équipées pour satisfaire les plus exigeants des chefs amateurs.
                        </p>
                    </div>
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
                    Lifestyle
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