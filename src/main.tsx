import { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";

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

const poses: Pose[] = [
  { torsoY: 0, torsoRot: 0, armL: 28, armR: -28, forearmL: 12, forearmR: -12, thighL: -28, thighR: 28, shinL: 18, shinR: -8, scarf: -10 },
  { torsoY: 4, torsoRot: -1, armL: 18, armR: -18, forearmL: 8, forearmR: -8, thighL: -12, thighR: 18, shinL: 26, shinR: 6, scarf: -16 },
  { torsoY: 1, torsoRot: 0, armL: 4, armR: -4, forearmL: 2, forearmR: -2, thighL: 8, thighR: -6, shinL: 18, shinR: 18, scarf: -22 },
  { torsoY: -3, torsoRot: 1, armL: -16, armR: 16, forearmL: -6, forearmR: 6, thighL: 26, thighR: -22, shinL: -4, shinR: 24, scarf: -14 },
  { torsoY: 0, torsoRot: 0, armL: -28, armR: 28, forearmL: -12, forearmR: 12, thighL: 28, thighR: -28, shinL: -8, shinR: 18, scarf: -8 },
  { torsoY: 4, torsoRot: 1, armL: -18, armR: 18, forearmL: -8, forearmR: 8, thighL: 18, thighR: -12, shinL: 6, shinR: 26, scarf: -12 },
  { torsoY: 1, torsoRot: 0, armL: -4, armR: 4, forearmL: -2, forearmR: 2, thighL: -6, thighR: 8, shinL: 18, shinR: 18, scarf: -18 },
  { torsoY: -3, torsoRot: -1, armL: 16, armR: -16, forearmL: 6, forearmR: -6, thighL: -22, thighR: 26, shinL: 24, shinR: -4, scarf: -12 },
];

function AtlasPart({ sourceX, sourceY, sourceW = 64, sourceH = 64, x, y, width, height }: AtlasPartProps) {
  return (
    <svg x={x} y={y} width={width} height={height} viewBox={`${sourceX} ${sourceY} ${sourceW} ${sourceH}`} overflow="hidden">
      <image href={ATLAS} x="0" y="0" width="256" height="256" preserveAspectRatio="none" />
    </svg>
  );
}

function Character({ pose, showBones, showPivots }: { pose: Pose; showBones: boolean; showPivots: boolean }) {
  const pivot = (x: number, y: number) => showPivots ? <circle cx={x} cy={y} r="4" fill="#facc15" stroke="#111827" strokeWidth="2" /> : null;
  const bone = (x1: number, y1: number, x2: number, y2: number) => showBones ? <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22d3ee" strokeWidth="3" strokeDasharray="5 4" /> : null;

  return (
    <svg viewBox="0 0 320 360" className="character-svg" aria-label="PNG modular character rig preview">
      <ellipse cx="160" cy="322" rx="70" ry="14" fill="#0f172a" opacity="0.18" />
      <g transform={`translate(0 ${pose.torsoY}) rotate(${pose.torsoRot} 160 170)`}>
        <g transform={`rotate(${pose.thighR} 177 220)`}>
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

        <g transform={`rotate(${pose.armR} 199 154)`}>
          <AtlasPart sourceX={128} sourceY={0} x={187} y={145} width={28} height={64} />
          {bone(200, 154, 200, 203)}{pivot(200, 154)}
          <g transform={`rotate(${pose.forearmR} 200 203)`}>
            <AtlasPart sourceX={192} sourceY={0} x={187} y={194} width={28} height={58} />
            {bone(200, 203, 200, 242)}{pivot(200, 203)}
          </g>
        </g>

        <g transform={`rotate(${pose.armL} 121 154)`}>
          <AtlasPart sourceX={128} sourceY={0} x={107} y={145} width={28} height={64} />
          {bone(120, 154, 120, 203)}{pivot(120, 154)}
          <g transform={`rotate(${pose.forearmL} 120 203)`}>
            <AtlasPart sourceX={192} sourceY={0} x={107} y={194} width={28} height={58} />
            {bone(120, 203, 120, 242)}{pivot(120, 203)}
          </g>
        </g>

        <AtlasPart sourceX={64} sourceY={0} x={116} y={133} width={88} height={94} />
        {bone(160, 137, 160, 220)}{pivot(160, 170)}

        <g transform={`rotate(${pose.scarf} 190 128)`}>
          <AtlasPart sourceX={0} sourceY={128} x={176} y={117} width={70} height={66} />
        </g>

        <AtlasPart sourceX={0} sourceY={0} x={111} y={48} width={98} height={98} />
        {bone(160, 105, 160, 145)}{pivot(160, 137)}

        <g transform="translate(203 177)">
          <AtlasPart sourceX={128} sourceY={64} x={-35} y={-35} width={70} height={70} />
        </g>
      </g>
    </svg>
  );
}

function App() {
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [showBones, setShowBones] = useState(true);
  const [showPivots, setShowPivots] = useState(true);
  const [frame, setFrame] = useState(0);

  useEffect(() => {
    if (!playing) return;
    const id = window.setInterval(() => setFrame((f) => (f + 1) % poses.length), 125 / speed);
    return () => window.clearInterval(id);
  }, [playing, speed]);

  const pose = useMemo(() => poses[frame], [frame]);

  return (
    <main className="app-shell">
      <header className="topbar">
        <div><div className="eyebrow">GAME ASSET FORGE</div><h1>2D Rig Preview</h1></div>
        <div className="status"><span className="dot" /> PNG atlas + shared skeleton</div>
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
          <div className="panel-head"><div><span className="label">ANIMATION</span><strong>Walk Cycle</strong></div><span className="frame-chip">Frame {frame + 1}/8</span></div>
          <div className="stage"><div className="grid" /><Character pose={pose} showBones={showBones} showPivots={showPivots} /></div>
          <div className="controls">
            <button onClick={() => setPlaying((v) => !v)}>{playing ? 'Pause' : 'Play'}</button>
            {[0.5,1,2].map((v) => <button key={v} className={speed === v ? 'active' : ''} onClick={() => setSpeed(v)}>{v}×</button>)}
            <label><input type="checkbox" checked={showBones} onChange={(e) => setShowBones(e.target.checked)} /> Bones</label>
            <label><input type="checkbox" checked={showPivots} onChange={(e) => setShowPivots(e.target.checked)} /> Pivots</label>
          </div>
        </section>

        <aside className="panel inspector">
          <h2>Inspector</h2>
          <div className="metric"><span>Source</span><strong>PNG atlas</strong></div>
          <div className="metric"><span>Timeline</span><strong>8 keys</strong></div>
          <div className="metric"><span>Preview</span><strong>8 FPS</strong></div>
          <div className="metric"><span>Root pivot</span><strong>bottom center</strong></div>
          <div className="callout">The character is assembled from raster PNG regions. One animation clock drives every transform, so the parts cannot drift out of sync.</div>
        </aside>
      </section>

      <section className="panel timeline">
        <div className="panel-head"><div><span className="label">TIMELINE</span><strong>Shared animation clock</strong></div><span>{Math.round((frame / 8) * 100)}%</span></div>
        <div className="frames">{poses.map((_, i) => <button key={i} onClick={() => { setPlaying(false); setFrame(i); }} className={i === frame ? 'current' : ''}><span>{i + 1}</span><i /></button>)}</div>
      </section>
    </main>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
