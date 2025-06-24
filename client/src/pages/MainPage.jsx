import { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import FirstPage from "./FirstPage";
import SecondPage from "./SecondPage";
import Navbar from "../components/Navbar";
import ThirdPage from "./ThirdPage";

const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("/bg.jpeg");

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
      {scrollContainer && <ThirdPage scrollContainer={scrollContainer} />}
    </Container>
  );
};

export default MainPage;
