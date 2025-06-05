import '../App.css';
import "react-image-gallery/styles/css/image-gallery.css";
import GlobalStyle from './../Styles/GlobalStyles.js';
import React, { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Canvas, extend, useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import circleImg from '../assets/circle.png';
import { fadeImages } from '../constants/constants';
import styled, { keyframes } from 'styled-components';
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AimOutlined, HomeOutlined, LinkOutlined, MenuOutlined } from '@ant-design/icons';
import ImageGallery from 'react-image-gallery';
import typewriter from '../assets/notMyType.otf';
import ContactForm from './ContactForm.jsx';
import ErrorBoundary from 'antd/es/alert/ErrorBoundary';
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
  border-bottom: 3px solid grey;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 10;
  backdrop-filter: blur(2px);
  gap: 140px;

  h1 {
    cursor: pointer;
    color: white;
    font-size: 40px;
    font-family: sans;

    @media (max-width: 768px) {
      font-size: 30px;
    }
  }

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
  }
`

const MenuItems = styled.div`
  display: flex;
  gap: 140px;

  @media (max-width: 768px) {
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-direction: column;
    z-index: 999;
    position: absolute;
    top: 70px;
    left: 0;
    width: 100%;
    background: rgba(0, 0, 0, 0.9);
    padding: 20px 0;
    gap: 20px;
    align-items: center;
  }
`;

const MenuIcon = styled(MenuOutlined)`
  display: none;
  font-size: 28px;
  color: white;
  cursor: pointer;

  @media (max-width: 768px) {
    display: flex;
    width: 100%;
    justify-content: center;
  }
`;

const ProductGridContainer = styled.div`
  display: flex;
  backdrop-filter: blur(2px);
  padding: 5px;
  border-radius: 10px;
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

  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    z-index: 1;
    flex-direction: column;
    left: 0;
  }
`

const InnerBodyContainer = styled.div`
  height: 88vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 15px;
`

const TitleInfoContainer = styled.div`
  padding: 20px;
  width: 85%;
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
    color: white;
    font-weight: 300;
    font-family: {typewriter};
  }

  h2 {
    font-size: 19px;
    color: white;
    font-weight: 300;
  }

  href {
    font-family: typewriter;
    color: white;
    cursor: pointer;
  }

  href:hover {
    color: white;
  }
`

const ContactFormContainer = styled.div`
  display: flex;
  margin-top: 25px;
`

const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
};



const ProductGrid = () => {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
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
        thumbnailPosition='left'
        showThumbnails={!isMobile} //hide thumbnails on mobile
        // showNav={!isMobile} // Hide arrow keys on mobile
      />
    </div>
  );
};




const Ts2 = () => {
  const infoRef = useRef(null);
  const photosRef = useRef(null);
  const contactRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false)

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
  };


  return (
    <>
      <GlobalStyle />
      <NavbarContainer>
        <MenuIcon onClick={() => {
          setMenuOpen(!menuOpen)
          console.log("Menu Click");
        }}
        />
        <MenuItems open={menuOpen}>
          <h1 onClick={() => { scrollToSection(infoRef); setMenuOpen(false); }}> Info</h1>
          <h1 onClick={() => { scrollToSection(photosRef); setMenuOpen(false); }}> Photos</h1>
          <h1 onClick={() => { scrollToSection(contactRef); setMenuOpen(false); }}> Contact</h1>
        </MenuItems>
      </NavbarContainer>
      <BodyContainer>
        <InnerBodyContainer>
          <TitleInfoContainer ref={infoRef}>
            <TitleBox>
              <Title>Max <br /> Tattoo Artist</Title>
            </TitleBox>
            <InfoContainer>
              <InfoBox>
                <h1><HomeOutlined /> Residency: Certified Tattoo Studios</h1>
                <h1><AimOutlined />Address: 8025 W Colfax Ave, Lakewood, CO</h1>
                <a href="https://certifiedtattoo.com" target="_blank" rel="noopener noreferrer">
                  <LinkOutlined /> Certified Tattoo Website
                </a>
              </InfoBox>
            </InfoContainer>
          </TitleInfoContainer>

          <ProductGridContainer ref={photosRef}>
            <ProductGrid />
          </ProductGridContainer>

          <ContactFormContainer ref={contactRef}>
            <ContactForm />
          </ContactFormContainer>

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
