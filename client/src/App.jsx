import styled from "styled-components";
import Hero from "./components/Hero";

const Container = styled.div`
  height: 100vh;
  color: white;
  background: url("./bg.jpeg");
`;
function App() {
  return (
    <Container>
            <Hero />

    </Container>
  );
}

export default App;
