/* =====================================================================
 *  flags.js: the per-unit flag texture. Each unit flies the real
 *  national / service flag its force used in JUNE 1944. Pure canvas art;
 *  no external assets. Exports flagTexture(unit) -> THREE.CanvasTexture.
 *
 *  Reusable painters:
 *    pUnionFlag : the 1801 Union Flag (UK; reused as the canton of the
 *                 White Ensign and the Canadian Red Ensign).
 *    pUS        : the 48-star US flag (1912-1959; 48 stars, NOT 50).
 *    pFrance    : the Free French flag (tricolour + the red Cross of
 *                 Lorraine, the Forces Francaises Libres symbol).
 *    pGermany   : the Balkenkreuz, the Wehrmacht's white-trimmed black
 *                 cross marking. Deliberately NOT the swastika: legal
 *                 everywhere (including Germany), period-correct as the
 *                 actual German military marking, and avoids a banned
 *                 symbol.
 *
 *  Anachronism rules (non-negotiable): the US flag has 48 stars (the
 *  50-star flag is 1959); Canada flies the 1922-57 Red Ensign with GREEN
 *  maple leaves (the maple-leaf flag is 1965); the German marker is the
 *  Balkenkreuz. Detailed emblems are reduced to a legible cue with the
 *  correct tinctures, a reduction of a real flag, NOT an invention.
 * ===================================================================== */

const W = 230, H = 150;
const UK_BLUE = "#012169", UK_RED = "#C8102E", WHITE = "#ffffff", LEAF_GREEN = "#2e7d32",
      US_RED = "#B22234", US_BLUE = "#3C3B6E", FR_BLUE = "#0055A4", FR_RED = "#EF4135",
      FELDGRAU = "#474c3d", IRON_BLACK = "#15171b";

/* ---- the 1801 Union Flag, drawn into the rect [X,Y,W,H] -------------- *
 *  Written correctly ONCE and reused as a full flag and as the canton of
 *  the White Ensign and the Canadian Red Ensign. The St Patrick (red)
 *  saltire is counterchanged with the St Andrew (white) saltire. */
function pUnionFlag(c, X, Y, w, h){
  c.save();
  c.beginPath(); c.rect(X, Y, w, h); c.clip();
  c.fillStyle = UK_BLUE; c.fillRect(X, Y, w, h);
  const cx = X + w/2, cy = Y + h/2;
  // St Andrew: broad white diagonals
  c.lineCap = "butt"; c.strokeStyle = WHITE; c.lineWidth = h*0.30;
  c.beginPath(); c.moveTo(X, Y); c.lineTo(X+w, Y+h); c.moveTo(X+w, Y); c.lineTo(X, Y+h); c.stroke();
  // St Patrick: counterchanged red, each arm offset to one side of the white
  const off = h*0.10;
  c.strokeStyle = UK_RED; c.lineWidth = h*0.10;
  const corners = [[X,Y,0],[X+w,Y,1],[X+w,Y+h,2],[X,Y+h,3]]; // TL, TR, BR, BL
  for(const [bx, by, i] of corners){
    const dx = bx-cx, dy = by-cy, L = Math.hypot(dx,dy), px = -dy/L, py = dx/L;
    const wantDown = (i===0 || i===2);                 // red lowermost on TL & BR arms
    const s = wantDown ? (py>0?1:-1) : (py>0?-1:1);
    const ox = px*off*s, oy = py*off*s;
    c.beginPath(); c.moveTo(cx+ox, cy+oy); c.lineTo(bx+ox, by+oy); c.stroke();
  }
  // St George: white fimbriation then the red cross
  const wW = h*0.30, rW = h*0.18;
  c.fillStyle = WHITE; c.fillRect(cx-wW/2, Y, wW, h); c.fillRect(X, cy-wW/2, w, wW);
  c.fillStyle = UK_RED; c.fillRect(cx-rW/2, Y, rW, h); c.fillRect(X, cy-rW/2, w, rW);
  c.restore();
}

/* ---- small emblem helpers (maple leaf, star) ------------------------- */
function mapleLeaf(c, x, y, r, col){ c.fillStyle = col; c.beginPath();
  const pts=[[0,-1],[.18,-.5],[.55,-.62],[.42,-.22],[.92,-.18],[.55,.05],[.78,.42],
    [.3,.32],[.34,.86],[0,.55],[-.34,.86],[-.3,.32],[-.78,.42],[-.55,.05],[-.92,-.18],
    [-.42,-.22],[-.55,-.62],[-.18,-.5]];
  pts.forEach((p,i)=>{ const Px=x+p[0]*r, Py=y+p[1]*r; i?c.lineTo(Px,Py):c.moveTo(Px,Py); }); c.closePath(); c.fill(); }
function starN(c, x, y, r, n, col){ c.fillStyle = col; c.beginPath();
  for(let i=0;i<n*2;i++){ const a=Math.PI/n*i-Math.PI/2, rr=i%2?r*0.42:r;
    const Px=x+Math.cos(a)*rr, Py=y+Math.sin(a)*rr; i?c.lineTo(Px,Py):c.moveTo(Px,Py); } c.closePath(); c.fill(); }
// Cross of Lorraine: a vertical bar with two horizontal bars (upper shorter, lower longer)
function crossLorraine(c, x, y, r, col){ c.fillStyle = col; const t = r*0.18;
  c.fillRect(x-t/2, y-r, t, 2*r);                  // vertical
  c.fillRect(x-r*0.50, y-r*0.42, r*1.00, t);       // upper bar (shorter)
  c.fillRect(x-r*0.70, y+r*0.22, r*1.40, t); }     // lower bar (longer)
// Balkenkreuz: the Wehrmacht's straight black cross flanked white (NOT the swastika)
function balkenkreuz(c, x, y, r){
  const arm = (col, half, ww)=>{ c.fillStyle=col; c.fillRect(x-half, y-ww/2, 2*half, ww); c.fillRect(x-ww/2, y-half, ww, 2*half); };
  arm(WHITE, r, r*0.72);          // white flanks
  arm(IRON_BLACK, r*0.86, r*0.46); // black cross
}

/* ---- the D-Day flags (canvas is W x H; field first, then canton/badge) ---- */
function canton(c){ pUnionFlag(c, 0, 0, W*0.5, H*0.5); }   // top-left quarter
// 48-star US flag: 13 stripes (top + bottom red), blue canton over the top 7 stripes, 48 stars in a 6x8 grid
function pUS(c){
  const s = H/13;
  for(let i=0;i<13;i++){ c.fillStyle = (i%2===0)?US_RED:WHITE; c.fillRect(0, i*s, W, s+0.6); }
  const cw = W*0.40, ch = s*7;
  c.fillStyle = US_BLUE; c.fillRect(0, 0, cw, ch);
  for(let r=0;r<6;r++) for(let col=0;col<8;col++)
    starN(c, cw*(col+1)/9, ch*(r+1)/7, s*0.34, 5, WHITE);
}
function pFrance(c){
  const b = W/3;
  c.fillStyle = FR_BLUE; c.fillRect(0,0,b,H);
  c.fillStyle = WHITE;   c.fillRect(b,0,b,H);
  c.fillStyle = FR_RED;  c.fillRect(2*b,0,b,H);
  crossLorraine(c, W*0.5, H*0.5, H*0.34, FR_RED);   // Free French symbol on the white band
}
function pGermany(c){
  c.fillStyle = FELDGRAU; c.fillRect(0,0,W,H);
  balkenkreuz(c, W*0.5, H*0.5, H*0.34);
}

const flags = {
  // United States: 48-star flag (1912-1959)
  us:     (c)=> pUS(c),
  // United Kingdom: the Union Flag
  union:  (c)=> pUnionFlag(c, 0, 0, W, H),
  // Canada: 1922-57 Red Ensign (red field, Union canton, GREEN maple leaves on a white roundel)
  canada: (c)=>{ c.fillStyle=UK_RED; c.fillRect(0,0,W,H); canton(c);
    const dx=W*0.74, dy=H*0.5, dr=H*0.30;
    c.fillStyle=WHITE; c.beginPath(); c.arc(dx,dy,dr,0,7); c.fill();
    mapleLeaf(c, dx,         dy+dr*0.16, dr*0.46, LEAF_GREEN);
    mapleLeaf(c, dx-dr*0.52, dy+dr*0.24, dr*0.36, LEAF_GREEN);
    mapleLeaf(c, dx+dr*0.52, dy+dr*0.24, dr*0.36, LEAF_GREEN); },
  // Free French Forces: the tricolour + the red Cross of Lorraine
  france: (c)=> pFrance(c),
  // Royal Navy: White Ensign (red St George cross + Union canton)
  rn: (c)=>{ c.fillStyle=WHITE; c.fillRect(0,0,W,H);
    const rW=H*0.16; c.fillStyle=UK_RED; c.fillRect(W/2-rW/2,0,rW,H); c.fillRect(0,H/2-rW/2,W,rW); canton(c); },
  // Germany: the Balkenkreuz on field-grey (the Wehrmacht's cross marking; NOT the swastika)
  germany: (c)=> pGermany(c),
};

const flagTexCache = {};
export function flagTexture(unit){
  if(flagTexCache[unit.id]) return flagTexCache[unit.id];
  const cv = document.createElement("canvas"); cv.width = W; cv.height = H;
  const c = cv.getContext("2d");
  const draw = flags[unit.flag];
  if(!draw) console.warn(`unknown flag "${unit.flag}" for ${unit.id}; falling back by faction`);
  (draw || (unit.faction === "ge" ? flags.germany : flags.union))(c);
  // subtle cloth shadow at the hoist (pole) edge; depth cue
  const sh = c.createLinearGradient(0, 0, W*0.18, 0);
  sh.addColorStop(0, "rgba(0,0,0,0.26)"); sh.addColorStop(1, "rgba(0,0,0,0)");
  c.fillStyle = sh; c.fillRect(0, 0, W*0.18, H);
  // thin neutral edge so the flag reads against the terrain
  c.strokeStyle = "rgba(0,0,0,0.45)"; c.lineWidth = 3; c.strokeRect(1.5, 1.5, W-3, H-3);
  const tex = new THREE.CanvasTexture(cv); tex.anisotropy = 4; tex.needsUpdate = true;
  flagTexCache[unit.id] = tex; return tex;
}
