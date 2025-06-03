import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import Ts2 from './components/Ts2';

const App = () => {
  return (
    <div className="app">
      <div>
        <div>
          <Routes>
            <Route path='/' element={<Ts2 />} />
          </Routes>
        </div>
      </div>
    </div>
  )
}

export default App
