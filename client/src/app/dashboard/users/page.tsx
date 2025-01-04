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
import { roleService, authService, userService } from "@/lib/services/api"

interface User {
  email: string;
  roles: string[];
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<string[]>([])
  const [isAddUserOpen, setIsAddUserOpen] = useState(false)
  const [isAssignRoleOpen, setIsAssignRoleOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [newUser, setNewUser] = useState({ email: "", password: "" })

  useEffect(() => {
    loadUsers()
    loadRoles()
  }, [])

  const loadUsers = async () => {
    try {
      const users = await userService.getAllUsers()
      setUsers(users)
    } catch (error) {
      toast.error("Erreur lors du chargement des utilisateurs")
      console.error(error)
    }
  }

  const loadRoles = async () => {
    try {
      const roleNames = await roleService.getAllRoles()
      setRoles(roleNames)
    } catch (error) {
      toast.error("Erreur lors du chargement des rôles")
      console.error(error)
    }
  }

  const handleAddUser = async () => {
    if (!newUser.email || !newUser.password) {
      toast.error("Veuillez remplir tous les champs")
      return
    }

    try {
      await authService.register(newUser.email, newUser.password)
      toast.success("Utilisateur créé avec succès")
      setNewUser({ email: "", password: "" })
      setIsAddUserOpen(false)
      await loadUsers()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de la création de l'utilisateur")
      console.error(error)
    }
  }

  const handleDeleteUser = async (email: string) => {
    try {
      await userService.deleteUser(email)
      toast.success("Utilisateur supprimé avec succès")
      await loadUsers()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de la suppression de l'utilisateur")
      console.error(error)
    }
  }

  const handleAssignRole = async (email: string, role: string) => {
    try {
      await userService.assignRole(email, role)
      toast.success("Rôle assigné avec succès")
      await loadUsers()
      setIsAssignRoleOpen(false)
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors de l'assignation du rôle")
      console.error(error)
    }
  }

  const handleRemoveRole = async (email: string, role: string) => {
    try {
      await userService.removeRole(email, role)
      toast.success("Rôle retiré avec succès")
      await loadUsers()
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Erreur lors du retrait du rôle")
      console.error(error)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Gestion des utilisateurs</h1>
        <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
          <DialogTrigger asChild>
            <Button>Ajouter un utilisateur</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Ajouter un utilisateur</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="Email"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  placeholder="Mot de passe"
                />
              </div>
              <Button onClick={handleAddUser} className="w-full">
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {users.length === 0 ? (
        <div className="text-center py-8 text-muted-foreground">
          Aucun utilisateur trouvé
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Email</TableHead>
              <TableHead>Rôles</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.email}>
                <TableCell>{user.email}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {user.roles.map((role) => (
                      <div
                        key={role}
                        className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm flex items-center gap-1"
                      >
                        {role}
                        <button
                          onClick={() => handleRemoveRole(user.email, role)}
                          className="hover:text-destructive"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="outline" size="sm">+</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Assigner un rôle</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          {roles.map((role) => (
                            <Button
                              key={role}
                              variant="outline"
                              className="w-full"
                              onClick={() => handleAssignRole(user.email, role)}
                              disabled={user.roles.includes(role)}
                            >
                              {role}
                            </Button>
                          ))}
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDeleteUser(user.email)}
                  >
                    Supprimer
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  )
} 