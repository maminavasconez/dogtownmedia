(function () {
const { useState, useEffect, useRef, useCallback } = React;

/* ---------- GAME DATA ---------- */
const N = 7;
const CELL = 56;
const COLORS = [
  'oklch(0.50 0.25 295)',
  'oklch(0.55 0.21 272)',
  'oklch(0.63 0.16 242)',
  'oklch(0.71 0.14 206)',
  'oklch(0.79 0.15 174)',
  'oklch(0.86 0.19 146)',
  'oklch(0.92 0.22 122)'
];
const CRATES = [
  {
    name: 'Lead Generation',
    msg: "Crunch. That's the good stuff.",
    bullets: [
      'I specialize in lead generation.',
      'At IGTMS, I helped build the pipeline from $0 to $700K in six months through email marketing and multichannel campaigns.',
      'We also had a client called True North, a healthcare MSP.',
      'I have developed a specific process for running effective email marketing campaigns.'
    ]
  },
  {
    name: 'Content',
    msg: 'One down, still hungry.',
    bullets: [
      'I have built websites for IGTMS, Senturo, Sculpture Cancun, and Cumbayá Padel Center.',
      'I have also managed the blogs for Howl, Lensa, and Senturo.',
      'I started my career in SEO, so content marketing is a huge part of what I do.',
      'I also have experience managing newsletters.'
    ]
  },
  {
    name: 'ABM and Outbound',
    msg: 'A bit rounder already.',
    bullets: [
      'I have experience with LinkedIn message automation and AI-powered message personalization.',
      'I love using Clay, and I can help automate LinkedIn outreach.',
      'I have also increased LinkedIn visibility through content and have developed a specific, fast process for creating it.'
    ]
  },
  {
    name: 'Marketing Operations',
    msg: 'Halfway. Keep them coming.',
    bullets: [
      'I have experience managing CRMs, including HubSpot and GoHighLevel.',
      'My experience includes creating forms and knowledge bases, cleaning up CRM systems, and enriching data.'
    ]
  },
  {
    name: 'PR and PPC',
    msg: 'Chewing thoughtfully.',
    bullets: [
      'I have experience overseeing contractors, which is especially important when scaling SEO content and avoiding keyword cannibalization.',
      'At Lensa, I oversaw PPC campaigns across Meta and Google Ads, with more than $70K spent quarterly on Google Ads.',
      'I also managed PR for Lensa’s CEO, including the company’s Forbes Council presence.'
    ]
  },
  {
    name: 'AI',
    msg: 'Almost too full to hop.',
    bullets: [
      'I love vibe coding and use it in my workflows every day.',
      'I use AI to automate emails, build lead generation tools, and create tools that support my daily work, including a Reddit tool.'
    ]
  },
  {
    name: 'About Me',
    msg: 'All seven eaten. Nap time.',
    bullets: [
      'I have worked in agencies and highly regulated industries, including government and school districts.',
      'I have lived in nine countries.',
      'I am an outside-the-box thinker, speak three languages, and am highly creative.',
      'Outside of work, I am also a jeweler.'
    ]
  }
];
const SPOTS = [[0, 0], [0, 3], [0, 6], [3, 0], [3, 6], [6, 0], [6, 6]];
const START = [6, 3];

function makeMaze() {
  const cells = [];
  for (let r = 0; r < N; r++) {
    const row = [];
    for (let c = 0; c < N; c++) row.push({ n: false, e: false, s: false, w: false, seen: false });
    cells.push(row);
  }
  const stack = [[0, 0]];
  cells[0][0].seen = true;
  const dirs = [['n', -1, 0, 's'], ['s', 1, 0, 'n'], ['e', 0, 1, 'w'], ['w', 0, -1, 'e']];
  while (stack.length) {
    const [r, c] = stack[stack.length - 1];
    const open = [];
    for (const [d, dr, dc, opp] of dirs) {
      const nr = r + dr, nc = c + dc;
      if (nr >= 0 && nr < N && nc >= 0 && nc < N && !cells[nr][nc].seen) open.push([d, nr, nc, opp]);
    }
    if (!open.length) { stack.pop(); continue; }
    const [d, nr, nc, opp] = open[Math.floor(Math.random() * open.length)];
    cells[r][c][d] = true;
    cells[nr][nc][opp] = true;
    cells[nr][nc].seen = true;
    stack.push([nr, nc]);
  }
  return cells;
}

function findPath(from, to, maze) {
  const key = (r, c) => r * N + c;
  const prev = new Map();
  const q = [from];
  const seen = new Set([key(from[0], from[1])]);
  const dirs = [['n', -1, 0], ['s', 1, 0], ['e', 0, 1], ['w', 0, -1]];
  while (q.length) {
    const [r, c] = q.shift();
    if (r === to[0] && c === to[1]) break;
    for (const [d, dr, dc] of dirs) {
      if (!maze[r][c][d]) continue;
      const nr = r + dr, nc = c + dc, k = key(nr, nc);
      if (seen.has(k)) continue;
      seen.add(k);
      prev.set(k, [r, c]);
      q.push([nr, nc]);
    }
  }
  const out = [];
  let cur = to;
  while (!(cur[0] === from[0] && cur[1] === from[1])) {
    out.unshift(cur);
    const p = prev.get(key(cur[0], cur[1]));
    if (!p) return [];
    cur = p;
  }
  return out;
}

/* ---------- BUNNY SVG ---------- */
function BunnySvg() {
  return /*#__PURE__*/React.createElement("svg", {
    width: 44, height: 48, viewBox: "0 0 44 48", style: { display: "block", overflow: "visible" }
  },
    React.createElement("ellipse", { cx: 22, cy: 45, rx: 13, ry: 2.4, fill: "color-mix(in oklab, var(--black) 12%, transparent)" }),
    React.createElement("g", { fill: "var(--white)", stroke: "var(--black)", strokeWidth: 2.2, strokeLinejoin: "round" },
      React.createElement("path", { d: "M13 12 C11 5 12.5 1 15 1 C17.5 1 18.6 6 18.2 13 Z" }),
      React.createElement("path", { d: "M31 12 C33 5 31.5 1 29 1 C26.5 1 25.4 6 25.8 13 Z" }),
      React.createElement("ellipse", { cx: 22, cy: 33, rx: 14, ry: 11.5 }),
      React.createElement("ellipse", { cx: 22, cy: 19, rx: 11, ry: 9.5 })
    ),
    React.createElement("path", { d: "M14.6 10.6 C13.4 6.2 14.2 3.4 15.2 3.4 C16.4 3.4 17 6.6 16.8 11 Z", fill: "color-mix(in oklab, var(--violet) 34%, var(--white))" }),
    React.createElement("path", { d: "M29.4 10.6 C30.6 6.2 29.8 3.4 28.8 3.4 C27.6 3.4 27 6.6 27.2 11 Z", fill: "color-mix(in oklab, var(--violet) 34%, var(--white))" }),
    React.createElement("circle", { cx: 36, cy: 30, r: 5, fill: "var(--white)", stroke: "var(--black)", strokeWidth: 2.2 }),
    React.createElement("circle", { cx: 17.6, cy: 18, r: 1.9, fill: "var(--black)" }),
    React.createElement("circle", { cx: 26.4, cy: 18, r: 1.9, fill: "var(--black)" }),
    React.createElement("circle", { cx: 18.3, cy: 17.3, r: 0.6, fill: "var(--white)" }),
    React.createElement("circle", { cx: 27.1, cy: 17.3, r: 0.6, fill: "var(--white)" }),
    React.createElement("path", { d: "M22 21.4 L20.6 23 L23.4 23 Z", fill: "var(--violet)" }),
    React.createElement("path", { d: "M22 23.4 L22 24.4 M22 24.4 C21.2 25.4 20 25.2 19.4 24.4 M22 24.4 C22.8 25.4 24 25.2 24.6 24.4", fill: "none", stroke: "var(--black)", strokeWidth: 1.4, strokeLinecap: "round" }),
    React.createElement("circle", { cx: 14.4, cy: 21.4, r: 1.6, fill: "color-mix(in oklab, var(--violet) 22%, var(--white))" }),
    React.createElement("circle", { cx: 29.6, cy: 21.4, r: 1.6, fill: "color-mix(in oklab, var(--violet) 22%, var(--white))" })
  );
}

function CarrotSvg({ width = 22, height = 30 }) {
  return /*#__PURE__*/React.createElement("svg", { width, height, viewBox: "0 0 22 30", style: { display: "block" } },
    React.createElement("path", { d: "M11 29 C7 21 5 15 6 11 C7 7 15 7 16 11 C17 15 15 21 11 29 Z", fill: "#F08A2E" }),
    React.createElement("path", { d: "M11 11 L11 24", stroke: "color-mix(in oklab, var(--black) 18%, transparent)", strokeWidth: 1.4, strokeLinecap: "round" }),
    React.createElement("path", { d: "M11 9 C10 4 7 2 4 1 C6 5 8 7 11 9 Z", fill: "var(--lime-deep)" }),
    React.createElement("path", { d: "M11 9 C12 4 15 2 18 1 C16 5 14 7 11 9 Z", fill: "var(--lime)" })
  );
}

/* ---------- GAME ---------- */
function BunnyMaze() {
  const [maze, setMaze] = useState(null);
  const [eaten, setEaten] = useState([]);
  const [cell, setCell] = useState(START);
  const [moving, setMoving] = useState(false);
  const [toast, setToast] = useState('');
  const [pops, setPops] = useState([]);
  const [openIdx, setOpenIdx] = useState(null);
  const [confetti, setConfetti] = useState([]);
  const stopRef = useRef(false);
  const eatenRef = useRef(eaten);
  const cellRef = useRef(cell);
  const mazeRef = useRef(maze);
  const movingRef = useRef(moving);
  eatenRef.current = eaten;
  cellRef.current = cell;
  mazeRef.current = maze;
  movingRef.current = moving;

  const newMaze = useCallback(() => {
    setMaze(makeMaze());
    setEaten([]);
    setCell(START);
    setMoving(false);
    setToast('');
    setPops([]);
    setOpenIdx(null);
    setConfetti([]);
  }, []);

  useEffect(() => {
    newMaze();
    stopRef.current = false;
    const onKey = (e) => { if (e.key === 'Escape') setOpenIdx(null); };
    window.addEventListener('keydown', onKey);
    return () => {
      stopRef.current = true;
      window.removeEventListener('keydown', onKey);
    };
  }, [newMaze]);

  const burst = useCallback(() => {
    const batch = Math.random();
    const items = [];
    for (let i = 0; i < 26; i++) {
      const size = 18 + Math.round(Math.random() * 22);
      items.push({
        id: batch + '-' + i,
        left: (4 + Math.random() * 92).toFixed(2),
        top: (6 + Math.random() * 86).toFixed(2),
        size,
        sizeTall: Math.round(size * 30 / 22),
        r0: Math.round(-40 + Math.random() * 80),
        r1: Math.round(-70 + Math.random() * 140),
        dy: Math.round(-90 - Math.random() * 90),
        dur: 1300 + Math.round(Math.random() * 700),
        delay: Math.round(Math.random() * 320)
      });
    }
    setConfetti((c) => [...c, ...items]);
    setTimeout(() => {
      if (stopRef.current) return;
      const ids = new Set(items.map((i) => i.id));
      setConfetti((c) => c.filter((x) => !ids.has(x.id)));
    }, 2400);
  }, []);

  const arrive = useCallback((idx) => {
    const [r, c] = SPOTS[idx];
    const pop = { id: Math.random(), left: c * CELL + CELL / 2, top: r * CELL + CELL / 2 - 10 };
    setMoving(false);
    setEaten((s) => (s.includes(idx) ? s : [...s, idx]));
    setToast(CRATES[idx].msg);
    setPops((s) => [...s, pop]);
    burst();
    setTimeout(() => { if (!stopRef.current) setOpenIdx(idx); }, 520);
    setTimeout(() => { if (!stopRef.current) setPops((s) => s.filter((p) => p.id !== pop.id)); }, 1200);
    setTimeout(() => { if (!stopRef.current) setToast((t) => (t === CRATES[idx].msg ? '' : t)); }, 2300);
  }, [burst]);

  const onBoxClick = useCallback((e) => {
    const idx = parseInt(e.currentTarget.getAttribute('data-idx'), 10);
    if (eatenRef.current.includes(idx)) { setOpenIdx(idx); return; }
    if (movingRef.current || !mazeRef.current) return;
    const steps = findPath(cellRef.current, SPOTS[idx], mazeRef.current);
    movingRef.current = true;
    setMoving(true);
    setToast('');
    let i = 0;
    const walk = () => {
      if (stopRef.current) return;
      if (i >= steps.length) return arrive(idx);
      cellRef.current = steps[i];
      setCell(steps[i]);
      i++;
      setTimeout(walk, 210);
    };
    walk();
  }, [arrive]);

  const onClose = useCallback(() => setOpenIdx(null), []);
  const stopProp = useCallback((e) => e.stopPropagation(), []);

  const walls = [];
  if (maze) {
    for (let r = 0; r < N; r++) {
      for (let c = 0; c < N; c++) {
        if (r > 0 && !maze[r][c].n) walls.push({ x1: c * CELL, y1: r * CELL, x2: (c + 1) * CELL, y2: r * CELL });
        if (c > 0 && !maze[r][c].w) walls.push({ x1: c * CELL, y1: r * CELL, x2: c * CELL, y2: (r + 1) * CELL });
      }
    }
  }

  const boxes = SPOTS.map((sp, i) => {
    const done = eaten.includes(i);
    return {
      idx: i,
      num: String(i + 1).padStart(2, '0'),
      name: CRATES[i].name,
      color: done ? 'color-mix(in oklab, var(--black) 14%, var(--white))' : COLORS[i],
      left: sp[1] * CELL + CELL / 2,
      top: sp[0] * CELL + CELL / 2,
      opacity: done ? 0.32 : 1,
      tag: done ? 'empty' : 'open me',
      tagOpacity: done ? 0 : 0.9,
      state: done ? 'read again' : 'waiting',
      stateColor: done ? 'var(--lime-deep)' : 'var(--muted)',
      textColor: done ? 'var(--muted)' : 'var(--black)'
    };
  });

  const n = eaten.length;
  const boardPx = N * CELL;
  const boardInnerPx = N * CELL - 3;
  const bunnyLeft = cell[1] * CELL + CELL / 2;
  const bunnyTop = cell[0] * CELL + CELL / 2;
  const bunnyScale = (1 + n * 0.11).toFixed(2);
  const bunnyAnim = moving
    ? 'bunnyHop 210ms cubic-bezier(.2,.7,.2,1) infinite'
    : 'bunnyBob 2.4s cubic-bezier(.2,.7,.2,1) infinite';
  const eatenLabel = n + ' / 7';
  const sizeLabel = (1 + n * 0.11).toFixed(2) + '×';
  const statusLabel = n === 7 ? 'all eaten' : (moving ? 'hopping' : 'waiting for you');
  const hint = n === 7 ? 'She is completely round. Start over?' : 'She hops one square at a time.';
  const open = openIdx === null ? null : CRATES[openIdx];

  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh', background: 'var(--white)', fontFamily: 'var(--font-body, Geist, sans-serif)',
      color: 'var(--black)', padding: 'clamp(120px, 15vw, 150px) clamp(20px, 5vw, 80px) 72px', boxSizing: 'border-box',
      display: 'flex', justifyContent: 'center'
    }
  },
    React.createElement("div", { style: { width: '100%', maxWidth: 1120, display: 'flex', flexDirection: 'column', gap: 40 } },

      React.createElement("div", { style: { display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, flexWrap: 'wrap' } },
        React.createElement("div", { style: { maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 14 } },
          React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 10 } },
            React.createElement("span", { style: { width: 8, height: 8, borderRadius: 999, background: 'var(--lime)', animation: 'dotPulse 2.2s cubic-bezier(.2,.7,.2,1) infinite' } }),
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' } }, "DOGTOWN MEDIA")
          ),
          React.createElement("h1", { style: { margin: 0, fontFamily: 'Geist, sans-serif', fontSize: 'clamp(40px, 5.4vw, 68px)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.02 } }, "Hungry little bunny"),
          React.createElement("p", { style: { margin: 0, fontSize: 17, lineHeight: 1.5, color: 'var(--muted)' } }, "Pick a box and she'll find her own way through the maze. Every carrot she eats makes her a little rounder.")
        ),
        React.createElement("div", { style: { display: 'flex', alignItems: 'flex-end', gap: 28 } },
          React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' } }, "Carrots"),
            React.createElement("span", { style: { fontFamily: 'Geist, sans-serif', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, color: 'var(--violet)' } }, eatenLabel)
          ),
          React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 6 } },
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' } }, "Size"),
            React.createElement("span", { style: { fontFamily: 'Geist, sans-serif', fontSize: 44, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1 } }, sizeLabel)
          )
        )
      ),

      React.createElement("div", { style: { display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' } },

        React.createElement("div", { className: "bunny-card", style: { position: 'relative', background: 'var(--paper)', border: '1px solid var(--line)', borderRadius: 22, padding: 28, boxShadow: '0 1px 2px rgba(0,0,0,0.04)', maxWidth: '100%', boxSizing: 'border-box' } },
          toast && React.createElement("div", { style: { position: 'absolute', top: -14, left: 28, zIndex: 30, display: 'flex', alignItems: 'center', gap: 10, padding: '8px 16px 8px 12px', background: 'var(--lime)', borderRadius: 999, animation: 'toastIn 2200ms cubic-bezier(.2,.7,.2,1) forwards' } },
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', padding: '3px 8px', background: 'var(--black)', color: 'var(--lime)', borderRadius: 999 } }, "Nom"),
            React.createElement("span", { style: { fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em' } }, toast)
          ),

          React.createElement("div", { className: "bunny-board-wrap", style: { position: 'relative', width: boardPx, height: boardPx, maxWidth: '100%' } },
            React.createElement("svg", { width: boardPx, height: boardPx, viewBox: `0 0 ${boardPx} ${boardPx}`, style: { position: 'absolute', inset: 0, overflow: 'visible' } },
              React.createElement("rect", { x: 0, y: 0, width: boardPx, height: boardPx, rx: 14, fill: "var(--white)" }),
              React.createElement("g", { stroke: "var(--black)", strokeWidth: 3, strokeLinecap: "round", opacity: 0.14 },
                walls.map((w, i) => React.createElement("line", { key: i, x1: w.x1, y1: w.y1, x2: w.x2, y2: w.y2 }))
              ),
              React.createElement("rect", { x: 1.5, y: 1.5, width: boardInnerPx, height: boardInnerPx, rx: 13, fill: "none", stroke: "var(--black)", strokeWidth: 3, opacity: 0.14 })
            ),

            boxes.map((box) => React.createElement("button", {
              key: box.idx, onClick: onBoxClick, "data-idx": box.idx, title: box.name,
              style: {
                position: 'absolute', left: box.left, top: box.top, width: 34, height: 34, margin: '-17px 0 0 -17px',
                padding: 0, border: 'none', background: 'none', cursor: 'pointer', zIndex: 12, opacity: box.opacity,
                transition: 'opacity 280ms cubic-bezier(.2,.7,.2,1)'
              }
            },
              React.createElement("span", { style: { position: 'absolute', inset: 0, borderRadius: 10, background: box.color, boxShadow: '0 2px 0 0 rgba(0,0,0,0.22)' } }),
              React.createElement("span", { style: { position: 'absolute', left: 3, right: 3, top: 9, height: 2, borderRadius: 999, background: 'rgba(0,0,0,0.26)' } }),
              React.createElement("span", { style: { position: 'absolute', left: '50%', top: 3, width: 2, height: 28, marginLeft: -1, borderRadius: 999, background: 'rgba(255,255,255,0.55)' } }),
              React.createElement("span", { style: { position: 'absolute', left: '50%', top: -34, transform: 'translate(-50%, 0)', fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', whiteSpace: 'nowrap', opacity: box.tagOpacity } }, box.tag)
            )),

            pops.map((pop) => React.createElement("div", {
              key: pop.id, style: { position: 'absolute', left: pop.left, top: pop.top, zIndex: 25, pointerEvents: 'none', animation: 'carrotRise 1100ms cubic-bezier(.2,.7,.2,1) forwards' }
            }, React.createElement(CarrotSvg, null))),

            React.createElement("div", { style: { position: 'absolute', left: bunnyLeft, top: bunnyTop, width: 0, height: 0, zIndex: 20, transition: 'left 210ms cubic-bezier(.2,.7,.2,1), top 210ms cubic-bezier(.2,.7,.2,1)' } },
              React.createElement("div", { style: { position: 'absolute', left: 0, top: 0, transform: `translate(-50%, -50%) scale(${bunnyScale})`, transformOrigin: '50% 70%', transition: 'transform 280ms cubic-bezier(.2,.7,.2,1)' } },
                React.createElement("div", { style: { animation: bunnyAnim } }, React.createElement(BunnySvg, null))
              )
            )
          )
        ),

        React.createElement("div", { style: { flex: '1 1 320px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 18 } },
          React.createElement("div", { style: { display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 16 } },
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' } }, "Surprise boxes"),
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' } }, statusLabel)
          ),

          React.createElement("div", { style: { display: 'flex', flexDirection: 'column' } },
            boxes.map((box) => React.createElement("button", {
              key: box.idx, onClick: onBoxClick, "data-idx": box.idx,
              style: {
                display: 'grid', gridTemplateColumns: '26px 18px 1fr auto', alignItems: 'center', gap: 14,
                width: '100%', padding: '14px 6px', background: 'none', border: 'none', borderTop: '1px solid var(--line)',
                cursor: 'pointer', textAlign: 'left', fontFamily: 'Geist, sans-serif', transition: 'padding-left 200ms cubic-bezier(.2,.7,.2,1)'
              }
            },
              React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, letterSpacing: '0.08em', color: 'var(--muted)' } }, box.num),
              React.createElement("span", { style: { width: 14, height: 14, borderRadius: 5, background: box.color } }),
              React.createElement("span", { style: { fontSize: 17, fontWeight: 500, letterSpacing: '-0.01em', color: box.textColor } }, box.name),
              React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: box.stateColor } }, box.state)
            ))
          ),

          React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 14, paddingTop: 4 } },
            React.createElement("button", {
              onClick: newMaze,
              style: {
                fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em',
                padding: '11px 22px', borderRadius: 999, border: '1px solid var(--black)', background: 'var(--white)',
                color: 'var(--black)', cursor: 'pointer', transition: 'transform 200ms cubic-bezier(.2,.7,.2,1), box-shadow 200ms cubic-bezier(.2,.7,.2,1)'
              }
            }, "New maze"),
            React.createElement("span", { style: { fontSize: 14, color: 'var(--muted)', lineHeight: 1.5 } }, hint)
          )
        )
      )
    ),

    confetti.map((c) => React.createElement("div", {
      key: c.id,
      style: {
        position: 'fixed', left: c.left + '%', top: c.top + '%', zIndex: 55, pointerEvents: 'none',
        '--r0': c.r0 + 'deg', '--r1': c.r1 + 'deg', '--dy': c.dy + 'px',
        animation: `carrotBurst ${c.dur}ms cubic-bezier(.2,.7,.2,1) ${c.delay}ms forwards`
      }
    }, React.createElement(CarrotSvg, { width: c.size, height: c.sizeTall }))),

    openIdx !== null && React.createElement("div", {
      onClick: onClose,
      style: {
        position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 24, background: 'rgba(0,0,0,0.46)', animation: 'sheetFade 200ms cubic-bezier(.2,.7,.2,1)'
      }
    },
      React.createElement("div", {
        onClick: stopProp,
        style: {
          position: 'relative', width: '100%', maxWidth: 560, background: 'var(--white)', border: '1px solid var(--line)',
          borderRadius: 22, padding: '34px 34px 30px', boxShadow: '0 24px 60px rgba(0,0,0,0.26)',
          animation: 'sheetIn 280ms cubic-bezier(.2,.7,.2,1)'
        }
      },
        React.createElement("button", {
          onClick: onClose, "aria-label": "Close",
          style: {
            position: 'absolute', top: 18, right: 18, width: 32, height: 32, display: 'flex', alignItems: 'center',
            justifyContent: 'center', padding: 0, border: '1px solid var(--line)', borderRadius: 999, background: 'var(--white)',
            color: 'var(--muted)', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, lineHeight: 1, cursor: 'pointer',
            transition: 'transform 200ms cubic-bezier(.2,.7,.2,1), color 200ms cubic-bezier(.2,.7,.2,1)'
          }
        }, "✕"),

        React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 20 } },
          React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 12 } },
            React.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: 10 } },
              React.createElement("span", { style: { width: 14, height: 14, borderRadius: 5, background: open ? COLORS[openIdx] : 'var(--violet)' } }),
              React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 12, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)' } },
                open ? `Crate ${String(openIdx + 1).padStart(2, '0')} · Opened` : '')
            ),
            React.createElement("h2", { style: { margin: 0, fontFamily: 'Geist, sans-serif', fontSize: 32, fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.15 } }, open ? open.name : '')
          ),

          React.createElement("div", { style: { display: 'flex', flexDirection: 'column', gap: 14 } },
            (open ? open.bullets : []).map((line, i) => React.createElement("div", {
              key: i, style: { display: 'grid', gridTemplateColumns: '18px 1fr', alignItems: 'start', gap: 12 }
            },
              React.createElement("span", { style: { marginTop: 9, width: 6, height: 6, borderRadius: 999, background: 'var(--violet)' } }),
              React.createElement("span", { style: { fontSize: 17, lineHeight: 1.5, color: 'var(--black)' } }, line)
            ))
          ),

          React.createElement("div", { style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, paddingTop: 6, borderTop: '1px solid var(--line)' } },
            React.createElement("span", { style: { fontFamily: 'JetBrains Mono, monospace', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--muted)', paddingTop: 16 } },
              open ? String(open.bullets.length) + ' notes' : ''),
            React.createElement("button", {
              onClick: onClose,
              style: {
                marginTop: 16, fontFamily: 'Geist, sans-serif', fontSize: 14, fontWeight: 500, letterSpacing: '-0.01em',
                padding: '11px 22px', borderRadius: 999, border: 'none', background: 'var(--black)', color: 'var(--white)',
                cursor: 'pointer', transition: 'transform 200ms cubic-bezier(.2,.7,.2,1), box-shadow 200ms cubic-bezier(.2,.7,.2,1)'
              }
            }, "Back to the maze")
          )
        )
      )
    )
  );
}

/* ---------- APP ---------- */
function App() {
  return /*#__PURE__*/React.createElement(React.Fragment, null,
    React.createElement(Nav, { active: "" }),
    React.createElement("main", null, React.createElement(BunnyMaze, null)),
    React.createElement(Footer, null)
  );
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(App, null));
})();
