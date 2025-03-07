"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export default function Gallery() {
  return (
    <div className="min-h-screen bg-black relative">
      <div className="absolute top-4 left-4">
        <Sheet>
          <SheetTrigger asChild>
            <Button className="text-white hover:text-white/70 bg-transparent hover:bg-transparent p-0">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="bg-black text-[#666666] border-[#333333]">
            <nav className="flex flex-col gap-4 mt-8">
              <Link href="/" className="text-sm hover:text-[#888888] transition-colors">
                Home
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
      
      <div className="min-h-screen flex items-center justify-center">
        <p className="font-mono text-[#666666] text-base lowercase">
          standby...
        </p>
      </div>
    </div>
  )
}

