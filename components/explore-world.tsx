"use client"

import { useEffect, useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { PointerLockControls, Box, Environment, useTexture, Plane, SpotLight } from "@react-three/drei"
import * as THREE from "three"
import InstructionsOverlay from "./instructions-overlay"

// Artwork display component
function ArtworkDisplay({
  position,
  rotation,
  imageUrl,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  imageUrl: string
}) {
  const texture = useTexture(imageUrl)
  const spotlightRef = useRef<THREE.SpotLight>(null)

  // Optional: Uncomment to debug spotlight
  // useHelper(spotlightRef, THREE.SpotLightHelper, 'white')

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <Box args={[4, 3, 0.1]} position={[0, 0, -0.05]}>
        <meshStandardMaterial color="#111111" />
      </Box>

      {/* Artwork */}
      <Plane args={[3.6, 2.6]}>
        <meshBasicMaterial map={texture} />
      </Plane>

      {/* Spotlight */}
      <SpotLight
        ref={spotlightRef}
        position={[0, 2, 2]}
        angle={0.5}
        penumbra={0.5}
        intensity={1}
        distance={8}
        color="#ffffff"
        castShadow
      />
    </group>
  )
}

// Wall component
function Wall({
  position,
  rotation,
  size,
}: {
  position: [number, number, number]
  rotation?: [number, number, number]
  size: [number, number, number]
}) {
  return (
    <Box args={size} position={position} rotation={rotation || [0, 0, 0]}>
      <meshStandardMaterial color="#111111" />
    </Box>
  )
}

// Floor with reflection
function Floor() {
  const [roughnessMap] = useTexture(["/placeholder.svg?height=512&width=512"])

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
      <planeGeometry args={[200, 200]} />
      <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.1} roughnessMap={roughnessMap} />
    </mesh>
  )
}

// First-person movement controls
function MovementControls() {
  const { camera } = useThree()
  const [moveForward, setMoveForward] = useState(false)
  const [moveBackward, setMoveBackward] = useState(false)
  const [moveLeft, setMoveLeft] = useState(false)
  const [moveRight, setMoveRight] = useState(false)
  const velocity = useRef(new THREE.Vector3())
  const direction = useRef(new THREE.Vector3())

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          setMoveForward(true)
          break
        case "KeyA":
        case "ArrowLeft":
          setMoveLeft(true)
          break
        case "KeyS":
        case "ArrowDown":
          setMoveBackward(true)
          break
        case "KeyD":
        case "ArrowRight":
          setMoveRight(true)
          break
      }
    }

    const handleKeyUp = (event: KeyboardEvent) => {
      switch (event.code) {
        case "KeyW":
        case "ArrowUp":
          setMoveForward(false)
          break
        case "KeyA":
        case "ArrowLeft":
          setMoveLeft(false)
          break
        case "KeyS":
        case "ArrowDown":
          setMoveBackward(false)
          break
        case "KeyD":
        case "ArrowRight":
          setMoveRight(false)
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    document.addEventListener("keyup", handleKeyUp)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      document.removeEventListener("keyup", handleKeyUp)
    }
  }, [])

  useFrame((_, delta) => {
    // Update velocity based on movement state
    velocity.current.x = 0
    velocity.current.z = 0

    direction.current.z = Number(moveForward) - Number(moveBackward)
    direction.current.x = Number(moveRight) - Number(moveLeft)
    direction.current.normalize()

    if (moveForward || moveBackward) velocity.current.z -= direction.current.z * 5.0 * delta
    if (moveLeft || moveRight) velocity.current.x -= direction.current.x * 5.0 * delta

    // Move camera
    camera.position.addScaledVector(velocity.current, 1)

    // Prevent going below ground
    if (camera.position.y < 1.8) camera.position.y = 1.8

    // Boundary checks
    const boundary = 50
    if (camera.position.x < -boundary) camera.position.x = -boundary
    if (camera.position.x > boundary) camera.position.x = boundary
    if (camera.position.z < -boundary) camera.position.z = -boundary
    if (camera.position.z > boundary) camera.position.z = boundary
  })

  return null
}

// A single cube structure
function Cube({
  position,
  size,
  color,
}: { position: [number, number, number]; size: [number, number, number]; color: string }) {
  return (
    <Box args={size} position={position}>
      <meshStandardMaterial color={color} />
    </Box>
  )
}

// Main 3D world component
export default function ExploreWorld() {
  const controlsRef = useRef<any>()

  return (
    <>
      <InstructionsOverlay />

      <Canvas shadows camera={{ position: [0, 1.8, 5], fov: 75 }}>
        <color attach="background" args={["#080808"]} />

        <fog attach="fog" args={["#080808", 10, 50]} />

        <ambientLight intensity={0.1} />

        {/* Main space */}
        <Floor />

        {/* Gallery walls */}
        <Wall position={[0, 10, -30]} size={[60, 20, 1]} />
        <Wall position={[-30, 10, 0]} rotation={[0, Math.PI / 2, 0]} size={[60, 20, 1]} />
        <Wall position={[30, 10, 0]} rotation={[0, -Math.PI / 2, 0]} size={[60, 20, 1]} />

        {/* Artwork displays */}
        <ArtworkDisplay
          position={[0, 5, -29.4]}
          rotation={[0, 0, 0]}
          imageUrl="https://img.youtube.com/vi/C3tVe_XPfo0/maxresdefault.jpg"
        />

        <ArtworkDisplay
          position={[-15, 5, -29.4]}
          rotation={[0, 0, 0]}
          imageUrl="https://img.youtube.com/vi/Kn9jafKQ_PA/maxresdefault.jpg"
        />

        <ArtworkDisplay
          position={[15, 5, -29.4]}
          rotation={[0, 0, 0]}
          imageUrl="https://img.youtube.com/vi/OUMHMSO6jeU/maxresdefault.jpg"
        />

        <ArtworkDisplay
          position={[-29.4, 5, -15]}
          rotation={[0, Math.PI / 2, 0]}
          imageUrl="https://img.youtube.com/vi/flmcDnI_fdE/maxresdefault.jpg"
        />

        <ArtworkDisplay
          position={[-29.4, 5, 15]}
          rotation={[0, Math.PI / 2, 0]}
          imageUrl="/placeholder.svg?height=1280&width=720"
        />

        <ArtworkDisplay
          position={[29.4, 5, -15]}
          rotation={[0, -Math.PI / 2, 0]}
          imageUrl="/placeholder.svg?height=1280&width=720"
        />

        <PointerLockControls ref={controlsRef} />
        <MovementControls />

        <Environment preset="night" />
      </Canvas>
    </>
  )
}

