import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SaleOrders from './components/Order';
import Signup from './components/Signup';

const App = () => {

  const isLoggedIn = localStorage.getItem('login') === 'true';

  return (
    <div className='mx-2 p-2 my-2'>
      <Router>
        <Routes>
          {isLoggedIn && <Route path="/sale" element={<SaleOrders />} />}
          <Route path="/" element={<Signup />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;