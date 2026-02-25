'use client';

import Link from "next/link";
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Extract SVG icons to prevent re-creation on each render
const CopyPasteIcon = (
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
);

const CustomizableIcon = (
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
);

const LearnIcon = (
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
);

function ThemeToggleButton() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="h-9 w-9 rounded-lg border border-[var(--color-border)]" />
    );
  }

  return (
    <button
      type="button"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      className="group flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-foreground)] transition-all duration-150 hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 active:scale-95"
    >
      {theme === 'light' ? (
        <Sun className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
      ) : (
        <Moon className="h-4 w-4 transition-transform duration-150 group-hover:scale-110" />
      )}
    </button>
  );
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--color-background)] text-[var(--color-foreground)]">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link
            href="/"
            className="text-xl font-bold text-[var(--color-foreground)] transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
          >
            Components
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/docs"
              className="text-sm font-medium text-[var(--color-muted-foreground)] transition-colors duration-150 hover:text-[var(--color-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              Documentation
            </Link>
            <Link
              href="/docs"
              className="rounded-full bg-[var(--color-foreground)] px-4 py-2 text-sm font-medium text-[var(--color-background)] transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              Browse Components
            </Link>
            <ThemeToggleButton />
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-balance text-5xl font-bold leading-tight tracking-tight text-[var(--color-foreground)] md:text-6xl">
              Beautiful Components
              <br />
              <span className="bg-gradient-to-r from-[var(--color-foreground)] to-[var(--color-muted-foreground)] bg-clip-text text-transparent">
                Copy &amp; Paste
              </span>
            </h1>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)] md:text-xl">
              A curated collection of hand-crafted components. Inspired by the best designs,
              built with care, and ready to use in your projects.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/docs"
                className="flex h-12 items-center justify-center rounded-full bg-[var(--color-foreground)] px-8 text-sm font-medium text-[var(--color-background)] transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              >
                Get Started
              </Link>
              <Link
                href="/docs"
                className="flex h-12 items-center justify-center rounded-full border border-[var(--color-border)] px-8 text-sm font-medium text-[var(--color-foreground)] transition-colors duration-150 hover:bg-[var(--color-muted)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
              >
                View Components
              </Link>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="border-t border-[var(--color-border)] bg-[var(--color-muted)] py-24">
          <div className="container mx-auto max-w-7xl px-6">
            <div className="grid gap-12 md:grid-cols-3">
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-foreground)] transition-transform duration-150 hover:scale-105">
                  {CopyPasteIcon}
                </div>
                <h3 className="mb-2 text-balance text-lg font-semibold text-[var(--color-foreground)]">
                  Copy &amp; Paste
                </h3>
                <p className="text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
                  Just like shadcn/ui. Copy the code directly into your project. No&nbsp;npm packages, no&nbsp;lock-in.
                </p>
              </div>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-foreground)] transition-transform duration-150 hover:scale-105">
                  {CustomizableIcon}
                </div>
                <h3 className="mb-2 text-balance text-lg font-semibold text-[var(--color-foreground)]">
                  Fully Customizable
                </h3>
                <p className="text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
                  Own the code. Modify, adapt, and make it yours. No&nbsp;restrictions, just pure flexibility.
                </p>
              </div>
              <div>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--color-foreground)] transition-transform duration-150 hover:scale-105">
                  {LearnIcon}
                </div>
                <h3 className="mb-2 text-balance text-lg font-semibold text-[var(--color-foreground)]">
                  Learn by Example
                </h3>
                <p className="text-pretty leading-relaxed text-[var(--color-muted-foreground)]">
                  Study well-crafted components. Understand patterns. Build your component library knowledge.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="container mx-auto max-w-7xl px-6 py-24">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="mb-4 text-balance text-3xl font-bold text-[var(--color-foreground)]">
              Ready to Get Started?
            </h2>
            <p className="mb-8 text-pretty text-lg leading-relaxed text-[var(--color-muted-foreground)]">
              Browse the components, copy what you need, and start building.
            </p>
            <Link
              href="/docs"
              className="inline-flex h-12 items-center justify-center rounded-full bg-[var(--color-foreground)] px-8 text-sm font-medium text-[var(--color-background)] transition-opacity duration-150 hover:opacity-85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              View Documentation
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8">
        <div className="container mx-auto max-w-7xl px-6">
          <p className="text-center text-sm text-[var(--color-muted-foreground)]">
            Built with Next.js, Tailwind&nbsp;CSS, and Fumadocs
          </p>
        </div>
      </footer>
    </div>
  );
}
