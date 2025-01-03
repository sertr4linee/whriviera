'use client'

import { useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { authService } from "@/lib/services/api"
import { Users, UserCog, LayoutDashboard, LogOut, Home } from "lucide-react"
import { motion } from "framer-motion"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (!authService.isAuthenticated()) {
      router.push('/login')
      return
    }
  }, [router])

  const handleLogout = () => {
    authService.logout()
    router.push('/login')
  }

  if (!authService.isAuthenticated()) {
    return null
  }

  const isActive = (path: string) => pathname === path

  const navItems = [
    {
      label: "Tableau de bord",
      icon: LayoutDashboard,
      href: "/dashboard",
    },
    {
      label: "Utilisateurs",
      icon: Users,
      href: "/dashboard/users",
    },
    {
      label: "Rôles",
      icon: UserCog,
      href: "/dashboard/users/roles",
    },
  ]

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700"
      >
        <div className="flex flex-col h-full">
          <motion.div 
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="p-6 border-b border-gray-200 dark:border-gray-700"
          >
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Welkom Home</h1>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Administration</p>
          </motion.div>
          
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <Button
                  variant={isActive(item.href) ? "secondary" : "ghost"}
                  className={`w-full justify-start transition-all duration-200 ${
                    isActive(item.href)
                      ? "bg-gray-100 dark:bg-gray-700"
                      : "hover:bg-gray-100 dark:hover:bg-gray-700"
                  }`}
                  onClick={() => router.push(item.href)}
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.label}
                </Button>
              </motion.div>
            ))}
          </nav>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="p-4 space-y-2 border-t border-gray-200 dark:border-gray-700"
          >
            <Button
              variant="ghost"
              className="w-full justify-start text-blue-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/10 transition-colors duration-200"
              onClick={() => router.push('/')}
            >
              <Home className="mr-2 h-4 w-4" />
              Retour à l&apos;accueil
            </Button>
            <Button
              variant="ghost"
              className="w-full justify-start text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-950/10 transition-colors duration-200"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Déconnexion
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main content */}
      <div className="flex-1">
        <motion.header 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="h-16 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800"
        >
          <div className="h-full px-8 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {navItems.find(item => isActive(item.href))?.label || "Dashboard"}
            </h2>
          </div>
        </motion.header>
        
        <motion.main 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="p-8"
        >
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-lg shadow p-6"
          >
            {children}
          </motion.div>
        </motion.main>
      </div>
    </div>
  )
} 