"use client"

export default function InstructionsOverlay() {
  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-black/80 backdrop-blur-sm p-4 rounded-lg text-white border border-white/10">
        <h2 className="text-sm font-medium mb-2">Controls</h2>
        <ul className="space-y-1.5 text-xs text-white/70">
          <li>
            <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white">W A S D</span> to move
          </li>
          <li>Mouse to look around</li>
          <li>
            <span className="font-mono bg-white/10 px-1.5 py-0.5 rounded text-white">ESC</span> to release mouse
          </li>
        </ul>
      </div>
    </div>
  )
}

