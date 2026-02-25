import type { ReactNode } from 'react';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { source } from '@/lib/source';
import { DocsHeader } from '@/components/docs-header';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <DocsHeader />
      <DocsLayout
        tree={source.pageTree}
        nav={{
          enabled: false,
        }}
        sidebar={{
          banner: (
            <div className="mb-4 px-4 py-3 text-sm text-zinc-600 dark:text-zinc-400">
              Hand-crafted components for the modern web
            </div>
          ),
          defaultOpenLevel: 0,
          collapsible: false,
          footer: null,
        }}
      >
        {children}
      </DocsLayout>
    </>
  );
}
