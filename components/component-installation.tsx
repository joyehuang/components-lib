import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { InstallationSteps } from '@/components/installation-steps';

interface ComponentInstallationProps {
  componentName: string;
  dependencies?: string[];
  sourcePath?: string;
}

export async function ComponentInstallation({
  componentName,
  dependencies = [],
  sourcePath = `components/ui/${componentName}.tsx`,
}: ComponentInstallationProps) {
  const absolutePath = path.join(process.cwd(), sourcePath);
  const code = await readFile(absolutePath, 'utf-8');

  return (
    <InstallationSteps
      componentName={componentName}
      dependencies={dependencies}
      code={code}
    />
  );
}
