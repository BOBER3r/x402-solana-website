import Link from "next/link";

const footerNavigation = {
  product: [
    { name: "Documentation", href: "/docs" },
    { name: "Architecture", href: "/architecture" },
    { name: "Demo", href: "/demo" },
  ],
  resources: [
    { name: "Getting Started", href: "/docs/getting-started" },
    { name: "Hackathon", href: "/hackathon" },
    { name: "GitHub", href: "https://github.com/x402-solana" },
  ],
  packages: [
    { name: "@x402-solana/server", href: "https://www.npmjs.com/package/@x402-solana/server" },
    { name: "@x402-solana/client", href: "https://www.npmjs.com/package/@x402-solana/client" },
    { name: "@x402-solana/core", href: "https://www.npmjs.com/package/@x402-solana/core" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xl font-bold tracking-tight mb-4">
              x<span className="text-primary">402-solana</span>
            </h3>
            <p className="text-sm text-muted max-w-xs">
              Payment channel protocol for HTTP APIs on Solana. Built for developers who need efficient micropayments.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {footerNavigation.product.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerNavigation.resources.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-muted hover:text-foreground transition-colors"
                    {...(item.href.startsWith("http") && {
                      target: "_blank",
                      rel: "noopener noreferrer",
                    })}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold mb-4">NPM Packages</h4>
            <ul className="space-y-3">
              {footerNavigation.packages.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-muted hover:text-foreground transition-colors font-mono"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-xs text-muted text-center">
            &copy; {new Date().getFullYear()} x402. Built for Solana hackathon.
          </p>
        </div>
      </div>
    </footer>
  );
}
