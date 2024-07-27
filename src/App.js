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
import withSkeletonLoader from './withSkeletonLoader';

const HeroWithSkeleton = withSkeletonLoader(Hero);
const HighlightsWithSkeleton = withSkeletonLoader(Highlights);
const TestimonialsWithSkeleton = withSkeletonLoader(Testimonials);
const AboutusWithSkeleton = withSkeletonLoader(Aboutus);
const BookingFormWithSkeleton = withSkeletonLoader(BookingForm);
const ConfirmedBookingWithSkeleton = withSkeletonLoader(ConfirmedBooking);


function MainApp() {
  const [availableTimes, dispatch] = useReducer(updateTimes, [], initializeTimes);

  return (
    <div className="min-h-screen flex flex-col">
      <Header className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
      <div className="flex-grow">
        <Routes>
          <Route path="/" element={
            <>
              <HeroWithSkeleton className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
              <HighlightsWithSkeleton className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
              <TestimonialsWithSkeleton className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
              <AboutusWithSkeleton className="min-h-screen grid grid-cols-1 md:grid-cols-2 py-8" />
            </>
          } />
          <Route path="/booking" element={<BookingFormWithSkeleton availableTimes={availableTimes} dispatch={dispatch} />} />
          <Route path="/confirmed" element={<ConfirmedBookingWithSkeleton />} />
        </Routes>
      </div>
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
