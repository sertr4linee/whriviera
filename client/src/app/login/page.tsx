'use client'

import Image from "next/image"
import Link from "next/link"
import { UserAuthForm } from "@/components/userauthform"


export default function AuthenticationPage() {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="relative hidden lg:flex flex-col bg-zinc-900 text-white">
        <div className="absolute inset-0">
          <Image
            src="/backgroundAbout.png"
            alt="Background"
            fill
            className="object-cover opacity-20"
          />
        </div>
        <div className="relative z-20 flex flex-col h-full p-10">
          <div className="flex items-center text-lg font-medium">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
            Welkom Home
          </div>
          <div className="mt-auto">
            <blockquote className="space-y-2">
              <p className="text-lg">
                &ldquo;Une expérience de luxe dans le Golfe de Saint-Tropez.&rdquo;
              </p>
              <footer className="text-sm">L&apos;équipe Welkom Home</footer>
            </blockquote>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              Se connecter
            </h1>
            <p className="text-sm text-muted-foreground">
              Entrez votre email pour vous connecter
            </p>
          </div>
          <UserAuthForm type="login" />
          <p className="px-8 text-center text-sm text-muted-foreground">
            En continuant, vous acceptez nos{" "}
            <Link
              href="/terms"
              className="underline underline-offset-4 hover:text-primary"
            >
              Conditions d&apos;utilisation
            </Link>{" "}
            et notre{" "}
            <Link
              href="/privacy"
              className="underline underline-offset-4 hover:text-primary"
            >
              Politique de confidentialité
            </Link>
            .
          </p>
        </div>
      </div>
    </div>
  )
}

