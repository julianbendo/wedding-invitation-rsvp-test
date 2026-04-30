"use client"

import { useState, useEffect } from "react"
import { AccessGate } from "@/components/access-gate"
// import { Envelope } from "@/components/envelope"
import { InvitationViewer } from "@/components/invitation-viewer"

// Guest list for URL parameter validation
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
]

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
}

function findGuest(name: string): string | null {
  const normalizedInput = normalizeName(name)
  return GUEST_LIST.find(guest => normalizeName(guest) === normalizedInput) || null
}

type Stage = "gate" | "invitation"

export default function InvitationPage() {
  const [stage, setStage] = useState<Stage>("gate")
  const [guestName, setGuestName] = useState("")
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Check for access token in URL (optional secret link feature)
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const token = params.get("invite")
    const name = params.get("name")
    
    // If valid invite token and valid guest name, skip the gate
    if (token && name) {
      const matchedGuest = findGuest(decodeURIComponent(name))
      if (matchedGuest) {
        setGuestName(matchedGuest)
      }
    } else if (token) {
      // Token without name - still go to envelope but show gate for name entry
      // This allows sharing a generic link
    }
  }, [])

  const handleEnterGate = (name: string) => {
    setGuestName(name)
    setIsTransitioning(true)
    setTimeout(() => {
      setStage("invitation") 
      setIsTransitioning(false)
    }, 600)
  }

  return (
    <main className="min-h-screen bg-background overflow-hidden">
      {/* Ambient light spots */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Top center spotlight */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />
        {/* Bottom left warm glow */}
        <div className="absolute bottom-0 left-0 -translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px]" />
        {/* Bottom right warm glow */}
        <div className="absolute bottom-0 right-0 translate-x-1/3 translate-y-1/3 w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px]" />
        {/* Center ambient */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/3 rounded-full blur-[120px]" />
      </div>

      {/* Subtle particle/star effect */}
      <div className="fixed inset-0 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-0.5 h-0.5 bg-gold/30 rounded-full"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `sparkle ${2 + Math.random() * 3}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div 
        className={`relative z-10 transition-opacity duration-500 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {stage === "gate" && (
          <AccessGate onEnter={handleEnterGate} />
        )}

        {stage === "invitation" && (
          <div className="min-h-screen flex items-center justify-center p-2 sm:p-4 md:p-6 py-6 sm:py-8">
            <InvitationViewer guestName={guestName} />
          </div>
        )}
      </div>
    </main>
  )
}
