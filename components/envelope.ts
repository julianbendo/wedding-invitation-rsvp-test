"use client"

import { useState } from "react"

export function Envelope({ onOpen }: { onOpen?: () => void }) {
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    setOpen(true)
    onOpen?.()
  }

  return (
    <div
      onClick={handleClick}
      style={{
        width: 200,
        height: 120,
        background: "#f5d0d0",
        borderRadius: 10,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
    >
      {open ? "Opened ✉️" : "Click to open"}
    </div>
  )
}