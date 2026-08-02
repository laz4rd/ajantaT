"use client";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Group, TextureLoader } from "three";

/**
 * Spins the company logo image (loaded as a texture) on the Y axis.
 * Centre is kept on the model's local origin so it spins in place.
 * Respects prefers-reduced-motion (rotation pauses if the user opts out).
 */
function LogoPlane({ url }: { url: string }) {
  const texture = useLoader(TextureLoader, url);
  const ref = useRef<Group>(null);
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

  // Pixel-tight aspect ratio so the plane isn't stretched.
  const { width, height } = texture.image as HTMLImageElement;
  const aspect = width && height ? width / height : 1;
  // Scale to fit comfortably; tuned against the 3.2-z camera + 45° FOV.
  const planeWidth = 2.4;
  const planeHeight = planeWidth / aspect;

  useFrame((_, delta) => {
    if (!ref.current || reducedRef.current) return;
    // ~0.6 rad/s → one revolution every ~10.5s — calm, "logo" pace.
    ref.current.rotation.y += delta * 0.6;
  });

  return (
    <group ref={ref}>
      {/* Front face — logo reads normally. */}
      <mesh>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
      {/* Back face — flipped 180° so the logo reads correctly when viewed from behind. */}
      <mesh rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[planeWidth, planeHeight]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} />
      </mesh>
    </group>
  );
}

/**
 * Hero logo slot. Renders the company logo as a 3D plane that spins on the Y axis.
 * Wrapper fills the parent so layout stays consistent with the static image it replaced.
 */
export default function SpinningLogo() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 3.2], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        style={{ width: "100%", height: "100%", display: "block", gridArea: "1 / 1" }}
      >
        <ambientLight intensity={1.0} />
        <LogoPlane url="/Mainlogo.png" />
      </Canvas>
    </div>
  );
}
