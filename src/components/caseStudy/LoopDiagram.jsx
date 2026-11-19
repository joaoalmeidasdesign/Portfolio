// Knight Training loop (Figma 588:138): five steps on a pentagon,
// Plan → Practice → Record → Reflect → Adjust. Positions are from Figma.
const RADIUS = 48;
const GAP = 12;

const steps = [
  { n: 1, label: "Plan", cx: 280, cy: 80, lx: 280, ly: -14 },
  { n: 2, label: "Practice", cx: 455.95, cy: 207.83, lx: 513.83, ly: 188 },
  { n: 3, label: "Record", cx: 388.74, cy: 414.67, lx: 438.11, ly: 503 },
  { n: 4, label: "Reflect", cx: 171.26, cy: 414.67, lx: 121.89, ly: 503 },
  { n: 5, label: "Adjust", cx: 104.05, cy: 207.83, lx: 34.17, ly: 188, light: true },
];

// Straight arrow from one circle edge to the next, leaving a small gap.
function arrowPath(from, to) {
  const dx = to.cx - from.cx;
  const dy = to.cy - from.cy;
  const length = Math.hypot(dx, dy);
  const ux = dx / length;
  const uy = dy / length;
  const offset = RADIUS + GAP;
  const x1 = from.cx + ux * offset;
  const y1 = from.cy + uy * offset;
  const x2 = to.cx - ux * offset;
  const y2 = to.cy - uy * offset;
  return `M${x1.toFixed(1)} ${y1.toFixed(1)} L${x2.toFixed(1)} ${y2.toFixed(1)}`;
}

function LoopDiagram() {
  return (
    <svg
      className="loop-diagram"
      viewBox="-40 -44 640 584"
      role="img"
      aria-labelledby="loop-diagram-title"
    >
      <title id="loop-diagram-title">
        The weekly loop: 1 Plan, 2 Practice, 3 Record, 4 Reflect, 5 Adjust, then back to Plan.
      </title>
      <defs>
        <marker
          id="loop-arrowhead"
          viewBox="0 0 10 10"
          refX="8"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0 0 L10 5 L0 10" fill="none" stroke="var(--color-accent)" strokeWidth="1.6" />
        </marker>
      </defs>

      <g className="loop-diagram__arrows">
        {steps.map((step, index) => {
          const next = steps[(index + 1) % steps.length];
          return (
            <path
              key={step.n}
              className="loop-diagram__arrow"
              d={arrowPath(step, next)}
              pathLength="1"
              markerEnd="url(#loop-arrowhead)"
            />
          );
        })}
      </g>

      <text className="loop-diagram__center" x="280" y="270" textAnchor="middle">
        weekly
      </text>

      {steps.map((step, index) => (
        <g
          key={step.n}
          className="loop-diagram__step"
          style={{ "--i": index, transformOrigin: `${step.cx}px ${step.cy}px` }}
        >
          <circle
            cx={step.cx}
            cy={step.cy}
            r={RADIUS}
            className={step.light ? "loop-diagram__circle--light" : "loop-diagram__circle"}
          />
          <text
            className={step.light ? "loop-diagram__num loop-diagram__num--dark" : "loop-diagram__num"}
            x={step.cx}
            y={step.cy}
            textAnchor="middle"
            dominantBaseline="central"
          >
            {step.n}
          </text>
          <text className="loop-diagram__label" x={step.lx} y={step.ly} textAnchor="middle">
            {step.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default LoopDiagram;
