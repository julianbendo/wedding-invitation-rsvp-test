"use client"

import { useState, useEffect } from "react"
import { AccessGate } from "@/components/access-gate"
// import { Envelope } from "@/components/envelope"
import { InvitationViewer } from "@/components/invitation-viewer"

// Guest list for URL parameter validation
const GUEST_LIST = {
  "elizabeth": "Elizabeth Bozzardi-Jones",
  "elizabeth bozzardi-jones": "Elizabeth Bozzardi-Jones",

  "julian": "Julian Bozzardi",
  "julian bozzardi": "Julian Bozzardi",

  "jessica": "Jessica Lloyd-Jones",
  "jessica lloyd-jones": "Jessica Lloyd-Jones",

  "tim": "Tim Brooker",
  "tim brooker": "Tim Brooker",

  "david": "David Lloyd-Jones",
  "david lloyd-jones": "David Lloyd-Jones",

  "jeanie": "Jeanie Lloyd-Jones",
  "jeanie lloyd-jones": "Jeanie Lloyd-Jones",

  "maya": "Maya Kember",
  "maya kember": "Maya Kember",

  "tanya": "Tanya Ferreira",
  "tanya ferreira": "Tanya Ferreira",

  "paulo": "Paulo Rodrigues",
  "paulo rodrigues": "Paulo Rodrigues",

  "victor": "Victor Ferreira",
  "victor ferreira": "Victor Ferreira",

  "louisa": "Louisa Ferreira",
  "louisa ferreira": "Louisa Ferreira",

  "katie": "Katie Gibbs",
  "katie gibbs": "Katie Gibbs",

  "paul": "Paul Belton",
  "paul belton": "Paul Belton",

  "sienna": "Sienna Gibbs",
  "sienna gibbs": "Sienna Gibbs",

  "emma": "Emma Evans",
  "emma evans": "Emma Evans",

  "shaun": "Shaun Brachman",
  "shaun brachman": "Shaun Brachman",

  "gage": "Gage Pendergast",
  "gage pendergast": "Gage Pendergast",

  "leah": "Leah Fraser",
  "leah fraser": "Leah Fraser",

  "kathleen": "Kathleen Davis",
  "kathleen davis": "Kathleen Davis",

  "sean": "Sean Davis",
  "sean davis": "Sean Davis",

  "sophie": "Sophie Weiss",
  "sophie weiss": "Sophie Weiss",

  "rebecca": "Rebecca Ross",
  "rebecca ross": "Rebecca Ross",

  "raymond": "Raymond Agholor",
  "raymond agholor": "Raymond Agholor",

  "hayley": "Hayley Anne-Buck",
  "hayley anne-buck": "Hayley Anne-Buck",

  "mark": "Mark Rouse",
  "mark rouse": "Mark Rouse",

  "alaaeldeen": "Alaaeldeen Ali",
  "alaaeldeen ali": "Alaaeldeen Ali",

  "clarisse": "Clarisse Tenchavez-Ali",
  "clarisse tenchavez-ali": "Clarisse Tenchavez-Ali",

  "lawrence": "Lawrence Cooper",
  "lawrence cooper": "Lawrence Cooper",

  "paris": "Paris Adams",
  "paris adams": "Paris Adams",

  "giorgio": "Giorgio Santaniello",
  "giorgio santaniello": "Giorgio Santaniello",

  "hiromi": "Hiromi Santaniello",
  "hiromi santaniello": "Hiromi Santaniello",

  "niccolo": "Niccolo D`Antoni",
  "niccolo d`antoni": "Niccolo D`Antoni",

  "chiara": "Chiara Rossi",
  "chiara rossi": "Chiara Rossi",

  "adrian": "Adrian Bozzardi",
  "adrian bozzardi": "Adrian Bozzardi",

  "luc": "Luc Valet",
  "luc valet": "Luc Valet",

  "charlotte": "Charlotte Chauvet",
  "charlotte chauvet": "Charlotte Chauvet",

  "arnold": "Arnold Muller",
  "arnold muller": "Arnold Muller",

  "steven": "Steven Ferreira",
  "steven ferreira": "Steven Ferreira",

  "gemma": "Gemma Gilbert",
  "gemma gilbert": "Gemma Gilbert",

  "edson": "Edson",
  "pat": "Pat Lowrey",
  "pat lowrey": "Pat Lowrey",

  "debbie": "Debbie Lowrey",
  "debbie lowrey": "Debbie Lowrey",

  "emma lowrey": "Emma Lowrey",

  "patrick": "Patrick Lowrey",
  "patrick lowrey": "Patrick Lowrey",

  "alison": "Alison Smith",
  "alison smith": "Alison Smith",

  "caryl": "Caryl Lowrey",
  "caryl lowrey": "Caryl Lowrey",

  "ciara": "Ciara Lowrey",
  "ciara lowrey": "Ciara Lowrey",

  "freddie": "Freddie Ashdown",
  "freddie ashdown": "Freddie Ashdown",

  "bernie": "Bernie Richards",
  "bernie richards": "Bernie Richards",

  "ashley": "Ashley Richards",
  "ashley richards": "Ashley Richards",

  "melissa": "Melissa Hart",
  "melissa hart": "Melissa Hart",

  "james": "James Hart",
  "james hart": "James Hart",

  "elayne": "Elayne Feerick",
  "elayne feerick": "Elayne Feerick",

  "ronnie": "Ronnie Feerick",
  "ronnie feerick": "Ronnie Feerick",

  "dj": "DJ Feerick",
  "dj feerick": "DJ Feerick",

  "alanna": "Alanna Feerick",
  "alanna feerick": "Alanna Feerick",

  "allison": "Allison Crome",
  "allison crome": "Allison Crome",

  "sophie boarer": "Sophie Boarer",
  "dan": "Dan Boarer",
  "dan boarer": "Dan Boarer",

  "luna": "Luna Karimine Bozzardi-Jones",
  "luna karimine bozzardi-jones": "Luna Karimine Bozzardi-Jones",

  "emily": "Emily Ferreira Rodrigues",
  "emily ferreira rodrigues": "Emily Ferreira Rodrigues",

  "aiden": "Aiden Ferreira Rodrigues",
  "aiden ferreira rodrigues": "Aiden Ferreira Rodrigues",

  "alex": "Alex Ferreira Rodrigues",
  "alex ferreira rodrigues": "Alex Ferreira Rodrigues",

  "ryan": "Ryan Ferreira Rodrigues",
  "ryan ferreira rodrigues": "Ryan Ferreira Rodrigues",

  "zakaria": "Zakaria Tenchavez-Ali",
  "zakaria tenchavez-ali": "Zakaria Tenchavez-Ali",

  "noah": "Noah Ross",
  "noah ross": "Noah Ross",

  "luena": "Luena Lurdes",
  "luena lurdes": "Luena Lurdes",

  "luiza": "Luiza Lurdes",
  "luiza lurdes": "Luiza Lurdes",

  "maria": "Maria Lurdes",
  "maria lurdes": "Maria Lurdes",

  "luzia": "Luzia Lurdes",
  "luzia lurdes": "Luzia Lurdes",

  "fae": "Fae Crome",
  "fae crome": "Fae Crome",

  "amelie": "Amelie Boarer",
  "amelie boarer": "Amelie Boarer",

  "penny": "Penny Boarer",
  "penny boarer": "Penny Boarer",

  "keeley": "Keeley Hart",
  "keeley hart": "Keeley Hart",

}

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
