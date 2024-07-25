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
import { initializeTimes, updateTimes } from './ReducerFunctions';

function App() {


  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <Router>
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
          <Route path="/booking" element={<BookingForm availableTimes={availableTimes} dispatch={dispatch} className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />} />
        </Routes>
        <Footer className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
      </div>
    </Router>
  );
}

export default App;
