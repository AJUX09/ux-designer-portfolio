'use client'

import { useEffect } from "react"
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useAnimationFrame,
} from "framer-motion"

export const InfiniteGridBackground = () => {
  const mouseX = useMotionValue(-9999)
  const mouseY = useMotionValue(-9999)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [mouseX, mouseY])

  const gridOffsetX = useMotionValue(0)
  const gridOffsetY = useMotionValue(0)

  useAnimationFrame(() => {
    gridOffsetX.set((gridOffsetX.get() + 0.4) % 40)
    gridOffsetY.set((gridOffsetY.get() + 0.4) % 40)
  })

  const maskImage = useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, black, transparent)`

  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {/* Base dim grid */}
      <div className="absolute inset-0 opacity-[0.04]">
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </div>

      {/* Mouse-reveal bright grid */}
      <motion.div
        className="absolute inset-0 opacity-30"
        style={{ maskImage, WebkitMaskImage: maskImage }}
      >
        <GridPattern offsetX={gridOffsetX} offsetY={gridOffsetY} />
      </motion.div>
    </div>
  )
}

const GridPattern = ({
  offsetX,
  offsetY,
}: {
  offsetX: ReturnType<typeof useMotionValue<number>>
  offsetY: ReturnType<typeof useMotionValue<number>>
}) => (
  <svg className="w-full h-full">
    <defs>
      <motion.pattern
        id="grid-pattern"
        width="40"
        height="40"
        patternUnits="userSpaceOnUse"
        x={offsetX}
        y={offsetY}
      >
        <path
          d="M 40 0 L 0 0 0 40"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </motion.pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#grid-pattern)" />
  </svg>
)
