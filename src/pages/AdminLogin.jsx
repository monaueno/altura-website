import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'annalise!123'; // From CLAUDE.md specs

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setIsShaking(true);
      setPassword('');
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFC] relative overflow-hidden">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-accent/[0.02] via-transparent to-near-black/[0.02]"></div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23000000' fill-opacity='1' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`
        }}
      ></div>

      {/* Main content */}
      <div className="relative min-h-screen flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[420px]">
          {/* Logo / Branding */}
          <div className="mb-8 text-center animate-[fadeIn_0.5s_ease-out]">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-near-black rounded-xl mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-display text-[1.75rem] font-bold text-near-black mb-2 tracking-tight">
              Admin
            </h1>
            <p className="text-[0.9rem] text-near-black/50 font-body">
              Sign in to continue
            </p>
          </div>

          {/* Login form */}
          <div className="bg-white border border-near-black/[0.08] rounded-2xl p-8 shadow-[0_1px_3px_rgba(0,0,0,0.02)] animate-[fadeInUp_0.5s_ease-out_0.1s] animate-fill-both">
            <form onSubmit={handleLogin}>
              <div className="mb-5">
                <label className="block text-[0.8rem] font-medium text-near-black/70 mb-2">
                  Password
                </label>
                <div className={`relative ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError(false);
                    }}
                    placeholder="Enter password"
                    autoComplete="current-password"
                    autoFocus
                    className={`w-full px-4 py-3 bg-[#FAFAFA] border rounded-lg font-body text-[0.95rem] text-near-black outline-none transition-all duration-200 placeholder:text-near-black/30 ${
                      error
                        ? 'border-[#E63946] focus:border-[#E63946] focus:ring-2 focus:ring-[#E63946]/20'
                        : 'border-near-black/[0.08] focus:border-accent focus:ring-2 focus:ring-accent/20 focus:bg-white'
                    }`}
                  />
                  {error && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <svg className="w-5 h-5 text-[#E63946]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </div>
                  )}
                </div>
                {error && (
                  <p className="mt-2.5 text-[0.85rem] text-[#E63946] font-medium animate-[fadeIn_0.3s_ease] flex items-center gap-1.5">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    Incorrect password
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="group relative w-full py-3 bg-near-black text-white border-none rounded-lg font-body text-[0.9rem] font-medium cursor-pointer overflow-hidden transition-all duration-200 hover:bg-near-black/90 hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Sign in
                  <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>
            </form>
          </div>

          {/* Footer note */}
          <div className="mt-6 text-center animate-[fadeIn_0.5s_ease-out_0.2s] animate-fill-both">
            <p className="text-[0.8rem] text-near-black/40 leading-relaxed">
              Protected access · Not publicly linked
            </p>
          </div>
        </div>
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }

        .animate-fill-both {
          animation-fill-mode: both;
        }
      `}</style>
    </div>
  );
}

export default AdminLogin;
