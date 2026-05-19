import { useEffect, useState } from 'react'

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const visibility = {}

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          visibility[entry.target.id] = entry.intersectionRatio
        })
        const [topId] = Object.entries(visibility)
          .filter(([, r]) => r > 0)
          .sort(([, a], [, b]) => b - a)[0] ?? []
        if (topId) setActiveSection(topId)
      },
      { threshold: [0, 0.1, 0.25, 0.5] }
    )

    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [sectionIds])

  return activeSection
}
