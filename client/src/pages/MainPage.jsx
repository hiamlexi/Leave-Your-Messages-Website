import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import FourthPage from "./FourthPage";
import Navbar from "../components/Navbar";
import ThirdPage from "./ThirdPage";
import MessagePage from "./MessagePage";
import PicturePage from "./PicturePage";

const Container = styled.div`
  height: 100vh;
  width: 100%;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: #da4ea2 rgba(255, 255, 255, 0.1);
  color: white;
  background: url("/bg.jpeg");
  overflow-x: hidden;

  /* Custom scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    width: 12px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    border-radius: 6px;
    margin: 10px 0;
  }

  &::-webkit-scrollbar-thumb {
    background: linear-gradient(180deg, #da4ea2 0%, #c23d8f 50%, #da4ea2 100%);
    border-radius: 6px;
    border: 2px solid transparent;
    background-clip: padding-box;
    box-shadow: 0 0 6px rgba(218, 78, 162, 0.3);
    
    &:hover {
      background: linear-gradient(180deg, #c23d8f 0%, #a02d7a 50%, #c23d8f 100%);
      box-shadow: 0 0 10px rgba(218, 78, 162, 0.5);
    }
    
    &:active {
      background: linear-gradient(180deg, #a02d7a 0%, #8a2569 50%, #a02d7a 100%);
      box-shadow: 0 0 12px rgba(218, 78, 162, 0.7);
    }
  }

  /* Firefox scrollbar styling */
  scrollbar-width: thin;
  scrollbar-color: #da4ea2 rgba(255, 255, 255, 0.1);
`;

const MainPage = () => {
  const containerRef = useRef(null);
  const [scrollContainer, setScrollContainer] = useState(null);

  useEffect(() => {
    if (containerRef.current) {
      setScrollContainer(containerRef.current);
    }
  }, []);

  return (
    <Container ref={containerRef}>
      <Navbar />
      <FirstPage />
      <SecondPage id="my-journey" />
      {scrollContainer && <ThirdPage id="wish-jar" scrollContainer={scrollContainer} />}
      <PicturePage id="memories" />
      <MessagePage id="write-wish" />
      <FourthPage />
    </Container>
  );
};

export default MainPage;
