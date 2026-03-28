import Link from "next/link";

export default function Footer() {
  return (
    <>
      <footer className="footer sm:footer-horizontal p-10" style={{ backgroundColor: "#111827", color: "#fff" }}>

        {/* Brand */}
        <aside>
          <Link href="/" className="text-3xl font-lobster font-bold bg-linear-to-r from-sky-400 to-teal-400 bg-clip-text text-transparent">
            Navora
          </Link>
          <p className="text-white/60 text-sm mt-2 leading-relaxed">
            AI-powered travel guide.<br />Explore Asia and beyond.
          </p>
          <ul className="mt-3 space-y-1 text-white/60 text-sm">
            <li>📍 Dhaka, Bangladesh</li>
            <li>📧 support@navora.com</li>
            <li>📞 +880 1700-000000</li>
          </ul>
        </aside>

        {/* Explore */}
        <nav>
          <h6 className="footer-title opacity-60">Explore</h6>
          <Link href="/explore?category=beach" className="link link-hover text-white/60 hover:text-white">Beach Getaways</Link>
          <Link href="/explore?category=mountain" className="link link-hover text-white/60 hover:text-white">Mountain Escapes</Link>
          <Link href="/explore?category=city" className="link link-hover text-white/60 hover:text-white">City Breaks</Link>
          <Link href="/explore?category=adventure" className="link link-hover text-white/60 hover:text-white">Adventure Tours</Link>
          <Link href="/explore?category=cruise" className="link link-hover text-white/60 hover:text-white">Cruises</Link>
        </nav>

        {/* Company */}
        <nav>
          <h6 className="footer-title opacity-60">Company</h6>
          <Link href="/about" className="link link-hover text-white/60 hover:text-white">About Us</Link>
          <Link href="/blog" className="link link-hover text-white/60 hover:text-white">Blog</Link>
          <Link href="/contact" className="link link-hover text-white/60 hover:text-white">Contact</Link>
        </nav>

        {/* Legal */}
        <nav>
          <h6 className="footer-title opacity-60">Legal</h6>
          <Link href="/privacy" className="link link-hover text-white/60 hover:text-white">Privacy Policy</Link>
        </nav>

      </footer>

      {/* Bottom bar */}
      <div className="text-center text-white/30 text-sm py-4 border-t border-white/10" style={{ backgroundColor: "#111827" }}>
        © {new Date().getFullYear()} Navora. All Rights Reserved.
      </div>
    </>
  );
}
