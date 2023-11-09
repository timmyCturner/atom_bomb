import shallow from 'zustand/shallow';
import * as THREE from 'three';

import { OrbitControls, CameraShake, Environment } from '@react-three/drei';
// import HDRFile from 'public/Back_1k.hdr'

import { SparkStormCustom } from './SparkStormCustom';
import { SpaceDust } from './SpaceDust';
import { GroundDust } from './GroundDust';
import { RocketShip } from './RocketShip';
import { Sparks } from './Sparks';


import { Cloud} from "@react-three/drei";

import { useEffect  } from 'react';

const colors = {

  malevolentIllusion: [
    '#9ac069',
    '#a8de77',
    '#b4df86',
    '#c0d998',
    '#c6eead',
    '#c9f9c6',
],
  sunnyRainbow: [
    '#431C0D',
    '#6E3907',
    '#A85604',
    '#FFB600',
    '#FFD200',
    '#FFE74C',
    '#FFED7D'
  ],
  blackRainbow: [
    '#05070A',
    '#1E2A3A',
    '#3D4D5C',
    '#6E879C',
    '#AAB9C9',
    '#CED8E4',
    '#E4EBF1'
  ],
};


export function Scene({ init = true, mouse, cameraRef }) {

  const light = new THREE.PointLight(0xffffff, 1, 50); // White light at full intensity
  light.position.set(0, -100,-10);

  return (
    <>
      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate={true}
        enableZoom={false}
      />



        <ambientLight distance={100} intensity={1} color="#ffffff" />
      <group >


        <SpaceDust count={250} mouse={mouse} />
        <group position = {[-10,0,0]}>
          <GroundDust count={150} mouse={mouse} />
        </group >
        <RocketShip radius = {32}/>

        <Sparks count={20} mouse={mouse} colors={colors.blackRainbow} />
      </group>
    </>
  );
}
