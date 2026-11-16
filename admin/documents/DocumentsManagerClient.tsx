'use client';

import React, { useState } from 'react';
import { FileText, Plus, Trash2, Edit3, Download, Upload, ExternalLink } from 'lucide-react';

interface DocItem {
  id: string;
  title_en: string;
  title_sw: string;
  category: string;
  year: number;
  file_url: string;
  file_size: string;
  download_count: number;
  created_at: string;
}

interface Props {
  initialDocs: DocItem[];
}

const CATEGORIES = [
  'Statutes & Constitution',
  'Competition Rules',
  'Poomsae Rules',
  'Refereeing',
  'Integrity & Safe Sport',
  'Forms & Templates',
  'Circulars & Notices',
  'Annual Reports',
  'Grading Syllabus',
];

export default function DocumentsManagerClient({ initialDocs }: Props) {
  const [docs, setDocs] = useState<DocItem[]>(initialDocs);
  const [editingDoc, setEditingDoc] = useState<Partial<DocItem> | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    formData.append('folder', 'documents');

    try {
      const res = await fetch('/api/upload', { method: 'POST', body: formData });
      const data = await res.json();
      if (res.ok && data.url) {
        setEditingDoc((prev) => ({
          ...prev,
          file_url: data.url,
          file_size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        }));
      } else {
        alert(data.error || 'Upload failed');
      }
    } catch {
      alert('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingDoc?.title_en || !editingDoc?.file_url) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/admin/documents', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingDoc),
      });

      if (res.ok) {
        const fetchRes = await fetch('/api/admin/documents');
        const data = await fetchRes.json();
        if (data.documents) setDocs(data.documents);
        setEditingDoc(null);
      } else {
        alert('Failed to save document.');
      }
    } catch {
      alert('Network error.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Delete document "${title}"?`)) return;

    try {
      const res = await fetch(`/api/admin/documents?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        setDocs(docs.filter((d) => d.id !== id));
      } else {
        alert('Failed to delete document.');
      }
    } catch {
      alert('Network error.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-black text-[#0B2A4A]">Documents & Circulars Library</h1>
          <p className="text-gray-500 text-xs">
            Upload official PDF statutes, competition guidelines, poomsae rules, grading syllabi, and official federation circulars.
          </p>
        </div>
        <button
          onClick={() =>
            setEditingDoc({
              title_en: '',
              title_sw: '',
              category: 'Statutes & Constitution',
              year: new Date().getFullYear(),
              file_url: '',
              file_size: 'PDF',
            })
          }
          className="inline-flex items-center space-x-2 bg-brand-green hover:bg-green-700 text-white px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm self-start"
        >
          <Plus className="w-4 h-4" />
          <span>Upload New Document</span>
        </button>
      </div>

      {/* Editor Modal */}
      {editingDoc && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl my-8">
            <h2 className="text-base font-display font-bold text-[#0B2A4A]">
              {editingDoc.id ? 'Edit Document Entry' : 'Upload Official Document'}
            </h2>
            <form onSubmit={handleSave} className="space-y-3 text-xs">
              <div>
                <label className="block text-gray-600 font-bold mb-1">Document Title (English) *</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title_en || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title_en: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Document Title (Swahili) *</label>
                <input
                  type="text"
                  required
                  value={editingDoc.title_sw || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, title_sw: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Category *</label>
                  <select
                    value={editingDoc.category || 'Statutes & Constitution'}
                    onChange={(e) => setEditingDoc({ ...editingDoc, category: e.target.value })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-600 font-bold mb-1">Year</label>
                  <input
                    type="number"
                    value={editingDoc.year || new Date().getFullYear()}
                    onChange={(e) => setEditingDoc({ ...editingDoc, year: parseInt(e.target.value, 10) })}
                    className="w-full bg-gray-50 border rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Upload PDF File</label>
                <div className="flex items-center space-x-3">
                  <input
                    type="file"
                    accept=".pdf,application/pdf"
                    onChange={handleFileUpload}
                    className="text-xs file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:bg-gray-100 file:text-gray-700"
                  />
                  {uploading && <span className="text-brand-blue font-bold">Uploading PDF...</span>}
                </div>
              </div>

              <div>
                <label className="block text-gray-600 font-bold mb-1">Or Document URL / Path *</label>
                <input
                  type="text"
                  required
                  placeholder="/uploads/documents/... or https://..."
                  value={editingDoc.file_url || ''}
                  onChange={(e) => setEditingDoc({ ...editingDoc, file_url: e.target.value })}
                  className="w-full bg-gray-50 border rounded-xl px-3 py-2 font-mono text-[11px]"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3">
                <button
                  type="button"
                  onClick={() => setEditingDoc(null)}
                  className="px-4 py-2 border rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-brand-green text-white rounded-xl font-bold"
                >
                  Save Document
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Docs List */}
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200 text-[#0B2A4A]">
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Title & Category</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Year</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">Size</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px]">File Link</th>
              <th className="py-3 px-4 font-bold uppercase text-[10px] text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {docs.map((d) => (
              <tr key={d.id} className="hover:bg-gray-50/80">
                <td className="py-3 px-4">
                  <div className="font-bold text-[#0B2A4A]">{d.title_en}</div>
                  <div className="text-[11px] text-gray-500 italic">{d.title_sw}</div>
                  <span className="inline-block mt-1 text-[9px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-gray-100 text-gray-700">
                    {d.category}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-bold text-gray-600">{d.year || '-'}</td>
                <td className="py-3 px-4 text-gray-500">{d.file_size || 'PDF'}</td>
                <td className="py-3 px-4">
                  <a
                    href={d.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-brand-blue hover:underline font-mono text-[11px]"
                  >
                    <span>View</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </td>
                <td className="py-3 px-4 text-right space-x-2">
                  <button
                    onClick={() => setEditingDoc(d)}
                    className="text-brand-blue font-bold hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(d.id, d.title_en)}
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
    </div>
  );
}
