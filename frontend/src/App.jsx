import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

import Home from "./pages/Home";
import About from "./About";
import SIGs from "./pages/SIGs";
import Exec from "./pages/Exec";
import Projects from "./pages/Projects";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="sigs" element={<SIGs />} />
            <Route path="exec" element={<Exec />} />
            <Route path="projects" element={<Projects />} />
            <Route path="resources" element={<Navigate to="/about" replace />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
};

export default App;
