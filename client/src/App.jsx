import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import JourneyPage from "./pages/SecondPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        //Journey page will be use for story page atm
        <Route path="/story" element={<JourneyPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
