import { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import newyear from "../assets/newyear.webp";

const Container = styled.div`
  width: 100%;
  max-width: 1400px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;
  padding: 0 40px;

  @media (max-width: 1200px) {
    padding: 0 30px;
  }

  @media (max-width: 992px) {
    padding: 0 20px;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 0 15px;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;

  @media (max-width: 768px) {
    position: relative;
    height: 100%;
    min-height: 300px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 80px 0;
  overflow: visible;
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
    align-items: center;
    padding: 40px 0;
    gap: 40px;
  }
`;

const Right = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
    min-height: 350px;
  }
`;

const NumberSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  order: 1; /* Desktop: numbers first */
  overflow: visible;
  position: relative;
  
  @media (max-width: 768px) {
    height: auto;
    padding: 60px 0 40px 0;
    order: 2; /* Mobile: numbers second */
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 50%;
  padding: 40px 40px 0 40px;
  order: 2; /* Desktop: text second */
  
  @media (max-width: 768px) {
    height: auto;
    padding: 40px 20px 0 20px;
    text-align: center;
    order: 1; /* Mobile: text first */
  }
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3.5rem);
  font-weight: 700;
  color: #ffffff;
  margin: 0;
  line-height: 1.2;
`;

const Subtitle = styled.h2`
  font-size: clamp(1.2rem, 2.5vw, 2rem);
  font-weight: 500;
  color: #da4ea2;
  margin: 0;
  line-height: 1.3;
`;

const Paragraph = styled.p`
  font-size: clamp(1rem, 1.5vw, 1.2rem);
  color: #cccccc;
  line-height: 1.6;
  margin: 0;
  max-width: 500px;
  
  @media (max-width: 768px) {
    max-width: 100%;
  }
`;

const Img = styled.img`
  width: 90%;
  max-width: 800px;
  height: auto;
  max-height: 600px;
  object-fit: contain;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: animate 2s infinite ease alternate;
  z-index: 1;

  @media (max-width: 1200px) {
    width: 85%;
    max-width: 600px;
    max-height: 450px;
  }

  @media (max-width: 992px) {
    width: 80%;
    max-width: 500px;
    max-height: 400px;
  }

  @media (max-width: 768px) {
    width: 70%;
    max-width: 300px;
    max-height: 300px;
  }

  @keyframes animate {
    from {
      transform: translate(-50%, -50%) translateY(0);
    }
    to {
      transform: translate(-50%, -50%) translateY(20px);
    }
  }
`;

const Box = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  justify-content: center;
  gap: 0.2em;
  overflow: visible;
  height: 100px;
  min-width: 200px;
  padding: 0 50px;

  &::before,
  &::after {
    position: absolute;
    top: -1.2em;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    width: auto;
    white-space: nowrap;
    text-align: center;
    font-size: clamp(2rem, 5vw, 74px);
    background: linear-gradient(90deg, #da4ea2, #fcf0f7, #da4ea2);
    background-size: 200%;
    background-clip: text;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: shine 3s linear infinite;
    transition: 1s;
    opacity: 0;
    overflow: visible;
    filter: blur(30px);
  }

  &::before {
    content: "Byeeee!";
    transform: translateX(-50%) translateY(0);
    opacity: 1;
    filter: blur(0);
  }

  &:hover::before {
    transform: translateX(-50%) translateY(-100px);
    opacity: 0;
    filter: blur(30px);
  }

  &::after {
    content: "Bonjour!";
  }

  &:hover::after {
    transform: translateX(-50%) translateY(0px);
    opacity: 1;
    filter: blur(0px);
  }

  @keyframes shine {
    0% {
      background-position: 0%;
    }
    100% {
      background-position: 200%;
    }
  }
`;

const Span = styled.span`
  color: #fff;
  font-size: clamp(3rem, 10vw, 10em);
  font-weight: bold;
  filter: blur(1px);
`;

const DigitWrapper = styled.div`
  position: relative;
  width: 1em;
  height: 1em;
`;

const OldDigit = styled(Span)`
  position: absolute;
  top: 0;
  left: 0;
  transition: 2s;
  color: rgb(192, 199, 7);

  ${Box}:hover & {
    transform: rotate(45deg) translateY(-200px);
    opacity: 0;
    filter: blur(4px);
  }
`;

const NewDigit = styled(Span)`
  position: absolute;
  top: 0;
  left: 0;
  transition: 2s;
  color: rgb(214, 8, 94);
  transform: rotate(-45deg) translateY(200px);
  opacity: 0;
  filter: blur(4px);

  ${Box}:hover & {
    transform: rotate(0deg) translateY(0px);
    opacity: 1;
    filter: blur(0px);
  }
`;

const FirstPage = () => {
  // Calculate responsive sphere scale based on screen width
  const getSphereScale = () => {
    if (typeof window !== 'undefined') {
      const width = window.innerWidth;
      if (width < 768) return 1.8;
      if (width < 992) return 2.0;
      if (width < 1200) return 2.2;
      return 2.4;
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
