declare namespace JSX {
  interface IntrinsicElements {
    "model-viewer": React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement> & {
        src?: string
        alt?: string
        "auto-rotate"?: boolean | string
        "camera-controls"?: boolean | string
        "touch-action"?: string
        exposure?: string
        "shadow-intensity"?: string
        "environment-image"?: string
        poster?: string
        loading?: "auto" | "lazy" | "eager"
        reveal?: "auto" | "interaction" | "manual"
        "ar"?: boolean | string
        "ar-modes"?: string
        "ar-scale"?: string
        "camera-orbit"?: string
        "min-camera-orbit"?: string
        "max-camera-orbit"?: string
        "field-of-view"?: string
        "min-field-of-view"?: string
        "max-field-of-view"?: string
        "interpolation-decay"?: string
        "skybox-image"?: string
        "animation-name"?: string
        "animation-crossfade-duration"?: string
        autoplay?: boolean | string
      },
      HTMLElement
    >
  }
}
