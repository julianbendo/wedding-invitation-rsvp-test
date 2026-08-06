"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"

// Guest list - only these names are allowed access
const GUEST_LIST = [
  "elizabeth",
  "Elizabeth Bozzardi-Jones",

  "julian",
  "Julian Bozzardi",

  "jessica",
  "Jessica Lloyd-Jones",

  "tim",
  "Tim Brooker",

  "david",
  "David Lloyd-Jones",

  "jeanie",
  "Jeanie Lloyd-Jones",

  "maya",
  "Maya Kember",

  "tanya",
  "Tanya Ferreira",

  "paulo",
  "Paulo Rodrigues",

  "victor",
  "Victor Ferreira",

  "louisa",
  "Louisa Ferreira",

  "katie",
  "Katie Gibbs",

  "paul",
  "Paul Belton",

  "sienna",
  "Sienna Gibbs",

  "emma",
  "Emma Evans",

  "emma lowrey",
  "Emma Lowrey",

  "shaun",
  "Shaun Brachman",

  "gage",
  "Gage Pendergast",

  "leah",
  "Leah Fraser",

  "kathleen",
  "Kathleen Davis",

  "sean",
  "Sean Davis",

  "sophie",
  "Sophie Weiss",

  "rebecca",
  "Rebecca Ross",

  "raymond",
  "Raymond Agholor",

  "hayley",
  "Hayley Anne-Buck",

  "mark",
  "Mark Rouse",

  "alaaeldeen",
  "Alaaeldeen Ali",

  "clarisse",
  "Clarisse Tenchavez-Ali",

  "lawrence",
  "Lawrence Cooper",

  "paris",
  "Paris Adams",

  "giorgio",
  "Giorgio Santaniello",

  "hiromi",
  "Hiromi Santaniello",

  "niccolo",
  "Niccolo D`Antoni",

  "chiara",
  "Chiara Rossi",

  "adrian",
  "Adrian Bozzardi",

  "luc",
  "Luc Valet",

  "charlotte",
  "Charlotte Chauvet",

  "arnold",
  "Arnold Muller",

  "steven",
  "Steven Ferreira",

  "gemma",
  "Gemma Gilbert",

  "edson",
  "Edson",

  "pat",
  "Pat Lowrey",

  "debbie",
  "Debbie Lowrey",

  "patrick",
  "Patrick Lowrey",

  "alison",
  "Alison Smith",

  "steve",
  "Steve Davies",

  "caryl",
  "Caryl Lowrey",

  "ciara",
  "Ciara Lowrey",

  "freddie",
  "Freddie Ashdown",

  "bernie",
  "Bernie Richards",

  "ashley",
  "Ashley Richards",

  "melissa",
  "Melissa Hart",

  "james",
  "James Hart",

  "elayne",
  "Elayne Feerick",

  "ronnie",
  "Ronnie Feerick",

  "dj",
  "DJ Feerick",

  "alanna",
  "Alanna Feerick",

  "allison",
  "Allison Crome",

  "sophie boarer",
  "Sophie Boarer",

  "dan",
  "Dan Boarer",

  "luna",
  "Luna Karimine Bozzardi-Jones",

  "emily",
  "Emily Ferreira Rodrigues",

  "aiden",
  "Aiden Ferreira Rodrigues",

  "alex",
  "Alex Ferreira Rodrigues",

  "ryan",
  "Ryan Ferreira Rodrigues",

  "zakaria",
  "Zakaria Tenchavez-Ali",

  "noah",
  "Noah Ross",

  "luena",
  "Luena Lurdes",

  "luiza",
  "Luiza Lurdes",

  "maria",
  "Maria Lurdes",

  "luzia",
  "Luzia Lurdes",

  "fae",
  "Fae Crome",

  "amelie",
  "Amelie Boarer",

  "penny",
  "Penny Boarer",

  "keeley",
  "Keeley Hart",
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
  
  const [error, setError] = useState("")

const handleSubmit = (e: React.FormEvent) => {

  e.preventDefault()


  setError("")

  const trimmedName = name.trim()

  if (!trimmedName) {
    return
  }

  if (isGuestAllowed(trimmedName)) {

    const formattedName = trimmedName
      .toLowerCase()
      .split(" ")
      .map(word =>
        word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" ")


onEnter(formattedName)

  } else {

    setError(
      "We couldn't find your name on the guest list. Please check the spelling or contact the hosts."
    )

  }
}

  return (
    <div 
      className="
min-h-screen 
flex 
flex-col 
items-center 
justify-center 
p-4 
sm:p-6
"
    >
      {/* Decorative top flourish */}
      <div className="mb-8 sm:mb-12 text-gold/30 pointer-events-none">
        <svg width="100" height="20" viewBox="0 0 120 24" fill="none" className="mx-auto w-20 sm:w-28">
          <path 
            d="M0 12h50M70 12h50M55 4c-5 0-5 8-5 8s0 8 5 8M65 4c5 0 5 8 5 8s0 8-5 8" 
            stroke="currentColor" 
            strokeWidth="1"
          />
        </svg>
      </div>

      <div className="text-center mb-8 sm:mb-10 animate-fade-in-up px-4 pointer-events-none">
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
            />
            {error && (
              <p className="mt-3 text-red-400/80 text-xs sm:text-sm leading-relaxed">
                {error}
              </p>
            )}
          </div>

          <button
  type="submit"
  className={`w-full py-5 sm:py-6 text-sm sm:text-base tracking-[0.15em] sm:tracking-[0.2em] uppercase text-primary-foreground transition-all duration-300 font-medium ${
    name.trim()
      ? "bg-gold hover:bg-gold-light"
      : "bg-gold/40 cursor-not-allowed"
  }`}
>
  View Invitation
</button>
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
