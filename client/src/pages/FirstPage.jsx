import { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";
import newyear from "../assets/newyear.webp";

const Container = styled.div`
  width: 1400px;
  display: flex;
  justify-content: space-between;
  height: 100%;
  margin: 0 auto;

  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

const CanvasWrapper = styled.div`
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    height: 300px;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 80px 0;

  @media (max-width: 768px) {
    flex: 1;
    align-items: center;
    padding: 40px 0;
    gap: 40px;
  }
`;

const Right = styled.div`
  flex: 3;
  position: relative;

  @media (max-width: 768px) {
    flex: 1;
    width: 100%;
  }
`;

const NumberSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50%;
  
  @media (max-width: 768px) {
    height: auto;
    padding: 60px 0 40px 0;
  }
`;

const TextSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  height: 50%;
  padding: 40px 40px 0 40px;
  
  @media (max-width: 768px) {
    height: auto;
    padding: 40px 20px 0 20px;
    text-align: center;
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
  width: 800px;
  height: 600px;
  object-fit: contain;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  animation: animate 2s infinite ease alternate;

  @media (max-width: 768px) {
    width: 300px;
    height: 300px;
  }

  @keyframes animate {
    to {
      transform: translateY(20px);
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

  &::before,
  &::after {
    position: absolute;
    top: -1.5em;
    width: 100%;
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
    transform: translateY(100px);
    overflow: visible;
    filter: blur(30px);
  }

  &::before {
    content: "Byeeee!";
    transform: translateY(0);
    opacity: 1;
    filter: blur(0);
  }

  &:hover::before {
    transform: translateY(-100px);
    opacity: 0;
    filter: blur(30px);
  }

  &::after {
    content: "Bonjour!";
  }

  &:hover::after {
    transform: translateY(0px);
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
  return (
    <section>
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
                <Sphere args={[1, 100, 200]} scale={2.4}>
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
