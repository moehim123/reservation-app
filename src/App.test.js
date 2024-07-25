import { act } from 'react';
import { render, screen } from '@testing-library/react';
import { initializeTimes, updateTimes } from './ReducerFunctions'; // Ensure this path is correct
import BookingForm from './BookingForm';
import App from './App';


test('Renders the BookingForm heading and text', () => {
  render(<BookingForm availableTimes={[]} dispatch={() => {}} />);

  const headingElement = screen.getByText(/Book a table by filling form below and check your email for details of the booking/i);
  expect(headingElement).toBeInTheDocument();

  const additionalTextElement = screen.getByText(/We Charge \$50 deposit to hold your booking for you/i);
  expect(additionalTextElement).toBeInTheDocument();
});

test('initializeTimes returns correct initial times', () => {
  const initialTimes = initializeTimes();
  expect(initialTimes).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]); // Adjusted time values
});

test('updateTimes returns correct times based on the date', () => {
  const weekdayState = ["18:00", "19:00", "20:00", "21:00", "22:00"];
  const weekendState = ["17:00", "18:00", "19:00", "20:00"];
  const weekdayAction = { type: 'UPDATE_TIMES', date: '2024-07-25' }; // Weekday
  const weekendAction = { type: 'UPDATE_TIMES', date: '2024-07-27' }; // Weekend

  const weekdayUpdatedState = updateTimes([], weekdayAction);
  const weekendUpdatedState = updateTimes([], weekendAction);

  expect(weekdayUpdatedState).toEqual(weekdayState);
  expect(weekendUpdatedState).toEqual(weekendState);
});


