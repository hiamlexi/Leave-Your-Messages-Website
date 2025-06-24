import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage";
import StoryPage from "./pages/StoryPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/story" element={<StoryPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
