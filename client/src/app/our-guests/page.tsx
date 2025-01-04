'use client'

import { useEffect, useState } from 'react'
import { listingService, ListingDto } from '@/lib/services/api'
import { Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function OurGuestsPage() {
  const [listings, setListings] = useState<ListingDto[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const data = await listingService.getAllListings(true)
        setListings(data)
      } catch (error) {
        console.error('Erreur lors du chargement des listings:', error)
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
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-light text-center mb-12">Nos Biens</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((listing) => {
            const headerImage = listing.images.find(img => img.isHeader)?.url || listing.images[0]?.url
            return (
              <Link
                key={listing.id}
                href={`/our-guests/${generateSlug(listing.name)}`}
                className="group"
              >
                <div className="relative h-64 mb-4 overflow-hidden rounded-lg">
                  {headerImage && (
                    <img
                      src={headerImage}
                      alt={listing.name}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                </div>
                <h2 className="text-2xl font-light mb-2 group-hover:text-gold transition-colors">
                  {listing.name}
                </h2>
                <p className="text-gray-600 line-clamp-2">{listing.description}</p>
                <div className="mt-4 flex items-center gap-4 text-sm text-gray-500">
                  <span>{listing.bedrooms} chambres</span>
                  <span>{listing.bathrooms} sdb</span>
                  <span>{listing.size} m²</span>
                </div>
                <p className="mt-2 text-lg font-semibold">{listing.price}€<span className="text-sm font-normal">/nuit</span></p>
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}