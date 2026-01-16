import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

// Import pages
import Home from "./pages/Home";
// import About from "./pages/About";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            {/* Home route */}
            <Route index element={<Home />} />
            
            {/* Add other routes here as pages are created */}
            {/* Example routes: */}
            {/* <Route path="about" element={<About />} /> */}
            {/* <Route path="events" element={<Events />} /> */}
            {/* <Route path="projects" element={<Projects />} /> */}
            {/* <Route path="team" element={<Team />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
