import React, { useReducer } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Hero from './Hero';
import Highlights from './Highlights';
import Testimonials from './Testmonials';
import Aboutus from './Aboutus';
import Footer from './Footer';
import BookingForm from './BookingForm';
import ConfirmedBooking from './ConfirmedBooking';
import { initializeTimes, updateTimes } from './ReducerFunctions';

function MainApp() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <div>
      <Header className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
      <Routes>
        <Route path="/" element={
          <>
            <Hero className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
            <Highlights className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
            <Testimonials className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
            <Aboutus className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
          </>
        } />
        <Route path="/booking" element={<BookingForm availableTimes={availableTimes} dispatch={dispatch} />} />
        <Route path="/confirmed" element={<ConfirmedBooking />} />
      </Routes>
      <Footer className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
    </div>
  );
}

function App() {
  return (
    <Router>
      <MainApp />
    </Router>
  );
}

export default App;
