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

const limb = (x: number, y: number, w: number, h: number, rx: number, fill: string) => (
  <rect x={x} y={y} width={w} height={h} rx={rx} fill={fill} stroke="#172033" strokeWidth="3" />
);

function Character({ pose, showBones, showPivots }: { pose: Pose; showBones: boolean; showPivots: boolean }) {
  const pivot = (x: number, y: number) => showPivots ? <circle cx={x} cy={y} r="4" fill="#facc15" stroke="#111827" strokeWidth="2" /> : null;
  const bone = (x1: number, y1: number, x2: number, y2: number) => showBones ? <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#22d3ee" strokeWidth="3" strokeDasharray="5 4" /> : null;

  return (
    <svg viewBox="0 0 320 360" className="character-svg" aria-label="Modular character rig preview">
      <ellipse cx="160" cy="322" rx="70" ry="14" fill="#0f172a" opacity="0.18" />
      <g transform={`translate(0 ${pose.torsoY}) rotate(${pose.torsoRot} 160 170)`}>
        <g transform={`rotate(${pose.thighR} 177 220)`}>
          {limb(168, 216, 22, 58, 10, "#375fbc")}
          {bone(179, 220, 179, 270)}{pivot(179, 220)}
          <g transform={`rotate(${pose.shinR} 179 270)`}>
            {limb(168, 264, 22, 56, 10, "#6d4b32")}
            <path d="M164 310h34l-4 20h-36z" fill="#49301f" stroke="#172033" strokeWidth="3" />
            {bone(179, 270, 179, 316)}{pivot(179, 270)}
          </g>
        </g>

        <g transform={`rotate(${pose.thighL} 143 220)`}>
          {limb(132, 216, 22, 58, 10, "#4671cf")}
          {bone(143, 220, 143, 270)}{pivot(143, 220)}
          <g transform={`rotate(${pose.shinL} 143 270)`}>
            {limb(132, 264, 22, 56, 10, "#7b5537")}
            <path d="M127 310h34l-3 20h-36z" fill="#563822" stroke="#172033" strokeWidth="3" />
            {bone(143, 270, 143, 316)}{pivot(143, 270)}
          </g>
        </g>

        <g transform={`rotate(${pose.armR} 199 154)`}>
          {limb(190, 150, 20, 56, 9, "#3f6bc6")}
          {bone(200, 154, 200, 203)}{pivot(200, 154)}
          <g transform={`rotate(${pose.forearmR} 200 203)`}>
            {limb(190, 197, 20, 49, 9, "#c48c5a")}
            <circle cx="200" cy="245" r="12" fill="#8a5e3b" stroke="#172033" strokeWidth="3" />
            {bone(200, 203, 200, 242)}{pivot(200, 203)}
          </g>
        </g>

        <g transform={`rotate(${pose.armL} 121 154)`}>
          {limb(110, 150, 20, 56, 9, "#4d78d0")}
          {bone(120, 154, 120, 203)}{pivot(120, 154)}
          <g transform={`rotate(${pose.forearmL} 120 203)`}>
            {limb(110, 197, 20, 49, 9, "#d49a68")}
            <circle cx="120" cy="245" r="12" fill="#956543" stroke="#172033" strokeWidth="3" />
            {bone(120, 203, 120, 242)}{pivot(120, 203)}
          </g>
        </g>

        <path d="M116 138q44-25 88 0l-10 83h-68z" fill="#2f5fb8" stroke="#172033" strokeWidth="4" />
        <path d="M134 144h52l8 25-34 16-34-16z" fill="#f3c84b" stroke="#172033" strokeWidth="3" />
        <path d="M126 215h68" stroke="#82552f" strokeWidth="12" strokeLinecap="round" />
        {bone(160, 137, 160, 220)}{pivot(160, 170)}

        <g transform={`rotate(${pose.scarf} 190 128)`}>
          <path d="M181 127q36 2 54 18l-35 12z" fill="#d84742" stroke="#172033" strokeWidth="3" />
        </g>

        <circle cx="160" cy="105" r="52" fill="#f2bd85" stroke="#172033" strokeWidth="4" />
        <path d="M111 100q8-58 50-58 43 0 51 52-19-16-33-8-12-20-27 2-16-8-41 12z" fill="#6b4229" stroke="#172033" strokeWidth="4" />
        <circle cx="143" cy="106" r="6" fill="#23324a" /><circle cx="177" cy="106" r="6" fill="#23324a" />
        <path d="M145 126q15 11 30 0" fill="none" stroke="#8d4e42" strokeWidth="4" strokeLinecap="round" />
        {bone(160, 105, 160, 145)}{pivot(160, 137)}

        <g transform="translate(204 184)">
          <circle cx="0" cy="0" r="31" fill="#9a6d42" stroke="#172033" strokeWidth="4" />
          <circle cx="0" cy="0" r="23" fill="#d3a05c" stroke="#6e472b" strokeWidth="3" />
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
        <div className="status"><span className="dot" /> live procedural preview</div>
      </header>

      <section className="workspace">
        <aside className="panel parts-panel">
          <h2>Character Parts</h2>
          {['Head','Torso','Arm L','Forearm L','Arm R','Forearm R','Thigh L','Shin L','Thigh R','Shin R','Shield','Scarf'].map((part, i) => (
            <div className="part-row" key={part}><span className="part-thumb">{i < 2 ? '◆' : '●'}</span><span>{part}</span><span className="part-state">linked</span></div>
          ))}
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
          <div className="metric"><span>Rig</span><strong>12 parts</strong></div>
          <div className="metric"><span>Timeline</span><strong>8 keys</strong></div>
          <div className="metric"><span>Preview</span><strong>8 FPS</strong></div>
          <div className="metric"><span>Root pivot</span><strong>bottom center</strong></div>
          <div className="callout">All parts share one animation clock. The artwork stays fixed; only transforms change.</div>
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
