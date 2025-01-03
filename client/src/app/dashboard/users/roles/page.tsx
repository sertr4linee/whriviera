'use client'

import { useState, useEffect } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"
import { roleService } from "@/lib/services/api"

interface Role {
  name: string;
}

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([])
  const [isAddRoleOpen, setIsAddRoleOpen] = useState(false)
  const [newRoleName, setNewRoleName] = useState("")

  useEffect(() => {
    loadRoles()
  }, [])

  const loadRoles = async () => {
    try {
      const roleNames = await roleService.getAllRoles()
      const rolesData = roleNames.map(name => ({ name }))
      setRoles(rolesData)
    } catch (error) {
      toast.error("Erreur lors du chargement des rôles")
      console.error(error)
    }
  }

  const handleAddRole = async () => {
    if (!newRoleName) {
      toast.error("Veuillez entrer un nom de rôle")
      return
    }

    try {
      await roleService.createRole({ name: newRoleName })
      toast.success("Rôle créé avec succès")
      setNewRoleName("")
      setIsAddRoleOpen(false)
      await loadRoles()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de la création du rôle")
      console.error(error)
    }
  }

  const handleDeleteRole = async (roleName: string) => {
    if (roleName.toLowerCase() === "admin" || roleName.toLowerCase() === "user") {
      toast.error("Impossible de supprimer les rôles système")
      return
    }

    try {
      await roleService.deleteRole(roleName)
      toast.success("Rôle supprimé avec succès")
      await loadRoles()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de la suppression du rôle")
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des rôles</h1>
        <Dialog open={isAddRoleOpen} onOpenChange={setIsAddRoleOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter un rôle</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un rôle</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="roleName">Nom du rôle</Label>
                <Input
                  id="roleName"
                  value={newRoleName}
                  onChange={(e) => setNewRoleName(e.target.value)}
                  placeholder="Nom du rôle"
                />
              </div>
              <Button onClick={handleAddRole} className="w-full">
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {roles.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucun rôle trouvé
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom du rôle</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.name}>
                <TableCell>{role.name}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteRole(role.name)}
                      disabled={role.name.toLowerCase() === "admin" || role.name.toLowerCase() === "user"}
                    >
                      Supprimer
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
} 