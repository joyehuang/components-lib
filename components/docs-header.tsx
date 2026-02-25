'use client';

import Link from 'next/link';
import { Search, Github, Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

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

export function DocsHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--color-border)] bg-[var(--color-background)]/80 backdrop-blur-md">
      <div className="container mx-auto flex h-14 max-w-[1440px] items-center justify-between px-6">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-base font-semibold text-[var(--color-foreground)] transition-opacity duration-150 hover:opacity-80"
          >
            Components
          </Link>
          <nav className="hidden items-center gap-6 md:flex">
            <Link
              href="/docs"
              className="text-sm text-[var(--color-muted-foreground)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
            >
              Documentation
            </Link>
            <Link
              href="/docs/components/blur-highlight"
              className="text-sm text-[var(--color-muted-foreground)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
            >
              Components
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <button
            className="hidden items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] px-3 py-1.5 text-sm text-[var(--color-muted-foreground)] transition-colors duration-150 hover:bg-[var(--color-background)] md:flex"
            onClick={() => {
              // TODO: Implement search
              console.log('Search clicked');
            }}
          >
            <Search className="h-4 w-4" />
            <span>Search...</span>
            <kbd className="ml-2 rounded bg-[var(--color-background)] px-1.5 py-0.5 text-xs font-mono">
              ⌘K
            </kbd>
          </button>
          <ThemeToggleButton />
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--color-border)] text-[var(--color-foreground)] transition-colors duration-150 hover:bg-[var(--color-muted)]"
            aria-label="GitHub repository"
          >
            <Github className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}
