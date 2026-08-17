import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

type Direction = "up" | "down" | "left" | "right";

type Pose = {
  torsoY: number;
  torsoRot: number;
  armL: number;
  armR: number;
  forearmL: number;
  forearmR: number;
  thighL: number;
  thighR: number;
  shinL: number;
  shinR: number;
  scarf: number;
  rootX: number;
  rootY: number;
};

type AtlasPartProps = {
  sourceX: number;
  sourceY: number;
  sourceW?: number;
  sourceH?: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

const ATLAS = "/assets/rig-parts-atlas.png";

const horizontalPoses: Pose[] = [
  { torsoY: 0, torsoRot: -2, armL: 30, armR: -30, forearmL: 12, forearmR: -10, thighL: -32, thighR: 30, shinL: 18, shinR: -8, scarf: -18, rootX: 0, rootY: 0 },
  { torsoY: 4, torsoRot: -1, armL: 20, armR: -20, forearmL: 9, forearmR: -8, thighL: -16, thighR: 18, shinL: 28, shinR: 8, scarf: -24, rootX: 2, rootY: 1 },
  { torsoY: 2, torsoRot: 0, armL: 6, armR: -6, forearmL: 3, forearmR: -3, thighL: 8, thighR: -8, shinL: 20, shinR: 20, scarf: -30, rootX: 4, rootY: 0 },
  { torsoY: -4, torsoRot: 2, armL: -18, armR: 18, forearmL: -7, forearmR: 7, thighL: 28, thighR: -24, shinL: -4, shinR: 26, scarf: -22, rootX: 6, rootY: -2 },
  { torsoY: 0, torsoRot: 2, armL: -30, armR: 30, forearmL: -12, forearmR: 10, thighL: 30, thighR: -32, shinL: -8, shinR: 18, scarf: -14, rootX: 4, rootY: 0 },
  { torsoY: 4, torsoRot: 1, armL: -20, armR: 20, forearmL: -9, forearmR: 8, thighL: 18, thighR: -16, shinL: 8, shinR: 28, scarf: -18, rootX: 2, rootY: 1 },
  { torsoY: 2, torsoRot: 0, armL: -6, armR: 6, forearmL: -3, forearmR: 3, thighL: -8, thighR: 8, shinL: 20, shinR: 20, scarf: -24, rootX: 0, rootY: 0 },
  { torsoY: -4, torsoRot: -2, armL: 18, armR: -18, forearmL: 7, forearmR: -7, thighL: -24, thighR: 28, shinL: 26, shinR: -4, scarf: -20, rootX: -2, rootY: -2 },
];

const verticalPoses: Pose[] = horizontalPoses.map((pose, index) => {
  const phase = index % 4;
  const side = index < 4 ? 1 : -1;
  return {
    ...pose,
    torsoRot: side * (phase === 1 ? 1.5 : phase === 3 ? -1.5 : 0),
    armL: pose.armL * 0.62,
    armR: pose.armR * 0.62,
    forearmL: pose.forearmL * 0.55,
    forearmR: pose.forearmR * 0.55,
    thighL: pose.thighL * 0.72,
    thighR: pose.thighR * 0.72,
    shinL: pose.shinL * 0.82,
    shinR: pose.shinR * 0.82,
    scarf: pose.scarf * 0.35,
    rootX: side * (phase === 2 ? 2 : 0),
    rootY: phase === 3 ? -4 : phase === 1 ? 2 : 0,
  };
});

function AtlasPart({ sourceX, sourceY, sourceW = 64, sourceH = 64, x, y, width, height }: AtlasPartProps) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`${sourceX} ${sourceY} ${sourceW} ${sourceH}`} overflow="hidden">
      <image href={ATLAS} x="0" y="0" width="256" height="256" preserveAspectRatio="none" />
    </svg>
  );
}

function Character({ pose, direction, showBones, showPivots }: { pose: Pose; direction: Direction; showBones: boolean; showPivots: boolean }) {
  const pivot = (x: number, y: number) => showPivots ? <circle cx={x} cy={y} r="4" fill="#facc15" stroke="#111827" strokeWidth="2" /> : null;
  const bone = (x1: number, y1: number, x2: number, y2: number) => showBones ? <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22d3ee" strokeWidth="3" strokeDasharray="5 4" /> : null;

  const facingLeft = direction === "left";
  const vertical = direction === "up" || direction === "down";
  const backFacing = direction === "up";
  const rootTransform = facingLeft ? "translate(320 0) scale(-1 1)" : "";
  const bodyScaleX = vertical ? 0.93 : 1;
  const depthTilt = vertical ? (direction === "up" ? -2.5 : 2.5) : 0;
  const bob = pose.rootY + (vertical ? Math.sin((pose.rootX + 4) * 0.6) * 1.5 : 0);

  const armRight = (
    <g transform={`rotate(${pose.armR + depthTilt} 199 154)`} opacity={vertical ? 0.86 : 1}>
      <AtlasPart sourceX={128} sourceY={0} x={187} y={145} width={28} height={64} />
      {bone(200, 154, 200, 203)}{pivot(200, 154)}
      <g transform={`rotate(${pose.forearmR} 200 203)`}>
        <AtlasPart sourceX={192} sourceY={0} x={187} y={194} width={28} height={58} />
        {bone(200, 203, 200, 242)}{pivot(200, 203)}
      </g>
    </g>
  );

  const armLeft = (
    <g transform={`rotate(${pose.armL - depthTilt} 121 154)`} opacity={vertical ? 0.92 : 1}>
      <AtlasPart sourceX={128} sourceY={0} x={107} y={145} width={28} height={64} />
      {bone(120, 154, 120, 203)}{pivot(120, 154)}
      <g transform={`rotate(${pose.forearmL} 120 203)`}>
        <AtlasPart sourceX={192} sourceY={0} x={107} y={194} width={28} height={58} />
        {bone(120, 203, 120, 242)}{pivot(120, 203)}
      </g>
    </g>
  );

  return (
    <svg viewBox="0 0 320 360" className="character-svg" aria-label={`${direction} walk preview`}>
      <ellipse cx="160" cy="322" rx={vertical ? 60 : 70} ry="14" fill="#0f172a" opacity="0.18" />
      <g transform={rootTransform}>
        <g transform={`translate(${pose.rootX} ${bob}) scale(${bodyScaleX} 1)`}>
          <g transform={`translate(0 ${pose.torsoY}) rotate(${pose.torsoRot} 160 170)`}>
            <g transform={`rotate(${pose.thighR} 177 220)`} opacity={vertical ? 0.88 : 1}>
              <AtlasPart sourceX={0} sourceY={64} x={165} y={212} width={28} height={64} />
              {bone(179, 220, 179, 270)}{pivot(179, 220)}
              <g transform={`rotate(${pose.shinR} 179 270)`}>
                <AtlasPart sourceX={64} sourceY={64} x={165} y={260} width={28} height={64} />
                <AtlasPart sourceX={64} sourceY={128} x={162} y={300} width={36} height={36} />
                {bone(179, 270, 179, 316)}{pivot(179, 270)}
              </g>
            </g>

            <g transform={`rotate(${pose.thighL} 143 220)`}>
              <AtlasPart sourceX={0} sourceY={64} x={129} y={212} width={28} height={64} />
              {bone(143, 220, 143, 270)}{pivot(143, 220)}
              <g transform={`rotate(${pose.shinL} 143 270)`}>
                <AtlasPart sourceX={64} sourceY={64} x={129} y={260} width={28} height={64} />
                <AtlasPart sourceX={64} sourceY={128} x={126} y={300} width={36} height={36} />
                {bone(143, 270, 143, 316)}{pivot(143, 270)}
              </g>
            </g>

            {backFacing ? armLeft : armRight}
            {backFacing ? armRight : armLeft}

            <AtlasPart sourceX={64} sourceY={0} x={116} y={133} width={88} height={94} />
            {backFacing && <rect x="126" y="142" width="68" height="58" rx="28" fill="#0b1b2d" opacity="0.12" />}
            {bone(160, 137, 160, 220)}{pivot(160, 170)}

            <g transform={`rotate(${pose.scarf + (direction === "right" ? -8 : direction === "left" ? 8 : 0)} 190 128)`} opacity={backFacing ? 0.72 : 1}>
              <AtlasPart sourceX={0} sourceY={128} x={176} y={117} width={70} height={66} />
            </g>

            <g transform={backFacing ? "translate(0 4) scale(1 .96)" : ""}>
              <AtlasPart sourceX={0} sourceY={0} x={111} y={48} width={98} height={98} />
              {backFacing && <ellipse cx="160" cy="103" rx="43" ry="37" fill="#0a1c31" opacity="0.18" />}
            </g>
            {bone(160, 105, 160, 145)}{pivot(160, 137)}

            <g transform={`translate(${direction === "left" ? 203 : direction === "right" ? 203 : 194} ${direction === "up" ? 166 : 177})`} opacity={vertical ? 0.9 : 1}>
              <AtlasPart sourceX={128} sourceY={64} x={-35} y={-35} width={70} height={70} />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

const directionMeta: Record<Direction, { label: string; glyph: string; note: string }> = {
  up: { label: "Up", glyph: "↑", note: "back-facing depth + tighter stride" },
  down: { label: "Down", glyph: "↓", note: "front-facing stride + subtle shoulder sway" },
  left: { label: "Left", glyph: "←", note: "mirrored lateral gait" },
  right: { label: "Right", glyph: "→", note: "full lateral gait + trailing scarf" },
};

function App() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showBones, setShowBones] = useState(false);
  const [showPivots, setShowPivots] = useState(false);
  const [frame, setFrame] = useState(0);
  const [direction, setDirection] = useState<Direction>("right");

  const activePoses = direction === "up" || direction === "down" ? verticalPoses : horizontalPoses;

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % activePoses.length), 125 / speed);
    return () => window.clearInterval(id);
  }, [playing, speed, activePoses.length]);

  const pose = useMemo(() => activePoses[frame], [activePoses, frame]);

  const changeDirection = (next: Direction) => {
    setDirection(next);
    setFrame(0);
  };

  return (
    <main className="app-shell">
      <header className="topbar">
        <div><div className="eyebrow">GAME ASSET FORGE</div><h1>Directional Rig Preview</h1></div>
        <div className="status"><span className="dot" /> PNG atlas + 4-way locomotion</div>
      </header>

      <section className="workspace">
        <aside className="panel parts-panel">
          <h2>PNG Character Parts</h2>
          {['Head','Torso','Upper Arm','Forearm','Thigh','Shin','Boot','Shield','Scarf'].map((part) => (
            <div className="part-row" key={part}><span className="part-thumb">●</span><span>{part}</span><span className="part-state">atlas</span></div>
          ))}
          <img className="atlas-preview" src={ATLAS} alt="PNG rig parts atlas" />
        </aside>

        <section className="panel preview-panel">
          <div className="panel-head"><div><span className="label">LOCOMOTION</span><strong>{directionMeta[direction].label} Walk</strong></div><span className="frame-chip">Frame {frame + 1}/8</span></div>

          <div className="direction-pad" aria-label="Choose movement direction">
            <button className={direction === "up" ? "active" : ""} onClick={() => changeDirection("up")}>↑<span>Up</span></button>
            <button className={direction === "left" ? "active" : ""} onClick={() => changeDirection("left")}>←<span>Left</span></button>
            <div className="direction-center">WASD</div>
            <button className={direction === "right" ? "active" : ""} onClick={() => changeDirection("right")}>→<span>Right</span></button>
            <button className={direction === "down" ? "active" : ""} onClick={() => changeDirection("down")}>↓<span>Down</span></button>
          </div>

          <div className={`stage direction-${direction}`}>
            <div className="grid" />
            <div className="travel-line"><span>{directionMeta[direction].glyph}</span></div>
            <Character pose={pose} direction={direction} showBones={showBones} showPivots={showPivots} />
          </div>

          <div className="controls">
            <button onClick={() => setPlaying((v) => !v)}>{playing ? 'Pause' : 'Play'}</button>
            {[0.5,1,2].map((v) => <button key={v} className={speed === v ? 'active' : ''} onClick={() => setSpeed(v)}>{v}×</button>)}
            <label><input type="checkbox" checked={showBones} onChange={(e) => setShowBones(e.target.checked)} /> Bones</label>
            <label><input type="checkbox" checked={showPivots} onChange={(e) => setShowPivots(e.target.checked)} /> Pivots</label>
          </div>
        </section>

        <aside className="panel inspector">
          <h2>Inspector</h2>
          <div className="metric"><span>Direction</span><strong>{directionMeta[direction].glyph} {directionMeta[direction].label}</strong></div>
          <div className="metric"><span>Source</span><strong>PNG atlas</strong></div>
          <div className="metric"><span>Timeline</span><strong>8 keys</strong></div>
          <div className="metric"><span>Preview</span><strong>8 FPS</strong></div>
          <div className="metric"><span>Root pivot</span><strong>bottom center</strong></div>
          <div className="callout"><strong>{directionMeta[direction].label} profile</strong><br />{directionMeta[direction].note}. Every body part still runs from one shared animation clock.</div>
        </aside>
      </section>

      <section className="panel timeline">
        <div className="panel-head"><div><span className="label">TIMELINE</span><strong>{directionMeta[direction].label} walk · shared animation clock</strong></div><span>{Math.round((frame / 8) * 100)}%</span></div>
        <div className="frames">{activePoses.map((_, i) => <button key={i} onClick={() => { setPlaying(false); setFrame(i); }} className={i === frame ? 'current' : ''}><span>{i + 1}</span><i /></button>)}</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
