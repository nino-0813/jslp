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

interface AntarcticaGlobeProps {
  width: number
  height: number
}

export function AntarcticaGlobe({ width, height }: AntarcticaGlobeProps) {
  const globeRef = useRef<GlobeMethods | undefined>(undefined)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const globe = globeRef.current
    if (!globe) return

    globe.pointOfView({ lat: -70, lng: 20, altitude: 1.9 }, 0)

    const controls = globe.controls() as unknown as {
      enableZoom: boolean
      enablePan: boolean
      autoRotate: boolean
      autoRotateSpeed: number
    }
    controls.enableZoom = false
    controls.enablePan = false
    controls.autoRotate = true
    controls.autoRotateSpeed = 0.6
  }, [ready])

  if (width === 0 || height === 0) return null

  return (
    <div className="pointer-events-none">
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
