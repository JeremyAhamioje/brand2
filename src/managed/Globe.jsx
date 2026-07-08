import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as THREE from "three";
import earthUrl from "./assets/earth-dark.jpg";

// ============================================================
// DOT-CONTINENT GLOBE (React Three Fiber)
// A premium Deel-style globe: continents rendered as a field of
// dots sampled from an Earth land map (no grid lines), a soft
// atmosphere, connected talent nodes labelled by country, and
// particles flowing along great-circle arcs from the client (US)
// to each talent hub. Themed for both dark and light (cream) UIs —
// the light palette drops the additive "glow" blending (which is
// invisible on a light ground) for solid materials.
// ============================================================

const R = 1;

// Client + talent network. `t` = appear time, `draw` = arc-draw time.
const CLIENT = { name: "UNITED STATES", role: "CLIENT", lat: 37.8, lon: -96, t: 0.25 };
const TALENT = [
  { name: "NIGERIA", role: "TALENT HUB", lat: 9.08, lon: 8.68, t: 0.8, draw: 0.9 },
  { name: "INDIA", role: "TALENT HUB", lat: 22.0, lon: 79.0, t: 1.35, draw: 1.45 },
  { name: "PHILIPPINES", role: "TALENT HUB", lat: 12.88, lon: 121.77, t: 1.9, draw: 2.0 },
];

const PALETTE = {
  dark: {
    base: "#070c1a",
    land: "#7c9fe0",
    landOpacity: 0.92,
    atmosphere: "#3b6bff",
    client: "#8fb4ff",
    talent: "#5df2a0",
    arc: "#6b93ff",
    haloOpacity: 0.32,
    glow: true,
    label: {
      bg: "rgba(8,12,22,0.92)",
      border: "rgba(120,150,235,0.45)",
      name: "#ffffff",
      sub: "rgba(160,180,220,0.85)",
    },
  },
  light: {
    // Soft "moon" sphere (muted gray, not bright white) with darker
    // continent dots for contrast on the cream page.
    base: "#c8cbcb",
    land: "#2e477c",
    landOpacity: 0.96,
    atmosphere: "#93a9c8",
    client: "#274fbf",
    talent: "#0f8f54",
    arc: "#3f63e6",
    haloOpacity: 0.16,
    glow: false,
    label: {
      bg: "rgba(255,255,255,0.94)",
      border: "rgba(63,99,230,0.4)",
      name: "#16181f",
      sub: "rgba(60,66,80,0.82)",
    },
  },
};

const blendOf = (glow) => (glow ? THREE.AdditiveBlending : THREE.NormalBlending);

// --- math helpers ------------------------------------------
function latLonToVec3(lat, lon, r) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

function makeArcCurve(from, to, r) {
  const start = latLonToVec3(from.lat, from.lon, r);
  const end = latLonToVec3(to.lat, to.lon, r);
  const mid = start.clone().add(end).multiplyScalar(0.5);
  const dist = start.distanceTo(end);
  mid.normalize().multiplyScalar(r + dist * 0.42);
  return new THREE.QuadraticBezierCurve3(start, mid, end);
}

const easeOutBack = (x) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(x - 1, 3) + c1 * Math.pow(x - 1, 2);
};

// Sample the Earth land map into a Float32Array of dot positions.
// A pixel counts as land when its luminance clears the threshold.
function buildLandDots(image, { rows = 180, threshold = 22 } = {}) {
  const w = image.width;
  const h = image.height;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, w, h).data;

  const positions = [];
  for (let iy = 0; iy < rows; iy++) {
    const lat = 90 - (iy / (rows - 1)) * 180;
    const circ = Math.cos((lat * Math.PI) / 180);
    const cols = Math.max(1, Math.floor(rows * 2 * circ));
    for (let ix = 0; ix < cols; ix++) {
      const lon = -180 + (ix / cols) * 360;
      const px = Math.min(w - 1, Math.floor(((lon + 180) / 360) * w));
      const py = Math.min(h - 1, Math.floor(((90 - lat) / 180) * h));
      const idx = (py * w + px) * 4;
      const lum = 0.299 * data[idx] + 0.587 * data[idx + 1] + 0.114 * data[idx + 2];
      if (lum > threshold) {
        // small jitter avoids obvious banding
        const jLat = lat + (Math.random() - 0.5) * 0.6;
        const jLon = lon + (Math.random() - 0.5) * 0.6;
        const v = latLonToVec3(jLat, jLon, R * 1.002);
        positions.push(v.x, v.y, v.z);
      }
    }
  }
  return new Float32Array(positions);
}

// Country label rendered to a canvas texture (crisp block + text).
function makeLabelTexture(name, sub, dotColor, label) {
  const scale = 2;
  const w = 300;
  const h = 96;
  const canvas = document.createElement("canvas");
  canvas.width = w * scale;
  canvas.height = h * scale;
  const ctx = canvas.getContext("2d");
  ctx.scale(scale, scale);

  const bx = 8;
  const by = 26;
  const bw = w - 16;
  const bh = 44;
  const r = 12;
  ctx.beginPath();
  ctx.moveTo(bx + r, by);
  ctx.arcTo(bx + bw, by, bx + bw, by + bh, r);
  ctx.arcTo(bx + bw, by + bh, bx, by + bh, r);
  ctx.arcTo(bx, by + bh, bx, by, r);
  ctx.arcTo(bx, by, bx + bw, by, r);
  ctx.closePath();
  ctx.fillStyle = label.bg;
  ctx.fill();
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = label.border;
  ctx.stroke();

  // status dot
  ctx.beginPath();
  ctx.arc(bx + 22, by + bh / 2, 5, 0, Math.PI * 2);
  ctx.fillStyle = dotColor;
  ctx.shadowColor = dotColor;
  ctx.shadowBlur = 10;
  ctx.fill();
  ctx.shadowBlur = 0;

  ctx.textBaseline = "middle";
  ctx.fillStyle = label.name;
  ctx.font = "700 21px 'Hanken Grotesk', Inter, Arial, sans-serif";
  ctx.fillText(name, bx + 40, by + bh / 2 - 8);
  ctx.fillStyle = label.sub;
  ctx.font = "600 12px 'Hanken Grotesk', Inter, Arial, sans-serif";
  ctx.fillText(sub, bx + 40, by + bh / 2 + 11);

  const texture = new THREE.CanvasTexture(canvas);
  texture.anisotropy = 4;
  return texture;
}

// --- controls ----------------------------------------------
function Controls({ autoRotate }) {
  const camera = useThree((s) => s.camera);
  const gl = useThree((s) => s.gl);
  const controls = useMemo(
    () => new OrbitControls(camera, gl.domElement),
    [camera, gl]
  );
  useEffect(() => {
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.08;
    controls.rotateSpeed = 0.45;
    controls.autoRotateSpeed = 0.5;
    controls.minPolarAngle = 0.6;
    controls.maxPolarAngle = 2.3;
    return () => controls.dispose();
  }, [controls]);
  useEffect(() => {
    controls.autoRotate = autoRotate;
  }, [controls, autoRotate]);
  useFrame(() => controls.update());
  return null;
}

// --- atmosphere (fresnel rim) ------------------------------
const atmVertex = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }`;
const atmFragment = `
  varying vec3 vNormal;
  uniform vec3 uColor;
  void main() {
    float intensity = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 3.0);
    gl_FragColor = vec4(uColor, 1.0) * intensity;
  }`;

function Atmosphere({ p }) {
  const uniforms = useMemo(
    () => ({ uColor: { value: new THREE.Color(p.atmosphere) } }),
    [p]
  );
  return (
    <mesh scale={1.16}>
      <sphereGeometry args={[R, 48, 48]} />
      <shaderMaterial
        vertexShader={atmVertex}
        fragmentShader={atmFragment}
        uniforms={uniforms}
        blending={blendOf(p.glow)}
        side={THREE.BackSide}
        transparent
        depthWrite={false}
      />
    </mesh>
  );
}

// --- dotted continents -------------------------------------
function DotEarth({ positions, p }) {
  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [positions]);
  return (
    <points geometry={geometry}>
      <pointsMaterial
        color={p.land}
        size={0.0095}
        sizeAttenuation
        transparent
        opacity={p.landOpacity}
        depthWrite={false}
      />
    </points>
  );
}

// --- glowing node ------------------------------------------
function Node({ position, color, size, appearTime, reduced, p }) {
  const group = useRef();
  const halo = useRef();
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const s = reduced ? 1 : THREE.MathUtils.clamp((t - appearTime) / 0.45, 0, 1);
    if (group.current) group.current.scale.setScalar(Math.max(0, easeOutBack(s)));
    if (halo.current && !reduced) {
      const pulse = 1 + Math.sin(t * 2.1 + appearTime) * 0.22;
      halo.current.scale.setScalar(pulse);
      halo.current.material.opacity = p.haloOpacity + Math.sin(t * 2.1 + appearTime) * 0.14;
    }
  });
  return (
    <group ref={group} position={position} scale={reduced ? 1 : 0.001}>
      <mesh>
        <sphereGeometry args={[size, 16, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
      <mesh ref={halo}>
        <sphereGeometry args={[size * 2.6, 16, 16]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={p.haloOpacity}
          blending={blendOf(p.glow)}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

// --- country label (billboard, hidden on far side) ---------
function GeoLabel({ node, color, reduced, p }) {
  const ref = useRef();
  const camera = useThree((s) => s.camera);
  const texture = useMemo(
    () => makeLabelTexture(node.name, node.role, color, p.label),
    [node.name, node.role, color, p]
  );
  const anchor = useMemo(
    () => latLonToVec3(node.lat, node.lon, R * 1.12),
    [node.lat, node.lon]
  );
  const worldPos = useMemo(() => new THREE.Vector3(), []);
  useFrame(() => {
    if (!ref.current) return;
    ref.current.getWorldPosition(worldPos);
    const facing = worldPos.clone().normalize().dot(camera.position.clone().normalize());
    const target = facing > 0.12 ? 1 : 0;
    ref.current.material.opacity = reduced
      ? target
      : THREE.MathUtils.lerp(ref.current.material.opacity, target, 0.15);
  });
  return (
    <sprite ref={ref} position={anchor} scale={[0.5, 0.16, 1]}>
      <spriteMaterial
        map={texture}
        transparent
        opacity={0}
        depthTest={false}
        depthWrite={false}
      />
    </sprite>
  );
}

// --- arc that draws in --------------------------------------
function Arc({ curve, drawStart, reduced, p }) {
  const geometry = useMemo(() => {
    const pts = curve.getPoints(120);
    const g = new THREE.BufferGeometry().setFromPoints(pts);
    g.setDrawRange(0, reduced ? pts.length : 0);
    g.userData.count = pts.length;
    return g;
  }, [curve, reduced]);
  useFrame((state) => {
    if (reduced) return;
    const t = state.clock.getElapsedTime();
    const prog = THREE.MathUtils.clamp((t - drawStart) / 0.8, 0, 1);
    geometry.setDrawRange(0, Math.floor(prog * geometry.userData.count));
  });
  return (
    <line geometry={geometry}>
      <lineBasicMaterial
        color={p.arc}
        transparent
        opacity={0.85}
        blending={blendOf(p.glow)}
        depthWrite={false}
      />
    </line>
  );
}

// --- particles flowing along an arc ------------------------
function Flow({ curve, startTime, reduced, p, count = 10, speed = 0.14 }) {
  const ref = useRef();
  const offsets = useMemo(
    () => Array.from({ length: count }, (_, i) => i / count),
    [count]
  );
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    offsets.forEach((o, i) => {
      const pt = curve.getPoint(o);
      positions[i * 3] = pt.x;
      positions[i * 3 + 1] = pt.y;
      positions[i * 3 + 2] = pt.z;
    });
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return g;
  }, [curve, count, offsets]);
  useFrame((state) => {
    if (reduced || !ref.current) return;
    const t = state.clock.getElapsedTime();
    const attr = ref.current.geometry.attributes.position;
    for (let i = 0; i < count; i++) {
      const tt = ((t - startTime) * speed + offsets[i]) % 1;
      const pt = curve.getPoint(tt < 0 ? 0 : tt);
      attr.array[i * 3] = pt.x;
      attr.array[i * 3 + 1] = pt.y;
      attr.array[i * 3 + 2] = pt.z;
    }
    attr.needsUpdate = true;
  });
  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color={p.talent}
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.95}
        blending={blendOf(p.glow)}
        depthWrite={false}
      />
    </points>
  );
}

function GlobeScene({ reduced, dots, p }) {
  const [hovered, setHovered] = useState(false);
  const clientPos = useMemo(() => latLonToVec3(CLIENT.lat, CLIENT.lon, R * 1.01), []);
  const routes = useMemo(
    () =>
      TALENT.map((dest) => ({
        dest,
        pos: latLonToVec3(dest.lat, dest.lon, R * 1.01),
        curve: makeArcCurve(CLIENT, dest, R),
      })),
    []
  );

  return (
    <group rotation={[0.32, -0.5, 0.12]}>
      {/* Opaque base sphere: occludes far-side dots + catches hover. */}
      <mesh
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[R, 64, 64]} />
        <meshBasicMaterial color={p.base} />
      </mesh>

      {dots && <DotEarth positions={dots} p={p} />}
      <Atmosphere p={p} />

      <Node
        position={clientPos}
        color={p.client}
        size={0.02}
        appearTime={CLIENT.t}
        reduced={reduced}
        p={p}
      />
      <GeoLabel node={CLIENT} color={p.client} reduced={reduced} p={p} />

      {routes.map((r) => (
        <group key={r.dest.name}>
          <Node
            position={r.pos}
            color={p.talent}
            size={0.018}
            appearTime={r.dest.t}
            reduced={reduced}
            p={p}
          />
          <GeoLabel node={r.dest} color={p.talent} reduced={reduced} p={p} />
          <Arc curve={r.curve} drawStart={r.dest.draw} reduced={reduced} p={p} />
          <Flow curve={r.curve} startTime={r.dest.draw + 0.6} reduced={reduced} p={p} />
        </group>
      ))}

      <Controls autoRotate={!reduced && !hovered} />
    </group>
  );
}

// Default export: loads + samples the land map, then renders the scene.
export default function Globe({ reduced = false, onReady, theme = "dark" }) {
  const [dots, setDots] = useState(null);
  const [active, setActive] = useState(true);
  const wrapRef = useRef(null);
  const readyCb = useRef(onReady);
  readyCb.current = onReady;
  const p = PALETTE[theme] || PALETTE.dark;

  useEffect(() => {
    let alive = true;
    const img = new Image();
    img.src = earthUrl;
    img.onload = () => {
      const positions = buildLandDots(img);
      if (alive) {
        setDots(positions);
        readyCb.current?.();
      }
    };
    return () => {
      alive = false;
    };
  }, []);

  // Pause the WebGL render loop while the globe is off-screen. A
  // continuous rAF loop otherwise keeps saturating the main thread
  // as you scroll down the page, which shows up as poor INP on
  // interactions far below the hero (e.g. the contact form).
  useEffect(() => {
    const el = wrapRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "100px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="m-gl-fill">
      <Canvas
        camera={{ position: [0, 0.35, 3.0], fov: 42 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced || !active ? "demand" : "always"}
      >
        {/* remount the scene on theme change so materials rebuild */}
        <GlobeScene key={theme} reduced={reduced} dots={dots} p={p} />
      </Canvas>
    </div>
  );
}
