import * as THREE from 'three';
import React, { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { lerp, mapRange } from 'canvas-sketch-util/math';

// import './styles.css';
function generateRandomNumberInRange(max, min,i) {
  let neg = 1
  const isNegative = Math.random() < 0.5;
  if (isNegative) {neg = -1}
  if ((i%3==0) && ((i+1)%3!=0)){
    min=0
    //console.log(min);
  }
  return neg*(Math.random() * (max - min) + min);
}


export function GroundDust({ mouse, count}) {
  const mesh = useRef();

  // const light = useRef();
  //
  // const { size, viewport } = useThree();
  // const aspect = size.width / viewport.width;
  const limit = 25;
  const rangeLimit = 10;

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.random() * 100;
      const speed = 0.01 + Math.random() / 200;

      // let xFactor = -limit/2 + Math.random() * limit;
      // let yFactor = -limit/2 + Math.random() * limit;
      let xFactor = generateRandomNumberInRange(35, 15,i);
      let yFactor = generateRandomNumberInRange(35, 15,i+1);
      //console.log(xFactor,yFactor);

      if ((yFactor>-rangeLimit && yFactor<rangeLimit)&&(xFactor>-rangeLimit && xFactor<rangeLimit)){
        let xFactor = generateRandomNumberInRange(35, 20,i);
        let yFactor = generateRandomNumberInRange(35, 20,i+1);
      }
      // xFactor = xFactor < -rangeLimit || xFactor > rangeLimit ? xFactor : (xFactor < -rangeLimit ? -rangeLimit : rangeLimit);
      // yFactor = yFactor < -rangeLimit || yFactor > rangeLimit ? yFactor : (yFactor < -rangeLimit ? -rangeLimit : rangeLimit);
      //console.log(xFactor,yFactor);


      temp.push({ t, factor, speed, xFactor, yFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse
    // light.current.position.set(
    //   mouse.current[0] / aspect,
    //   -mouse.current[1] / aspect,
    //   0
    // );
    // Run through the randomized data to calculate some movement
    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      //particle.mx += (mouse.current[0] - particle.mx) * 0.01;
      //particle.my += (mouse.current[1] * -1 - particle.my) * 0.01;

       const lerpedY = lerp(1,3, Math.sin((t) * 2) + (Math.cos(t * 4) * 1));

       //console.log(lerpedY,(particle.my / 10)  + yFactor + Math.sin((t) * 1) + (Math.cos(t * 2) * 1));
      // Update the dummy object
      dummy.position.set(
        xFactor,
        lerpedY,
        yFactor
      );
      dummy.scale.set(s, s, s);
      dummy.rotation.set(s * 5, s * 5, s * 5);
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>

      <instancedMesh ref={mesh} args={[null, null, count]}>
        <dodecahedronGeometry args={[0.6, 0]} />
        <meshPhongMaterial color="#561806" />
      </instancedMesh>
    </>
  );
}
