"use client"

import { useEffect, useRef, useState } from "react"

interface InvitationViewerProps {
  guestName?: string
}

export function InvitationViewer({ guestName }: InvitationViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
const modelRef = useRef<any>(null)
const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
  async function loadModelViewer() {
    await import("@google/model-viewer")

    const model = modelRef.current

    if (!model) return

    if (model.shadowRoot?.querySelector("#custom-style")) return

    const style = document.createElement("style")
    style.id = "custom-style"

    style.textContent = `
      #default-ar-button,
      #default-progress-bar,
      .slot.default,
      [slot="ar-button"],
      .fab,
      .progress-bar,
      .update-bar {
        display:none !important;
      }
    `

    model.shadowRoot?.appendChild(style)
  }

  loadModelViewer()
}, [])

useEffect(() => {

  const model = modelRef.current

  if (!model) return

  const handleMove = () => {

    const orbit = model.getCameraOrbit()

    const x = Math.sin(
      orbit.theta
    ) * 35

    const y = Math.cos(
      orbit.phi
    ) * 20


    if (glowRef.current) {

      glowRef.current.style.transform =
        `translate(${x}px, ${y}px)`

    }

  }

  model.addEventListener(
    "camera-change",
    handleMove
  )


  return () => {
    model.removeEventListener(
      "camera-change",
      handleMove
    )
  }

}, [])

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center animate-fade-in-up px-2 sm:px-4"
    >
      {guestName && (
        <div className="mb-3 sm:mb-4 text-center">
          <p className="text-gold/60 text-[10px] sm:text-sm tracking-[0.3em] uppercase mb-1">
            Dear
          </p>
          <h2 className="text-lg sm:text-2xl md:text-3xl font-light text-gold tracking-wide">
            {guestName}
          </h2>
        </div>
      )}
      
      {/* Ambient light glow behind the card */}
      <div className="relative w-full flex items-center justify-center">
        {/* Glow effect */}
        <div
  ref={glowRef}
  className="
    absolute
    w-[200px]
    sm:w-[280px]
    md:w-[320px]
    h-[400px]
    sm:h-[560px]
    md:h-[640px]
    bg-gold/10
    rounded-full
    blur-[80px]
    animate-glow-pulse
    pointer-events-none
    transition-transform
    duration-500
  "
/>
        
        {/* Model viewer container - aspect ratio 10.2:23.5 (approximately 1:2.3) */}
        <div 
          className="
w-full
max-w-[420px]
h-[52vh]
sm:h-[70vh]
md:h-[80vh]
"
        >
          {/* Spotlight effects for metallic shine */}
          <div
  className="
    absolute
    -top-40
    left-1/2
    -translate-x-1/2
    w-[420px]
    h-[220px]
    bg-white/10
    rounded-full
    blur-[120px]
    pointer-events-none
  "
/>

          {/* @ts-expect-error - model-viewer is a web component */}
          <model-viewer
          
            loading="eager"
            src="/invitation.glb"
            onLoad={() => alert("MODEL LOADED")}
            onError={() => alert("MODEL FAILED")}
            alt="Wedding Invitation Card"
            camera-controls
            interaction-prompt="none"
            camera-orbit="0deg 90deg 6m"
            min-camera-orbit="-Infinity -180deg auto"
            max-camera-orbit="Infinity 180deg auto"
            orbit-sensitivity="0.85"
            min-field-of-view="10deg"
            max-field-of-view="50deg"
            field-of-view="45deg"
            exposure="1"
            shadow-intensity="0"
            environment-image="glasshouse_interior_1k.hdr"
            tone-mapping="neutral"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              "--poster-color": "transparent",
            } as React.CSSProperties}
            ref={modelRef}
          >
            <div 
              slot="poster"
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gold/60 text-xs tracking-[0.2em]">
                  Preparing your invitation...
                </p>
              </div>
            </div>
          </model-viewer>
        </div>
      </div>

      <div className="mt-4 sm:mt-6 text-center">
        <p className="text-gold/40 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.2em]">
          Swipe to rotate the invitation
        </p>
        <a
  href={`/rsvp?guest=${encodeURIComponent(guestName || "")}`}
  className="mt-4 inline-flex items-center justify-center px-6 py-2.5 border border-gold/40 text-gold tracking-[0.18em] uppercase text-[11px] hover:bg-gold hover:text-background transition-all duration-300"
>
  RSVP
</a>
      </div>
    </div>
  )
}
