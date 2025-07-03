import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import winter from "../assets/winter.gif";
import summer from "../assets/summer.gif";
import styled, { keyframes } from "styled-components";

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: start;
  display: flex;
  align-items: center;
  justify-content: center;
`;

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
    text-align: center;
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
  perspective: 1200px;
  animation: ${float} 3s ease-in-out infinite;
  cursor: pointer;

  @media (max-width: 830px) {
    width: 60%;
  }
`;

const FlipCard = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transition: transform 1.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform;

  &:hover {
    transform: rotateY(180deg);
  }
`;

const Side = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateZ(0);
  -webkit-transform: translateZ(0);
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
      rgba(219, 102, 255, 0.8),
      rgba(255, 146, 220, 0.8),
      rgba(255, 153, 102, 0.8),
      transparent
    );
    animation: ${rotateBorder} 8s linear infinite;
    z-index: 0;
    filter: blur(6px);
    opacity: 0.9;
    transition: opacity 0.3s ease;
  }

  ${FlipCard}:hover &::before {
    opacity: 0.6;
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
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  transition: box-shadow 0.3s ease;

  ${FlipCard}:hover & {
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4);
  }
`;

const TypingHeader = styled.h1`
  text-transform: uppercase;
  letter-spacing: 1pt;
  font-size: 30pt;
  margin-bottom: 15px;
  font-family: "Playfair Display", sans-serif;
  color: #;
`;

const TypingParagraph = styled.p`
  text-align: left;
  font-family: "Roboto", sans-serif;
  font-size: 11pt;
  font-weight: 300;
  width: 100%;
  max-width: 500px;
  display: none;
  color: #;
  @media (max-width: 830px) {
    text-align: center;
  }
`;

function typeEffect(element, speed) {
  const text = element.innerText;
  element.innerText = "";
  let i = 0;

  const timer = setInterval(() => {
    if (i < text.length) {
      element.append(text.charAt(i));
      i++;
    } else {
      clearInterval(timer);
    }
  }, speed);
}

// === Flipping image section ===
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

const FourthPage = (props) => {
  const headerRef = useRef(null);
  const paragraphRef = useRef(null);
  const sectionRef = useRef(null);
  const [hasTyped, setHasTyped] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Start typing effect when section is 20% visible and hasn't typed yet
          if (entry.isIntersecting && !hasTyped) {
            setHasTyped(true);
            const h1 = headerRef.current;
            const p = paragraphRef.current;
            const speed = 50;

            if (h1 && p) {
              const delay = h1.innerText.length * speed + speed;

              typeEffect(h1, speed);
              setTimeout(() => {
                p.style.display = "block";
                typeEffect(p, speed);
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.2, // Trigger when 20% of the section is visible
        rootMargin: '0px'
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [hasTyped]);

  return (
    <Section ref={sectionRef} id={props.id}>
      <Container>
        <Left>
          <TypingHeader ref={headerRef}>Sample typing effect.</TypingHeader>
          <TypingParagraph ref={paragraphRef}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ante
            arcu, dignissim non risus id, posuere efficitur felis. Vestibulum
            arcu diam, semper non ipsum quis, dictum ultricies diam. Suspendisse
            vel luctus sapien. Mauris tristique condimentum velit tincidunt
            pharetra. Curabitur ut lectus eleifend, malesuada lorem eget,
            consectetur augue. Nunc scelerisque nisi in lacus eleifend eleifend.
            Praesent blandit ex at nunc maximus, ut sodales ante auctor. Nunc
            elementum eros sit amet malesuada facilisis. Morbi eget elit
            consequat, sodales urna in, lobortis nisi. Morbi dapibus velit eu
            mattis bibendum. Nulla et nisi eget turpis vulputate suscipit eu nec
            nunc. Pellentesque ut pulvinar quam.
          </TypingParagraph>
        </Left>
        <Right>{ImgSection}</Right>
      </Container>
    </Section>
  );
};

export default FourthPage;
