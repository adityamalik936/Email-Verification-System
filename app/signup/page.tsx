"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignupPage() {
  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const onSignup = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/signup", user);
      console.log("Signup success", response.data);
      router.push("/login");
    } catch (error: any) {
      console.log("Signup failed", error.message);

      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-900 via-indigo-800 to-purple-900 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/20">

      <h1 className="text-4xl font-bold text-center text-white mb-2">
        {loading ? "Processing..." : "Create Account"}
      </h1>

      <p className="text-center text-gray-300 mb-8">
        Sign up to get started
      </p>

      <div className="mb-5">
        <label className="block text-white mb-2">Username</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={(e) => setUser({ ...user, username: e.target.value })}
          placeholder="Enter your username"
          className="w-full p-3 rounded-lg bg-white text-black outline-none border-2 border-transparent focus:border-blue-500 transition"
        />
      </div>

      <div className="mb-5">
        <label className="block text-white mb-2">Email</label>
        <input
          id="email"
          type="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
          placeholder="Enter your email"
          className="w-full p-3 rounded-lg bg-white text-black outline-none border-2 border-transparent focus:border-blue-500 transition"
        />
      </div>

      <div className="mb-6">
        <label className="block text-white mb-2">Password</label>
        <input
          id="password"
          type="password"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
          placeholder="Enter your password"
          className="w-full p-3 rounded-lg bg-white text-black outline-none border-2 border-transparent focus:border-blue-500 transition"
        />
      </div>

      <button
        onClick={onSignup}
        disabled={buttonDisabled}
        className={`w-full p-3 rounded-lg font-semibold transition duration-300 ${
          buttonDisabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 hover:scale-105"
        } text-white`}
      >
        {loading ? "Creating Account..." : "Sign Up"}
      </button>

      <p className="text-center text-gray-300 mt-6">
        Already have an account?{" "}
        <Link
          href="/login"
          className="text-blue-300 hover:text-blue-200 font-semibold"
        >
          Login
        </Link>
      </p>

    </div>
  </div>
);
}
