import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';
import './docs.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: <span className="font-semibold text-base">Components</span>,
        url: '/',
        children: <ThemeToggle />,
      }}
      sidebar={{
        banner: (
          <div className="mb-4 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
            Hand-crafted components for modern web
          </div>
        ),
      }}
    >
      {children}
    </DocsLayout>
  );
}
