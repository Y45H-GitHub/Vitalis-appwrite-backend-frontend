import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import logo from "../assets/icon.png";
import { authService } from "../services/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // First attempt to login
      await authService.login(email, password);

      // If login successful, get the user details
      const user = await authService.getCurrentUser();
      if (user) {
        localStorage.setItem("username", user.name);
        navigate("/dashboard");
      } else {
        setError("Failed to get user details");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError(error.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1d12] px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm bg-[#112e1a] p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* ✅ Logo on top */}
        <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="h-12 w-12 rounded-full shadow-md"
          />
        </div>

        <h2 className="text-3xl font-bold text-center text-green-400">
          Welcome Back
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium text-green-300">
            Email
          </label>
          <div className="relative">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-10 py-2 border border-green-700 rounded-md bg-transparent text-green-100 placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your email"
              required
            />
            <Mail
              className="absolute left-3 top-2.5 text-green-500"
              size={18}
            />
          </div>
        </div>

        <div>
          <label className="block mb-1 text-sm font-medium text-green-300">
            Password
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-10 py-2 border border-green-700 rounded-md bg-transparent text-green-100 placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your password"
              required
            />
            <Lock
              className="absolute left-3 top-2.5 text-green-500"
              size={18}
            />
            <button
              type="button"
              className="absolute right-3 top-2.5 text-green-500 hover:text-green-400"
              onClick={() => setShowPassword(!showPassword)}
              tabIndex={-1}
            >
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        <div className="text-sm text-green-400 text-right mb-2 cursor-pointer hover:underline">
          Forgot password?
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Logging in..." : "Login"}
        </button>

        <div className="text-sm text-center text-green-300 mt-4">
          Don't have an account?{" "}
          <span className="text-green-400 font-medium hover:underline cursor-pointer">
            Sign up
          </span>
        </div>
      </form>
    </div>
  );
};

export default Login;
