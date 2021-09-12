import React, { Suspense, useContext, useRef, useMemo, useState, useEffect } from "react";

import { Canvas, useFrame } from "@react-three/fiber";
import CameraControls from './components/CameraControls'
import CubeSet from './components/CubeSet'
import { Context } from "./context/Context";


export default function Scene() {
  const { audioIsPlaying, notes  } = useContext(Context);
  const camera = { fov: 75, near: 0.1, far: 1000, position: [0,0,15] }
  return (
    <Canvas camera={camera}>
      <Suspense fallback='loading...'>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <CameraControls audioIsPlaying={audioIsPlaying} />
        <CubeSet colour='white' />
        <CubeSet colour='black' showWireFrame={true} />
      </Suspense>
    </Canvas>
  );
}