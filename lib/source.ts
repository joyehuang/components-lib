import { cache } from 'react';
import { docs } from '@/.source/server';
import { loader } from 'fumadocs-core/source';

export const source = loader({
  baseUrl: '/docs',
  source: docs.toFumadocsSource(),
});

// Create cached version of getPage to avoid duplicate file system reads
export const getCachedPage = cache((slug?: string[]) => {
  return source.getPage(slug);
});
