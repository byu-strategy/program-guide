"use client";

import { useState, useMemo } from "react";
import { ROLE_BUCKET_COLORS } from "@/types/database";

interface FlowData {
  source: string;
  target: string;
  value: number;
}

interface CareerFlowDiagramProps {
  flows: FlowData[];
  sourceLabels: string[];
  targetLabels: string[];
}

export default function CareerFlowDiagram({
  flows,
  sourceLabels,
  targetLabels,
}: CareerFlowDiagramProps) {
  const [hoveredSource, setHoveredSource] = useState<string | null>(null);
  const [hoveredTarget, setHoveredTarget] = useState<string | null>(null);

  const WIDTH = 800;
  const HEIGHT = 500;
  const NODE_WIDTH = 20;
  const PADDING = 180;
  const INNER_WIDTH = WIDTH - 2 * PADDING;
  const TOP_PAD = 20;
  const BOT_PAD = 20;
  const USABLE_HEIGHT = HEIGHT - TOP_PAD - BOT_PAD;

  const layout = useMemo(() => {
    // Calculate totals for each source/target
    const sourceTotals: Record<string, number> = {};
    const targetTotals: Record<string, number> = {};
    flows.forEach((f) => {
      sourceTotals[f.source] = (sourceTotals[f.source] || 0) + f.value;
      targetTotals[f.target] = (targetTotals[f.target] || 0) + f.value;
    });

    const totalSourceVal = Object.values(sourceTotals).reduce((a, b) => a + b, 0);
    const totalTargetVal = Object.values(targetTotals).reduce((a, b) => a + b, 0);

    // Position source nodes
    let sourceY = TOP_PAD;
    const sourcePositions: Record<string, { y: number; height: number }> = {};
    sourceLabels.forEach((label) => {
      const val = sourceTotals[label] || 0;
      const h = (val / totalSourceVal) * USABLE_HEIGHT;
      sourcePositions[label] = { y: sourceY, height: h };
      sourceY += h + 2;
    });

    // Position target nodes
    let targetY = TOP_PAD;
    const targetPositions: Record<string, { y: number; height: number }> = {};
    targetLabels.forEach((label) => {
      const val = targetTotals[label] || 0;
      const h = (val / totalTargetVal) * USABLE_HEIGHT;
      targetPositions[label] = { y: targetY, height: h };
      targetY += h + 2;
    });

    // Build flow paths
    const sourceOffsets: Record<string, number> = {};
    const targetOffsets: Record<string, number> = {};
    sourceLabels.forEach((l) => (sourceOffsets[l] = 0));
    targetLabels.forEach((l) => (targetOffsets[l] = 0));

    const paths = flows
      .sort((a, b) => b.value - a.value)
      .map((flow) => {
        const sp = sourcePositions[flow.source];
        const tp = targetPositions[flow.target];
        if (!sp || !tp) return null;

        const sTotal = sourceTotals[flow.source];
        const tTotal = targetTotals[flow.target];

        const sHeight = (flow.value / sTotal) * sp.height;
        const tHeight = (flow.value / tTotal) * tp.height;

        const sy = sp.y + sourceOffsets[flow.source];
        const ty = tp.y + targetOffsets[flow.target];

        sourceOffsets[flow.source] += sHeight;
        targetOffsets[flow.target] += tHeight;

        const x0 = PADDING + NODE_WIDTH;
        const x1 = PADDING + INNER_WIDTH - NODE_WIDTH;
        const mx = (x0 + x1) / 2;

        const d = `M ${x0} ${sy} C ${mx} ${sy}, ${mx} ${ty}, ${x1} ${ty} L ${x1} ${ty + tHeight} C ${mx} ${ty + tHeight}, ${mx} ${sy + sHeight}, ${x0} ${sy + sHeight} Z`;

        return {
          d,
          source: flow.source,
          target: flow.target,
          value: flow.value,
          color: ROLE_BUCKET_COLORS[flow.source] || "#7C878E",
        };
      })
      .filter(Boolean);

    return { sourcePositions, targetPositions, paths };
  }, [flows, sourceLabels, targetLabels]);

  return (
    <div className="bg-white p-6 shadow-xs">
      <h3 className="mb-4 font-heading text-lg font-bold text-navy">
        Career Transitions: First Job &rarr; Second Job
      </h3>
      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
          className="w-full"
          style={{ minWidth: 600 }}
        >
          {/* Flow paths */}
          {layout.paths.map((path, i) => {
            if (!path) return null;
            const isHighlighted =
              (!hoveredSource && !hoveredTarget) ||
              hoveredSource === path.source ||
              hoveredTarget === path.target;
            return (
              <path
                key={i}
                d={path.d}
                fill={path.color}
                opacity={isHighlighted ? 0.5 : 0.08}
                className="transition-opacity duration-200"
              >
                <title>
                  {path.source} &rarr; {path.target}: {path.value}
                </title>
              </path>
            );
          })}

          {/* Source nodes */}
          {sourceLabels.map((label) => {
            const pos = layout.sourcePositions[label];
            if (!pos || pos.height < 1) return null;
            return (
              <g
                key={`s-${label}`}
                onMouseEnter={() => setHoveredSource(label)}
                onMouseLeave={() => setHoveredSource(null)}
                className="cursor-pointer"
              >
                <rect
                  x={PADDING}
                  y={pos.y}
                  width={NODE_WIDTH}
                  height={pos.height}
                  fill={ROLE_BUCKET_COLORS[label] || "#7C878E"}
                  rx={2}
                />
                <text
                  x={PADDING - 6}
                  y={pos.y + pos.height / 2}
                  textAnchor="end"
                  dominantBaseline="middle"
                  className="fill-current text-[9px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {label}
                </text>
              </g>
            );
          })}

          {/* Target nodes */}
          {targetLabels.map((label) => {
            const pos = layout.targetPositions[label];
            if (!pos || pos.height < 1) return null;
            return (
              <g
                key={`t-${label}`}
                onMouseEnter={() => setHoveredTarget(label)}
                onMouseLeave={() => setHoveredTarget(null)}
                className="cursor-pointer"
              >
                <rect
                  x={PADDING + INNER_WIDTH - NODE_WIDTH}
                  y={pos.y}
                  width={NODE_WIDTH}
                  height={pos.height}
                  fill={ROLE_BUCKET_COLORS[label] || "#7C878E"}
                  rx={2}
                />
                <text
                  x={PADDING + INNER_WIDTH + 6}
                  y={pos.y + pos.height / 2}
                  textAnchor="start"
                  dominantBaseline="middle"
                  className="fill-current text-[9px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  {label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}
