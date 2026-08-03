import React from "react"

declare global {
  namespace JSX {
    interface IntrinsicElements {
      "model-viewer": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement> & {
          src?: string
          alt?: string
          "camera-controls"?: boolean | string
          "camera-orbit"?: string
          "min-camera-orbit"?: string
          "max-camera-orbit"?: string
          "field-of-view"?: string
          "min-field-of-view"?: string
          "max-field-of-view"?: string
          exposure?: string
          "shadow-intensity"?: string
          "environment-image"?: string
          "tone-mapping"?: string
          "interaction-prompt"?: string
        },
        HTMLElement
      >
    }
  }
}

export {}