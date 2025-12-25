import React from 'react';
import { Container } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './components/Home/Home';
import Form from './components/Form/Form'; // Reuse your existing Form!

const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth="lg">
        <Navbar />
        <Routes>
          {/* Main Feed */}
          <Route path="/" element={<Home />} />
          
          {/* The "Report" Page - We reuse the Form component here */}
          <Route path="/report" element={
            <div style={{ marginTop: '50px', display: 'flex', justifyContent: 'center' }}>
               <Form />
            </div>
          } />
        </Routes>
      </Container>
    </BrowserRouter>
  );
};

export default App;