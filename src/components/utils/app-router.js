import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from '../home';
import Dashboard from '../dashboard';
import PrivateRoute from './private-route';
import Login from '../login';
import AppHeader from '../common/app-header';

const AppRouter = () => {
  return (
    <Router>
      <AppHeader />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default AppRouter;
