'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, UserCog, Activity, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

export default function DashboardPage() {
  const stats = [
    {
      title: "Utilisateurs totaux",
      value: "2",
      description: "Utilisateurs enregistrés",
      icon: Users,
      trend: "+12% ce mois"
    },
    {
      title: "Rôles actifs",
      value: "2",
      description: "Rôles système et personnalisés",
      icon: UserCog,
      trend: "+1 ce mois"
    },
    {
      title: "Activité",
      value: "100%",
      description: "Taux d'engagement",
      icon: Activity,
      trend: "+6% ce mois"
    },
    {
      title: "Sessions",
      value: "2",
      description: "Sessions cette semaine",
      icon: Calendar,
      trend: "+8% cette semaine"
    }
  ]

  const userActivityData = [
    { name: 'Lun', value: 12 },
    { name: 'Mar', value: 19 },
    { name: 'Mer', value: 15 },
    { name: 'Jeu', value: 22 },
    { name: 'Ven', value: 28 },
    { name: 'Sam', value: 24 },
    { name: 'Dim', value: 21 },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1 }
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6"
    >
      <motion.div variants={item}>
        <h1 className="text-3xl font-bold tracking-tight">Tableau de bord</h1>
        <p className="text-muted-foreground mt-2">
          Bienvenue dans l&apos;interface d&apos;administration de Welkom Home.
        </p>
      </motion.div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            variants={item}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Card className="transition-shadow hover:shadow-lg">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {stat.title}
                </CardTitle>
                <motion.div
                  initial={{ rotate: -30, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  transition={{ delay: 0.2 + index * 0.1 }}
                >
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </motion.div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-1">
                  {stat.description}
                </p>
                <motion.p 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  className="text-xs text-green-500 mt-1"
                >
                  {stat.trend}
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>Activité des utilisateurs</CardTitle>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={userActivityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke="#2563eb" 
                    strokeWidth={2}
                    dot={{ fill: '#2563eb' }}
                    activeDot={{ r: 8 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div variants={item}>
          <Card>
            <CardHeader>
              <CardTitle>État du système</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Base de données", status: "Connectée et opérationnelle" },
                  { name: "API", status: "Tous les services actifs" },
                  { name: "Sécurité", status: "Authentification active" }
                ].map((service, index) => (
                  <motion.div
                    key={service.name}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <div className="space-y-1">
                      <p className="text-sm font-medium">{service.name}</p>
                      <p className="text-xs text-muted-foreground">{service.status}</p>
                    </div>
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="h-2 w-2 rounded-full bg-green-500"
                    />
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  )
} 