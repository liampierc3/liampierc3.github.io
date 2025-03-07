"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { MatrixRain } from "./matrix-rain"

export function LoadingScreen({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true)
  const [showContent, setShowContent] = useState(false)

  // Preload content
  useEffect(() => {
    // Force content to be ready but hidden
    setShowContent(true)
  }, [])

  const handleComplete = () => {
    // Use a slight delay to ensure smooth transition
    setTimeout(() => {
      setIsLoading(false)
    }, 50)
  }

  return (
    <>
      {isLoading && <MatrixRain onComplete={handleComplete} />}
      <div
        className={`transition-opacity duration-700 ease-in-out ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{
          visibility: showContent ? "visible" : "hidden",
          position: "relative",
          zIndex: isLoading ? -1 : "auto",
        }}
      >
        {children}
      </div>
    </>
  )
}

