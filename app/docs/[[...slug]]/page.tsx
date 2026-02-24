import { source } from '@/lib/source';
import Link from 'next/link';
import {
  DocsPage,
  DocsBody,
  DocsDescription,
  DocsTitle,
} from 'fumadocs-ui/page';
import { notFound } from 'next/navigation';

export default async function Page({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = await params;
  const page = source.getPage(slug);
  const isIndexPage = !slug || slug.length === 0;

  if (!page) notFound();

  const Content = page.data.body;

  return (
    <DocsPage
      toc={page.data.toc}
      full={page.data.full}
      className="docs-page-shell"
      tableOfContent={{
        style: 'clerk',
        header: <p className="docs-toc-header">On this page</p>,
        footer: (
          <Link href="/docs/installation" className="docs-toc-footer-link">
            Read installation guide
          </Link>
        ),
      }}
    >
      <div className="docs-page-hero">
        <p className="docs-page-kicker">
          {isIndexPage ? 'Documentation Overview' : 'Component Guide'}
        </p>
        <DocsTitle className="docs-page-title">{page.data.title}</DocsTitle>
        <DocsDescription className="docs-page-description">
          {page.data.description}
        </DocsDescription>
        <div className="docs-page-actions">
          <Link href="/docs" className="docs-action-link">
            Docs Home
          </Link>
          <Link href="/" className="docs-action-link">
            Component Gallery
          </Link>
        </div>
      </div>
      <DocsBody className="docs-page-body">
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
  const page = source.getPage(slug);

  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
