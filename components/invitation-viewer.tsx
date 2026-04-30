"use client"

import { useEffect, useRef } from "react"

interface InvitationViewerProps {
  guestName?: string
}

export function InvitationViewer({ guestName }: InvitationViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Dynamically import model-viewer for client-side only
    import("@google/model-viewer")
  }, [])

  return (
    <div 
      ref={containerRef}
      className="w-full h-full flex flex-col items-center justify-center animate-fade-in-up px-2 sm:px-4"
    >
      {guestName && (
        <div className="mb-3 sm:mb-4 text-center">
          <p className="text-gold/60 text-xs sm:text-sm tracking-[0.3em] uppercase mb-1">
            Dear
          </p>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-light text-gold tracking-wide">
            {guestName}
          </h2>
        </div>
      )}
      
      {/* Ambient light glow behind the card */}
      <div className="relative w-full flex items-center justify-center">
        {/* Glow effect */}
        <div className="absolute w-[200px] sm:w-[280px] md:w-[320px] h-[400px] sm:h-[560px] md:h-[640px] bg-gold/10 rounded-full blur-[80px] animate-glow-pulse pointer-events-none" />
        
        {/* Model viewer container - aspect ratio 10.2:23.5 (approximately 1:2.3) */}
        <div 
          className="w-screen h-[520px] sm:h-[680px] md:h-[780px] lg:h-[860px]"

        >
          {/* Spotlight effects for metallic shine */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-64 h-64 bg-white/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/4 -left-16 w-32 h-32 bg-amber-300/15 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute top-1/4 -right-16 w-32 h-32 bg-amber-300/15 rounded-full blur-2xl pointer-events-none" />
          
          {/* @ts-expect-error - model-viewer is a web component */}
          <model-viewer
            src="/invitation.glb"
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
            exposure="0.9"
            shadow-intensity="0.5"
            environment-image="neutral"
            tone-mapping="commerce"
            style={{
              width: "100%",
              height: "100%",
              backgroundColor: "transparent",
              "--poster-color": "transparent",
            } as React.CSSProperties}
            ref={(el: any) => {
              if (el) {
                // Hide all default model-viewer UI via shadow DOM
                const style = document.createElement("style")
                style.textContent = `
                  :host > * { pointer-events: auto; }
                  #default-ar-button,
                  #default-progress-bar,
                  .slot.default,
                  [slot="ar-button"],
                  .fab,
                  .progress-bar,
                  .update-bar { display: none !important; }
                `
                el.shadowRoot?.appendChild(style)
              }
            }}
          >
            <div 
              slot="poster"
              className="w-full h-full flex items-center justify-center"
            >
              <div className="text-center">
                <div className="w-6 h-6 sm:w-8 sm:h-8 border-2 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-3" />
                <p className="text-gold/60 text-xs tracking-[0.2em]">
                  Loading...
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
      </div>
    </div>
  )
}
