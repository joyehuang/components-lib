import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link href="/" className="text-xl font-bold">
            Components
          </Link>
          <nav className="flex items-center gap-6">
            <Link
              href="/docs"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Documentation
            </Link>
            <ThemeToggle />
            <Link
              href="/docs"
              className="rounded-full bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              Browse Components
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-5xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 md:text-6xl">
              Beautiful Components
              <br />
              <span className="bg-gradient-to-r from-zinc-900 to-zinc-600 bg-clip-text text-transparent dark:from-zinc-50 dark:to-zinc-400">
                Copy & Paste
              </span>
            </h1>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400 md:text-xl">
              A curated collection of hand-crafted components. Inspired by the best designs,
              built with care, and ready to use in your projects.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
              >
                Get Started
              </Link>
              <Link
                href="/docs"
                className="flex h-12 items-center justify-center rounded-full border border-zinc-200 px-8 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
              >
                View Components
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-zinc-200 bg-zinc-50 py-24 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50">
                  <svg
                    className="h-6 w-6 text-white dark:text-zinc-900"
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
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Copy & Paste
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Just like shadcn/ui. Copy the code directly into your project. No npm packages, no lock-in.
                </p>
              </div>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50">
                  <svg
                    className="h-6 w-6 text-white dark:text-zinc-900"
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
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Fully Customizable
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Own the code. Modify, adapt, and make it yours. No restrictions, just pure flexibility.
                </p>
              </div>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-zinc-900 dark:bg-zinc-50">
                  <svg
                    className="h-6 w-6 text-white dark:text-zinc-900"
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
                <h3 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-50">
                  Learn by Example
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400">
                  Study well-crafted components. Understand patterns. Build your component library knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-zinc-50">
              Ready to get started?
            </h2>
            <p className="mb-8 text-lg text-zinc-600 dark:text-zinc-400">
              Browse the components, copy what you need, and start building.
            </p>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
            >
              View Documentation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-8 dark:border-zinc-800">
        <div className="container mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
            Built with Next.js, Tailwind CSS, and Fumadocs
          </p>
        </div>
      </footer>
    </div>
  );
}
