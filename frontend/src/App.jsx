import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import About from './About';
import Layout from './components/Layout';
import SIGs from './pages/SIGs';
import Exec from './pages/Exec';

const App = () => {
  return (
    <div className='App'> 
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/sigs" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/sigs" element={<SIGs />} />
            <Route path="/exec" element={<Exec />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
