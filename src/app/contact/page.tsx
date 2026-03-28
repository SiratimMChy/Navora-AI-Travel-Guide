"use client";
import { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import Swal from "sweetalert2";

export default function ContactPage() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    Swal.fire("Message Sent!", "We'll get back to you within 24 hours.", "success");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="bg-sky-800 dark:bg-sky-950 text-white py-16 px-4 text-center">
        <h1 className="text-5xl font-bold mb-3">Contact Us</h1>
        <p className="text-sky-100 text-lg">We&apos;d love to hear from you. Send us a message!</p>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Info */}
        <div className="space-y-6">
          {[
            { icon: FaEnvelope, title: "Email Us", value: "hello@navora.travel", color: "text-sky-500 bg-sky-500/10" },
            { icon: FaPhone, title: "Call Us", value: "+1 (555) 000-0000", color: "text-teal-500 bg-teal-500/10" },
            { icon: FaMapMarkerAlt, title: "Visit Us", value: "123 Travel St, San Francisco, CA", color: "text-purple-500 bg-purple-500/10" },
          ].map(({ icon: Icon, title, value, color }) => (
            <div key={title} className="bg-base-200 border border-base-300 rounded-2xl p-6 shadow-md flex items-center gap-4">
              <div className={`p-4 rounded-full ${color}`}><Icon size={22} /></div>
              <div><p className="font-bold text-base-content">{title}</p><p className="text-base-content/60 text-sm">{value}</p></div>
            </div>
          ))}
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 bg-base-200 border border-base-300 rounded-2xl p-8 shadow-md space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-base-content mb-1">Full Name</label>
              <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content"
                placeholder="Your name" required />
            </div>
            <div>
              <label className="block text-sm font-semibold text-base-content mb-1">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content"
                placeholder="Your email" required />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">Subject</label>
            <input value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })}
              className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 bg-base-100 text-base-content"
              placeholder="How can we help?" required />
          </div>
          <div>
            <label className="block text-sm font-semibold text-base-content mb-1">Message</label>
            <textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full px-4 py-3 border border-base-300 rounded-xl outline-none focus:ring-2 focus:ring-sky-500 resize-none bg-base-100 text-base-content"
              rows={5} placeholder="Tell us more..." required />
          </div>
          <button type="submit" className="w-full btn btn-primary text-white py-3 text-lg rounded-xl">Send Message</button>
        </form>
      </div>
    </div>
  );
}
