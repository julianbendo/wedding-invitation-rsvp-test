"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"

function RSVPContent() {

  const searchParams = useSearchParams()

  const guestName =
    decodeURIComponent(searchParams.get("guest") || "Guest")


  const [sent, setSent] = useState(false)

  const [form, setForm] = useState({
    guestName,
    attendance: "",
    dietary: "",
    song: "",
    artist: "",
  })

  async function submitRSVP(e: React.FormEvent) {
    e.preventDefault()

const response = await fetch("/api/rsvp", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(form),
})

if (!response.ok) {
  alert("Something went wrong. Please try again.")
  return
}

setSent(true)
  }


if (sent) {
 return (
 <main className="min-h-screen bg-background flex items-center justify-center p-6 text-center">

 <div>

 <h1 className="text-5xl text-gold mb-8">
 Thank you {guestName}
 </h1>


 {form.attendance === "yes" ? (
 <p className="text-white/70 text-xl">
 We can't wait to celebrate with you!
 </p>
 ) : (
             <p className="text-white/70 text-xl">

              It won't be the same without you but we understand
              and know you'll be there in spirit.
            </p>
          )}

        </div>
      </main>
    )
  }


  return (
<main className="min-h-screen bg-background overflow-hidden relative flex justify-center p-6">


<div className="fixed inset-0 pointer-events-none">

  <div className="absolute top-0 left-1/2 -translate-x-1/2 
  w-[600px] h-[400px] bg-gold/5 rounded-full blur-[100px]" />


  <div className="absolute bottom-0 left-0 
  w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px]" />


  <div className="absolute bottom-0 right-0 
  w-[400px] h-[400px] bg-gold/5 rounded-full blur-[80px]" />

</div>

      <form
 onSubmit={submitRSVP}
 className="relative z-10 max-w-lg w-full space-y-12 py-12"
>

<div className="text-center space-y-3">

  <p className="text-gold/60 tracking-[0.3em] uppercase text-xs">
    Welcome
  </p>

  <h1 className="text-5xl text-gold font-light">
    {guestName}
  </h1>

  <p className="text-white/60">
    We would love to celebrate with you
  </p>

</div>


        {/* YES BUTTON */}

        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              attendance:"yes"
            })
          }
          className={`w-full p-4 border transition-all duration-300 ${
            form.attendance==="yes"
            ? "bg-gold text-black scale-105 shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            : "border-gold text-gold"
          }`}
        >
          Can't wait! Count me in!
        </button>



        {form.attendance==="yes" && (

          <div className="space-y-6">

            <p className="text-center text-gold text-lg">
              We'll provide the food, please bring your own bottle!
            </p>


            <textarea
              className="w-full p-3 bg-card border border-gold/30"
              placeholder="Dietary requests"
              value={form.dietary}
              onChange={(e)=>
                setForm({
                  ...form,
                  dietary:e.target.value
                })
              }
            />


            <div>

              <p className="text-gold mb-3">
                I will dance to this song if you play it:
              </p>


              <input
                className="w-full p-3 mb-3 border border-gold/30"
                placeholder="Song"
                value={form.song}
                onChange={(e)=>
                  setForm({
                    ...form,
                    song:e.target.value
                  })
                }
              />


              <input
                className="w-full p-3 border border-gold/30"
                placeholder="Artist"
                value={form.artist}
                onChange={(e)=>
                  setForm({
                    ...form,
                    artist:e.target.value
                  })
                }
              />

            </div>


          </div>

        )}



        {/* NO BUTTON */}

        <button
          type="button"
          onClick={() =>
            setForm({
              ...form,
              attendance:"no"
            })
          }
          className={`w-full p-4 border transition-all duration-300 ${
            form.attendance==="no"
            ? "bg-gold text-black scale-105 shadow-[0_0_30px_rgba(212,175,55,0.5)]"
            : "border-gold text-gold"
          }`}
        >
          Sadly, can't make it
        </button>



        {form.attendance==="no" && (

          <p className="text-center text-lg">
            It won't be the same without you but we understand
            and know you'll be there in spirit.
          </p>

        )}



        <button
          type="submit"
          className="w-full p-4 bg-gold text-black"
        >
          Send RSVP
        </button>


      </form>

    </main>
  )
}
export default function RSVPPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-background flex items-center justify-center">
          <p className="text-gold">Loading RSVP...</p>
        </main>
      }
    >
      <RSVPContent />
    </Suspense>
  )
}