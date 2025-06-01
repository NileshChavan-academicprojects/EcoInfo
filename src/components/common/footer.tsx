
"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-background text-foreground py-6 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} EcoInfo. All rights reserved.</p>
        <nav className="flex gap-4 mt-4 md:mt-0">
          <Link href="/privacy-policy" className="hover:text-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:text-primary transition-colors">
            Terms of Service
          </Link>
        </nav>
      </div>
    </footer>
  );
}
