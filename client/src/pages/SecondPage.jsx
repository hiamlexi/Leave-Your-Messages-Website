import { useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

import video from "../assets/sky.mp4";
import aeroplane from "../assets/plane.png";

const Section = styled.section`
  height: 100vh;
  scroll-snap-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Tooltip = styled.span`
  position: absolute;
  bottom: 110%;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 6px 10px;
  border-radius: 5px;
  font-size: 14px;
  white-space: nowrap;
  opacity: 0;
  transition: opacity 0.3s ease;
  pointer-events: none;
`;

const Msg = styled.h1`
  font-size: 40px;
  color: white;
  transition: all 0.3s ease;
  text-decoration: none;
`;

const SubMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;
const Subtitle = styled.h2`
  color: #da4ea2;
`;
const Desc = styled.p`
  font-size: 24px;
  color: lightgray;

  @media (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;
const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 2.5 / 1;
  border-radius: 60px;
  z-index: 0;
`;
const StyledVideo = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100px;
`;

const PlaneLink = styled(Link)`
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  transform: translate(-50%, -50%);
  width: 150%;
  height: 150%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  &:hover ${Tooltip} {
    opacity: 1;
  }

  &:hover img {
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 135%;
    height: 135%;
  }
`;

const PlaneImage = styled.img`
  width: 90%;
  height: 90%;
  object-fit: contain;
  transition: transform 0.3s ease;
  cursor: pointer;
`;

const SecondPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Section>
      <Msg>My Journey</Msg>
      <SubMessage>
        <Subtitle>
          26 years of life, 26 years of growth. Every journey shaped me. 🌍✈️
        </Subtitle>
      </SubMessage>
      <Desc>
        Grateful for all the places I've been, the people I've met, and the
        lessons along the way.
      </Desc>
      <VideoWrapper>
        <StyledVideo src={video} autoPlay muted loop />
        <PlaneLink to="/story">
          <Tooltip>Click here to see my journey</Tooltip>
          <PlaneImage src={aeroplane} alt="Plane" />
        </PlaneLink>
      </VideoWrapper>
    </Section>
  );
};

export default SecondPage;
