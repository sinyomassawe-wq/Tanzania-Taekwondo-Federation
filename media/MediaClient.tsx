'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Camera, Video, Play, X, ExternalLink } from 'lucide-react';

interface GalleryItem {
  id: string;
  title_en: string;
  title_sw: string;
  album_name: string;
  media_type: string;
  media_url: string;
  thumbnail_url?: string;
  event_date?: string;
}

interface Props {
  items: GalleryItem[];
}

export default function MediaClient({ items }: Props) {
  const [filterType, setFilterType] = useState<'all' | 'photo' | 'video'>('all');
  const [activeItem, setActiveItem] = useState<GalleryItem | null>(null);

  const filtered = items.filter((item) => {
    if (filterType === 'all') return true;
    return item.media_type === filterType;
  });

  return (
    <div className="space-y-8">
      {/* Type Filter Buttons */}
      <div className="flex items-center justify-between">
        <h2 className="font-display font-bold text-2xl text-[#0B2A4A]">
          Action Photos & Videos
        </h2>

        <div className="bg-white p-1 rounded-xl border border-gray-200 shadow-sm flex space-x-1">
          <button
            onClick={() => setFilterType('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
              filterType === 'all'
                ? 'bg-[#0B2A4A] text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Media
          </button>
          <button
            onClick={() => setFilterType('photo')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 ${
              filterType === 'photo'
                ? 'bg-[#0B2A4A] text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Camera className="w-3.5 h-3.5" />
            <span>Photos</span>
          </button>
          <button
            onClick={() => setFilterType('video')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1 ${
              filterType === 'video'
                ? 'bg-[#0B2A4A] text-white shadow'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Video className="w-3.5 h-3.5" />
            <span>Videos</span>
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => setActiveItem(item)}
            className="group relative h-60 rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300 bg-gray-100"
          >
            <Image
              src={item.thumbnail_url || item.media_url}
              alt={item.title_en}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {item.media_type === 'video' && (
              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-red-600 text-white flex items-center justify-center shadow">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>
            )}

            <div className="absolute bottom-4 left-4 right-4 text-white">
              <span className="text-[10px] font-bold text-brand-gold uppercase tracking-wider block">
                {item.album_name}
              </span>
              <h3 className="font-display font-bold text-xs sm:text-sm line-clamp-2 mt-0.5">
                {item.title_en}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeItem && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in">
          <div className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
            <button
              onClick={() => setActiveItem(null)}
              className="absolute -top-12 right-0 text-white hover:text-brand-gold p-2 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-8 h-8" />
            </button>

            {activeItem.media_type === 'video' ? (
              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
                <iframe
                  src={activeItem.media_url.replace('watch?v=', 'embed/')}
                  title={activeItem.title_en}
                  className="w-full h-full border-0"
                  allowFullScreen
                />
              </div>
            ) : (
              <div className="relative w-full h-[70vh] rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <Image
                  src={activeItem.media_url}
                  alt={activeItem.title_en}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            <div className="mt-4 text-center text-white">
              <h3 className="font-display font-bold text-lg">{activeItem.title_en}</h3>
              <p className="text-xs text-gray-400 mt-1">{activeItem.album_name}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
