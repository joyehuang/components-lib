import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col" style={{ background: 'var(--color-background)', color: 'var(--color-foreground)' }}>
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-sm" style={{ borderBottom: '1px solid var(--color-border)', background: 'var(--color-background)' }}>
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold" style={{ color: 'var(--color-foreground)' }}>
            Components
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/docs"
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--color-muted-foreground)' }}
              onMouseEnter={(e) => e.currentTarget.style.color = 'var(--color-foreground)'}
              onMouseLeave={(e) => e.currentTarget.style.color = 'var(--color-muted-foreground)'}
            >
              Documentation
            </Link>
            <Link
              href="/docs"
              className="rounded-full px-4 py-2 text-sm font-medium transition-all"
              style={{
                background: 'var(--color-foreground)',
                color: 'var(--color-background)',
              }}
            >
              Browse Components
            </Link>
            <ThemeToggle />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight md:text-6xl" style={{ color: 'var(--color-foreground)' }}>
              Beautiful Components
              <br />
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: 'linear-gradient(to right, var(--color-foreground), var(--color-muted-foreground))'
                }}
              >
                Copy & Paste
              </span>
            </h1>
            <p className="mb-8 text-lg md:text-xl" style={{ color: 'var(--color-muted-foreground)' }}>
              A curated collection of hand-crafted components. Inspired by the best designs,
              built with care, and ready to use in your projects.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition-all"
                style={{
                  background: 'var(--color-foreground)',
                  color: 'var(--color-background)'
                }}
              >
                Get Started
              </Link>
              <Link
                href="/docs"
                className="flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition-all"
                style={{
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-foreground)'
                }}
              >
                View Components
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-24" style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-muted)' }}>
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'var(--color-foreground)' }}>
                  <svg
                    className="h-6 w-6"
                    style={{ color: 'var(--color-background)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Copy & Paste
                </h3>
                <p style={{ color: 'var(--color-muted-foreground)' }}>
                  Just like shadcn/ui. Copy the code directly into your project. No npm packages, no lock-in.
                </p>
              </div>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'var(--color-foreground)' }}>
                  <svg
                    className="h-6 w-6"
                    style={{ color: 'var(--color-background)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Fully Customizable
                </h3>
                <p style={{ color: 'var(--color-muted-foreground)' }}>
                  Own the code. Modify, adapt, and make it yours. No restrictions, just pure flexibility.
                </p>
              </div>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg" style={{ background: 'var(--color-foreground)' }}>
                  <svg
                    className="h-6 w-6"
                    style={{ color: 'var(--color-background)' }}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold" style={{ color: 'var(--color-foreground)' }}>
                  Learn by Example
                </h3>
                <p style={{ color: 'var(--color-muted-foreground)' }}>
                  Study well-crafted components. Understand patterns. Build your component library knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold" style={{ color: 'var(--color-foreground)' }}>
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg" style={{ color: 'var(--color-muted-foreground)' }}>
              Browse the components, copy what you need, and start building.
            </p>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full px-8 text-sm font-medium transition-all"
              style={{
                background: 'var(--color-foreground)',
                color: 'var(--color-background)'
              }}
            >
              View Documentation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="py-8" style={{ borderTop: '1px solid var(--color-border)' }}>
        <div className="container mx-auto max-w-7xl px-6">
          <p className="text-center text-sm" style={{ color: 'var(--color-muted-foreground)' }}>
            Built with Next.js, Tailwind CSS, and Fumadocs
          </p>
        </div>
      </footer>
    </div>
  );
}
