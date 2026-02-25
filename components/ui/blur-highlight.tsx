"use client";

import { useState, useEffect, useRef, useMemo } from "react";

interface BlurHighlightProps {
  children: React.ReactNode;
  highlightedBits?: Array<string | { text: string; occurrence: number }>;
  highlightColor?: string;
  highlightClassName?: string;
  blurAmount?: number;
  inactiveOpacity?: number;
  blurDelay?: number;
  blurDuration?: number;
  highlightDelay?: number;
  highlightDuration?: number;
  highlightDirection?: "left" | "right" | "top" | "bottom";
  viewportOptions?: { once?: boolean; amount?: number };
  className?: string;
  style?: React.CSSProperties;
}

export function BlurHighlight({
  children,
  highlightedBits = [],
  highlightColor = "hsl(80, 100%, 50%)",
  highlightClassName = "",
  blurAmount = 8,
  inactiveOpacity = 0.3,
  blurDelay = 0,
  blurDuration = 0.8,
  highlightDelay = 0.4,
  highlightDuration = 1,
  highlightDirection = "left",
  viewportOptions = { once: false, amount: 0.5 },
  className = "",
  style = {},
}: BlurHighlightProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  // Intersection Observer
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          if (viewportOptions.once) observer.unobserve(el);
        } else {
          if (!viewportOptions.once) setIsInView(false);
        }
      },
      {
        rootMargin: "-20%",
        threshold: viewportOptions.amount ?? 0.5,
      }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [viewportOptions.once, viewportOptions.amount]);

  // Parse children text
  const textContent =
    typeof children === "string"
      ? children
      : (() => {
          const extract = (node: any): string => {
            if (typeof node === "string") return node;
            if (Array.isArray(node)) return node.map(extract).join("");
            if (node?.props?.children) return extract(node.props.children);
            return "";
          };
          return extract(children);
        })();

  // Build segments
  const segments = useMemo(() => {
    if (!highlightedBits.length) return [{ text: textContent, highlight: false }];

    const normalized = highlightedBits.map((bit) =>
      typeof bit === "string" ? { text: bit, occurrence: 0 } : bit
    );

    // Find all highlight positions
    const positions: Array<{ start: number; end: number; text: string }> = [];
    normalized.forEach((bit) => {
      let count = 0;
      let startIdx = 0;
      while (true) {
        const idx = textContent.indexOf(bit.text, startIdx);
        if (idx === -1) break;
        if (bit.occurrence === 0 || bit.occurrence === count + 1) {
          positions.push({ start: idx, end: idx + bit.text.length, text: bit.text });
        }
        count++;
        startIdx = idx + 1;
      }
    });

    positions.sort((a, b) => a.start - b.start);

    // Merge overlaps
    const merged: Array<{ start: number; end: number }> = [];
    for (const pos of positions) {
      if (merged.length && pos.start < merged[merged.length - 1].end) {
        merged[merged.length - 1].end = Math.max(merged[merged.length - 1].end, pos.end);
      } else {
        merged.push({ start: pos.start, end: pos.end });
      }
    }

    // Build segments
    const segs: Array<{ text: string; highlight: boolean; index?: number }> = [];
    let cursor = 0;
    let hlIndex = 0;
    merged.forEach((m) => {
      if (cursor < m.start) {
        segs.push({ text: textContent.slice(cursor, m.start), highlight: false });
      }
      segs.push({
        text: textContent.slice(m.start, m.end),
        highlight: true,
        index: hlIndex++,
      });
      cursor = m.end;
    });
    if (cursor < textContent.length) {
      segs.push({ text: textContent.slice(cursor), highlight: false });
    }
    return segs;
  }, [textContent, highlightedBits]);

  // Background position/size based on direction
  const getHighlightStyle = (progress: number) => {
    const p = progress * 100;
    switch (highlightDirection) {
      case "right":
        return { backgroundSize: `${p}% 100%`, backgroundPosition: "100% 0%" };
      case "top":
        return { backgroundSize: `100% ${p}%`, backgroundPosition: "0% 0%" };
      case "bottom":
        return { backgroundSize: `100% ${p}%`, backgroundPosition: "0% 100%" };
      case "left":
      default:
        return { backgroundSize: `${p}% 100%`, backgroundPosition: "0% 0%" };
    }
  };

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        opacity: isInView ? 1 : inactiveOpacity,
        filter: isInView ? "blur(0px)" : `blur(${blurAmount}px)`,
        transition: `opacity ${blurDuration}s ease ${blurDelay}s, filter ${blurDuration}s ease ${blurDelay}s`,
        ...style,
      }}
    >
      {segments.map((seg, i) =>
        seg.highlight ? (
          <HighlightSpan
            key={i}
            color={highlightColor}
            isInView={isInView}
            index={seg.index!}
            delay={highlightDelay}
            duration={highlightDuration}
            direction={highlightDirection}
            getStyle={getHighlightStyle}
            extraClass={highlightClassName}
          >
            {seg.text}
          </HighlightSpan>
        ) : (
          <span key={i}>{seg.text}</span>
        )
      )}
    </div>
  );
}

interface HighlightSpanProps {
  children: string;
  color: string;
  isInView: boolean;
  index: number;
  delay: number;
  duration: number;
  direction: string;
  getStyle: (progress: number) => { backgroundSize: string; backgroundPosition: string };
  extraClass: string;
}

function HighlightSpan({
  children,
  color,
  isInView,
  index,
  delay,
  duration,
  getStyle,
  extraClass,
}: HighlightSpanProps) {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isInView) {
      setProgress(0);
      return;
    }

    const totalDelay = (delay + index * 0.25) * 1000;
    const dur = duration * 1000;
    const startTime = Date.now() + totalDelay;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      if (elapsed < 0) {
        rafRef.current = requestAnimationFrame(animate);
        return;
      }
      const p = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setProgress(eased);
      if (p < 1) rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, index, delay, duration]);

  const hlStyle = getStyle(progress);

  return (
    <span
      className={`py-0.5 px-1 rounded-[5px] ${extraClass}`}
      style={{
        backgroundImage: `linear-gradient(${color}, ${color})`,
        backgroundRepeat: "no-repeat",
        ...hlStyle,
        boxDecorationBreak: "clone",
        WebkitBoxDecorationBreak: "clone",
      }}
    >
      {children}
    </span>
  );
}
