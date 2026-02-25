'use client';

import { useState, ReactNode, useEffect } from 'react';
import { Check, Copy, Monitor, Tablet, Smartphone, RotateCcw, Terminal } from 'lucide-react';
import { codeToHtml } from 'shiki';

interface ComponentPreviewProps {
  name: string;
  description: string;
  children: ReactNode;
  code: string;
  controls?: ReactNode;
  dependencies?: string[];
  files?: Array<{ name: string; path: string }>;
}

type ViewMode = 'preview' | 'code' | 'cli';
type DeviceMode = 'desktop' | 'tablet' | 'mobile';
type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export function ComponentPreview({
  name,
  description,
  children,
  code,
  controls,
  dependencies = [],
  files = [],
}: ComponentPreviewProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('preview');
  const [deviceMode, setDeviceMode] = useState<DeviceMode>('desktop');
  const [packageManager, setPackageManager] = useState<PackageManager>('pnpm');
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);
  const [highlightedCode, setHighlightedCode] = useState('');

  useEffect(() => {
    if (viewMode === 'code') {
      codeToHtml(code, {
        lang: 'tsx',
        themes: {
          light: 'vitesse-light',
          dark: 'vitesse-dark',
        },
      }).then(setHighlightedCode);
    }
  }, [code, viewMode]);

  const handleCopy = async (text: string) => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRefresh = () => {
    setKey((prev) => prev + 1);
  };

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  const cliCommands = {
    pnpm: `pnpm dlx components-cli add ${name}`,
    npm: `npx components-cli add ${name}`,
    yarn: `yarn dlx components-cli add ${name}`,
    bun: `bunx components-cli add ${name}`,
  };

  const dependencyCommands = {
    pnpm: `pnpm add ${dependencies.join(' ')}`,
    npm: `npm install ${dependencies.join(' ')}`,
    yarn: `yarn add ${dependencies.join(' ')}`,
    bun: `bun add ${dependencies.join(' ')}`,
  };

  return (
    <div className="component-preview not-prose my-8">
      {/* Header */}
      <div className="mb-6">
        <h2 className="mb-2 text-3xl font-bold text-[var(--color-foreground)]">
          {name}
        </h2>
        <p className="text-[var(--color-muted-foreground)]">{description}</p>
      </div>

      {/* Controls Bar */}
      <div className="mb-4 flex items-center justify-between rounded-t-xl bg-[var(--color-muted)] px-4 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setViewMode('preview')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
              viewMode === 'preview'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
            Preview
          </button>
          <button
            onClick={() => setViewMode('code')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
              viewMode === 'code'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            Code
          </button>
          <button
            onClick={() => setViewMode('cli')}
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors duration-150 ${
              viewMode === 'cli'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
          >
            <Terminal className="h-4 w-4" />
            CLI
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setDeviceMode('desktop')}
            className={`rounded-lg p-2 transition-colors duration-150 ${
              deviceMode === 'desktop'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
            aria-label="Desktop view"
          >
            <Monitor className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeviceMode('tablet')}
            className={`rounded-lg p-2 transition-colors duration-150 ${
              deviceMode === 'tablet'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
            aria-label="Tablet view"
          >
            <Tablet className="h-4 w-4" />
          </button>
          <button
            onClick={() => setDeviceMode('mobile')}
            className={`rounded-lg p-2 transition-colors duration-150 ${
              deviceMode === 'mobile'
                ? 'bg-[var(--color-background)] text-[var(--color-foreground)] shadow-sm'
                : 'text-[var(--color-muted-foreground)] hover:text-[var(--color-foreground)]'
            }`}
            aria-label="Mobile view"
          >
            <Smartphone className="h-4 w-4" />
          </button>
          <button
            onClick={handleRefresh}
            className="rounded-lg p-2 text-[var(--color-muted-foreground)] transition-colors duration-150 hover:text-[var(--color-foreground)]"
            aria-label="Refresh preview"
          >
            <RotateCcw className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Preview/Code/CLI Area */}
      <div className={`overflow-hidden rounded-b-xl ${viewMode === 'preview' ? 'border border-[var(--color-border)]' : ''}`}>
        {viewMode === 'preview' ? (
          <div className="flex min-h-[400px] items-center justify-center p-8" style={{ background: 'var(--color-background)' }}>
            <div
              key={key}
              style={{
                width: deviceWidths[deviceMode],
                maxWidth: '100%',
                transition: 'width 300ms ease',
              }}
            >
              {children}
            </div>
          </div>
        ) : viewMode === 'code' ? (
          <div className="relative overflow-hidden rounded-b-xl border border-[var(--color-code-border)] bg-[var(--color-code-background)]">
            <div
              className="overflow-x-auto p-6 text-sm leading-relaxed text-[var(--color-code-foreground)] [&_pre]:!m-0 [&_pre]:!border-0 [&_pre]:!bg-transparent [&_pre]:!p-0 [&_pre]:!shadow-none"
              dangerouslySetInnerHTML={{ __html: highlightedCode }}
            />
            <button
              onClick={() => handleCopy(code)}
              className="absolute right-4 top-4 rounded-lg border border-[var(--color-code-border)] bg-[var(--color-code-button-background)] p-2 text-[var(--color-code-button-foreground)] transition-colors duration-150 hover:bg-[var(--color-code-button-background-hover)] hover:text-[var(--color-code-foreground)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
              aria-label="Copy code"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        ) : (
          <div className="rounded-b-xl border border-[var(--color-cli-border)] p-6" style={{ background: 'var(--color-cli-background)' }}>
            <div className="space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-cli-foreground)' }}>
                  Installation
                </h3>
                <div className="mb-3 flex items-center gap-1.5 rounded-lg p-1 w-fit" style={{
                  background: 'var(--color-cli-surface)',
                  border: '1px solid var(--color-cli-border)'
                }}>
                  {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                    <button
                      key={pm}
                      onClick={() => setPackageManager(pm)}
                      className="rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150"
                      style={
                        packageManager === pm
                          ? {
                              background: 'var(--color-cli-active)',
                              color: 'var(--color-cli-foreground)',
                            }
                          : {
                              color: 'var(--color-cli-muted)',
                            }
                      }
                      onMouseEnter={packageManager !== pm ? (e) => {
                        e.currentTarget.style.color = 'var(--color-cli-foreground)';
                      } : undefined}
                      onMouseLeave={packageManager !== pm ? (e) => {
                        e.currentTarget.style.color = 'var(--color-cli-muted)';
                      } : undefined}
                    >
                      {pm}
                    </button>
                  ))}
                </div>
                <p className="mb-2 text-xs" style={{ color: 'var(--color-cli-muted)' }}>
                  1. Install with CLI
                </p>
                <div className="group relative rounded-md p-4" style={{
                  background: 'var(--color-cli-surface)',
                  border: '1px solid var(--color-cli-border)'
                }}>
                  <code className="font-mono text-sm" style={{
                    color: 'var(--color-cli-foreground)',
                    letterSpacing: '0'
                  }}>
                    {cliCommands[packageManager]}
                  </code>
                  <button
                    onClick={() => handleCopy(cliCommands[packageManager])}
                    className="absolute right-3 top-3 rounded-md p-1.5 opacity-0 transition-all duration-150 group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none"
                    style={{
                      background: 'transparent',
                      color: 'var(--color-cli-muted)',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--color-cli-active)';
                      e.currentTarget.style.color = 'var(--color-cli-foreground)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--color-cli-muted)';
                    }}
                    aria-label="Copy command"
                  >
                    {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-cli-foreground)' }}>
                    Manual Installation
                  </h3>
                  <div className="space-y-3">
                    {dependencies.length > 0 && (
                      <div>
                        <p className="mb-2 text-xs" style={{ color: 'var(--color-cli-muted)' }}>
                          2. Install dependencies
                        </p>
                        <div className="group relative rounded-md p-4" style={{
                          background: 'var(--color-cli-surface)',
                          border: '1px solid var(--color-cli-border)'
                        }}>
                          <code className="font-mono text-sm" style={{
                            color: 'var(--color-cli-foreground)',
                            letterSpacing: '0'
                          }}>
                            {dependencyCommands[packageManager]}
                          </code>
                          <button
                            onClick={() => handleCopy(dependencyCommands[packageManager])}
                            className="absolute right-3 top-3 rounded-md p-1.5 opacity-0 transition-all duration-150 group-hover:opacity-100 focus-visible:opacity-100"
                            style={{
                              background: 'transparent',
                              color: 'var(--color-cli-muted)',
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.background = 'var(--color-cli-active)';
                              e.currentTarget.style.color = 'var(--color-cli-foreground)';
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.background = 'transparent';
                              e.currentTarget.style.color = 'var(--color-cli-muted)';
                            }}
                            aria-label="Copy dependencies"
                          >
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                          </button>
                        </div>
                      </div>
                    )}
                    <div>
                      <p className="mb-2 text-xs" style={{ color: 'var(--color-cli-muted)' }}>
                        {dependencies.length > 0 ? '3' : '2'}. Copy component code
                      </p>
                      <button
                        onClick={() => setViewMode('code')}
                        className="w-full rounded-md px-4 py-3 text-sm transition-colors duration-150 focus-visible:outline-none"
                        style={{
                          background: 'var(--color-cli-surface)',
                          border: '1px solid var(--color-cli-border)',
                          color: 'var(--color-cli-foreground)',
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--color-cli-active)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'var(--color-cli-surface)';
                        }}
                      >
                        View code to copy →
                      </button>
                    </div>
                  </div>
                </div>

                {files.length > 0 && (
                  <div>
                    <h3 className="mb-3 text-sm font-semibold" style={{ color: 'var(--color-cli-foreground)' }}>
                      Component Files
                    </h3>
                    <div className="space-y-2">
                      {files.map((file, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between rounded-md px-4 py-3"
                          style={{
                            background: 'var(--color-cli-surface)',
                            border: '1px solid var(--color-cli-border)'
                          }}
                        >
                          <span className="font-mono text-sm" style={{ color: 'var(--color-cli-foreground)' }}>
                            {file.path}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-cli-muted)' }}>{file.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                </div>
            </div>
          </div>
        )}
      </div>

      {/* Customize Panel */}
      {controls && (
        <div className="mt-4 rounded-xl border border-[var(--color-border)] bg-[var(--color-muted)] p-6">
          <h3 className="mb-6 text-lg font-semibold text-[var(--color-foreground)]">
            Customize
          </h3>
          {controls}
        </div>
      )}
    </div>
  );
}
