"use client";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import Swal from "sweetalert2";

export default function SettingsTab() {
  const [settings, setSettings] = useState({ siteName: "Navora", supportEmail: "support@navora.travel", maxBookingsPerUser: 10, maintenanceMode: false });

  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md p-6 space-y-6">
      <h2 className="text-xl font-bold text-base-content">Platform Settings</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-semibold text-base-content/70 mb-1">Site Name</label>
          <input value={settings.siteName} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })}
            className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-base-content/70 mb-1">Support Email</label>
          <input type="email" value={settings.supportEmail} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })}
            className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
        </div>
        <div>
          <label className="block text-sm font-semibold text-base-content/70 mb-1">Max Bookings per User</label>
          <input type="number" value={settings.maxBookingsPerUser} onChange={(e) => setSettings({ ...settings, maxBookingsPerUser: Number(e.target.value) })}
            className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content" />
        </div>
        <div className="flex items-center gap-4 pt-6">
          <label className="text-sm font-semibold text-base-content/70">Maintenance Mode</label>
          <input type="checkbox" checked={settings.maintenanceMode} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked })} className="toggle toggle-warning" />
          <span className={`text-xs font-semibold ${settings.maintenanceMode ? "text-orange-500" : "text-base-content/40"}`}>{settings.maintenanceMode ? "ON" : "OFF"}</span>
        </div>
      </div>
      <div className="border-t border-base-300 pt-5">
        <h3 className="text-base font-bold text-base-content mb-4">Danger Zone</h3>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => Swal.fire("Info", "Cache cleared successfully.", "success")} className="btn btn-outline btn-sm">Clear Cache</button>
          <button onClick={() => Swal.fire("Warning", "This would reset all analytics data.", "warning")} className="btn btn-outline btn-error btn-sm">Reset Analytics</button>
        </div>
      </div>
      <button onClick={() => Swal.fire("Saved!", "Settings updated successfully.", "success")} className="btn btn-primary text-white gap-2">
        <FaSave /> Save Settings
      </button>
    </div>
  );
}
