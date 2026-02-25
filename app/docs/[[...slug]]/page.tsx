import { source, getCachedPage } from '@/lib/source';
import Link from 'next/link';
import { DocsPage, DocsBody } from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

// Extract tableOfContent config to prevent re-renders
const TABLE_OF_CONTENT_CONFIG = {
  style: 'clerk',
  header: (
    <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
      On This Page
    </p>
  ),
  footer: (
    <div className="mt-6 space-y-2 border-t border-zinc-200 pt-4 dark:border-zinc-800">
      <Link
        href="/docs/installation"
        className="block text-sm text-[var(--color-accent)] transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 rounded"
      >
        Installation Guide →
      </Link>
      <Link
        href="/"
        className="block text-sm text-[var(--color-accent)] transition-opacity duration-150 hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2 rounded"
      >
        Component Gallery →
      </Link>
    </div>
  ),
} as const;

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = getCachedPage(slug);

  if (!page) notFound();

  const Content = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      tableOfContent={TABLE_OF_CONTENT_CONFIG}
    >
      <DocsBody>
        <Content />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = getCachedPage(slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
