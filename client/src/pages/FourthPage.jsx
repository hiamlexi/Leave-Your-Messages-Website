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
  const hasTypedRef = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTypedRef.current) {
            hasTypedRef.current = true;

            const h1 = headerRef.current;
            const p = paragraphRef.current;
            const headerSpeed = 50;
            const paragraphSpeed = Math.floor(headerSpeed / 3);

            if (h1 && p) {
              const delay = h1.innerText.length * headerSpeed + headerSpeed;

              typeEffect(h1, headerSpeed);
              setTimeout(() => {
                p.style.display = "block";
                typeEffect(p, paragraphSpeed);

                if (sectionRef.current) {
                  observer.unobserve(sectionRef.current);
                }
              }, delay);
            }
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px",
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
  }, []);

  return (
    <Section ref={sectionRef} id={props.id}>
      <Container>
        <Left>
          <TypingHeader ref={headerRef}>Welcome to Our Journey</TypingHeader>
          <TypingParagraph ref={paragraphRef}>
            Every season brings its own magic, just like every message carries its
            own story. This interactive space celebrates the beauty of transitions -
            from winter's quiet reflection to summer's vibrant energy. Hover over
            the image to experience the transformation, and remember that your words
            have the power to create lasting connections. Whether you're sharing
            memories, expressing gratitude, or simply saying hello, your message
            matters. Take a moment to explore, reflect, and leave your mark on this
            digital canvas where stories come to life and connections are made.
          </TypingParagraph>
        </Left>
        <Right>{ImgSection}</Right>
      </Container>
    </Section>
  );
};

export default FourthPage;
