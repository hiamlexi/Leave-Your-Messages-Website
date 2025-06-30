import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import Navbar from "../components/Navbar";
import ThirdPage from "./ThirdPage";
import MessagePage from "./MessagePage";
import PicturePage from "./PicturePage";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("/bg.jpeg");
    overflow-x: hidden;

  &::-webkit-scrollbar {
    display: none;
  }
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
      <SecondPage />
      {scrollContainer && <ThirdPage scrollContainer={scrollContainer} />}
      <PicturePage />
      <MessagePage />
    </Container>
  );
};

export default MainPage;
