import { source } from '@/lib/source';

export async function GET() {
  const sourceType = typeof source;
  const sourceKeys = Object.keys(source);
  const sourceMethods = Object.getOwnPropertyNames(Object.getPrototypeOf(source));

  // Try to get some data
  let sampleData;
  try {
    sampleData = {
      type: sourceType,
      keys: sourceKeys,
      methods: sourceMethods,
      isArray: Array.isArray(source),
      constructor: source.constructor.name,
    };
  } catch (e: any) {
    sampleData = { error: e.message };
  }

  return Response.json(sampleData, {
    headers: { 'Content-Type': 'application/json' },
  });
}
