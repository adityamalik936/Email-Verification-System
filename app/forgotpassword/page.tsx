"use client";

import axios from "axios";
import { useState } from "react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const sendEmail = async () => {
    try {
      const response = await axios.post("/api/forgotpassword", { email });

      alert(response.data.message);
    } catch (error: any) {
      alert(error.response.data.error);
    }
  };

  return (
    <div>
      <h1>Forgot Password</h1>

      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button onClick={sendEmail}>Send Reset Link</button>
    </div>
  );
}
