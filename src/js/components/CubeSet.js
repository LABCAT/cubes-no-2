import React, { useRef } from "react";
import { useFrame  } from "@react-three/fiber";
import * as THREE from 'three'

const tempObject = new THREE.Object3D()

export default function CubeSet(props) {
    const { showWireFrame, colour } = props,
        meshRef = useRef();
        useFrame((state) => {
            const time = state.clock.getElapsedTime()
            let i = 0;
            for (let x = 0; x < 8; x++) {
                for (let z = 0; z < 8; z++) {
                for (let y = 0; y < 1; y++) {
                    i++;
                    tempObject.position.set(4 - x, 4 - y, 4 - z)
                    tempObject.scale.setScalar(1)
                    tempObject.updateMatrix()
                    meshRef.current.setMatrixAt(i, tempObject.matrix)
                }
                }
            }
            i++;
            tempObject.position.set(4 - 0, 3 - time * 2, 4 - 0)
            tempObject.scale.setScalar(1)
            tempObject.updateMatrix()
            meshRef.current.setMatrixAt(i, tempObject.matrix)
            meshRef.current.rotation.y = time / 4;
            meshRef.current.instanceMatrix.needsUpdate = true
    })
    return (
        <instancedMesh ref={meshRef} args={[null, null, 1000]}>
            <boxGeometry args={[1,1,1]}>
            <instancedBufferAttribute attachObject={['attributes']} args={[1, 3]} />
            </boxGeometry>
            <meshBasicMaterial attach="material" color={colour} wireframe={showWireFrame} />
        </instancedMesh>
    )
}
