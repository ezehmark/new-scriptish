'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { authService } from '@/lib/authService';

export const dynamic='force-dynamic';
export default function VerifyEmailPage() {
 
  const router = useRouter();
  const[code,setCode]=useState('')
 const[email,setEmail]=useState('')
 
useEffect(()=>{
  const params = new URLSearchParams(window.location.search);
  const codeParam =  params.get('code')
  setCode(codeParam);
  setEmail(params.get(email))
},[])
  const [tempTokenInput, setTempTokenInput] = useState('');
  const [status, setStatus] = useState<'idle'|'verifying'|'success'|'error'>('idle');
  const [error, setError] = useState('');

  useEffect(() => {
    // Auto-verify when code/email present and temporary token stored
    const tryAutoVerify = async () => {
      if (!code || !email) return;
      const stored = typeof window !== 'undefined' ? localStorage.getItem('temporaryToken') : null;
      if (!stored) return;

      setStatus('verifying');
      try {
        const result = await authService.verifyEmail({ email, verificationCode: code });
        setStatus('success');
        const localHospitalId = typeof window !== 'undefined' ? localStorage.getItem('hospitalId') : null;
        if (result?.hospitalId || localHospitalId) {
          router.push('/hospital-dashboard');
        } else if (result?.clinicId || localHospitalId === null) {
          router.push('/dashboard');
        } else {
          router.push('/dashboard');
        }
      } catch (err: any) {
        setError(err?.message || 'Verification failed');
        setStatus('error');
      }
    };

    tryAutoVerify();
  }, [code, email, router]);

  const handleManualVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!code || !email) {
      setError('Missing code or email in the link.');
      return;
    }

    if (tempTokenInput) {
      localStorage.setItem('temporaryToken', tempTokenInput);
    }

    const token = localStorage.getItem('temporaryToken');
    if (!token) {
      setError('No temporary token found. Paste the temporary token from your registration or register on this device.');
      return;
    }

    setStatus('verifying');
    try {
      const result = await authService.verifyEmail({ email, verificationCode: code });
      setStatus('success');
      const localHospitalId = typeof window !== 'undefined' ? localStorage.getItem('hospitalId') : null;
      if (result?.hospitalId || localHospitalId) {
        router.push('/hospital-dashboard');
      } else {
        router.push('/dashboard');
      }
    } catch (err: any) {
      setError(err?.message || 'Verification failed');
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-white/50 backdrop-blur p-6 rounded-lg shadow">
        <h1 className="text-2xl font-semibold mb-4">Verify your email</h1>

        {status === 'verifying' && <p>Verifying…</p>}

        {status === 'success' && <p className="text-green-600">Email verified. Redirecting…</p>}

        {status !== 'success' && (
          <form onSubmit={handleManualVerify} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input value={email} readOnly className="w-full mt-1 p-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Verification Code</label>
              <input value={code} readOnly className="w-full mt-1 p-2 border rounded" />
            </div>

            <div>
              <label className="block text-sm font-medium">Temporary Token (paste if not on original device)</label>
              <input
                value={tempTokenInput}
                onChange={e => setTempTokenInput(e.target.value)}
                placeholder="Paste temporary token here"
                className="w-full mt-1 p-2 border rounded"
              />
            </div>

            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-accent text-white rounded disabled:opacity-60"
                disabled={status === 'verifying'}
              >
                Verify Email
              </button>

              <button
                type="button"
                className="px-4 py-2 border rounded"
                onClick={() => router.push('/register')}
              >
                Back to Register
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
