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
  return (
    <Container>
      <Navbar />
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <ThirdPage />
    </Container>
  );
};

export default MainPage;
