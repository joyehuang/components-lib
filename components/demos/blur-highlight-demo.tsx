'use client';

import { useState } from 'react';
import { BlurHighlight } from '@/components/ui/blur-highlight';
import { ComponentPreview } from '@/components/component-preview';
import {
  ControlSlider,
  ControlColor,
  ControlSelect,
  ControlSection,
  ControlGrid,
} from '@/components/component-controls';

const sampleText = "Our cutting-edge technology transforms data analysis with real-time insights and powerful automation.";

export function BlurHighlightDemo() {
  const [highlightColor, setHighlightColor] = useState('#a855f7');
  const [blurAmount, setBlurAmount] = useState(8);
  const [inactiveOpacity, setInactiveOpacity] = useState(0.3);
  const [blurDelay, setBlurDelay] = useState(0);
  const [blurDuration, setBlurDuration] = useState(0.8);
  const [highlightDelay, setHighlightDelay] = useState(0.4);
  const [highlightDuration, setHighlightDuration] = useState(1);
  const [highlightDirection, setHighlightDirection] = useState<'left' | 'right' | 'top' | 'bottom'>('left');

  const code = `import { BlurHighlight } from "@/components/ui/blur-highlight";

export default function Example() {
  return (
    <BlurHighlight
      highlightedBits={["cutting-edge", "real-time"]}
      highlightColor="${highlightColor}"
      blurAmount={${blurAmount}}
      inactiveOpacity={${inactiveOpacity}}
      blurDelay={${blurDelay}}
      blurDuration={${blurDuration}}
      highlightDelay={${highlightDelay}}
      highlightDuration={${highlightDuration}}
      highlightDirection="${highlightDirection}"
      className="text-2xl font-medium"
      style={{ color: 'var(--color-foreground)' }}
    >
      ${sampleText}
    </BlurHighlight>
  );
}`;

  return (
    <ComponentPreview
      name="blur-highlight"
      description="A text animation component with blur-in effect and directional highlight sweep"
      code={code}
      dependencies={['react']}
      files={[
        { name: 'BlurHighlight', path: 'components/ui/blur-highlight.tsx' },
      ]}
      controls={
        <ControlGrid columns={3}>
          <ControlSection title="Blur Effects">
            <ControlSlider
              label="Blur Amount"
              value={blurAmount}
              onChange={setBlurAmount}
              min={0}
              max={20}
              step={1}
            />
            <ControlSlider
              label="Inactive Opacity"
              value={inactiveOpacity}
              onChange={setInactiveOpacity}
              min={0}
              max={1}
              step={0.1}
            />
            <ControlSlider
              label="Blur Delay"
              value={blurDelay}
              onChange={setBlurDelay}
              min={0}
              max={2}
              step={0.1}
            />
            <ControlSlider
              label="Blur Duration"
              value={blurDuration}
              onChange={setBlurDuration}
              min={0.1}
              max={3}
              step={0.1}
            />
          </ControlSection>

          <ControlSection title="Highlight Effects">
            <ControlSlider
              label="Highlight Delay"
              value={highlightDelay}
              onChange={setHighlightDelay}
              min={0}
              max={2}
              step={0.1}
            />
            <ControlSlider
              label="Highlight Duration"
              value={highlightDuration}
              onChange={setHighlightDuration}
              min={0.1}
              max={3}
              step={0.1}
            />
            <ControlSelect
              label="Highlight Direction"
              value={highlightDirection}
              onChange={(value) => setHighlightDirection(value as any)}
              options={[
                { value: 'left', label: 'Left to Right' },
                { value: 'right', label: 'Right to Left' },
                { value: 'top', label: 'Top to Bottom' },
                { value: 'bottom', label: 'Bottom to Top' },
              ]}
            />
          </ControlSection>

          <ControlSection title="Colors">
            <ControlColor
              label="Highlight Color"
              value={highlightColor}
              onChange={setHighlightColor}
            />
          </ControlSection>
        </ControlGrid>
      }
    >
      <BlurHighlight
        highlightedBits={["cutting-edge", "real-time"]}
        highlightColor={highlightColor}
        blurAmount={blurAmount}
        inactiveOpacity={inactiveOpacity}
        blurDelay={blurDelay}
        blurDuration={blurDuration}
        highlightDelay={highlightDelay}
        highlightDuration={highlightDuration}
        highlightDirection={highlightDirection}
        viewportOptions={{ once: false, amount: 0.3 }}
        className="text-2xl font-medium"
        style={{ color: 'var(--color-foreground)' }}
      >
        {sampleText}
      </BlurHighlight>
    </ComponentPreview>
  );
}
