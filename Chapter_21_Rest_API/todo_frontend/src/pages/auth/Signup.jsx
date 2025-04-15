import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigation = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    // call signup API
    navigation("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col md:flex-row">
      {/* Left side - Image (matches onboarding) */}
      <div className="md:w-1/2 h-64 md:h-auto relative overflow-hidden">
        <div className="absolute inset-0 bg-black/30 z-10"></div>
        <img
          src="https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Person signing up on laptop"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute bottom-8 left-8 z-20 text-white">
          <h1 className="text-4xl font-bold mb-2">NoteVue</h1>
          <p className="text-lg opacity-90">Join our productivity community</p>
        </div>
      </div>

      {/* Right side - Signup Form */}
      <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
        <div className="max-w-md mx-auto w-full">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg">
            <div className="text-4xl mb-6">✨</div>
            <h2 className="text-3xl font-bold text-white mb-6">
              Create Account
            </h2>

            <form onSubmit={handleSignup}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-white/80 mb-2 text-sm font-medium"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  placeholder="John Doe"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-white/80 mb-2 text-sm font-medium"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="you@example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-white/80 mb-2 text-sm font-medium"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="••••••••"
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  minLength="8"
                />
                <p className="mt-1 text-xs text-white/50">
                  Minimum 8 characters
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-white text-indigo-900 hover:bg-white/90 transition-colors py-3 px-6 rounded-lg font-semibold text-lg shadow-md mb-4"
              >
                Create Account
              </button>

              <div className="flex items-center mb-6">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-3 text-white/50 text-sm">OR</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              <button
                type="button"
                className="w-full bg-white/5 hover:bg-white/10 border border-white/20 text-white transition-colors py-3 px-6 rounded-lg font-medium text-md shadow-sm mb-4 flex items-center justify-center gap-2"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.672-4.166-2.698-6.735-2.698-5.523 0-10 4.477-10 10s4.477 10 10 10c8.396 0 10-7.496 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z" />
                </svg>
                Continue with Google
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-white/20 text-center">
              <p className="text-white/70 text-sm">
                Already have an account?{" "}
                <a href="/login" className="text-white hover:underline">
                  Sign in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
