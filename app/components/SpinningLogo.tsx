"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { Box3, Group, Vector3 } from "three";

/**
 * Loads /quit.glb and renders it rotating steadily. Centred, framed to fit,
 * and respects prefers-reduced-motion (rotation pauses if the user opts out).
 */
function Spinner({ url }: { url: string }) {
  const { scene } = useGLTF(url);
  const ref = useRef<Group>(null);
  // Ref (not state) so the prefers-reduced-motion read is a side effect on
  // an external system, not a React state update — no cascading re-renders.
  const reducedRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedRef.current = mq.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedRef.current = e.matches;
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Scale the model so its bounding box's largest axis equals `target` units.
  useEffect(() => {
    if (!ref.current) return;
    const box = new Box3().setFromObject(ref.current);
    const size = box.getSize(new Vector3());
    const max = Math.max(size.x, size.y, size.z) || 1;
    const target = 2.2; // fits comfortably in the camera frustum
    ref.current.scale.setScalar(target / max);
  }, [scene]);

  useFrame((_, delta) => {
    if (!ref.current || reducedRef.current) return;
    // ~0.6 rad/s → one revolution every ~10.5s — calm, "logo" pace.
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={ref}>
      <primitive object={scene} />
    </group>
  );
}

/**
 * Replaces the static hero image. The wrapper inherits the parent
 * .aj-hero__img-wrap dimensions (aspect-ratio 4/5) so layout doesn't shift.
 */
export default function SpinningLogo() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%", display: "block" }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[3, 3, 3]} intensity={1.1} />
        <directionalLight position={[-3, -2, 2]} intensity={0.4} />
        <Spinner url="/quit.glb" />
      </Canvas>
    </div>
  );
}
