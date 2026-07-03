import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

// ============================================================
// ORBIT MODEL (React Three Fiber)
// A pulsating central "spark" orbited by tilted rings. Each step
// owns one ring + node; the active step (driven from the list on
// the left) lights its ring blue and brightens its label.
// ============================================================

const COL = {
  line: "#8a93a8",
  spark: "#f5f3ea",
  accent: "#3b5bff",
  node: "#e8e9ee",
};

const GROUP_ROT = [-1.02, 0, 0.32];

// --- textures ----------------------------------------------
function useGlowTexture() {
  return useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 128;
    const ctx = c.getContext("2d");
    const g = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    g.addColorStop(0, "rgba(255,255,255,0.9)");
    g.addColorStop(0.4, "rgba(220,230,255,0.35)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }, []);
}

function makeLabelTexture(text) {
  const scale = 2;
  const w = 256;
  const h = 72;
  const c = document.createElement("canvas");
  c.width = w * scale;
  c.height = h * scale;
  const ctx = c.getContext("2d");
  ctx.scale(scale, scale);
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "#ffffff";
  ctx.font = "600 30px 'Hanken Grotesk', Inter, Arial, sans-serif";
  ctx.fillText(text, w / 2, h / 2);
  const tex = new THREE.CanvasTexture(c);
  tex.anisotropy = 4;
  return tex;
}

// --- 4-point sparkle ---------------------------------------
function sparkleShape(outer, ctrl) {
  const s = new THREE.Shape();
  s.moveTo(0, outer);
  s.quadraticCurveTo(ctrl, ctrl, outer, 0);
  s.quadraticCurveTo(ctrl, -ctrl, 0, -outer);
  s.quadraticCurveTo(-ctrl, -ctrl, -outer, 0);
  s.quadraticCurveTo(-ctrl, ctrl, 0, outer);
  return s;
}

function Spark({ reduced }) {
  const star = useRef();
  const glow = useRef();
  const glowTex = useGlowTexture();
  const geom = useMemo(() => new THREE.ShapeGeometry(sparkleShape(0.24, 0.06)), []);
  useFrame((st) => {
    const t = st.clock.getElapsedTime();
    const p = reduced ? 1 : 1 + Math.sin(t * 2.3) * 0.12;
    if (star.current) star.current.scale.setScalar(p);
    if (glow.current) {
      const gp = reduced ? 3 : 3 + Math.sin(t * 2.3) * 0.5;
      glow.current.scale.setScalar(gp);
      glow.current.material.opacity = reduced ? 0.7 : 0.55 + Math.sin(t * 2.3) * 0.2;
    }
  });
  return (
    <group>
      <sprite ref={glow} scale={3}>
        <spriteMaterial
          map={glowTex}
          transparent
          opacity={0.6}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </sprite>
      <mesh ref={star} geometry={geom}>
        <meshBasicMaterial color={COL.spark} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

// --- one orbit (ring + node + label) -----------------------
function ringGeometry(radius, segments = 160) {
  const pts = [];
  for (let i = 0; i <= segments; i++) {
    const a = (i / segments) * Math.PI * 2;
    pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
  }
  return new THREE.BufferGeometry().setFromPoints(pts);
}

function Orbit({ radius, angle, label, active, reduced }) {
  const lineGeom = useMemo(() => ringGeometry(radius), [radius]);
  const labelTex = useMemo(() => makeLabelTexture(label), [label]);
  const nodePos = useMemo(() => {
    const a = (angle * Math.PI) / 180;
    return [Math.cos(a) * radius, Math.sin(a) * radius, 0];
  }, [angle, radius]);
  const labelPos = useMemo(() => {
    const a = (angle * Math.PI) / 180;
    const r = radius + 0.3;
    return [Math.cos(a) * r, Math.sin(a) * r, 0];
  }, [angle, radius]);

  const glow = useRef();
  const node = useRef();
  useFrame((st) => {
    if (reduced) return;
    const t = st.clock.getElapsedTime();
    if (glow.current) {
      glow.current.material.opacity = active ? 0.55 + Math.sin(t * 3) * 0.2 : 0;
    }
    if (node.current) {
      const s = active ? 1.5 + Math.sin(t * 3) * 0.2 : 1;
      node.current.scale.setScalar(s);
    }
  });

  return (
    <group>
      {/* base thin ring */}
      <line geometry={lineGeom}>
        <lineBasicMaterial
          color={COL.line}
          transparent
          opacity={active ? 0.85 : 0.28}
          depthWrite={false}
        />
      </line>

      {/* blue glow ring when active */}
      <mesh ref={glow} rotation={[0, 0, 0]}>
        <torusGeometry args={[radius, 0.02, 12, 180]} />
        <meshBasicMaterial
          color={COL.accent}
          transparent
          opacity={active ? 0.5 : 0}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* node */}
      <mesh ref={node} position={nodePos}>
        <sphereGeometry args={[0.028, 16, 16]} />
        <meshBasicMaterial color={active ? COL.accent : COL.node} toneMapped={false} />
      </mesh>

      {/* label */}
      <sprite position={labelPos} scale={[0.78, 0.22, 1]}>
        <spriteMaterial
          map={labelTex}
          transparent
          opacity={active ? 1 : 0.5}
          depthWrite={false}
          depthTest={false}
        />
      </sprite>
    </group>
  );
}

// slowly drifting particle on a ring — keeps the model alive
function OrbitDot({ radius, speed, offset, reduced }) {
  const ref = useRef();
  useFrame((st) => {
    if (reduced || !ref.current) return;
    const a = st.clock.getElapsedTime() * speed + offset;
    ref.current.position.set(Math.cos(a) * radius, Math.sin(a) * radius, 0);
  });
  const start = useMemo(() => {
    return [Math.cos(offset) * radius, Math.sin(offset) * radius, 0];
  }, [offset, radius]);
  return (
    <mesh ref={ref} position={start}>
      <sphereGeometry args={[0.014, 10, 10]} />
      <meshBasicMaterial
        color={COL.accent}
        transparent
        opacity={0.9}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

function Scene({ steps, active, reduced }) {
  const n = steps.length;
  const orbits = useMemo(
    () =>
      steps.map((s, i) => ({
        radius: 0.72 + (i / (n - 1)) * 0.82,
        angle: 50 - i * (100 / (n - 1)),
        label: s,
      })),
    [steps, n]
  );

  return (
    <group position={[-0.35, 0, 0]}>
      <Spark reduced={reduced} />
      <group rotation={GROUP_ROT}>
        {orbits.map((o, i) => (
          <Orbit
            key={i}
            radius={o.radius}
            angle={o.angle}
            label={o.label}
            active={active === i}
            reduced={reduced}
          />
        ))}
        {orbits.map((o, i) => (
          <OrbitDot
            key={`d${i}`}
            radius={o.radius}
            speed={0.18 + i * 0.02}
            offset={(i / n) * Math.PI * 2 + 2.2}
            reduced={reduced}
          />
        ))}
      </group>
    </group>
  );
}

export default function OrbitModel({ steps, active = 0, reduced = false }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.4], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
      frameloop={reduced ? "demand" : "always"}
    >
      <Scene steps={steps} active={active} reduced={reduced} />
    </Canvas>
  );
}
