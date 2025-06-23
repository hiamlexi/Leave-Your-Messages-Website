import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import JourneyPage from "./pages/SecondPage"; //Journey page will be use for story page atm

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/story" element={<JourneyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
