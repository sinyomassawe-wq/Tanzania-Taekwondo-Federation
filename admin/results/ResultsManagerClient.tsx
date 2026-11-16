'use client';

import React, { useState } from 'react';
import { Trophy, Plus, Trash2, Edit3, Award, Calendar } from 'lucide-react';

interface Result {
  id: string;
  year: number;
  category: string;
  division: string;
  weight_class: string;
  gender: string;
  gold_athlete: string;
  silver_athlete: string;
  bronze_athlete_1: string;
  bronze_athlete_2: string;
}

interface RecordItem {
  id: string;
  year: number;
  division: string;
  weight_class: string;
  gender: string;
  champion_name: string;
  club_name: string;
  region: string;
}

interface Props {
  initialResults: Result[];
  initialRecords: RecordItem[];
}

export default function ResultsManagerClient({ initialResults, initialRecords }: Props) {
  const [results, setResults] = useState<Result[]>(initialResults);
  const [records, setRecords] = useState<RecordItem[]>(initialRecords);
  const [tab, setTab] = useState<'results' | 'records'>('results');
  const [editingResult, setEditingResult] = useState<Partial<Result> | null>(null);
  const [editingRecord, setEditingRecord] = useState<Partial<RecordItem> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSaveResult = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingResult) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingResult),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/results');
        const data = await fetchRes.json();
        if (data.results) setResults(data.results);
        setEditingResult(null);
      } else {
        alert('Failed to save result.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSaveRecord = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingRecord) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...editingRecord, type: 'record' }),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/results');
        const data = await fetchRes.json();
        if (data.records) setRecords(data.records);
        setEditingRecord(null);
      } else {
        alert('Failed to save record.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, type: 'result' | 'record') => {
    if (!confirm('Are you sure you want to delete this record?')) return;

    try {
      const res = await fetch(`/api/admin/results?id=${id}&type=${type}`, { method: 'DELETE' });
      if (res.ok) {
        if (type === 'record') {
          setRecords(records.filter((r) => r.id !== id));
        } else {
          setResults(results.filter((r) => r.id !== id));
        }
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Competitions Results & Hall of Records</h1>
          <p className="text-gray-500 text-xs">
            Manage official tournament podium finishers, medal standings, and historic national champion records.
          </p>
        </div>
        <div className="flex space-x-2">
          {tab === 'results' ? (
            <button
              onClick={() =>
                setEditingResult({
                  year: new Date().getFullYear(),
                  category: 'National Championship',
                  division: 'Senior',
                  weight_class: '-68kg',
                  gender: 'Male',
                  gold_athlete: '',
                  silver_athlete: '',
                  bronze_athlete_1: '',
                  bronze_athlete_2: '',
                })
              }
              className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Podium Result</span>
            </button>
          ) : (
            <button
              onClick={() =>
                setEditingRecord({
                  year: new Date().getFullYear(),
                  division: 'Senior',
                  weight_class: '-68kg',
                  gender: 'Male',
                  champion_name: '',
                  club_name: '',
                  region: 'Dar es Salaam',
                })
              }
              className="inline-flex items-center space-x-2 bg-brand-blue hover:bg-blue-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm"
            >
              <Plus className="w-4 h-4" />
              <span>Add Historic Champion</span>
            </button>
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex space-x-2 border-b border-gray-200 pb-2">
        <button
          onClick={() => setTab('results')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            tab === 'results' ? 'bg-[#0B2A4A] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Tournament Results ({results.length})
        </button>
        <button
          onClick={() => setTab('records')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
            tab === 'records' ? 'bg-[#0B2A4A] text-white' : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          National Champions Records ({records.length})
        </button>
      </div>

      {/* Result Edit Modal */}
      {editingResult && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-8">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingResult.id ? 'Edit Result' : 'Add Tournament Result'}
            </h2>
            <form onSubmit={handleSaveResult} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Year</label>
                  <input
                    type="number"
                    required
                    value={editingResult.year || 2025}
                    onChange={(e) => setEditingResult({ ...editingResult, year: parseInt(e.target.value, 10) })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Tournament Category</label>
                  <input
                    type="text"
                    required
                    value={editingResult.category || 'National Championship'}
                    onChange={(e) => setEditingResult({ ...editingResult, category: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Division</label>
                  <select
                    value={editingResult.division || 'Senior'}
                    onChange={(e) => setEditingResult({ ...editingResult, division: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Cadet">Cadet</option>
                    <option value="Para">Para</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Gender</label>
                  <select
                    value={editingResult.gender || 'Male'}
                    onChange={(e) => setEditingResult({ ...editingResult, gender: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Weight Class</label>
                  <input
                    type="text"
                    required
                    value={editingResult.weight_class || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, weight_class: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-amber-700 font-bold mb-1">🥇 Gold Medalist *</label>
                <input
                  type="text"
                  required
                  value={editingResult.gold_athlete || ''}
                  onChange={(e) => setEditingResult({ ...editingResult, gold_athlete: e.target.value })}
                  className="w-full bg-amber-50/50 border border-amber-200 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-slate-700 font-bold mb-1">🥈 Silver Medalist *</label>
                <input
                  type="text"
                  required
                  value={editingResult.silver_athlete || ''}
                  onChange={(e) => setEditingResult({ ...editingResult, silver_athlete: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-orange-700 font-bold mb-1">🥉 Bronze Medalist 1</label>
                  <input
                    type="text"
                    value={editingResult.bronze_athlete_1 || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, bronze_athlete_1: e.target.value })}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-orange-700 font-bold mb-1">🥉 Bronze Medalist 2</label>
                  <input
                    type="text"
                    value={editingResult.bronze_athlete_2 || ''}
                    onChange={(e) => setEditingResult({ ...editingResult, bronze_athlete_2: e.target.value })}
                    className="w-full bg-orange-50/50 border border-orange-200 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingResult(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-green text-white rounded-xl font-bold"
                >
                  Save Result
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Edit Modal */}
      {editingRecord && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingRecord.id ? 'Edit Champion Record' : 'Add Historic Champion'}
            </h2>
            <form onSubmit={handleSaveRecord} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Year</label>
                  <input
                    type="number"
                    required
                    value={editingRecord.year || 2025}
                    onChange={(e) => setEditingRecord({ ...editingRecord, year: parseInt(e.target.value, 10) })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Division</label>
                  <select
                    value={editingRecord.division || 'Senior'}
                    onChange={(e) => setEditingRecord({ ...editingRecord, division: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    <option value="Senior">Senior</option>
                    <option value="Junior">Junior</option>
                    <option value="Cadet">Cadet</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Gender</label>
                  <select
                    value={editingRecord.gender || 'Male'}
                    onChange={(e) => setEditingRecord({ ...editingRecord, gender: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Weight Class</label>
                  <input
                    type="text"
                    required
                    value={editingRecord.weight_class || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, weight_class: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">National Champion Name *</label>
                <input
                  type="text"
                  required
                  value={editingRecord.champion_name || ''}
                  onChange={(e) => setEditingRecord({ ...editingRecord, champion_name: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-bold text-[#0B2A4A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Club / Academy</label>
                  <input
                    type="text"
                    value={editingRecord.club_name || ''}
                    onChange={(e) => setEditingRecord({ ...editingRecord, club_name: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Region</label>
                  <input
                    type="text"
                    value={editingRecord.region || 'Dar es Salaam'}
                    onChange={(e) => setEditingRecord({ ...editingRecord, region: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingRecord(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-blue text-white rounded-xl font-bold"
                >
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Content tables */}
      {tab === 'results' ? (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[#0B2A4A]">
                <th className="py-3 px-4 font-bold uppercase text-[10px]">Year / Category</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">Division & Weight</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">🥇 Gold</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">🥈 Silver</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">🥉 Bronze</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {results.map((r) => (
                <tr key={r.id} className="hover:bg-gray-50/80">
                  <td className="py-3 px-4">
                    <span className="font-bold text-[#0B2A4A]">{r.year}</span>
                    <span className="block text-gray-400 text-[11px]">{r.category}</span>
                  </td>
                  <td className="py-3 px-4 font-mono">
                    <span className="font-semibold text-gray-700">{r.division} ({r.gender})</span>
                    <span className="block text-brand-blue font-bold">{r.weight_class}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-700">{r.gold_athlete}</td>
                  <td className="py-3 px-4 font-semibold text-slate-700">{r.silver_athlete}</td>
                  <td className="py-3 px-4 text-orange-700">
                    <div>{r.bronze_athlete_1}</div>
                    {r.bronze_athlete_2 && <div className="text-[11px]">{r.bronze_athlete_2}</div>}
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingResult(r)}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(r.id, 'result')}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-[#0B2A4A]">
                <th className="py-3 px-4 font-bold uppercase text-[10px]">Year</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">Division & Weight</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">Champion Athlete</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px]">Club / Region</th>
                <th className="py-3 px-4 font-bold uppercase text-[10px] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-gray-50/80">
                  <td className="py-3 px-4 font-bold text-[#0B2A4A]">{rec.year}</td>
                  <td className="py-3 px-4 font-mono">
                    <span className="font-semibold text-gray-700">{rec.division} ({rec.gender})</span>
                    <span className="block text-brand-blue font-bold">{rec.weight_class}</span>
                  </td>
                  <td className="py-3 px-4 font-bold text-amber-700">{rec.champion_name}</td>
                  <td className="py-3 px-4 text-gray-600">
                    {rec.club_name && <span>{rec.club_name}, </span>}
                    <span className="text-gray-400">{rec.region}</span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button
                      onClick={() => setEditingRecord(rec)}
                      className="text-brand-blue font-bold hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(rec.id, 'record')}
                      className="text-red-500 font-bold hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
