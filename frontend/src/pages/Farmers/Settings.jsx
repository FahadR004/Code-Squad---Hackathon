import React, { useState } from "react";

export default function Settings() {
  const [name, setName] = useState("John Farmer");
  const [email, setEmail] = useState("john@example.com");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("English");

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold mb-4">Settings</h1>

      {/* Profile Info */}
      <div className="bg-white rounded-md p-4 shadow-md space-y-3">
        <h2 className="font-semibold">Profile Information</h2>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Name</label>
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-sm">Email</label>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Change Password */}
      <div className="bg-white rounded-md p-4 shadow-md space-y-3">
        <h2 className="font-semibold">Change Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border rounded px-2 py-1 w-full focus:outline-none focus:ring-1 focus:ring-green-500"
        />
      </div>

      {/* Notifications */}
      <div className="bg-white rounded-md p-4 shadow-md flex items-center justify-between">
        <span>Enable Notifications</span>
        <input
          type="checkbox"
          checked={notifications}
          onChange={e => setNotifications(e.target.checked)}
          className="h-5 w-5 accent-green-500"
        />
      </div>

      {/* Language Toggle */}
      <div className="bg-white rounded-md p-4 shadow-md flex items-center justify-between">
        <span>Language</span>
        <select
          value={language}
          onChange={e => setLanguage(e.target.value)}
          className="border rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          <option value="English">English</option>
          <option value="Urdu">Urdu</option>
        </select>
      </div>
    </div>
  );
}
