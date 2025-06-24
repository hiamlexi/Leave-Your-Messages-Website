import { useEffect, useRef } from "react";
import styled from "styled-components";

import sky from "../assets/sky.png";
import moon from "../assets/moon.png";
import water from "../assets/water.png";
import centerCity from "../assets/center-city.png";
import rightCity from "../assets/right-city.png";
import leftCity from "../assets/left-city.png";
import train from "../assets/train.png";
import rail from "../assets/rail.png";
import hillLeft from "../assets/hill-left-1.png";
import hillRight from "../assets/hill-right-1.png";
import { ImagePreloader } from "../hook/ImagePreLoader";

const Section = styled.section`
  min-height: 100vh;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  overflow: hidden;
`;

const StyledImage = styled.img`
  position: absolute;
  object-fit: cover;
  pointer-events: none;
`;

const Moon = styled(StyledImage)`
  top: 0;
  left: 0;
  mix-blend-mode: screen;
  transform: translateY(0);
`;

const Train = styled(StyledImage)`
  left: 0;
  bottom: 0;
  transform: translateX(0);
  transition: transform 0.1s ease;
`;

const Heading = styled.h1`
  position: absolute;
  font-size: 2.5rem;
  text-shadow: 10px 4px rgba(0, 0, 0, 0.5);
  top: 80px;
  left: 3%;
  z-index: 2;
  color: white;
  transform: translateY(0);
  transition: transform 0.3s ease-out;
`;

const ThirdPage = ({ scrollContainer }) => {
  const sectionRef = useRef(null);
  const moonRef = useRef(null);
  const textRef = useRef(null);
  const trainRef = useRef(null);

  ImagePreloader([
    sky,
    moon,
    water,
    centerCity,
    rightCity,
    leftCity,
    train,
    rail,
    hillLeft,
    hillRight,
  ]);
  useEffect(() => {
    if (!scrollContainer || !sectionRef.current) return;

    const section = sectionRef.current;

    const handleScroll = () => {
      const scrollTop = scrollContainer.scrollTop;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      const relativeScroll = scrollTop - sectionTop;

      // skip animation when section out of view
      if (relativeScroll < 0 || relativeScroll > sectionHeight) return;

      if (moonRef.current) {
        moonRef.current.style.transform = `translateY(${
          relativeScroll * 0.5
        }px)`;
      }

      if (textRef.current) {
        textRef.current.style.transform = `translateY(${
          relativeScroll * -0.2
        }px)`;
      }

      if (trainRef.current) {
        trainRef.current.style.transform = `translateX(${
          relativeScroll * 1.5
        }px)`;
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  return (
    <Section ref={sectionRef}>
      <StyledImage src={sky} alt="sky" />
      <Moon src={moon} alt="moon" ref={moonRef} />
      <StyledImage src={water} alt="water" />
      <StyledImage src={centerCity} alt="center city" />
      <StyledImage src={rightCity} alt="right city" />
      <StyledImage src={leftCity} alt="left city" />
      <Train src={train} alt="train" ref={trainRef} />
      <StyledImage src={rail} alt="rail" />
      <Heading ref={textRef}>Website</Heading>
      <StyledImage src={hillLeft} alt="hill left" />
      <StyledImage src={hillRight} alt="hill right" />
    </Section>
  );
};

export default ThirdPage;
