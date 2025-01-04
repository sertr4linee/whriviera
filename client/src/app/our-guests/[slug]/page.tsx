'use client'

import { useEffect, useState } from 'react'
import { listingService, type ListingDto } from '@/lib/services/api'
import { useParams } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { Map } from '@/components/maps/Map'

export default function ListingDetailPage() {
  const params = useParams()
  const [listing, setListing] = useState<ListingDto | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const decodedSlug = decodeURIComponent(params.slug as string)
        const listings = await listingService.getAllListings()
        const listing = listings.find(l => 
          normalizeString(l.name) === normalizeString(decodedSlug)
        )
        
        if (!listing) {
          throw new Error('Listing non trouvé')
        }
        
        setListing(listing)
      } catch (error) {
        console.error('Erreur lors du chargement du listing:', error)
        setError('Erreur lors du chargement du listing')
      } finally {
        setLoading(false)
      }
    }

    fetchListing()
  }, [params.slug])

  const normalizeString = (str: string) => {
    return str
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Erreur: {error}</h1>
      </div>
    )
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl">Listing non trouvé</h1>
      </div>
    )
  }

  const headerImage = listing.images.find(img => img.isHeader)?.url || listing.images[0]?.url

  return (
    <div className="min-h-screen bg-white">
      <div className="relative h-[60vh]">
        {headerImage && (
          <img
            src={headerImage}
            alt={listing.name}
            className="w-full h-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-6xl text-white font-light">{listing.name}</h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Description</h2>
            <p className="text-gray-600">{listing.description}</p>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Caractéristiques</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-gray-600">Type: {listing.type.join(', ')}</p>
                  <p className="text-gray-600">Chambres: {listing.bedrooms}</p>
                  <p className="text-gray-600">Salles de bain: {listing.bathrooms}</p>
                </div>
                <div>
                  <p className="text-gray-600">Places de parking: {listing.parking}</p>
                  <p className="text-gray-600">Surface: {listing.size} m²</p>
                  <p className="text-gray-600">Prix: {listing.price}€/nuit</p>
                </div>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold mb-4">Localisation</h3>
              <p className="text-gray-600 mb-4">{listing.address}</p>
              <div className="h-[300px] rounded-lg overflow-hidden">
                <Map
                  center={{ lat: listing.latitude, lng: listing.longitude }}
                  markers={[
                    {
                      position: { lat: listing.latitude, lng: listing.longitude },
                      title: listing.name
                    }
                  ]}
                  zoom={15}
                />
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-4">Galerie</h3>
            <div className="grid grid-cols-2 gap-4">
              {listing.images.map((image, index) => (
                <img
                  key={image.id}
                  src={image.url}
                  alt={`${listing.name} - Image ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 