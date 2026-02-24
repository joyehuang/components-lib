import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import Link from 'next/link';
import '../docs.css';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tree={source.pageTree}
      nav={{
        title: (
          <Link href="/" className="font-semibold text-base">
            Components
          </Link>
        ),
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
