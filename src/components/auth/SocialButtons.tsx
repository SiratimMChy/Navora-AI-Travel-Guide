"use client";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

export const SocialButtons = () => {
  const params = useSearchParams();

  const handleSignIn = () => {
    signIn("google", { callbackUrl: params.get("callbackUrl") || "/" });
  };

  return (
    <div className="mt-4">
      <div className="relative flex items-center">
        <div className="flex-1 border-t border-base-300" />
        <span className="px-3 text-base-content/40 text-sm">OR</span>
        <div className="flex-1 border-t border-base-300" />
      </div>
      <button
        onClick={handleSignIn}
        className="w-full mt-4 flex items-center justify-center gap-3 bg-base-200 border-2 border-base-300 hover:border-sky-500 text-base-content font-semibold py-3 rounded-xl transition-all hover:shadow-md group"
      >
        <FcGoogle className="text-2xl group-hover:scale-110 transition-transform" />
        Continue with Google
      </button>
    </div>
  );
};
