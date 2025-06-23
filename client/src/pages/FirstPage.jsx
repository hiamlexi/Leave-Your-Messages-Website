import { Suspense } from "react";
import styled from "styled-components";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere, MeshDistortMaterial } from "@react-three/drei";

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
  justify-content: center;
  gap: 20px;

  @media (max-width: 768px) {
    flex: 1;
    align-items: center;
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
    filter: blur(30px);
    opacity: 0;
    transform: translateY(100px);
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
    filter: blur(30px);
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
  filter: blur(30px);

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
          <Box>
            <Span>2</Span>
            <DigitWrapper>
              <OldDigit>6</OldDigit>
              <NewDigit>7</NewDigit>
            </DigitWrapper>
          </Box>
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
  <Img src="./img/moon.png" />
</Right>

      </Container>
    </section>
  );
};

export default FirstPage;
