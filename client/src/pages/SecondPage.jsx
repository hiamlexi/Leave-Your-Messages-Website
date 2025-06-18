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




const VideoWrapper = styled.div`
  position: relative;
  width: 90%;
  max-width: 1000px;
  aspect-ratio: 2.5 / 1;
  border-radius: 60px;
    z-index: 0;
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
    @media (max-width: 768px) {
    width: 135%;
    height: 135%;
  }
  
`;

const Msg = styled.h1`
  font-size: 74px;

  @media only screen and (max-width: 768px) {
    text-align: center;
      font-size: 50px;
  }
`;

const SubMesage = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
    @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;


const Subtitle = styled.h2`
  color: #da4ea2;
    align-items: center;

`;

const Desc = styled.p`
  font-size: 24px;
  color: lightgray;
  @media only screen and (max-width: 768px) {
    padding: 20px;
    text-align: center;
  }
`;

const Button = styled.button`
  background-color: #da4ea2;
  color: white;
  font-weight: 500;
  width: 100px;
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;
/* <Title data-aos="fade-up" data-aos-duration="2500">
       My Journey
      </Title>*/ 

const SecondPage = () => {
  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  return (
    <Section>
   
          <Msg >Text Holder.</Msg>
          <SubMesage>
            <Subtitle>Text HolderText HolderText HolderText HolderText Holder</Subtitle>
          </SubMesage>
          <Desc>
           Text HolderText HolderText HolderText HolderText HolderText HolderText Holder
          </Desc>
      <VideoWrapper>
        <StyledVideo src={video} autoPlay muted loop />
        <PlaneImage src={aeroplane} alt="Plane" />
      </VideoWrapper>
    </Section>
  );
};

export default SecondPage;
