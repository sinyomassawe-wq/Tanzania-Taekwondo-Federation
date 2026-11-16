'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Upload, Download, PlusCircle, Edit3, Trash2, Search, Trophy, CheckCircle } from 'lucide-react';

interface Athlete {
  id: string;
  slug: string;
  full_name: string;
  gender: string;
  category: string;
  weight_class: string;
  discipline: string;
  belt_dan?: string;
  club_name?: string;
  region?: string;
  national_rank: number;
  ranking_points: number;
}

interface Props {
  initialAthletes: Athlete[];
}

export default function RankingsManagerClient({ initialAthletes }: Props) {
  const [athletes, setAthletes] = useState<Athlete[]>(initialAthletes);
  const [query, setQuery] = useState('');
  const [importStatus, setImportStatus] = useState<string>('');
  const [activeAthlete, setActiveAthlete] = useState<Athlete | null>(null);
  const [pointsInput, setPointsInput] = useState<number>(0);

  const handleImportCsv = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportStatus('Uploading & importing CSV...');
    const formData = new FormData();
    formData.append('csvFile', file);

    try {
      const res = await fetch('/api/admin/rankings/import', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (res.ok) {
        setImportStatus(`Successfully imported ${data.count} athlete rankings!`);
        window.location.reload();
      } else {
        setImportStatus(`Error: ${data.error || 'Failed to import CSV'}`);
      }
    } catch (err) {
      setImportStatus('Network error during CSV upload');
    }
  };

  const handleUpdatePoints = async (id: string, newPoints: number) => {
    try {
      const res = await fetch('/api/admin/rankings/update-points', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, points: newPoints }),
      });

      if (res.ok) {
        setAthletes((prev) =>
          prev.map((a) => (a.id === id ? { ...a, ranking_points: newPoints } : a))
        );
        setActiveAthlete(null);
      }
    } catch (e) {
      alert('Failed to update ranking points');
    }
  };

  const filtered = athletes.filter(
    (a) =>
      !query.trim() ||
      a.full_name.toLowerCase().includes(query.toLowerCase()) ||
      a.weight_class.toLowerCase().includes(query.toLowerCase()) ||
      (a.club_name && a.club_name.toLowerCase().includes(query.toLowerCase())) ||
      (a.region && a.region.toLowerCase().includes(query.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* CSV Import Banner */}
      <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center flex-shrink-0">
            <Upload className="w-5 h-5" />
          </div>
          <div>
            <strong className="block text-gray-900 text-sm">Batch Rankings CSV Import</strong>
            <span className="text-gray-500">
              Upload a standard CSV with columns: <code>full_name, gender, category, weight_class, ranking_points, club_name, region</code>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <label className="px-4 py-2 bg-brand-green hover:bg-brand-greenDark text-white font-bold rounded-xl shadow cursor-pointer transition-colors flex items-center space-x-1.5">
            <Upload className="w-4 h-4" />
            <span>Select CSV File</span>
            <input
              type="file"
              accept=".csv"
              onChange={handleImportCsv}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {importStatus && (
        <div className="p-3.5 bg-blue-50 border border-blue-200 text-brand-navy rounded-xl text-xs font-semibold">
          {importStatus}
        </div>
      )}

      {/* Filter & Search */}
      <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm flex items-center justify-between text-xs">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search ranked athletes..."
            className="w-full pl-10 pr-3.5 py-2 border border-gray-300 rounded-xl focus:ring-1 focus:ring-brand-green outline-none"
          />
        </div>
        <span className="text-gray-500 font-semibold">
          {filtered.length} athlete{filtered.length === 1 ? '' : 's'}
        </span>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[#0B2A4A] text-white font-bold uppercase tracking-wider">
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th className="py-3 px-4">Athlete</th>
                <th className="py-3 px-3">Division</th>
                <th className="py-3 px-3">Weight</th>
                <th className="py-3 px-4">Club & Region</th>
                <th className="py-3 px-4 text-right font-bold text-brand-gold">Points</th>
                <th className="py-3 px-4 text-center">Quick Edit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((ath, idx) => (
                <tr key={ath.id} className="hover:bg-gray-50 transition-colors">
                  <td className="py-3 px-4 text-center font-bold text-gray-500">
                    {idx + 1}
                  </td>
                  <td className="py-3 px-4 font-bold text-gray-900">
                    <Link href={`/athletes/${ath.id}`} target="_blank" className="hover:underline">
                      {ath.full_name}
                    </Link>
                  </td>
                  <td className="py-3 px-3 text-gray-600">
                    {ath.gender} {ath.category}
                  </td>
                  <td className="py-3 px-3 font-semibold text-gray-800">
                    {ath.weight_class}
                  </td>
                  <td className="py-3 px-4 text-gray-600">
                    {ath.club_name || 'Affiliated Club'}, {ath.region}
                  </td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-brand-green text-sm">
                    {ath.ranking_points.toFixed(1)}
                  </td>
                  <td className="py-3 px-4 text-center">
                    <button
                      onClick={() => {
                        setActiveAthlete(ath);
                        setPointsInput(ath.ranking_points);
                      }}
                      className="px-2.5 py-1 bg-gray-100 hover:bg-brand-navy hover:text-white rounded font-bold transition-colors"
                    >
                      Edit Points
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Points Modal */}
      {activeAthlete && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl p-6 max-w-sm w-full space-y-4 shadow-xl">
            <h3 className="font-display font-bold text-base text-[#0B2A4A]">
              Update Points: {activeAthlete.full_name}
            </h3>
            <p className="text-xs text-gray-500">
              Current Division: <strong>{activeAthlete.weight_class}</strong>
            </p>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">
                National Ranking Points
              </label>
              <input
                type="number"
                step="0.5"
                value={pointsInput}
                onChange={(e) => setPointsInput(parseFloat(e.target.value) || 0)}
                className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm font-mono font-bold outline-none"
              />
            </div>

            <div className="flex space-x-2 pt-2">
              <button
                onClick={() => handleUpdatePoints(activeAthlete.id, pointsInput)}
                className="flex-1 py-2 bg-brand-green text-white font-bold text-xs rounded-xl hover:bg-brand-greenDark"
              >
                Save Points
              </button>
              <button
                onClick={() => setActiveAthlete(null)}
                className="px-3 py-2 bg-gray-100 text-gray-700 font-bold text-xs rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
