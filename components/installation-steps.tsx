'use client';

import { useState, useEffect } from 'react';
import { Check, Copy } from 'lucide-react';
import { codeToHtml } from 'shiki';

interface InstallationStepsProps {
  componentName: string;
  dependencies?: string[];
  code: string;
}

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';
type CopyTarget = 'cli' | 'deps' | 'code' | null;

export function InstallationSteps({
  componentName,
  dependencies = [],
  code,
}: InstallationStepsProps) {
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');
  const [copiedTarget, setCopiedTarget] = useState<CopyTarget>(null);
  const [codeExpanded, setCodeExpanded] = useState(false);
  const [highlightedCode, setHighlightedCode] = useState('');

  const cliCommands = {
    pnpm: `pnpm dlx components-cli add ${componentName}`,
    npm: `npx components-cli add ${componentName}`,
    yarn: `yarn dlx components-cli add ${componentName}`,
    bun: `bunx components-cli add ${componentName}`,
  };

  const installCommands = {
    pnpm: `pnpm add ${dependencies.join(' ')}`,
    npm: `npm install ${dependencies.join(' ')}`,
    yarn: `yarn add ${dependencies.join(' ')}`,
    bun: `bun add ${dependencies.join(' ')}`,
  };

  useEffect(() => {
    let mounted = true;

    codeToHtml(code, {
      lang: 'tsx',
      themes: {
        light: 'vitesse-light',
        dark: 'vitesse-dark',
      },
    }).then((html) => {
      if (mounted) setHighlightedCode(html);
    });

    return () => {
      mounted = false;
    };
  }, [code]);

  const handleCopy = async (text: string, target: Exclude<CopyTarget, null>) => {
    await navigator.clipboard.writeText(text);
    setCopiedTarget(target);
    setTimeout(() => setCopiedTarget(null), 2000);
  };

  return (
    <div className="component-preview not-prose my-8 space-y-6">
      <div className="flex items-center gap-2 rounded-lg border border-[var(--color-border)] bg-[var(--color-muted)] p-1 w-fit">
        {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
          <button
            key={pm}
            onClick={() => setPackageManager(pm)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150 ${
              packageManager === pm
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            {pm}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        <p className="text-sm text-[var(--color-foreground)]">
          1. Install with CLI
        </p>
        <div className="group relative rounded-lg border border-[var(--color-code-command-border)] bg-[var(--color-code-command-background)] p-4">
          <code className="font-mono text-sm text-[var(--color-code-command-foreground)]">
            {cliCommands[packageManager]}
          </code>
          <button
            onClick={() => handleCopy(cliCommands[packageManager], 'cli')}
            className="absolute right-3 top-3 rounded-lg border border-[var(--color-code-border)] bg-[var(--color-code-button-background)] p-2 text-[var(--color-code-button-foreground)] opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-[var(--color-code-button-background-hover)] hover:text-[var(--color-code-foreground)] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            aria-label="Copy command"
          >
            {copiedTarget === 'cli' ? (
              <Check className="h-4 w-4 text-green-500" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <p className="text-sm text-[var(--color-foreground)]">
          2. Manual installation
        </p>

        {dependencies.length > 0 && (
          <div>
            <p className="mb-3 text-sm text-[var(--color-foreground)]">
              Install dependencies
            </p>
            <div className="group relative rounded-lg border border-[var(--color-code-command-border)] bg-[var(--color-code-command-background)] p-4">
              <code className="font-mono text-sm text-[var(--color-code-command-foreground)]">
                {installCommands[packageManager]}
              </code>
              <button
                onClick={() => handleCopy(installCommands[packageManager], 'deps')}
                className="absolute right-3 top-3 rounded-lg border border-[var(--color-code-border)] bg-[var(--color-code-button-background)] p-2 text-[var(--color-code-button-foreground)] opacity-0 transition-all duration-150 group-hover:opacity-100 hover:bg-[var(--color-code-button-background-hover)] hover:text-[var(--color-code-foreground)] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                aria-label="Copy dependencies"
              >
                {copiedTarget === 'deps' ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>
          </div>
        )}

        <div>
          <p className="mb-3 text-sm text-[var(--color-foreground)]">
            Copy and paste the component code into your project
          </p>

          <div className="relative overflow-hidden rounded-lg border border-[var(--color-code-border)] bg-[var(--color-code-background)]">
            <div className="flex items-center justify-between border-b border-[var(--color-code-border)] bg-[var(--color-code-surface)] px-4 py-3">
              <div className="flex items-center gap-2">
                <svg className="h-4 w-4 text-[var(--color-code-muted-foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <code className="text-sm font-mono text-[var(--color-code-muted-foreground)]">
                  components/ui/{componentName}.tsx
                </code>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCodeExpanded(!codeExpanded)}
                  className="text-sm text-[var(--color-code-button-foreground)] transition-colors duration-150 hover:text-[var(--color-code-foreground)]"
                >
                  {codeExpanded ? 'Collapse' : 'Expand'}
                </button>
                <button
                  onClick={() => handleCopy(code, 'code')}
                  className="rounded-lg border border-[var(--color-code-border)] bg-[var(--color-code-button-background)] p-1.5 text-[var(--color-code-button-foreground)] transition-colors duration-150 hover:bg-[var(--color-code-button-background-hover)] hover:text-[var(--color-code-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
                  aria-label="Copy code"
                >
                  {copiedTarget === 'code' ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div
              className={`transition-all duration-300 ${
                codeExpanded ? 'max-h-[600px]' : 'max-h-[200px]'
              } overflow-auto`}
            >
              <div
                className="p-6 text-sm text-[var(--color-code-foreground)] [&_pre]:!m-0 [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!shadow-none"
                dangerouslySetInnerHTML={{ __html: highlightedCode }}
              />
            </div>

            {!codeExpanded && (
              <div
                className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
                style={{
                  background:
                    'linear-gradient(to top, var(--color-code-background), transparent)',
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
