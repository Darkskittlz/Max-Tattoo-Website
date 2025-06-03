import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import { Layout, Typography, Space } from 'antd'
import './App.css'
import Ts2 from './components/Ts2';

const App = () => {
  return (
    <div className="app">
      <div className='main'>
        <Layout>
          <div className='routes'>
            <Routes>
              <Route path='/' element={<Ts2 />} />
            </Routes>
          </div>
        </Layout>
      </div>
    </div>
  )
}

export default App
