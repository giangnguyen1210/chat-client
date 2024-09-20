import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginComponent from './components/LoginComponent';
import MessagesComponent from './components/MessagesComponent';
import { isAuthenticated } from './utils/auth';
import TeamsChatComponent from './components/TeamsChatComponent';

// const PrivateRoute = ({ children }) => {
//   return isAuthenticated() ? children : <Navigate to="/login" />;
// };

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent />} />
        <Route
          path="/chat"
          element={
            // <PrivateRoute>
              <TeamsChatComponent />
            // </PrivateRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
