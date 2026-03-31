import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const ADMIN_PASSWORD = 'annalise!123'; // From CLAUDE.md specs

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('admin_authenticated', 'true');
      navigate('/admin/dashboard');
    } else {
      setError(true);
      setPassword('');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-near-black relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute w-[600px] h-[600px] rounded-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.12]"
        style={{
          background: 'radial-gradient(circle, rgba(164,189,224,1), transparent 70%)'
        }}
      ></div>

      {/* Login Card */}
      <div className="relative w-full max-w-[400px] px-11 py-13 bg-white/[0.04] border border-white/10 rounded-md backdrop-blur-[8px] text-center mx-4">
        <div className="font-display text-[1.8rem] font-bold text-white mb-1">
          Annalise
        </div>
        <div className="text-[0.7rem] tracking-[0.2em] uppercase text-accent font-medium mb-9">
          Admin Panel
        </div>
        <h2 className="font-display text-[1.2rem] text-white mb-7 font-bold">
          Welcome back
        </h2>

        <form onSubmit={handleLogin}>
          <div className="mb-[18px] text-left">
            <label className="block text-[0.72rem] tracking-[0.12em] uppercase text-white/50 font-semibold mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              placeholder="Enter your password"
              autoComplete="current-password"
              className="w-full px-4 py-[13px] bg-white/[0.07] border border-white/[0.12] rounded-[3px] text-white font-body text-[0.95rem] outline-none transition-colors focus:border-accent placeholder:text-white/25"
            />
          </div>

          <button
            type="submit"
            className="w-full py-[14px] bg-accent text-near-black border-none rounded-[3px] font-body text-[0.82rem] font-semibold tracking-[0.1em] uppercase cursor-pointer mt-2 transition-colors hover:bg-accent-light"
          >
            Sign In
          </button>

          {error && (
            <p className="mt-[14px] text-[0.82rem] text-[#ff6b6b]">
              Incorrect password. Try again.
            </p>
          )}
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;
