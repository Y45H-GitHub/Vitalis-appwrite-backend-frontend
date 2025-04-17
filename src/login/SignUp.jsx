import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, Mail, Lock, User } from "lucide-react";
import logo from "../assets/icon.png";
import { authService } from "../services/auth";
import { useEffect } from "react";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      try {
        await authService.logout();
      } catch (e) {
        console.log("No session to clear on page load.");
      }
    })();
  }, []);

  const handleSignUp = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setIsLoading(false);
      return;
    }

    try {
      // ✅ Try to log out any existing session safely
      try {
        await authService.logout();
      } catch (logoutErr) {
        console.warn("No session to log out:", logoutErr.message);
      }

      // ✅ Optional: Delay to ensure session clears before continuing
      await new Promise((resolve) => setTimeout(resolve, 300));

      // ✅ Now create account
      await authService.createAccount(email, password, name);

      // ✅ And log in immediately
      await authService.login(email, password);

      const user = await authService.getCurrentUser();
      if (user) {
        localStorage.setItem("username", user.name);
        navigate("/dashboard");
      } else {
        setError("Failed to get user details");
      }
    } catch (error) {
      console.error("Signup error:", error);

      if (error.message.includes("already exists")) {
        setError("Email is already registered. Please use a different email.");
      } else {
        setError(error.message || "Failed to create account");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0e1d12] px-4">
      <div className="absolute top-4 left-4 m-4">
        <img
          src={logo}
          alt="Home"
          className="h-10 w-10 cursor-pointer hover:scale-105 transition-transform duration-200 shadow-md rounded-full"
          onClick={() => navigate("/")}
          title="Go to Home"
        />
      </div>
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm bg-[#112e1a] p-8 rounded-xl shadow-lg space-y-6"
      >
        {/* <div className="flex justify-center mb-2">
          <img
            src={logo}
            alt="Vitalis Logo"
            className="h-12 w-12 rounded-full shadow-md"
          />
        </div> */}

        <h2 className="text-3xl font-bold text-center text-green-400">
          Create Account
        </h2>

        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="block mb-1 text-sm font-medium text-green-300">
            Full Name
          </label>
          <div className="relative">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-10 py-2 border border-green-700 rounded-md bg-transparent text-green-100 placeholder:text-green-500 focus:outline-none focus:ring-2 focus:ring-green-400"
              placeholder="Enter your full name"
              required
            />
            <User
              className="absolute left-3 top-2.5 text-green-500"
              size={18}
            />
          </div>
        </div>

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
              placeholder="Create a password"
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
          <p className="text-xs text-green-400 mt-1">
            Password must be at least 8 characters
          </p>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold py-2 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Creating Account..." : "Sign Up"}
        </button>

        <div className="text-sm text-center text-green-300 mt-4">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-green-400 font-medium hover:underline cursor-pointer"
          >
            Log In
          </span>
        </div>
        <div
          className="text-sm text-center text-green-300 mt-4 underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Go Back to Home
        </div>
      </form>
    </div>
  );
};

export default SignUp;
