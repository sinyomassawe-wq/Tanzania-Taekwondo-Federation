'use client';

import React, { useState } from 'react';
import { TANZANIAN_REGIONS } from '@/lib/utils';
import {
  Building,
  MapPin,
  Phone,
  Mail,
  Clock,
  Search,
  ExternalLink,
  Filter,
} from 'lucide-react';

interface Club {
  id: string;
  name: string;
  region: string;
  district?: string;
  head_instructor?: string;
  phone?: string;
  email?: string;
  address?: string;
  training_days_en?: string;
  training_times?: string;
  map_url?: string;
}

interface Props {
  initialClubs: Club[];
}

export default function ClubSearchClient({ initialClubs }: Props) {
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = initialClubs.filter((c) => {
    const matchRegion = selectedRegion === 'All' || c.region === selectedRegion;
    const matchQuery =
      !searchQuery.trim() ||
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (c.head_instructor && c.head_instructor.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (c.district && c.district.toLowerCase().includes(searchQuery.toLowerCase())) ||
      c.region.toLowerCase().includes(searchQuery.toLowerCase());
    return matchRegion && matchQuery;
  });

  return (
    <div className="space-y-8">
      {/* Search and Region Select Bar */}
      <div className="bg-white p-5 rounded-3xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by club name, instructor, or district..."
            className="w-full pl-10 pr-4 py-2 text-xs border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none bg-gray-50 focus:bg-white"
          />
        </div>

        {/* Region Filter */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Filter className="w-4 h-4 text-brand-green" />
          <span className="text-xs font-bold text-gray-600">Region:</span>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="px-3 py-2 text-xs border border-gray-300 rounded-xl bg-white focus:ring-1 focus:ring-brand-green outline-none font-semibold text-gray-800"
          >
            <option value="All">All 31 Regions (Mainland & Zanzibar)</option>
            {TANZANIAN_REGIONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Counter */}
      <div className="flex items-center justify-between text-xs font-semibold text-gray-500 px-1">
        <span>
          Showing {filtered.length} affiliated club{filtered.length === 1 ? '' : 's'}
        </span>
        {selectedRegion !== 'All' && (
          <button
            onClick={() => {
              setSelectedRegion('All');
              setSearchQuery('');
            }}
            className="text-brand-green hover:underline font-bold"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Clubs Grid */}
      {filtered.length === 0 ? (
        <div className="bg-white p-12 rounded-3xl border border-gray-200 text-center space-y-3">
          <Building className="w-12 h-12 text-gray-300 mx-auto" />
          <h3 className="font-display font-bold text-base text-gray-700">No clubs found</h3>
          <p className="text-xs text-gray-500 max-w-sm mx-auto">
            No affiliated clubs matched your search criteria. Try selecting "All Regions" or registering a new club.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((club) => (
            <div
              key={club.id}
              className="bg-white rounded-3xl p-6 border border-gray-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-green-50 text-brand-green flex items-center justify-center font-bold text-xs shadow-sm flex-shrink-0">
                    <Building className="w-5 h-5" />
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-50 text-brand-blue border border-blue-200">
                    {club.region}
                  </span>
                </div>

                <h3 className="font-display font-bold text-lg text-[#0B2A4A] group-hover:text-brand-green transition-colors leading-snug">
                  {club.name}
                </h3>

                {club.head_instructor && (
                  <p className="text-xs text-gray-700 mt-1 font-medium">
                    Instructor: <span className="text-gray-900 font-semibold">{club.head_instructor}</span>
                  </p>
                )}

                <div className="mt-4 space-y-2 text-xs text-gray-600">
                  {club.address && (
                    <div className="flex items-start space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-brand-green flex-shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{club.address}</span>
                    </div>
                  )}

                  {club.training_days_en && (
                    <div className="flex items-center space-x-1.5">
                      <Clock className="w-3.5 h-3.5 text-brand-blue flex-shrink-0" />
                      <span>
                        {club.training_days_en} ({club.training_times || 'Evenings'})
                      </span>
                    </div>
                  )}

                  {club.phone && (
                    <div className="flex items-center space-x-1.5">
                      <Phone className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span>{club.phone}</span>
                    </div>
                  )}

                  {club.email && (
                    <div className="flex items-center space-x-1.5">
                      <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                      <span className="truncate">{club.email}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-[10px] font-bold text-brand-green uppercase tracking-wider">
                  TTF AFFILIATED
                </span>
                {club.map_url && (
                  <a
                    href={club.map_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-brand-blue hover:underline flex items-center"
                  >
                    <span>View Map</span>
                    <ExternalLink className="w-3 h-3 ml-1" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
