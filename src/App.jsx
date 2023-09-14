import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import YouTube from "react-youtube";

import "./App.css";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import Portifolio from "./components/Portifolio";

function App() {
  return (
    <div className="app-container">
      <Navbar />
      <Outlet />
      <Portifolio />
    </div>
  );
}

export default App;
