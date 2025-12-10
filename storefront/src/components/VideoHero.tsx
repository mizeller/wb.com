"use client"

import { useState, useEffect } from "react"

interface VideoHeroProps {
  src: string
  width?: number
  height?: number
  className?: string
}

export const VideoHero: React.FC<VideoHeroProps> = ({
  src,
  width = 2880,
  height = 1500,
  className = "",
}) => {
  const [showScrollHint, setShowScrollHint] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollHint(true)
    }, 3000) // Show after 3 seconds

    return () => clearTimeout(timer)
  }, [])

  const handleScrollDown = () => {
    const nextSection = document.querySelector(".pt-8.pb-26") as HTMLElement
    if (nextSection) {
      nextSection.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  }

  return (
    <div className="relative max-md:pt-18">
      <video
        src={src}
        width={width}
        height={height}
        autoPlay
        muted
        loop
        className={`md:h-screen md:object-cover ${className}`}
      />

      {/* Scroll Down Hint */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 ${
          showScrollHint
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-4"
        }`}
      >
        <button
          onClick={handleScrollDown}
          className="flex flex-col items-center bg-corporate text-white hover:bg-opacity-90 transition-all duration-300 group cursor-pointer px-4 py-3 rounded-lg shadow-lg"
          aria-label="Scroll down"
        >
          <span className="text-sm md:text-base font-light mb-2">
            Scroll down
          </span>
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center transition-colors duration-300">
            <div className="w-1 h-1 bg-white rounded-full animate-bounce transition-colors duration-300"></div>
          </div>
        </button>
      </div>
    </div>
  )
}
