import React from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from '@mui/material';
import theme from './Theme';

import Login from './components/login/Login';
import SignUp from './components/login/SignUp';
import Dashboard from './components/home/Dashboard';
import MainMenu from './components/home/MainMenu';
import ParamVal from './components/modules/paramVal/ParamVal';
import Agent from './components/modules/agent/Agent';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path="" element={<MainMenu />} />
            <Route path="param" element={<ParamVal />} />
            <Route path="agent" element={<Agent />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
