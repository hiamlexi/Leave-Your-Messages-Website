import { useEffect } from "react";
import styled from "styled-components";
import Aos from "aos";
import "aos/dist/aos.css";

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


const Title = styled.h1`
  font-size: 2.5rem;
  color: yellow;
  text-align: center;
  margin-bottom: 2rem;
  border: 1px solid red;
`;



const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 2.5 / 1;
  border-radius: 60px;
`;

const StyledVideo = styled.video`
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 100px;
`;

const PlaneImage = styled.img`
  z-index: 2;
  position: absolute;
  top: 50%;
  left: 50%;
  width: 150%;
  height: 150%;
  transform: translate(-50%, -50%);
  object-fit: contain;
  pointer-events: none;
  
`;


const SecondPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Section>
      <Title data-aos="fade-up" data-aos-duration="2500">
        Start Planning Your Next Trip With Us
      </Title>
      <VideoWrapper>
        <StyledVideo src={video} autoPlay muted loop />
        <PlaneImage src={aeroplane} alt="Plane" />
      </VideoWrapper>
    </Section>
  );
};

export default SecondPage;
