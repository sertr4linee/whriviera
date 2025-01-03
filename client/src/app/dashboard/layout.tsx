'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authService } from "@/lib/services/api"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Vérifier si l'utilisateur est authentifié
    if (!authService.isAuthenticated()) {
      router.push('/login')
      return
    }
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  // Si l'utilisateur n'est pas authentifié, ne rien afficher pendant la redirection
  if (!authService.isAuthenticated()) {
    return null
  }

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-gray-800 text-white p-6">
        <h1 className="text-2xl font-bold mb-8">Dashboard</h1>
        <nav className="space-y-4">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={() => router.push('/dashboard/users')}
          >
            Utilisateurs
          </Button>
          <Button
            variant="ghost"
            className="w-full justify-start text-red-400 hover:text-red-500 hover:bg-red-950/10"
            onClick={handleLogout}
          >
            Déconnexion
          </Button>
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8 overflow-auto">
        {children}
      </div>
    </div>
  )
} 