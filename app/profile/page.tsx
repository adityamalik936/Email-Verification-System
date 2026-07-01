"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);

  const logout = async () => {
    try {
      await axios.get("/api/logout");
      toast.success("Logout successful");
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get("/api/me");
      setData(res.data.data);
      toast.success("User details loaded");
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-900 via-purple-800 to-blue-900 px-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 text-white">
        {/* Avatar */}
        <div className="flex justify-center">
          <div className="w-28 h-28 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center text-5xl font-bold shadow-lg">
            👤
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center mt-6">My Profile</h1>

        <p className="text-center text-gray-300 mt-2">
          Welcome to your dashboard
        </p>

        {/* User ID Card */}
        {/* User Information */}
        <div className="mt-8 bg-white/10 rounded-xl p-4 border border-white/20">
          {data ? (
            <>
              <p className="mb-2">
                <strong>Username:</strong> {data.username}
              </p>

              <p className="mb-2">
                <strong>Email:</strong> {data.email}
              </p>

              <p className="mb-2">
                <strong>Email Verified:</strong>{" "}
                {data.isVerified ? "✅ Yes" : "❌ No"}
              </p>

              <p className="break-all">
                <strong>User ID:</strong> {data._id}
              </p>
            </>
          ) : (
            <p className="text-yellow-300">Click "Get User Details"</p>
          )}
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button
            onClick={getUserDetails}
            className="w-full bg-green-500 hover:bg-green-600 transition duration-300 py-3 rounded-xl font-semibold shadow-lg"
          >
            Get User Details
          </button>

          <button
            onClick={logout}
            className="w-full bg-red-500 hover:bg-red-600 transition duration-300 py-3 rounded-xl font-semibold shadow-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
