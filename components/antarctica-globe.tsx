"use client"

import { useEffect, useRef, useState } from "react"
import dynamic from "next/dynamic"
import type { GlobeMethods } from "react-globe.gl"

const Globe = dynamic(() => import("react-globe.gl"), { ssr: false })

const ANTARCTICA_POINT = [
  {
    lat: -82,
    lng: 20,
    label: "ANTARCTICA",
  },
]

const START_VIEW = { lat: -70, lng: 20, altitude: 4.2 }
const FINAL_VIEW = { lat: -70, lng: 20, altitude: 1.9 }
const REVEAL_ZOOM_MS = 3800
const REVEAL_FADE_MS = 2400

interface AntarcticaGlobeProps {
  width: number
  height: number
}

export function AntarcticaGlobe({ width, height }: AntarcticaGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [ready, setReady] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const globe = globeRef.current
    if (!globe || !ready) return

    globe.pointOfView(START_VIEW, 0)

    const controls = globe.controls() as unknown as {
      enableZoom: boolean
      enablePan: boolean
      autoRotate: boolean
      autoRotateSpeed: number
    }
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = false

    const revealFrame = requestAnimationFrame(() => {
      setVisible(true)
      globe.pointOfView(FINAL_VIEW, REVEAL_ZOOM_MS)
    })

    const autoRotateTimer = setTimeout(() => {
      controls.autoRotate = true
      controls.autoRotateSpeed = 0.6
    }, REVEAL_ZOOM_MS)

    return () => {
      cancelAnimationFrame(revealFrame)
      clearTimeout(autoRotateTimer)
    }
  }, [ready])

  if (width === 0 || height === 0) return null

  return (
    <div
      className="pointer-events-none transition-opacity ease-out"
      style={{ opacity: visible ? 1 : 0, transitionDuration: `${REVEAL_FADE_MS}ms` }}
    >
      <Globe
        ref={globeRef as never}
        width={width}
        height={height}
        backgroundColor="rgba(0,0,0,0)"
        globeImageUrl="https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
        bumpImageUrl="https://unpkg.com/three-globe/example/img/earth-topology.png"
        showAtmosphere
        atmosphereColor="#ffffff"
        atmosphereAltitude={0.2}
        pointsData={ANTARCTICA_POINT}
        pointLat="lat"
        pointLng="lng"
        pointColor={() => "#ffffff"}
        pointAltitude={0.01}
        pointRadius={0.4}
        onGlobeReady={() => setReady(true)}
      />
    </div>
  )
}
