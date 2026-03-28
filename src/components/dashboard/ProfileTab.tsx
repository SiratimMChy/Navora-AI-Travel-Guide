"use client";
import { useState, useRef, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";
import axios from "axios";
import { FaCamera, FaEdit, FaSave, FaTimes } from "react-icons/fa";
import Image from "next/image";

type ProfileData = { name: string; email: string; image?: string; role?: string };

export default function ProfileTab() {
  const { data: session, update } = useSession();
  const user = session?.user as ProfileData & { id?: string } | undefined;

  const [isEditing, setIsEditing] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [name, setName] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user?.name) setName(user.name);
  }, [user?.name]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setPreview(URL.createObjectURL(file));
  };

  const handleCancel = () => {
    setIsEditing(false);
    setPreview(null);
    setName(user?.name || "");
    if (fileRef.current) fileRef.current.value = "";
  };

  const toBase64 = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve((reader.result as string).split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleSave = async () => {
    setUploading(true);
    try {
      let imageUrl = user?.image || "";

      const file = fileRef.current?.files?.[0];
      if (file) {
        const imgbbKey = process.env.NEXT_PUBLIC_IMGBB_API_KEY;
        if (!imgbbKey || imgbbKey === "your_imgbb_api_key_here") {
          toast.error("ImgBB API key not configured.");
        } else {
          const base64 = await toBase64(file);
          const fd = new FormData();
          fd.append("image", base64);
          const imgRes = await axios.post(`https://api.imgbb.com/1/upload?key=${imgbbKey}`, fd);
          imageUrl = imgRes.data.data.display_url;
        }
      }

      const res = await fetch(`/api/users/${user?.email}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: imageUrl }),
      });
      if (!res.ok) throw new Error("DB update failed");

      await update({ name, image: imageUrl });

      setIsEditing(false);
      setPreview(null);
      if (fileRef.current) fileRef.current.value = "";
      toast.success("Profile updated successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to update profile.");
    } finally {
      setUploading(false);
    }
  };

  const avatarSrc = preview || user?.image || "";

  return (
    <div className="bg-base-200 border border-base-300 rounded-2xl shadow-md p-6 md:p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-base-content mb-1">My Profile</h2>
        <p className="text-base-content/40 text-sm">Manage your account information</p>
      </div>

      {/* Avatar + info — always visible, never inside a form */}
      <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
        <div className="relative shrink-0">
          <div className="w-28 h-28 rounded-full ring-4 ring-sky-400 ring-offset-2 overflow-hidden bg-sky-100 flex items-center justify-center">
            {avatarSrc ? (
              <Image src={avatarSrc} alt="avatar" width={112} height={112}
                className="object-cover w-full h-full" unoptimized={!!preview} />
            ) : (
              <span className="text-4xl font-bold text-sky-500">
                {user?.name?.[0]?.toUpperCase() || "U"}
              </span>
            )}
          </div>
          {isEditing && (
            <button type="button" onClick={() => fileRef.current?.click()}
              className="absolute bottom-0 right-0 bg-sky-500 text-white rounded-full p-2 shadow-lg hover:bg-sky-600 transition-colors">
              <FaCamera size={14} />
            </button>
          )}
          <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
        </div>

        <div className="text-center md:text-left">
          <h3 className="text-2xl font-bold text-base-content">{user?.name || "User"}</h3>
          <p className="text-base-content/50">{user?.email}</p>
          <span className="badge bg-sky-500 text-white border-0 mt-2 capitalize">{user?.role || "user"}</span>
        </div>
      </div>

      {/* Fields */}
      <div className="space-y-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-base-content/70 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              disabled={!isEditing}
              className={`w-full px-4 py-3 border rounded-xl outline-none transition-all ${
                isEditing
                  ? "border-base-300 focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-base-100 text-base-content"
                  : "border-base-300 bg-base-300 text-base-content/50 cursor-not-allowed"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-base-content/70 mb-1">Email Address</label>
            <input type="email" value={user?.email || ""} disabled
              className="w-full px-4 py-3 border border-base-300 rounded-xl bg-base-300 text-base-content/50 cursor-not-allowed" />
          </div>

          <div>
            <label className="block text-sm font-semibold text-base-content/70 mb-1">Role</label>
            <input value={user?.role || "user"} disabled
              className="w-full px-4 py-3 border border-base-300 rounded-xl bg-base-300 text-base-content/50 cursor-not-allowed capitalize" />
          </div>

          {isEditing && (
            <div>
              <label className="block text-sm font-semibold text-base-content/70 mb-1">Profile Photo</label>
              <button type="button" onClick={() => fileRef.current?.click()}
                className="w-full px-4 py-3 border-2 border-dashed border-base-300 rounded-xl text-base-content/40 hover:border-sky-400 hover:text-sky-500 transition-colors text-sm">
                {preview ? "Photo selected ✓" : "Click to upload new photo"}
              </button>
            </div>
          )}
        </div>

        {/* Action buttons — no form wrapper, no accidental submit */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-base-300">
          {!isEditing ? (
            <button type="button" onClick={() => setIsEditing(true)}
              className="btn btn-primary text-white gap-2 flex-1 sm:flex-none px-8">
              <FaEdit /> Edit Profile
            </button>
          ) : (
            <>
              <button type="button" onClick={handleSave} disabled={uploading}
                className="btn bg-green-500 hover:bg-green-600 text-white border-0 gap-2 flex-1 sm:flex-none px-8 disabled:opacity-60">
                {uploading
                  ? <><span className="loading loading-spinner loading-sm" /> Saving...</>
                  : <><FaSave /> Save Changes</>}
              </button>
              <button type="button" onClick={handleCancel}
                className="btn btn-ghost gap-2 flex-1 sm:flex-none px-8">
                <FaTimes /> Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
