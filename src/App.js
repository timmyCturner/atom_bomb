import * as THREE from 'three';
import React, { Suspense, useState, useCallback, useRef } from 'react';
import { Canvas, extend } from '@react-three/fiber';
import * as meshline from './MeshLine';
import { Effects } from './Effects';
import { Scene } from './Scene';
import { Environment } from '@react-three/drei';
import { Cloud} from "./Cloud"
// import './styles.css';


extend(meshline);

function generateCloudRing(center, radius, cloudCount, ...cloudProps) {
  const cloudRing = [];
  for (let i = 0; i < cloudCount; i++) {
    const angle = (i / cloudCount) * Math.PI * 2;
    const x = center[0] + radius * Math.cos(angle);
    const y = center[1];
    const z = center[2] + radius * Math.sin(angle);
    //console.log(cloudProps[0].speed);
    cloudRing.push(
      <Cloud key={i} position={[x, y, z]} speed = {cloudProps[0].speed} color = {cloudProps[0].color} opacity = {cloudProps[0].opacity}
      segments = {cloudProps[0].segments} depth = {cloudProps[0].depth} depthTest = {cloudProps[0].depthTest} scaleRatio={true} {...cloudProps}/>
    );
  }
  return cloudRing;
}





export default function App() {

  const cameraRef = useRef();
  // const setCameraRef = useCallback((camera) => {
  //   cameraRef.current = camera;
  // }, []);
  //const setCameraRef = useSetCamera();
  const mouse = useRef([0, 0]);
  const onMouseMove = useCallback(
    ({ clientX: x, clientY: y }) =>
      (mouse.current = [x - window.innerWidth / 2, y - window.innerHeight / 2]),
    []
  );
  const color = "#c4bc93"
  return (

    <div onMouseMove={onMouseMove} style={{ width: '100vw', height: '100vh' }}>

      <Canvas
        pixelratio={window.devicePixelRatio}
        camera={{ fov: 100, position: [30, 0, 0] }}
        onCreated={({ gl, size, camera }) => {
          //const setCameraRef = useSetCamera();
          //setCameraRef(camera); // Store the camera reference
          //setCamera(camera);
          cameraRef.current = camera; // Store the camera reference
          //console.log(camera,cameraRef);
          //console.log(size.width);
          if (size.width < 600) {
            camera.position.z = 45;
          }
          else  {
            camera.position.z = 75;
          }
          gl.setClearColor(new THREE.Color('#080808'));

        }}>

        <Suspense fallback={null}>
                {generateCloudRing([0, 90, 0], 10, 5, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 85, 0], 25, 15, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 70, 0], 10, 5, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 60, 0], 1, 3, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 50, 0], 1, 3, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 40, 0], 1, 3, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 30, 0], 1, 3, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 15, 0], 5, 10, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 10, 0], 10, 5, { speed: 0.2, opacity: 0.75, segments: 25, size:5, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 5, 0], 25, 15, { speed: 0.2, opacity: 0.75, segments: 25, size:20, depthTest: false, depth: 1, color: color })}
                {generateCloudRing([0, 0, 0], 35, 15, { speed: 0.2, opacity: 0.75, segments: 25, size:20, depthTest: false, depth: 1, color: color })}

        </Suspense>
        {/*  <Environment files="./pinkMountain.hdr" background blur={0}/>
        <group  rotation = {[0,Math.PI/2,0]}>
           <Scene init={init} mouse={mouse} />
        </group>
        {generateCloudRing([0, 0, 0], 50, 50, { speed: 0.2, opacity: 0.25, segments: 25, size:5, depthTest: true, color: "#643b81" })}*/}
        <Environment files="./feild.hdr" background = {false} blur={0} ground={{ height: 100, radius: 300, scale: 110 }}/>
        <group  rotation = {[0,Math.PI/2,0]}>

              <Scene mouse={mouse} cameraRef={cameraRef} />

        </group>
        <Effects />


      </Canvas>





    </div>
  );
}
