'use client'

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { listingService, type ListingDto, type CreateListingDto, type UpdateListingDto } from "@/lib/services/api"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Pencil, Trash2, Image, ToggleLeft, ToggleRight, Upload, X } from "lucide-react"
import { listingSchema, updateListingSchema, type ListingFormData } from "@/lib/validations/listing"
import { AddressSelector } from "@/components/maps/AddressSelector"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { useDropzone } from "react-dropzone"
import { Card } from "@/components/ui/card"
import { toast } from "sonner"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm, type ControllerRenderProps } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const ImageUploadZone = ({ onUpload }: { onUpload: (files: File[]) => void }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onUpload(acceptedFiles);
  }, [onUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    multiple: true
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-primary bg-primary/10"
          : "border-gray-300 hover:border-primary"
      }`}
    >
      <input {...getInputProps()} />
      <Upload className="w-10 h-10 mx-auto mb-4 text-gray-400" />
      {isDragActive ? (
        <p className="text-primary">Déposez les images ici...</p>
      ) : (
        <div className="space-y-2">
          <p>Glissez et déposez des images ici, ou cliquez pour sélectionner</p>
          <p className="text-sm text-gray-500">
            PNG, JPG ou WEBP jusqu'à 10MB
          </p>
        </div>
      )}
    </div>
  );
};

export default function ListingsPage() {
  const [listings, setListings] = useState<ListingDto[]>([])
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)
  const [isImagesDialogOpen, setIsImagesDialogOpen] = useState(false)
  const [selectedListing, setSelectedListing] = useState<ListingDto | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({})

  const addForm = useForm<ListingFormData>({
    resolver: zodResolver(listingSchema),
    defaultValues: {
      type: [],
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      size: 0,
      price: 0,
      description: '',
      name: '',
      address: '',
      latitude: 0,
      longitude: 0
    }
  })

  const editForm = useForm<ListingFormData>({
    resolver: zodResolver(updateListingSchema),
    defaultValues: {
      type: [],
      bedrooms: 0,
      bathrooms: 0,
      parking: 0,
      size: 0,
      price: 0,
      description: '',
      name: '',
      address: '',
      latitude: 0,
      longitude: 0
    }
  })

  useEffect(() => {
    loadListings()
  }, [])

  const loadListings = async () => {
    try {
      const data = await listingService.getAllListings()
      setListings(data)
    } catch (error) {
      toast.error("Erreur lors du chargement des listings")
      console.error(error)
    }
  }

  useEffect(() => {
    if (selectedListing) {
      editForm.reset({
        type: selectedListing.type,
        bedrooms: selectedListing.bedrooms,
        bathrooms: selectedListing.bathrooms,
        parking: selectedListing.parking,
        size: selectedListing.size,
        price: selectedListing.price,
        description: selectedListing.description,
        name: selectedListing.name,
        address: selectedListing.address,
        latitude: selectedListing.latitude,
        longitude: selectedListing.longitude
      })
    }
  }, [selectedListing, editForm])

  const handleAddListing = async (data: ListingFormData) => {
    try {
      await listingService.createListing(data)
      toast.success("Listing créé avec succès")
      setIsAddDialogOpen(false)
      loadListings()
      addForm.reset()
    } catch (error) {
      toast.error("Erreur lors de la création du listing")
      console.error(error)
    }
  }

  const handleEditListing = async (data: ListingFormData) => {
    if (!selectedListing) return

    try {
      await listingService.updateListing(selectedListing.id, data)
      toast.success("Listing mis à jour avec succès")
      setIsEditDialogOpen(false)
      loadListings()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du listing")
      console.error(error)
    }
  }

  const handleDeleteListing = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce listing ?")) return

    try {
      await listingService.deleteListing(id)
      toast.success("Listing supprimé avec succès")
      loadListings()
    } catch (error) {
      toast.error("Erreur lors de la suppression du listing")
      console.error(error)
    }
  }

  const handleToggleActive = async (id: string) => {
    try {
      await listingService.toggleListingActive(id)
      toast.success("Statut du listing mis à jour")
      loadListings()
    } catch (error) {
      toast.error("Erreur lors de la mise à jour du statut")
      console.error(error)
    }
  }

  const handleImageUpload = async (files: File[]) => {
    if (!selectedListing) return;
    setIsUploading(true);

    try {
      const formData = new FormData();
      files.forEach(file => {
        formData.append('images', file);
      });

      await listingService.uploadImages(selectedListing.id, files);
      toast.success("Images téléchargées avec succès");
      loadListings();
      const listing = await listingService.getListing(selectedListing.id);
      setSelectedListing(listing);
    } catch (error) {
      console.error('Upload error:', error);
      toast.error("Erreur lors du téléchargement des images");
    } finally {
      setIsUploading(false);
      setUploadProgress({});
    }
  };

  const handleDeleteImage = async (imageId: string) => {
    if (!selectedListing) return
    if (!confirm("Êtes-vous sûr de vouloir supprimer cette image ?")) return

    try {
      await listingService.deleteImage(selectedListing.id, imageId)
      toast.success("Image supprimée avec succès")
      const listing = await listingService.getListing(selectedListing.id)
      setSelectedListing(listing)
      loadListings()
    } catch (error) {
      toast.error("Erreur lors de la suppression de l'image")
      console.error(error)
    }
  }

  const handleSetHeaderImage = async (listingId: string, imageId: string) => {
    try {
      const updatedListing = await listingService.setHeaderImage(listingId, imageId);
      setListings(listings.map(l => l.id === updatedListing.id ? updatedListing : l));
      toast.success("Image définie comme en-tête avec succès");
    } catch (error) {
      console.error("Erreur lors de la définition de l'image d'en-tête:", error);
      toast.error("Erreur lors de la définition de l'image d'en-tête");
    }
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des listings</h1>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Ajouter un listing
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un listing</DialogTitle>
            </DialogHeader>
            <Form {...addForm}>
              <form onSubmit={addForm.handleSubmit(handleAddListing)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={addForm.control}
                    name="name"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="type"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData, 'type'> }) => (
                      <FormItem>
                        <FormLabel>Type (séparés par des virgules)</FormLabel>
                        <FormControl>
                          <Input
                            value={field.value.join(", ")}
                            onChange={(e) => field.onChange(e.target.value.split(",").map(t => t.trim()))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="bedrooms"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                      <FormItem>
                        <FormLabel>Chambres</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="bathrooms"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                      <FormItem>
                        <FormLabel>Salles de bain</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="parking"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                      <FormItem>
                        <FormLabel>Places de parking</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="size"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                      <FormItem>
                        <FormLabel>Superficie (m²)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addForm.control}
                    name="price"
                    render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                      <FormItem>
                        <FormLabel>Prix (€)</FormLabel>
                        <FormControl>
                          <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={addForm.control}
                  name="description"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="space-y-2">
                  <AddressSelector
                    onAddressSelect={(address) => {
                      addForm.setValue('address', address.Address)
                      addForm.setValue('latitude', address.Latitude)
                      addForm.setValue('longitude', address.Longitude)
                    }}
                    defaultAddress={addForm.getValues('address')}
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit">Ajouter</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      {listings.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucun listing trouvé
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nom</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Adresse</TableHead>
                <TableHead>Prix</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {listings.map((listing) => (
                <TableRow key={listing.id}>
                  <TableCell className="font-medium">{listing.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {listing.type.map((type) => (
                        <Badge key={type} variant="secondary">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell className="max-w-[200px] truncate">{listing.address}</TableCell>
                  <TableCell>{listing.price.toLocaleString()} €</TableCell>
                  <TableCell>
                    <Badge variant={listing.isActive ? "default" : "secondary"}>
                      {listing.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedListing(listing)
                          editForm.reset({
                            type: listing.type,
                            bedrooms: listing.bedrooms,
                            bathrooms: listing.bathrooms,
                            parking: listing.parking,
                            size: listing.size,
                            price: listing.price,
                            description: listing.description,
                            name: listing.name,
                            address: listing.address,
                            latitude: listing.latitude,
                            longitude: listing.longitude
                          })
                          setIsEditDialogOpen(true)
                        }}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedListing(listing)
                          setIsImagesDialogOpen(true)
                        }}
                      >
                        <Image className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(listing.id)}
                      >
                        {listing.isActive ? (
                          <ToggleRight className="h-4 w-4" />
                        ) : (
                          <ToggleLeft className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteListing(listing.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      )}

      {/* Dialog d'édition */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Modifier le listing</DialogTitle>
          </DialogHeader>
          <Form {...editForm}>
            <form onSubmit={editForm.handleSubmit(handleEditListing)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={editForm.control}
                  name="name"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Nom</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="type"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData, 'type'> }) => (
                    <FormItem>
                      <FormLabel>Type (séparés par des virgules)</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value.join(", ")}
                          onChange={(e) => field.onChange(e.target.value.split(",").map(t => t.trim()))}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="bedrooms"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Chambres</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="bathrooms"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Salles de bain</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="parking"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Places de parking</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="size"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Superficie (m²)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={editForm.control}
                  name="price"
                  render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                    <FormItem>
                      <FormLabel>Prix (€)</FormLabel>
                      <FormControl>
                        <Input type="number" {...field} onChange={e => field.onChange(+e.target.value)} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={editForm.control}
                name="description"
                render={({ field }: { field: ControllerRenderProps<ListingFormData> }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <AddressSelector
                  onAddressSelect={(address) => {
                    editForm.setValue('address', address.Address)
                    editForm.setValue('latitude', address.Latitude)
                    editForm.setValue('longitude', address.Longitude)
                  }}
                  defaultAddress={editForm.getValues('address')}
                />
              </div>
              <div className="flex justify-end">
                <Button type="submit">Enregistrer</Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Dialog des images */}
      <Dialog open={isImagesDialogOpen} onOpenChange={setIsImagesDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>Gérer les images</DialogTitle>
            <DialogDescription>
              Ajoutez ou supprimez des images pour ce listing
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="space-y-4">
              <ImageUploadZone onUpload={handleImageUpload} />
              {isUploading && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Téléchargement en cours...</span>
                    <span>{Object.values(uploadProgress).length} fichier(s)</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-300"
                      style={{
                        width: `${
                          Object.values(uploadProgress).reduce((a, b) => a + b, 0) /
                          Object.values(uploadProgress).length
                        }%`
                      }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-200" />
              </div>
              <div className="relative flex justify-center">
                <span className="px-2 bg-white text-sm text-gray-500">Images existantes</span>
              </div>
            </div>

            <ScrollArea className="h-[400px] w-full rounded-md border p-4">
              <AnimatePresence>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {selectedListing?.images.map((image) => (
                    <motion.div
                      key={image.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Card className="relative group overflow-hidden">
                        <img
                          src={image.url}
                          alt="Listing"
                          className="w-full h-48 object-cover transition-transform duration-200 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="destructive"
                            size="icon"
                            className="absolute top-2 right-2"
                            onClick={() => handleDeleteImage(image.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </AnimatePresence>
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 