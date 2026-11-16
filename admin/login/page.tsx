'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import FlagStripe from '@/components/layout/FlagStripe';
import { Lock, User, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        router.push('/admin');
        router.refresh();
      } else {
        setStatus('error');
        setErrorMsg(data.error || 'Authentication failed. Please check credentials.');
      }
    } catch (err) {
      setStatus('error');
      setErrorMsg('Network error. Please try again.');
    }
  };

  const fillQuick = (u: string, p: string) => {
    setUsername(u);
    setPassword(p);
  };

  return (
    <div className="min-h-screen bg-[#0B2A4A] flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Card */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-gray-100 text-center space-y-6">
          {/* Official Logo inside white badge */}
          <div className="w-20 h-20 mx-auto bg-white rounded-full p-2 shadow-lg border border-gray-100 flex items-center justify-center">
            <Image
              src="/assets/images/ttf-logo.png"
              alt="TTF Crest"
              width={72}
              height={72}
              className="w-full h-full object-contain"
              priority
            />
          </div>

          <div>
            <div className="text-[11px] font-bold text-brand-green uppercase tracking-wider">
              Administration Portal
            </div>
            <h1 className="font-display font-black text-2xl text-[#0B2A4A] mt-1">
              TTF Secretariat Sign In
            </h1>
            <p className="text-xs text-gray-500 mt-1">
              Authorized access for federation executives, registrars, and technical officers.
            </p>
          </div>

          <FlagStripe size="sm" />

          <form onSubmit={handleLogin} className="space-y-4 text-left text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Username or Email
              </label>
              <div className="relative">
                <User className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin / registrar / editor"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green outline-none text-xs font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-brand-green outline-none text-xs"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full py-3 bg-brand-green hover:bg-brand-greenDark text-white font-bold text-xs rounded-xl shadow-md transition-colors flex items-center justify-center space-x-1.5"
            >
              <span>{status === 'loading' ? 'Authenticating...' : 'Sign In to Portal'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {errorMsg && (
              <div className="p-3 bg-red-50 text-red-800 border border-red-200 rounded-xl text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}
          </form>

          {/* Demo Credentials Helper */}
          <div className="pt-4 border-t border-gray-100 text-left">
            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
              Demo Seed Accounts (Click to autofill):
            </span>
            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <button
                type="button"
                onClick={() => fillQuick('admin', 'Admin@TTF2026!')}
                className="p-2 rounded-lg bg-gray-50 hover:bg-green-50 text-left border border-gray-200"
              >
                <strong className="block text-[#0B2A4A]">Super Admin</strong>
                <span className="text-gray-500 font-mono">admin</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuick('registrar', 'Registrar@TTF2026!')}
                className="p-2 rounded-lg bg-gray-50 hover:bg-green-50 text-left border border-gray-200"
              >
                <strong className="block text-[#0B2A4A]">Registrar</strong>
                <span className="text-gray-500 font-mono">registrar</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuick('editor', 'Editor@TTF2026!')}
                className="p-2 rounded-lg bg-gray-50 hover:bg-green-50 text-left border border-gray-200"
              >
                <strong className="block text-[#0B2A4A]">Editor</strong>
                <span className="text-gray-500 font-mono">editor</span>
              </button>
              <button
                type="button"
                onClick={() => fillQuick('technical', 'Technical@TTF2026!')}
                className="p-2 rounded-lg bg-gray-50 hover:bg-green-50 text-left border border-gray-200"
              >
                <strong className="block text-[#0B2A4A]">Technical Dir</strong>
                <span className="text-gray-500 font-mono">technical</span>
              </button>
            </div>
          </div>
        </div>

        <div className="text-center text-xs text-gray-400">
          <Link href="/" className="hover:text-white transition-colors">
            ← Return to TTF Public Website
          </Link>
        </div>
      </div>
    </div>
  );
}
