"use client";

import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");

  const params = useSearchParams();

  const token = params.get("token");

  const resetPassword = async () => {
    try {
      const response = await axios.post("/api/resetpassword", {
        token,
        password,
      });

      alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Reset Password</h1>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={resetPassword}>Change Password</button>
    </div>
  );
}
