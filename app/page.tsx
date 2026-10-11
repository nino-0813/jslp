import { WorksGallery } from "@/components/works-gallery"
import { FloatingVoyageCta } from "@/components/floating-voyage-cta"

export default function Page() {
  return (
    <div className="min-h-screen bg-black">
      <main>
        <WorksGallery />
      </main>
      <FloatingVoyageCta />
    </div>
  )
}
