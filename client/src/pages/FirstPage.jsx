import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import newyear from "../assets/newyear.webp";
import {
  Container,
  CanvasWrapper,
  Left,
  Right,
  NumberSection,
  TextSection,
  Title,
  Subtitle,
  Paragraph,
  Img,
  Box,
  Span,
  DigitWrapper,
  OldDigit,
  NewDigit
} from "../styles/pages/FirstPage.styles";

const FirstPage = () => {
  // Calculate responsive sphere scale based on screen width
  const getSphereScale = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 480) return 1.5;   // xs
      if (width < 640) return 1.7;   // sm
      if (width < 768) return 1.8;   // md
      if (width < 1024) return 2.0;  // lg
      if (width < 1280) return 2.2;  // xl
      return 2.4;                     // xxl
    }
    return 2.4;
  };

  return (
    <section style={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Container>
        <Left>
          <TextSection>
            <Title>Welcome to 27</Title>
            <Subtitle>A New Chapter Begins</Subtitle>
            <Paragraph>
              As we bid farewell to 26 and embrace 27, let's celebrate the journey ahead. 
              Every ending is a new beginning, and this year promises endless possibilities.
            </Paragraph>
          </TextSection>
          <NumberSection>
            <Box>
              <Span>2</Span>
              <DigitWrapper>
                <OldDigit>6</OldDigit>
                <NewDigit>7</NewDigit>
              </DigitWrapper>
            </Box>
          </NumberSection>
        </Left>
        <Right>
          <CanvasWrapper>
            <Canvas>
              <Suspense fallback={null}>
                <OrbitControls enableZoom={false} />
                <ambientLight intensity={1} />
                <directionalLight position={[3, 2, 1]} />
                <Sphere args={[1, 100, 200]} scale={getSphereScale()}>
                  <MeshDistortMaterial
                    color="#3d1c56"
                    attach="material"
                    distort={0.5}
                    speed={2}
                  />
                </Sphere>
              </Suspense>
            </Canvas>
          </CanvasWrapper>
          <Img src={newyear} />
        </Right>
      </Container>
    </section>
  );
};

export default FirstPage;
