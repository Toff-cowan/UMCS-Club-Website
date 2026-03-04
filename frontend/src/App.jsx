import React, { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import "./App.css";

const Home = lazy(() => import("./pages/Home"));
const About = lazy(() => import("./About"));
const SIGs = lazy(() => import("./pages/SIGs"));
const Exec = lazy(() => import("./pages/Exec"));
const Projects = lazy(() => import("./pages/Projects"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

function PageFallback() {
  return <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>Loading…</div>;
}

const App = () => {
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<PageFallback />}>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="sigs" element={<SIGs />} />
              <Route path="exec" element={<Exec />} />
              <Route path="projects" element={<Projects />} />
              <Route path="resources" element={<Navigate to="/about" replace />} />
            </Route>
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Routes>
        </Suspense>
      </Router>
    </div>
  );
};

export default App;
