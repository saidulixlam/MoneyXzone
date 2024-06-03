import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SaleOrders from './components/Order';
import WeatherPage from './components/WeatherPage';
import Signup from './components/Signup';
const App = () => {

  return (
    <div className='mx-2 p-2 my-2'>
      <Router>
      <Routes>
        <Route exact path="/" element={<SaleOrders />} />
        <Route exact path="/sign-up" element={<Signup />} />
        <Route path="/:city/:latitude/:longitude" element={<WeatherPage />} />
      </Routes>
    </Router>
    </div>
  );
};

export default App;
