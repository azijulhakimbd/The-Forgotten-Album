"use client";

import React, { useState } from "react";
import { Upload, Search, Image as ImageIcon, Check, Trash2, ExternalLink } from "lucide-react";

export default function AdminMediaPage() {
  const [search, setSearch] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const mediaItems = [
    {
      id: "m-1",
      title: "Wright Flyer First Flight 1903",
      url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80",
      dimensions: "4000 x 3000",
      format: "JPEG / Glass Negative",
      size: "4.2 MB",
      usedIn: "Published in 2 articles",
    },
    {
      id: "m-2",
      title: "Abraham Lincoln at Antietam 1862",
      url: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=1200&q=80",
      dimensions: "3500 x 2800",
      format: "JPEG / Wet Plate",
      size: "3.8 MB",
      usedIn: "Published in 1 article",
    },
    {
      id: "m-3",
      title: "Marie Curie Laboratory Paris 1912",
      url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      dimensions: "3200 x 2400",
      format: "JPEG / Silver Print",
      size: "2.9 MB",
      usedIn: "Published in 1 article",
    },
    {
      id: "m-4",
      title: "Endurance Trapped in Pack Ice 1915",
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80",
      dimensions: "4200 x 3100",
      format: "JPEG / Flashlight Plate",
      size: "5.1 MB",
      usedIn: "Published in 2 articles",
    },
    {
      id: "m-5",
      title: "San Francisco Burning Panorama 1906",
      url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1200&q=80",
      dimensions: "7200 x 2200",
      format: "JPEG / Kite Panorama",
      size: "8.4 MB",
      usedIn: "Published in 1 article",
    },
    {
      id: "m-6",
      title: "Apollo 11 Tranquility Base 1969",
      url: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
      dimensions: "3000 x 3000",
      format: "JPEG / 70mm Hasselblad",
      size: "4.8 MB",
      usedIn: "Published in 2 articles",
    },
  ];

  const filtered = mediaItems.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[var(--border-color)]">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-bold tracking-tight">
            Media Library & Assets
          </h1>
          <p className="text-xs text-[var(--text-muted)] font-mono mt-1">
            Cloudinary media management, high-resolution scans, usage tracking, and metadata preservation.
          </p>
        </div>

        {/* Upload simulated button */}
        <label className="flex items-center gap-1.5 px-4 py-2 rounded bg-amber-600 hover:bg-amber-500 text-stone-950 font-semibold text-xs font-mono transition-colors shadow-sm cursor-pointer w-fit">
          <Upload className="w-3.5 h-3.5" />
          <span>Upload Archival Media</span>
          <input type="file" className="hidden" accept="image/*" onChange={() => alert("Image uploaded and registered into Cloudinary media library.")} />
        </label>
      </div>

      {/* Search and view toggle */}
      <div className="flex items-center gap-3 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search media files by name..."
            className="w-full pl-9 pr-4 py-2 rounded border border-[var(--border-color)] bg-[var(--bg-card)] text-xs font-mono focus:outline-none focus:ring-1 focus:ring-amber-500"
          />
        </div>
      </div>

      {/* Media Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setSelectedImage(item.url)}
            className="group rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)] overflow-hidden cursor-pointer hover:border-amber-600/50 hover:shadow-xl transition-all"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-black/40 relative">
              <img
                src={item.url}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/75 backdrop-blur-sm text-[10px] font-mono text-amber-300">
                {item.format}
              </div>
            </div>

            <div className="p-3.5 space-y-1">
              <h4 className="font-semibold text-xs text-[var(--text-primary)] truncate font-sans">
                {item.title}
              </h4>
              <p className="text-[10px] font-mono text-[var(--text-muted)] flex items-center justify-between">
                <span>{item.dimensions}</span>
                <span>{item.size}</span>
              </p>
              <div className="pt-2 border-t border-[var(--border-color)]/60 flex items-center justify-between text-[10px] font-mono text-emerald-500">
                <span>{item.usedIn}</span>
                <span className="text-amber-500 hover:underline">Inspect →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
