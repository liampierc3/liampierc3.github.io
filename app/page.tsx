"use client"
import Link from "next/link"
import Image from "next/image"
import { VideoIcon as Vimeo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu } from "lucide-react"
import { LoadingScreen } from "@/components/loading-screen"

export default function Home() {
  return (
    <LoadingScreen>
      <div className="min-h-screen flex flex-col">
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

        <main className="flex-grow">
          {/* Hero Video Section */}
          <section className="bg-black relative">
            <div className="w-full h-screen">
              <iframe
                src="https://player.vimeo.com/video/1042820639?h=c6d5e6c6c9&autoplay=1&loop=1&background=1&muted=1"
                className="w-full h-full"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="py-16 bg-black">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row items-center gap-8">
                <div className="w-full md:w-1/3">
                  <div className="relative max-w-xs mx-auto">
                    <div className="bg-zinc-900 rounded-[32px] p-4 shadow-lg">
                      <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                        <Image
                          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/youtube%20headshot%202.jpg-YL1wgYpErOalnM4bIMiXIqqdLlflB0.jpeg"
                          alt="Liam"
                          fill
                          className="object-cover"
                          priority
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="w-full md:w-2/3 text-center md:text-left">
                  <h1 className="text-2xl font-normal mb-2">Hey, I'm Liam</h1>
                  <p className="text-base text-white/80 mb-6 font-mono">
                    I create compelling visual stories. With years of experience, I bring a unique perspective to every
                    project, blending technical expertise with creative vision.
                  </p>
                  <div className="flex flex-col items-center md:items-start gap-2">
                    <Link
                      href="https://vimeo.com/1042820639"
                      target="_blank"
                      className="text-sm text-white hover:text-white/70 transition-colors underline font-mono"
                    >
                      Reel
                    </Link>
                    <Link
                      href="https://www.youtube.com/@pierce_liam"
                      target="_blank"
                      className="text-sm text-white hover:text-white/70 transition-colors underline font-mono"
                    >
                      Youtube
                    </Link>
                    <Link
                      href="/gallery"
                      className="text-sm text-white hover:text-white/70 transition-colors underline font-mono"
                    >
                      Gallery
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Work Section */}
          <section id="work" className="py-20 bg-zinc-900">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl mb-12">Selected Work</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <Link
                  href="https://www.youtube.com/watch?v=C3tVe_XPfo0"
                  target="_blank"
                  className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                >
                  <Image
                    src="https://img.youtube.com/vi/C3tVe_XPfo0/maxresdefault.jpg"
                    alt="Handmade mountain bike"
                    width={1280}
                    height={720}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-sm">This handmade mountain bike is a work of art</p>
                  </div>
                </Link>

                <Link
                  href="https://www.youtube.com/watch?v=Kn9jafKQ_PA"
                  target="_blank"
                  className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                >
                  <Image
                    src="https://img.youtube.com/vi/Kn9jafKQ_PA/maxresdefault.jpg"
                    alt="Trail Performance"
                    width={1280}
                    height={720}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-sm">Exploring the Future of Trail Performance</p>
                  </div>
                </Link>

                <Link
                  href="https://www.youtube.com/watch?v=OUMHMSO6jeU"
                  target="_blank"
                  className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                >
                  <Image
                    src="https://img.youtube.com/vi/OUMHMSO6jeU/maxresdefault.jpg"
                    alt="Portal axle material science"
                    width={1280}
                    height={720}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-sm">Portal axle material science</p>
                  </div>
                </Link>

                <Link
                  href="https://www.youtube.com/watch?v=flmcDnI_fdE"
                  target="_blank"
                  className="group relative aspect-video cursor-pointer overflow-hidden rounded-lg"
                >
                  <Image
                    src="https://img.youtube.com/vi/flmcDnI_fdE/maxresdefault.jpg"
                    alt="Vinco performance"
                    width={1280}
                    height={720}
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-sm">Vinco performance</p>
                  </div>
                </Link>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section id="contact" className="py-20 bg-black">
            <div className="container mx-auto px-4">
              <h2 className="text-2xl mb-12">Get in Touch</h2>
              <div className="text-center">
                <p className="text-sm text-white/70 mb-6">
                  Let's collaborate on your next project. Reach out to me at:
                </p>
                <Link
                  href="mailto:liampierc3@gmail.com"
                  className="text-sm text-white hover:text-white/70 transition-colors underline font-mono"
                >
                  liampierc3@gmail.com
                </Link>
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
      </div>
    </LoadingScreen>
  )
}

