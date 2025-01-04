import { z } from 'zod'

export const listingSchema = z.object({
  type: z.array(z.string()).min(1, "Au moins un type est requis"),
  bedrooms: z.number().min(0, "Le nombre de chambres ne peut pas être négatif"),
  bathrooms: z.number().min(0, "Le nombre de salles de bain ne peut pas être négatif"),
  parking: z.number().min(0, "Le nombre de places de parking ne peut pas être négatif"),
  size: z.number().min(1, "La superficie doit être supérieure à 0"),
  price: z.number().min(0, "Le prix ne peut pas être négatif"),
  description: z.string().min(10, "La description doit faire au moins 10 caractères"),
  name: z.string().min(3, "Le nom doit faire au moins 3 caractères"),
  address: z.string().min(5, "L'adresse doit faire au moins 5 caractères"),
  latitude: z.number(),
  longitude: z.number()
})

export type ListingFormData = z.infer<typeof listingSchema>

export const updateListingSchema = listingSchema.partial() 