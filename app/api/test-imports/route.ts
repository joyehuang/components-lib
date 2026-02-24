export async function GET() {
  try {
    // Try different import paths
    const imports: Record<string, any> = {};

    try {
      const mod1 = await import('fumadocs-ui/provider');
      imports['fumadocs-ui/provider'] = Object.keys(mod1);
    } catch (e: any) {
      imports['fumadocs-ui/provider'] = `Error: ${e.message}`;
    }

    try {
      const mod2 = await import('fumadocs-ui');
      imports['fumadocs-ui'] = Object.keys(mod2);
    } catch (e: any) {
      imports['fumadocs-ui'] = `Error: ${e.message}`;
    }

    return Response.json(imports);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
