"use client";

import React, { useState } from "react";
import { Maximize2, Minimize2, ZoomIn, ZoomOut, RotateCcw, Download, Info } from "lucide-react";

interface PhotoViewerProps {
  imageUrl: string;
  title: string;
  attribution: string;
  sourceUrl: string;
}

export function PhotoViewer({ imageUrl, title, attribution, sourceUrl }: PhotoViewerProps) {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [showMetadata, setShowMetadata] = useState(false);

  const handleZoomIn = () => setZoomLevel((prev) => Math.min(prev + 0.3, 3));
  const handleZoomOut = () => setZoomLevel((prev) => Math.max(prev - 0.3, 0.8));
  const handleResetZoom = () => setZoomLevel(1);

  return (
    <div
      className={`relative rounded-xl border border-[var(--border-color)] bg-black overflow-hidden select-none transition-all duration-300 ${
        isFullscreen ? "fixed inset-0 z-50 rounded-none border-none flex flex-col justify-center" : "w-full aspect-[16/10] sm:aspect-[16/9]"
      }`}
    >
      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 p-1.5 rounded-lg bg-black/75 backdrop-blur-md border border-white/10 text-white/90">
        <button
          onClick={handleZoomIn}
          className="p-1.5 rounded hover:bg-white/15 text-white transition-colors"
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={handleZoomOut}
          className="p-1.5 rounded hover:bg-white/15 text-white transition-colors"
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button
          onClick={handleResetZoom}
          className="p-1.5 rounded hover:bg-white/15 text-white transition-colors"
          title="Reset Zoom"
          aria-label="Reset Zoom"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
        <div className="w-[1px] h-4 bg-white/20 mx-1" />
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded hover:bg-white/15 text-white transition-colors"
          title="View Original Archival Source"
        >
          <Download className="w-4 h-4" />
        </a>
        <button
          onClick={() => setShowMetadata(!showMetadata)}
          className={`p-1.5 rounded hover:bg-white/15 transition-colors ${showMetadata ? "bg-amber-600 text-stone-950" : "text-white"}`}
          title="Toggle Provenance Info"
        >
          <Info className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-1.5 rounded hover:bg-white/15 text-white transition-colors"
          title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
        >
          {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
        </button>
      </div>

      {/* Main Archival Image Display */}
      <div className="w-full h-full flex items-center justify-center overflow-auto p-2">
        <img
          src={imageUrl}
          alt={title}
          style={{ transform: `scale(${zoomLevel})` }}
          className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out cursor-grab active:cursor-grabbing"
          draggable={false}
        />
      </div>

      {/* Provenance Banner (collapsible) */}
      {showMetadata && (
        <div className="absolute bottom-4 left-4 right-4 z-20 p-3.5 rounded-lg bg-black/85 backdrop-blur-md border border-white/15 text-xs text-stone-300 max-w-xl animate-fade-in font-mono">
          <p className="font-semibold text-amber-400 mb-0.5">{title}</p>
          <p className="truncate text-stone-400">{attribution}</p>
        </div>
      )}

      {/* Close button if in fullscreen mode */}
      {isFullscreen && (
        <button
          onClick={() => setIsFullscreen(false)}
          className="absolute top-4 left-4 z-20 px-3 py-1.5 rounded bg-black/80 text-white border border-white/20 text-xs font-mono hover:bg-white/20"
        >
          ESC / Close Fullscreen
        </button>
      )}
    </div>
  );
}
