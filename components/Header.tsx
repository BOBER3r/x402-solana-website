"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navigation = [
  { name: "Why Payment Channels", href: "/payment-channels" },
  { name: "Docs", href: "/docs/getting-started" },
  { name: "Solana Program", href: "/architecture" },
  { name: "Live Demo", href: "/demo" },
  { name: "Hackathon", href: "/hackathon" },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="text-xl font-bold tracking-tight">
              x<span className="text-primary">402-solana</span>
            </span>
          </Link>
        </div>

        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Toggle menu</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>

        <div className="hidden lg:flex lg:gap-x-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`
                px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
                ${
                  isActive(item.href)
                    ? "bg-primary text-white"
                    : "text-muted hover:text-foreground hover:bg-blue-50"
                }
              `}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="https://github.com/BOBER3r/solana-payment-channel-kit"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-2 rounded-md text-sm font-medium text-muted hover:text-foreground hover:bg-blue-50 transition-all duration-200"
          >
            Github
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border">
          <div className="space-y-1 px-6 pb-6 pt-4">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`
                  block rounded-md px-3 py-2 text-base font-medium transition-all duration-200
                  ${
                    isActive(item.href)
                      ? "bg-primary text-white"
                      : "text-muted hover:text-foreground hover:bg-blue-50"
                  }
                `}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="https://github.com/BOBER3r"
              target="_blank"
              rel="noopener noreferrer"
              className="block rounded-md px-3 py-2 text-base font-medium text-muted hover:text-foreground hover:bg-blue-50 transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              GitHub
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
