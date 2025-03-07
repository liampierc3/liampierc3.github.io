"use client"

import { useEffect, useRef } from "react"

export function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size to match container
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight

      // Set high DPI for sharper text
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.width * dpr
      canvas.height = canvas.height * dpr
      ctx.scale(dpr, dpr)
    }
    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix rain configuration
    const fontSize = 16 // Smaller font size
    const columnWidth = fontSize * 0.8
    const columns = Math.ceil(canvas.width / columnWidth)

    // Only binary characters
    const chars = "01"

    // Initialize drops with random starting positions
    const drops: number[] = Array(columns)
      .fill(0)
      .map(() => Math.random() * -100)

    // Track active columns and their properties
    interface ColumnState {
      active: boolean
      brightness: number
      sequence: string
      speed: number
    }

    const columnStates: ColumnState[] = Array(columns)
      .fill(null)
      .map(() => ({
        active: false,
        brightness: 0,
        sequence: generateSequence(),
        speed: 0.6 + Math.random() * 0.4,
      }))

    // Generate binary sequence
    function generateSequence(): string {
      const length = 15 + Math.floor(Math.random() * 15)
      return Array(length)
        .fill(0)
        .map(() => chars[Math.floor(Math.random() * chars.length)])
        .join("")
    }

    // Animation timing - shortened to 3 seconds total
    const fadeInDuration = 400
    const displayDuration = 2200
    const fadeOutDuration = 400

    let startTime = 0
    let lastTime = 0
    let phase = "fadeIn"
    let globalOpacity = 0

    // Animation
    let frame = 0

    const animate = (time: number) => {
      if (!ctx || !canvas) return

      // Initialize start time
      if (startTime === 0) startTime = time

      // Calculate timing
      const elapsed = time - startTime
      const deltaTime = time - lastTime
      lastTime = time

      // Update phase and opacity
      if (elapsed < fadeInDuration) {
        phase = "fadeIn"
        globalOpacity = Math.min(1, elapsed / fadeInDuration)
      } else if (elapsed < fadeInDuration + displayDuration) {
        phase = "display"
        globalOpacity = 1
      } else if (elapsed < fadeInDuration + displayDuration + fadeOutDuration) {
        phase = "fadeOut"
        const fadeOutElapsed = elapsed - (fadeInDuration + displayDuration)
        globalOpacity = Math.max(0, 1 - fadeOutElapsed / fadeOutDuration)
      } else {
        globalOpacity = 0
        onComplete()
        return
      }

      // Clear canvas with pure black
      ctx.fillStyle = "rgba(0, 0, 0, 1)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set text properties
      ctx.font = `${fontSize}px "Courier New", monospace`
      ctx.textAlign = "center"

      // No shadow/glow effects
      ctx.shadowBlur = 0

      // Activate new columns
      if ((phase === "fadeIn" || phase === "display") && frame % 2 === 0) {
        const inactiveColumns = columnStates.map((state, i) => (state.active ? -1 : i)).filter((i) => i >= 0)

        const numToActivate = Math.min(10, inactiveColumns.length)
        for (let i = 0; i < numToActivate; i++) {
          if (inactiveColumns.length > 0) {
            const idx = Math.floor(Math.random() * inactiveColumns.length)
            const columnIndex = inactiveColumns[idx]
            if (columnIndex !== undefined) {
              columnStates[columnIndex].active = true
              columnStates[columnIndex].brightness = 1
              inactiveColumns.splice(idx, 1)
            }
          }
        }
      }

      // Update and draw columns
      for (let i = 0; i < columns; i++) {
        const state = columnStates[i]
        if (state.active) {
          // Update position
          drops[i] += (deltaTime / 40) * state.speed

          // Draw sequence
          const sequence = state.sequence
          const x = i * columnWidth + columnWidth * 0.5
          const y = drops[i] * fontSize

          for (let j = 0; j < sequence.length; j++) {
            const charY = y - j * fontSize

            if (charY > 0 && charY < canvas.height) {
              // Calculate brightness
              let charBrightness = state.brightness * Math.pow(0.9, j) * globalOpacity

              // First character is always brightest
              if (j === 0) {
                charBrightness = Math.min(1, charBrightness * 1.5)
              }

              // Simple white color with varying opacity
              ctx.fillStyle = `rgba(255, 255, 255, ${charBrightness})`

              // Randomly change characters
              const char = Math.random() < 0.03 ? chars[Math.floor(Math.random() * chars.length)] : sequence[j]
              ctx.fillText(char, x, charY)
            }
          }

          // Update state
          state.brightness = Math.max(0.2, state.brightness * 0.995)

          // Reset column if it's off screen
          if (y - sequence.length * fontSize > canvas.height) {
            if (Math.random() > 0.3 && phase !== "fadeOut") {
              drops[i] = 0
              state.brightness = 1
              state.sequence = generateSequence()
              state.speed = 0.6 + Math.random() * 0.4
            } else {
              state.active = false
            }
          }
        } else if (Math.random() < 0.02 && phase !== "fadeOut") {
          // Activate new columns
          state.active = true
          drops[i] = 0
          state.brightness = 1
          state.sequence = generateSequence()
          state.speed = 0.6 + Math.random() * 0.4
        }
      }

      frame++
      requestAnimationFrame(animate)
    }

    requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [onComplete])

  return (
    <div ref={containerRef} className="fixed inset-0 bg-black z-50">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  )
}

