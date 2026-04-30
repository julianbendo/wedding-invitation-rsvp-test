"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

// Guest list - only these names are allowed access
const GUEST_LIST = [
  "Elizabeth",
  "Luna",
  "Emma",
  "Shaun",
  "Antonio",
  "Catherine",
  "Adrian",
  "Julian",
  "Emanuele",
  "Niccolò",
  "Chiara",
  "Giorgio",
  "Hiromi",
  "Silvia",
  "Maya",
  "Susan",
  "Sophie",
  "Christian",
]

// Normalize name for comparison (lowercase, trim, handle accents)
function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove diacritics
}

function isGuestAllowed(name: string): boolean {
  const normalizedInput = normalizeName(name)
  return GUEST_LIST.some(guest => normalizeName(guest) === normalizedInput)
}

interface AccessGateProps {
  onEnter: (name: string) => void
}

export function AccessGate({ onEnter }: AccessGateProps) {
  const [name, setName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    
    if (name.trim()) {
      if (isGuestAllowed(name.trim())) {
        setIsSubmitting(true)
        setTimeout(() => {
          // Find the correctly capitalized name from guest list
          const matchedGuest = GUEST_LIST.find(
            guest => normalizeName(guest) === normalizeName(name.trim())
          )
          onEnter(matchedGuest || name.trim())
        }, 500)
      } else {
        setError("We couldn't find your name on the guest list. Please check the spelling or contact the hosts.")
      }
    }
  }

  return (
    <div 
      className={`min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 transition-opacity duration-500 ${
        isSubmitting ? "opacity-0" : "opacity-100"
      }`}
    >
      {/* Decorative top flourish */}
      <div className="mb-8 sm:mb-12 text-gold/30">
        <svg width="100" height="20" viewBox="0 0 120 24" fill="none" className="mx-auto w-20 sm:w-28">
          <path 
            d="M0 12h50M70 12h50M55 4c-5 0-5 8-5 8s0 8 5 8M65 4c5 0 5 8 5 8s0 8-5 8" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="text-center mb-8 sm:mb-10 animate-fade-in-up px-4">
        <p className="text-gold/50 text-xs sm:text-sm tracking-[0.25em] sm:tracking-[0.3em] uppercase mb-3 sm:mb-4">
          You have received
        </p>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-light tracking-wide text-foreground mb-2">
          A Special Invitation
        </h1>
        <div className="w-16 sm:w-24 h-px bg-gold/30 mx-auto mt-4 sm:mt-6" />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className="w-full max-w-xs sm:max-w-sm animate-fade-in-up px-4"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="space-y-4 sm:space-y-6">
          <div className="text-center">
            <label 
              htmlFor="guest-name" 
              className="text-gold/50 text-xs sm:text-sm tracking-[0.15em] sm:tracking-[0.2em] uppercase block mb-3 sm:mb-4"
            >
              Please enter your name
            </label>
            <Input
              id="guest-name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                setError("")
              }}
              placeholder="Your name"
              className={`text-center text-base sm:text-lg py-5 sm:py-6 bg-card border-border focus:border-gold focus:ring-gold/20 placeholder:text-muted-foreground/30 text-foreground ${
                error ? "border-red-500/50" : ""
              }`}
              autoComplete="name"
              autoFocus
            />
            {error && (
              <p className="mt-3 text-red-400/80 text-xs sm:text-sm leading-relaxed">
                {error}
              </p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full py-5 sm:py-6 text-sm sm:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase bg-gold hover:bg-gold-light text-primary-foreground transition-all duration-300 font-medium"
            disabled={!name.trim()}
          >
            View Invitation
          </Button>
        </div>
      </form>

      {/* Decorative bottom flourish */}
      <div className="mt-12 sm:mt-16 text-gold/30">
        <svg width="60" height="16" viewBox="0 0 80 20" fill="none" className="mx-auto w-14 sm:w-20">
          <path 
            d="M0 10h30M50 10h30M35 2c-5 0-5 8-5 8s0 6 5 6M45 2c5 0 5 8 5 8s0 6-5 6" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  )
}
