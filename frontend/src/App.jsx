import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

import Home from "./pages/Home";
import About from "./About";
import SIGs from "./pages/SIGs";
import Exec from "./pages/Exec";
import Projects from "./pages/Projects";
import AdminDashboard from "./pages/AdminDashboard";

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
          {/* Admin routes - no navbar, direct URL only (no login) */}
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
