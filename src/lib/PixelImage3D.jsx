import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { useRef } from "react";

function RotatingImage({ src, pixelated = true, speed = 0.01 }) {
  const meshRef = useRef();
  const texture = useTexture(src);

  // Force pixel-art style if enabled
  if (pixelated) {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
  }

  // Rotate continuously
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += speed;
    }
  });

  return (
    <mesh ref={meshRef}>
      {/* A plane to display the image */}
      <planeGeometry args={[3, 3]} />
      <meshBasicMaterial
        map={texture}
        transparent
        side={THREE.DoubleSide}  // ✅ show both sides
      />
    </mesh>
  );
}

export default function PixelImage3D({
  src,
  pixelated = true,
  speed = 0.01,
  background = "#111"
}) {
  return (
    <Canvas style={{ width: "100%", height: "400px", background }}>
      <ambientLight />
      <RotatingImage src={src} pixelated={pixelated} speed={speed} />
    </Canvas>
  );
}
