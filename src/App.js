import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SaleOrders from './components/Order';
import Signup from './components/Signup';

const App = () => {

  const isLoggedIn = localStorage.getItem('login') === 'true';

  return (
    <div className='mx-2 p-2 my-2'>
      <Router>
        <Routes>
          {isLoggedIn && <Route path="/" element={<SaleOrders />} />}
          <Route path="/sign-up" element={<Signup />} />
          <Route path="*" element={<Navigate to="/sign-up" />} />

        </Routes>
      </Router>
    </div>
  );
};

export default App;