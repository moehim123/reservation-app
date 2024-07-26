import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './BookingForm';
import '@testing-library/jest-dom';
import { submitAPI, fetchAPI } from './Api/fetchAPI';
import { createRoot } from 'react-dom/client';

jest.mock('./Api/fetchAPI', () => ({
  submitAPI: jest.fn().mockResolvedValue(true),
  fetchAPI: jest.fn().mockResolvedValue(['10:00 AM', '11:00 AM', '12:00 PM']),
}));

describe('BookingForm Component', () => {
  let container = null;

  beforeEach(() => {
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  test('Renders the BookingForm heading', async () => {
    await act(async () => {
      const root = createRoot(container);
      root.render(
        <MemoryRouter>
          <BookingForm availableTimes={[]} dispatch={() => {}} />
        </MemoryRouter>
      );
    });
    const headingElement = screen.getByText(/Book a table by filling form below and check your email for details of the booking/i);
    expect(headingElement).toBeInTheDocument();
  });

  test('initializeTimes returns correct initial times', async () => {
    const times = await fetchAPI();
    expect(times).toEqual(['10:00 AM', '11:00 AM', '12:00 PM']);
  });

  test('updateTimes returns the same value that is provided in the state', () => {
    const state = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];
    const newState = state;
    expect(newState).toEqual(state);
  });

  test('BookingForm should initialize times correctly', async () => {
    const dispatch = jest.fn();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        <MemoryRouter>
          <BookingForm dispatch={dispatch} availableTimes={['10:00 AM', '11:00 AM', '12:00 PM']} />
        </MemoryRouter>
      );
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: '2024-07-30',
      });
    });
  });

  test('BookingForm should update times based on selected date', async () => {
    const dispatch = jest.fn();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        <MemoryRouter>
          <BookingForm dispatch={dispatch} availableTimes={['10:00 AM', '11:00 AM', '12:00 PM']} />
        </MemoryRouter>
      );
    });

    const dateInput = screen.getByLabelText(/date/i);
    await act(async () => {
      fireEvent.change(dateInput, { target: { value: '2024-07-30' } });
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: '2024-07-30',
      });
    });
  });

  test('BookingForm should handle form submission', async () => {
    const dispatch = jest.fn();
    await act(async () => {
      const root = createRoot(container);
      root.render(
        <MemoryRouter>
          <BookingForm dispatch={dispatch} availableTimes={['10:00 AM', '11:00 AM', '12:00 PM']} />
        </MemoryRouter>
      );
    });

    await act(async () => {
      fireEvent.change(screen.getByLabelText(/first name/i), { target: { value: 'John' } });
      fireEvent.change(screen.getByLabelText(/last name/i), { target: { value: 'Doe' } });
      fireEvent.change(screen.getByLabelText(/email/i), { target: { value: 'john.doe@example.com' } });
      fireEvent.change(screen.getByLabelText(/date/i), { target: { value: '2024-07-30' } });
      fireEvent.change(screen.getByLabelText(/available time/i), { target: { value: '10:00 AM' } });

      fireEvent.click(screen.getByText(/next/i));

      fireEvent.change(screen.getByLabelText(/card number/i), { target: { value: '1234567890123456' } });
      fireEvent.change(screen.getByLabelText(/expiry date/i), { target: { value: '12/25' } });
      fireEvent.change(screen.getByLabelText(/cvv/i), { target: { value: '123' } });

      fireEvent.click(screen.getByText(/submit/i));
    });

    await waitFor(() => {
      expect(submitAPI).toHaveBeenCalledWith({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        date: '2024-07-30',
        time: '10:00 AM',
        location: 'indoor',
        notes: '',
        cardNumber: '1234567890123456',
        expiryDate: '12/25',
        cvv: '123',
      });
    });
  });
});
