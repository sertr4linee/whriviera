"use client"

import { useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Icons } from '@/components/icons'
import { cn } from '@/lib/utils'
import { authService } from '@/lib/services/api'
import axios from 'axios'

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {
  type: 'login' | 'register'
}

const formSchema = z.object({
  email: z.string().email({
    message: 'Veuillez entrer une adresse email valide.',
  }),
  password: z.string().min(8, {
    message: 'Le mot de passe doit contenir au moins 8 caractères.',
  }),
})

type FormData = z.infer<typeof formSchema>

export function UserAuthForm({ className, type, ...props }: UserAuthFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = useCallback(async (data: FormData) => {
    setIsLoading(true)
    setError(null)

    try {
      if (type === 'login') {
        await authService.login(data.email, data.password)
      } else {
        await authService.register(data.email, data.password)
      }
      router.push('/dashboard')
    } catch (err) {
      console.log('Error details:', err)
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || 'Une erreur est survenue lors de la connexion')
      } else if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Une erreur inattendue est survenue')
      }
    } finally {
      setIsLoading(false)
    }
  }, [type, router])

  return (
    <div className={cn('grid gap-6', className)} {...props}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-1">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="nom@exemple.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              disabled={isLoading}
              {...register('password')}
            />
            {errors.password && (
              <p className="text-sm text-red-500">{errors.password.message}</p>
            )}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            {type === 'login' ? 'Se connecter' : 'S\'inscrire'}
          </Button>
        </div>
      </form>
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded">
          {error}
        </div>
      )}
    </div>
  )
}

