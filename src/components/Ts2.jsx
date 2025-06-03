import '../App.css';
import "react-image-gallery/styles/css/image-gallery.css";
import GlobalStyle from './../Styles/GlobalStyles.js';
import React, { Suspense, useCallback, useMemo, useRef } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import circleImg from '../assets/circle.png';
import { fadeImages } from '../constants/constants';
import styled, { keyframes } from 'styled-components';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AimOutlined, HomeOutlined, LinkOutlined } from '@ant-design/icons';
import ImageGallery from 'react-image-gallery';
import typewriter from '../assets/notMyType.otf';
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

const Animation = keyframes`
  0% { box-shadow: 0 0 10px #09EE9A; }
  30% { box-shadow: 0 0 30px rgba(222, 59, 208, 1);  }
  50% { box-shadow: 0 0 20px #09DEEE;  }
  70% { box-shadow: 0 0 30px rgba(102, 37, 177, 1);  }
  100% { box-shadow: 0 0 30px rgba(102, 37, 177, 1);  }
`

const NavbarContainer = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 3px solid white;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10;
  backdrop-filter: blur(2px);
  gap: 140px;

  h1 {
    font-size: 40px;
    font-family: sans;
  }
`

const ProductGridContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  width: 100%;
`

const BodyContainer = styled.div`
  width: 50%;
  padding: 10px;
  left: 25%;
  justify-content: center;
  margin-top: 90px;
  flex-direction: column;
  position: absolute;
  display: flex;
  z-index: 998;
`

const InnerBodyContainer = styled.div`
  height: 88vh;
  overflow-y: scroll;
`

const TitleInfoContainer = styled.div`
  padding: 20px;
  width: 100%;
  flex-direction: column;
  border: 2px solid white;
  border-radius: 10px;
  animation-name: ${Animation};
  animation-duration: 4s;
  animation-iteration-count: infinite;
  backdrop-filter: blur(4px);
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const TitleBox = styled.div`
  display: flex;
  justify-content: center;
  @media (max-width: 860px){
      display: flex;
      justify-content: center;
      width: 100%;
  }
`

const Title = styled.h1`
  // Typewriter Config
  // font-size: 50px;
  // font-family: 'typewriter', cursive;
  // font-weight: 200;

  text-align: center;
  font-size: 70px;
  font-family: 'Yellowtail', cursive;
  margin-bottom: 0;
  color: white;
`

const InfoContainer = styled.div`
  width: 100%;
  justify-content: center;
  display: flex;
  align-items: center;
`

const InfoBox = styled.div`
  display: flex;
  z-index: 10;
  margin-top: 10px;
  gap: 10px;
  backdrop-filter: blur(10px);
  flex-direction: column;
 
  h1 {
    font-size: 20px;
    font-weight: 300;
    font-family: {typewriter};
  }

  h2 {
    font-size: 19px;
    font-weight: 300;
  }

  href {
    font-family: typewriter;
    cursor: pointer;
  }

  href:hover {
    color: blue;
  }
`



const ProductGrid = () => {
  const galleryImages = fadeImages.map(image => ({
    original: image.url,
    thumbnail: image.url, // use same image for thumbnail, or adjust if you have separate ones
  }));

  return (
    <div>
      <ImageGallery
        items={galleryImages}
        showPlayButton={false}
        showFullscreenButton={true}
        thumbnailPosition="left"
      />
    </div>
  );
};




const Ts2 = () => {
  return (
    <>
      <GlobalStyle />
      <NavbarContainer>
        <h1>Info</h1>
        <h1>Photos</h1>
        <h1>Contact</h1>
      </NavbarContainer>
      <BodyContainer>
        <InnerBodyContainer>
          <TitleInfoContainer>
            <TitleBox>
              <Title>Max <br /> Tattoo Artist</Title>
            </TitleBox>
            <InfoContainer>
              <InfoBox>
                <h1><HomeOutlined /> Current Residency: Certified Tattoo Studios</h1>
                <h1><AimOutlined />Address: 8025 W Colfax Ave, Lakewood, CO 80214</h1>
                <a href="https://certifiedtattoo.com" target="_blank" rel="noopener noreferrer">
                  <LinkOutlined /> Certified Tattoo Website
                </a>
              </InfoBox>
            </InfoContainer>
          </TitleInfoContainer>
          <ProductGridContainer>
            <ProductGrid />
          </ProductGridContainer>
        </InnerBodyContainer>
      </BodyContainer>
      <div className="anim">
        <Suspense fallback={<div>Loading...</div>}>
          <AnimationCanvas />
        </Suspense>
      </div>
    </>
  );
};

export default Ts2;
