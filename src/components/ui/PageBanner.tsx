import React from 'react';

interface PageBannerProps {
  title: string;
  description: React.ReactNode;
  children?: React.ReactNode;
}

export default function PageBanner({ title, description, children }: PageBannerProps) {
  return (
    <div className="relative overflow-hidden bg-base-100 py-16 sm:py-24 px-4 text-center border-b border-base-300">
      {/* Background glowing effects */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-sky-500/10 dark:bg-sky-500/5 rounded-full blur-[100px] opacity-70 pointer-events-none" />
      <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-teal-500/10 dark:bg-teal-500/5 rounded-full blur-[80px] pointer-events-none" />
      
      {/* Grid Pattern overlay for texture */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none"></div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-5 tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">{title}</span>
        </h1>
        <p className="text-lg sm:text-xl text-base-content/70 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  );
}
