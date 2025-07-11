import { PAGES_LINKS } from '@/utils/linksData'
import Link from 'next/link'
import React from 'react'

interface Props {
  slug: string;
  title: string;
  description?: string | null;
  heroimg?: string | null;
}

const CollectionCard = ({ slug, title, description, heroimg }: Props) => {
  return (
    <Link
      href={`${PAGES_LINKS.collections.link}/${slug}`}
      className="group relative block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-[1.02]"
    >
      {/* Hero Image or Fallback */}
      <div className="relative h-80 w-full overflow-hidden">
        {heroimg ? (
          <img
            src={heroimg}
            alt={title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-emerald-400 via-teal-500 to-cyan-600">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white drop-shadow-lg">
                {title}
              </h3>
              <div className="mt-2 h-1 w-16 bg-white/30 rounded-full mx-auto"></div>
            </div>
          </div>
        )}

        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
      </div>

      {/* Content Container */}
      <div className="absolute bottom-0 left-0 right-0 p-6">
        {/* Title */}
        <h3 className="text-2xl font-bold text-white drop-shadow-lg mb-2 transition-transform duration-500 group-hover:translate-y-[-8px]">
          {title}
        </h3>

        {/* Description - Slides up on hover */}
        {description && (
          <div className="overflow-hidden">
            <p className="text-white/90 text-sm leading-relaxed transform translate-y-full transition-transform duration-500 group-hover:translate-y-0">
              {description}
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-4 flex items-center text-white/80 text-sm font-medium opacity-0 transition-all duration-500 group-hover:opacity-100">
          <span>Explore Collection</span>
          <svg
            className="ml-2 h-4 w-4 transform transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Subtle border highlight on hover */}
      <div className="absolute inset-0 rounded-2xl border-2 border-white/20 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>
    </Link>
  )
}

export default CollectionCard