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
  width: 100%;
  scroll-snap-align: start;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  @media (max-width: 738px) {
    flex-direction: column;
    min-height: 150vh;
    align-items: center;
    justify-content: flex-start;
    position: relative;
    padding-top: 63vh;
  }
`;

const StyledImage = styled.img`
  position: absolute;
  object-fit: cover;
  pointer-events: none;

  @media (max-width: 738px) {
    width: 100vw;
    height: auto;
  }
`;

const Moon = styled(StyledImage)`
  top: 2;
  left: -150px;
  mix-blend-mode: screen;
  transform: translateY(0);
  transition: transform 0.6s ease;

  @media (max-width: 738px) {
    width: 300px;
    height: auto;

    top: 63vh;
    left: 20px;
  }
`;

const Train = styled(StyledImage)`
  transform: translateX(0);
  transition: transform 0.6s ease;
   max-width: 100vw;
     overflow: hidden;
`;
const Heading = styled.h1`
  position: absolute;
  font-size: 2.5rem;
  top: 80px;
  left: 70%;
  z-index: 2;
  color: white;

  @media (max-width: 738px) {
    font-size: 2rem;
    top: 63vh;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const TextContainer = styled.div`
  position: absolute;
  top: 140px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 2;
  max-width: 600px;
  width: 90%;
  transition: transform 0.6s ease;

  @media (max-width: 1200px) {
    left: 55%;
    max-width: 500px;
  }

  @media (max-width: 738px) {
    top: calc(63vh + 60px);
    left: 50%;
    transform: translateX(-50%);
    max-width: 90%;
    padding: 0 20px;
  }
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  color: rgba(255, 255, 255, 0.9);
  margin: 0;
  text-align: center;

  @media (max-width: 738px) {
    font-size: 1rem;
    text-align: center;
  }
`;

const ThirdPage = ({ scrollContainer, id }) => {
  const sectionRef = useRef(null);
  const moonRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const trainRef = useRef(null);

  const hasEntered = useRef(false);
  const inReverseAnimation = useRef(false);

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
      const isInView = relativeScroll >= 0 && relativeScroll <= sectionHeight;

      // Reverse animation if entering from above
      if (
        !hasEntered.current &&
        scrollTop >= sectionTop - 50 &&
        scrollTop < sectionTop + 50
      ) {
        inReverseAnimation.current = true;
        hasEntered.current = true;

        if (moonRef.current)
          moonRef.current.style.transform = `translateY(100px)`;
        if (textRef.current)
          textRef.current.style.transform = `translateY(-100px)`;
        if (paragraphRef.current)
          paragraphRef.current.style.transform = `translateY(-100px)`;
        if (trainRef.current)
          trainRef.current.style.transform = `translateX(-150px)`;

        // Delay to allow reverse-in animation
        requestAnimationFrame(() => {
          if (moonRef.current)
            moonRef.current.style.transform = `translateY(0px)`;
          if (textRef.current)
            textRef.current.style.transform = `translateY(0px)`;
          if (paragraphRef.current)
            paragraphRef.current.style.transform = `translateY(0px)`;
          if (trainRef.current)
            trainRef.current.style.transform = `translateX(0px)`;

          // time for animation to settle before enabling scroll transform
          setTimeout(() => {
            inReverseAnimation.current = false;
          }, 600); // match the CSS transition duration
        });

        return;
      }

      if (isInView && !inReverseAnimation.current) {
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
        if (paragraphRef.current) {
          paragraphRef.current.style.transform = `translateY(${
            relativeScroll * -0.2
          }px)`;
        }
        if (trainRef.current) {
          trainRef.current.style.transform = `translateX(${
            relativeScroll * 1.5
          }px)`;
        }
      }
    };

    scrollContainer.addEventListener("scroll", handleScroll);
    return () => scrollContainer.removeEventListener("scroll", handleScroll);
  }, [scrollContainer]);

  return (
    <Section ref={sectionRef} id={id}>
      <Moon src={moon} alt="moon" ref={moonRef} />
      <StyledImage src={water} alt="water" />
      <StyledImage src={centerCity} alt="center city" />
      <StyledImage src={rightCity} alt="right city" />
      <StyledImage src={leftCity} alt="left city" />
      <Train src={train} alt="train" ref={trainRef} />
      <StyledImage src={rail} alt="rail" />
      <Heading ref={textRef}>Wish Jar</Heading>
      <TextContainer ref={paragraphRef}>
        <Paragraph>
          Make a wish and let it float among the stars. Your dreams and hopes 
          are safe here, waiting to bloom when the time is right. Every wish 
          tells a story, and every story deserves to be heard.
        </Paragraph>
      </TextContainer>
      <StyledImage src={hillLeft} alt="hill left" />
      <StyledImage src={hillRight} alt="hill right" />
    </Section>
  );
};

export default ThirdPage;
