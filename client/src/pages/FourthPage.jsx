import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import winter from "../assets/winter.gif";
import summer from "../assets/summer.gif";
import styled, { keyframes } from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  height: 100vh;
  padding: 0 10%;
  margin-top: 49px;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 830px) {
    flex-direction: column-reverse;
    padding: 0 20px;
  }
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px;

  @media (max-width: 830px) {
    width: 100%;
    align-items: center;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  height: 100%;

  @media (max-width: 830px) {
    width: 100%;
  }
`;

const float = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const rotateBorder = keyframes`
  0% { transform: rotateZ(0deg); }
  100% { transform: rotateZ(360deg); }
`;

const FlipWrapper = styled.div`
  width: 80%;
  aspect-ratio: 1 / 1;
  perspective: 1000px;
  animation: ${float} 3s ease-in-out infinite;

  @media (max-width: 830px) {
    width: 60%;
  }
`;

const FlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 0.8s ease-in-out;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const Side = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Front = styled(Side)`
  z-index: 2;
`;

const Back = styled(Side)`
  transform: rotateY(180deg);
`;

const Ring = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 50%;
`;

const RotatingRing = styled(Ring)`
  &::before {
    content: "";
    position: absolute;
    inset: -5%;
    border-radius: 50%;
    background: conic-gradient(
      transparent,
      rgb(219, 102, 255),
      rgb(255, 146, 220),
      #ff9966,
      transparent
    );
    animation: ${rotateBorder} 5s linear infinite;
    z-index: 0;
    filter: blur(4px);
  }
`;

const InnerWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CircularImg = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  display: block;
`;

const ImgSection = (
  <FlipWrapper>
    <FlipCard>
      <Front>
        <RotatingRing>
          <InnerWrapper>
            <CircularImg src={winter} alt="Me front" />
          </InnerWrapper>
        </RotatingRing>
      </Front>
      <Back>
        <Ring>
          <CircularImg src={summer} alt="Me flipped" />
        </Ring>
      </Back>
    </FlipCard>
  </FlipWrapper>
);


const FourthPage = () => {
  return (
    <section>
      <Container>
        <Left>{/* Content for Left */}</Left>
        <Right>{ImgSection}</Right>
      </Container>
    </section>
  );
};

export default FourthPage;
