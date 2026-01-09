import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import About from '.frontend/src/About' //directory location for About 
import * as Layout from 'frontend\src\components\Layout.jsx' //  Layout Directory
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
