'use client'

import { LayoutGrid } from "../landing/layoutgrid"
import { motion } from 'framer-motion'
import React, { useRef } from 'react'

const LifestyleComp = () => {
    const parallaxRef = useRef(null)
    return (
        <section className="py-20 bg-gray-50 text-white overflow-hidden" ref={parallaxRef}>
            <div className="container mx-auto px-6">
                <motion.h2
                    className="text-3xl md:text-4xl font-light text-center mb-12 text-black"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                >
                    Lifestyle
                </motion.h2>
                <div className="h-screen py-20 w-full">
                    <LayoutGrid cards={cards} />
                </div>
            </div>
        </section>
    )
}

const SkeletonOne = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Vue Panoramique
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Profitez d&apos;une vue imprenable sur le Golfe de Saint-Tropez depuis votre terrasse. 
                Un cadre exceptionnel pour des moments inoubliables.
            </p>
        </div>
    );
};

const SkeletonTwo = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Design & Confort
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Un mobilier soigneusement sélectionné alliant élégance et confort pour 
                une expérience de séjour unique.
            </p>
        </div>
    );
};

const SkeletonThree = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Espace de Vie
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Des espaces de vie lumineux et spacieux, pensés pour votre confort 
                et agencés avec goût.
            </p>
        </div>
    );
};

const SkeletonFour = () => {
    return (
        <div>
            <p className="font-bold md:text-4xl text-xl text-white">
                Cuisine Équipée
            </p>
            <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
                Des cuisines modernes entièrement équipées pour satisfaire les plus 
                exigeants des chefs amateurs.
            </p>
        </div>
    );
};

const cards = [
    {
        id: 1,
        content: <SkeletonOne />,
        className: "md:col-span-2",
        thumbnail: {
            src: "/vue.jpg",
            width: 1645,
            height: 625,
            alt: "House in the woods"
        }
    },
    {
        id: 2,
        content: <SkeletonTwo />,
        className: "col-span-1",
        thumbnail: {
            src: "/chair.png",
            width: 227,
            height: 303,
            alt: "House above the clouds"
        }
    },
    {
        id: 3,
        content: <SkeletonThree />,
        className: "col-span-1",
        thumbnail: {
            src: "/salon.jpg",
            width: 285,
            height: 285,
            alt: "Greens all over"
        }
    },
    {
        id: 4,
        content: <SkeletonFour />,
        className: "md:col-span-2",
        thumbnail: {
            src: "/cuisine.jpg",
            width: 1785,
            height: 745,
            alt: "Rivers are serene"
        }
    },
];

export default LifestyleComp
