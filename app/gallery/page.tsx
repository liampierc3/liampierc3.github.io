"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { VideoIcon as Vimeo, Menu, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import dynamic from "next/dynamic"

// Dynamically import the 3D world component with no SSR
const ExploreWorld = dynamic(() => import("@/components/explore-world"), { ssr: false })

export default function Gallery() {
  const [isExploring, setIsExploring] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Set loading to false after a short delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      {!isExploring ? (
        <>
          <header className="fixed w-full top-0 z-50 bg-black">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" className="text-white hover:text-white/70">
                    <Menu className="h-5 w-5" />
                    <span className="ml-2 text-sm">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="bg-black text-white border-white/10">
                  <nav className="flex flex-col gap-4 mt-8">
                    <Link href="/" className="text-sm hover:text-white/70 transition-colors">
                      Home
                    </Link>
                    <Link href="/contact" className="text-sm hover:text-white/70 transition-colors">
                      Contact
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>

              <div className="flex-1"></div>

              <div className="flex items-center gap-4">
                <Link href="https://vimeo.com/1042820639" target="_blank" className="hover:text-white/70">
                  <Vimeo className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </header>

          <main className="flex-grow pt-20">
            <section className="py-16">
              <div className="container mx-auto px-4">
                <h1 className="text-3xl mb-12">Gallery</h1>

                <div className="flex flex-col items-center justify-center">
                  <p className="text-center text-white/70 mb-8">
                    Enter a minimalist 3D world to explore. Use WASD keys to move and your mouse to look around.
                  </p>

                  <Button onClick={() => setIsExploring(true)} className="bg-zinc-800 hover:bg-zinc-700 text-white">
                    Enter 3D Gallery
                  </Button>
                </div>
              </div>
            </section>
          </main>

          <footer className="py-8 border-t border-white/10 bg-black">
            <div className="container mx-auto px-4">
              <div className="flex justify-end items-center">
                <div className="flex items-center gap-4">
                  <Link href="https://vimeo.com/1042820639" target="_blank" className="text-white/70 hover:text-white">
                    <Vimeo className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>
          </footer>
        </>
      ) : (
        <>
          <div className="fixed top-4 left-4 z-50">
            <Button onClick={() => setIsExploring(false)} className="bg-zinc-800/50 hover:bg-zinc-700/70 text-white">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Exit
            </Button>
          </div>

          {isLoading ? (
            <div className="h-screen w-full flex items-center justify-center bg-zinc-900">
              <p className="text-white/70 animate-pulse">Loading 3D environment...</p>
            </div>
          ) : (
            <div className="h-screen w-full">
              <ExploreWorld />
            </div>
          )}
        </>
      )}
    </div>
  )
}

