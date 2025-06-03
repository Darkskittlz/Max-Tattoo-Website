import '../App.css';
import React, { Suspense, useCallback, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import typewriter from '../assets/notMyType.otf';
import * as THREE from 'three';
import circleImg from '../assets/circle.png';
import { fadeImages } from '../constants/constants';
import styled from 'styled-components';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
extend({ OrbitControls })


function CameraControls() {
  const {
    camera,
    gl: { domElement }
  } = useThree();

  const controlsRef = useRef();
  useFrame(() => controlsRef.current.update())

  return (
    <orbitControls
      ref={controlsRef}
      args={[camera, domElement]}
      autoRotate
      autoRotateSpeed={-0.2}
    />
  )
}

function Points() {
  const imgTex = useLoader(THREE.TextureLoader, circleImg);
  const bufferRef = useRef();
  const t = useRef(0);

  const count = 100;
  const sep = 3;

  const positions = useMemo(() => {
    const pos = [];

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = Math.sin(0.002 * (x ** 2 + z ** 2)) * 4;
        pos.push(x, y, z);
      }
    }

    return new Float32Array(pos);
  }, []);

  useFrame(() => {
    if (!bufferRef.current) return;
    t.current += 15;

    const positions = bufferRef.current.array;
    let i = 0;

    for (let xi = 0; xi < count; xi++) {
      for (let zi = 0; zi < count; zi++) {
        const x = sep * (xi - count / 2);
        const z = sep * (zi - count / 2);
        const y = Math.sin(0.002 * (x ** 2 + z ** 2 + t.current)) * 4;

        positions[i + 1] = y; // only Y changes
        i += 3;
      }
    }

    bufferRef.current.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          ref={bufferRef}
          attach="attributes-position"
          array={positions}
          count={positions.length / 3}
          itemSize={3}
        />
      </bufferGeometry>

      <pointsMaterial
        map={imgTex}
        color={0x00AAFF}
        size={0.5}
        sizeAttenuation
        transparent={false}
        alphaTest={0.5}
        opacity={1.0}
      />
    </points>
  );
}

function AnimationCanvas() {
  return (
    <Canvas
      legacy
      camera={{ position: [100, 10, 0], fov: 75 }}
    >
      <Suspense fallback={null}>
        <Points />
      </Suspense>
      <CameraControls />
    </Canvas>
  );
}

const TitleBox = styled.div`
    display: flex;
    position: fixed;
    z-index: 998;
    width: calc(100% - 200px);
    justify-content: center;
    margin-top: 70px;
    @media (max-width: 860px){
        display: flex;
        justify-content: center;
        width: 100%;
    }
`

const Title = styled.h1`
    font-size: 70px;
    font-family: 'Yellowtail', cursive;
    margin-bottom: 0;
    color: white;
`


const Body = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-content: center;
    row-gap: 0rem;
    width: 40%;
    top: 10%;
    left: 25%;
    z-index: 995;
    position: fixed;
    height: 100%;

    @media (max-width: 860px){
        display: flex;
        flex-direction: column;
        align-content: center;
        left: 2.5%;
        top: 15%;
        row-gap: 0rem;
        width: 95%;
  }
`

const Card = styled.div`
        height: 100%;
        width: 100%;
        flex-direction: column;
        backdrop-filter: blur(4px);
        z-index: 998;
        background-image: url(fadeImage.url),

        img {
            object-fit: cover;
            width: 100%;
            height: 100%;
            text-align: center;

            @media (max-width: 860px){
            height: 100%;
        }
        }

        h1 {
            font-size: 25px;
            font-family: "notMyType";
            color: white;
            width: 100%;
            text-align: center;
            z-index: 999;
        }

        p {
            text-align: center;
            color: white;
            font-size: 20px;
        }

        @media (max-width: 860px){
            height: 100%;
            display: flex;
            justify-content: center;
            align-content: end;
        }
    `




const ProductGrid = () => {
  return (
    <>
      <Body>
        <Fade>
          {fadeImages.map((fadeImage, index) => (
            <div className="each-fade" key={index}>
              <Card >
                <img src={fadeImage.url} />
              </Card>
              <h2>{fadeImage.caption}</h2>
            </div>
          ))}
        </Fade>
      </Body>
    </>
  )
}




const Ts2 = () => {
  return (
    <>
      <div className="bg-red-500">
        Navbar
      </div>
      <TitleBox><Title>Max Tattoo Artist</Title></TitleBox>
      <div className="anim">
        <Suspense fallback={<div>Loading...</div>}>
          <AnimationCanvas />
          <ProductGrid />
        </Suspense>
      </div>
    </>
  );
};

export default Ts2;
