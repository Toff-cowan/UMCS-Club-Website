import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '.frontend/src/About' //directory location for About 
import Layout from './components/Layout' //  Layout Directory
import Navbar from './components/Frame/Navbar' //directoory for the Navbar 
import Footer from './component/Frame/Footer' // directory for the Footer

const App = () => {
  return (
    <div className='App'> 
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/about" element={<About />} />
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
