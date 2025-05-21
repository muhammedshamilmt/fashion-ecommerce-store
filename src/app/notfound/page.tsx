'use client'

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import Link from "next/link";

const NotFound = () => {
  const pathname = usePathname();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      pathname
    );
  }, [pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <div className="text-center">
        <h1 className="text-6xl font-bold mb-4 text-[#2B3972]">404</h1>
        <p className="text-xl text-[#2B3972]/80 mb-6">Oops! Page not found</p>
        <Link href="/" className="bg-[#3FB185] hover:bg-[#3FB185]/80 text-white py-2 px-6 rounded-lg transition-colors duration-300">
          Return to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
