"use client"

import { useEffect, useState } from "react"
import { listingService, type ListingDto } from "@/lib/services/api"
import { Loader2 } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { motion } from "framer-motion"

export default function OurGuestsPage() {
  const [listings, setListings] = useState<ListingDto[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getAllListings(true)
        setListings(data)
      } catch (error) {
        console.error("Erreur lors du chargement des listings:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchListings()
  }, [])

  const generateSlug = (name: string) => {
    return encodeURIComponent(name)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-stone-50">
        <Loader2 className="w-12 h-12 animate-spin text-gold" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-5xl font-light text-center mb-16 text-stone-800"
        >
          Nos Propriétés d'Exception
        </motion.h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {listings.map((listing, index) => {
            const headerImage = listing.images.find((img) => img.isHeader)?.url || listing.images[0]?.url
            return (
              <motion.div
                key={listing.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link href={`/our-guests/${generateSlug(listing.name)}`} className="group block">
                  <div className="relative h-80 mb-6 overflow-hidden rounded-lg shadow-lg">
                    {headerImage && (
                      <Image
                        src={headerImage || "/placeholder.svg"}
                        alt={listing.name}
                        layout="fill"
                        objectFit="cover"
                        className="transition-transform duration-500 group-hover:scale-110"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-300" />
                  </div>
                  <h2 className="text-2xl font-light mb-3 group-hover:text-gold transition-colors duration-300 text-stone-800">
                    {listing.name}
                  </h2>
                  <p className="text-stone-600 line-clamp-2 mb-4">{listing.description}</p>
                  <div className="flex items-center gap-6 text-sm text-stone-500 mb-3">
                    <span>{listing.bedrooms} chambres</span>
                    <span>{listing.bathrooms} sdb</span>
                    <span>{listing.size} m²</span>
                  </div>
                  <p className="text-xl font-light text-gold">
                    {new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR" }).format(listing.price)}
                    <span className="text-sm font-normal text-stone-500 ml-1">par nuit</span>
                  </p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

