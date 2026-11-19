// Knight Training loop (Figma 588:138): five steps on a pentagon,
// Plan → Practice → Record → Reflect → Adjust. Positions are from Figma.
const RADIUS = 48;
const GAP = 12;

const steps = [
  { n: 1, label: "Plan", cx: 280, cy: 80, lx: 280, ly: 6 },
  { n: 2, label: "Practice", cx: 455.95, cy: 207.83, lx: 513.83, ly: 154 },
  { n: 3, label: "Record", cx: 388.74, cy: 414.67, lx: 438.11, ly: 503 },
  { n: 4, label: "Reflect", cx: 171.26, cy: 414.67, lx: 121.89, ly: 503 },
  { n: 5, label: "Adjust", cx: 104.05, cy: 207.83, lx: 34.17, ly: 154, light: true },
];

const HEAD = 11;

// Straight arrow from one circle edge to the next, leaving a small gap.
// Returns the line and a separate chevron head (so the head can appear
// after the line has drawn in).
function arrow(from, to) {
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
  // Perpendicular for the chevron wings.
  const nx = -uy;
  const ny = ux;
  const bx = x2 - ux * HEAD;
  const by = y2 - uy * HEAD;
  const f = (n) => n.toFixed(1);
  return {
    line: `M${f(x1)} ${f(y1)} L${f(bx)} ${f(by)}`,
    head: `M${f(bx + nx * HEAD * 0.55)} ${f(by + ny * HEAD * 0.55)} L${f(x2)} ${f(y2)} L${f(bx - nx * HEAD * 0.55)} ${f(by - ny * HEAD * 0.55)} Z`,
  };
}

const arrows = steps.map((step, index) => arrow(step, steps[(index + 1) % steps.length]));

function LoopDiagram() {
  return (
    <svg
      className="loop-diagram"
      viewBox="-40 -24 640 564"
      role="img"
      aria-labelledby="loop-diagram-title"
    >
      <title id="loop-diagram-title">
        The weekly loop: 1 Plan, 2 Practice, 3 Record, 4 Reflect, 5 Adjust, then back to Plan.
      </title>
      <g className="loop-diagram__arrows">
        {arrows.map((a) => (
          <path key={a.line} className="loop-diagram__arrow" d={a.line} pathLength="1" />
        ))}
      </g>
      <g className="loop-diagram__heads">
        {arrows.map((a) => (
          <path key={a.head} className="loop-diagram__arrow loop-diagram__head" d={a.head} />
        ))}
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
