import styled from "styled-components";
import FirstPage from "./pages/FirstPage";
import Navbar from "./components/Navbar";


const Container = styled.div`
  height: 100vh;
  scroll-snap-type: y mandatory;
  scroll-behavior: smooth;
  overflow-y: auto;
  scrollbar-width: none;
  color: white;
  background: url("/bg.jpeg");
  &::-webkit-scrollbar{
    display: none;
  }
`;

function App() {
  return (
    <Container>
              <Navbar />
      <FirstPage />
    </Container>
  );
}

export default App;
