"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import { QRCodeCanvas } from "qrcode.react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function ColorfulQR() {
  const [url, setUrl] = useState("https://qrexperiences.com")
  const [colors, setColors] = useState<string[]>([])
  const qrRef = useRef<HTMLDivElement>(null)

  // Generate random bright colors
  const generateColors = useCallback(() => {
    const newColors = []
    for (let i = 0; i < 2000; i++) {
      const hue = Math.random() * 360
      const saturation = 70 + Math.random() * 30 // 70-100%
      const lightness = 30 + Math.random() * 30 // 30-60% (darker range)
      newColors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`)
    }
    setColors(newColors)
  }, [])

  // Apply colors to QR code
  const applyColors = useCallback(() => {
    if (!qrRef.current) return

    const qrCanvas = qrRef.current.querySelector("canvas")
    if (!qrCanvas) return

    const originalWidth = qrCanvas.width
    const originalHeight = qrCanvas.height
    const newWidth = originalWidth * 1 // Increased from 1.5 to 1.75 for wider aspect ratio

    // Create a new canvas for the wide version
    const wideCanvas = document.createElement("canvas")
    wideCanvas.width = newWidth
    wideCanvas.height = originalHeight
    const wideCtx = wideCanvas.getContext("2d", { willReadFrequently: true })
    if (!wideCtx) return

    // Get the original QR code data
    const ctx = qrCanvas.getContext("2d", { willReadFrequently: true })
    if (!ctx) return

    const imageData = ctx.getImageData(0, 0, originalWidth, originalHeight)
    const data = imageData.data

    // Clear the wide canvas
    wideCtx.fillStyle = "white"
    wideCtx.fillRect(0, 0, newWidth, originalHeight)

    // Draw colored modules with higher resolution
    const moduleCount = 81 // Increased module count for better resolution
    const moduleSize = originalWidth / moduleCount
    const wideModuleWidth = moduleSize * 1

    for (let y = 0; y < originalHeight; y += moduleSize) {
      for (let x = 0; x < originalWidth; x += moduleSize) {
        const i = (Math.floor(y) * originalWidth + Math.floor(x)) * 4
        if (data[i] === 0) {
          // Black pixel in original QR code
          const row = Math.floor(y / moduleSize)
          const col = Math.floor(x / moduleSize)
          const colorIndex = row * moduleCount + col

          const isPositionDetectionPattern =
            (row < 28 && col < 28) || // Top-left
            (row < 28 && col >= moduleCount - 28) || // Top-right
            (row >= moduleCount - 28 && col < 28) // Bottom-left

          // Add extra black border around position detection patterns
          const isPositionDetectionBorder =
            (row === 28 && col <= 28) || // Bottom border of top patterns
            (row <= 28 && col === 28) || // Right border of top-left pattern
            (row <= 28 && col === moduleCount - 29) || // Left border of top-right pattern
            (col <= 28 && row === moduleCount - 29) || // Top border of bottom-left pattern
            (row >= moduleCount - 29 && row <= moduleCount - 1 && col === 28) // Right border of bottom-left pattern

          // Add quiet zone
          const isQuietZone = row < 2 || row >= moduleCount - 2 || col < 2 || col >= moduleCount - 2

          wideCtx.fillStyle =
            isPositionDetectionPattern || isPositionDetectionBorder
              ? "black"
              : isQuietZone
                ? "white"
                : colors[colorIndex % colors.length]

          wideCtx.fillRect(x * 1, y, wideModuleWidth, moduleSize)
        }
      }
    }

    // Replace the original canvas with the wide version
    qrCanvas.width = newWidth
    qrCanvas.height = originalHeight
    qrCanvas.style.width = "100%"
    qrCanvas.style.height = "auto"
    const finalCtx = qrCanvas.getContext("2d")
    if (finalCtx) {
      finalCtx.drawImage(wideCanvas, 0, 0)
    }
  }, [colors])

  // Initial setup and color regeneration
  useEffect(() => {
    if (colors.length === 0) {
      generateColors()
    } else {
      applyColors()
    }
  }, [colors, generateColors, applyColors])

  // Handle regenerate colors
  const handleRegenerateColors = () => {
    generateColors()
  }

  // Handle URL change
  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUrl(e.target.value)
  }

  // Handle download
  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas")
    if (canvas) {
      const link = document.createElement("a")
      link.download = "colorful-qr-code.png"
      link.href = canvas.toDataURL("image/png")
      link.click()
    }
  }

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="url">Enter URL</Label>
          <Input id="url" placeholder="Enter URL to encode" value={url} onChange={handleUrlChange} />
        </div>
        <Button onClick={handleRegenerateColors} className="w-full border border-stone-200">
          Generate Colors
        </Button>
      </div>

      <div ref={qrRef} className="overflow-hidden rounded-lg border bg-white p-2">
        <QRCodeCanvas
          value={url}
          size={500} // Increased from 1200 to 1600
          level="Q"
          includeMargin={true}
        />
      </div>
      <Button onClick={handleDownload} className="border border-stone-200">
        <Download className="mr-2 h-4 w-4" /> Download QR Code
      </Button>
    </div>
  )
}

