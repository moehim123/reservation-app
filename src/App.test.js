import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import BookingForm from './BookingForm';
import { fetchAPI } from './Api/fetchAPI';

jest.mock('./Api/fetchAPI', () => ({
  fetchAPI: jest.fn(),
}));

describe('BookingForm Component', () => {
  let container;

  beforeEach(() => {
    fetchAPI.mockReset();
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  afterEach(() => {
    document.body.removeChild(container);
    container = null;
  });

  it('should initialize times correctly', async () => {
    fetchAPI.mockResolvedValue(['10:00 AM', '11:00 AM', '12:00 PM']);
    const dispatch = jest.fn();

    await act(async () => {
      render(
        <MemoryRouter>
          <BookingForm availableTimes={[]} dispatch={dispatch} />
        </MemoryRouter>,
        { container }
      );
    });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: ['10:00 AM', '11:00 AM', '12:00 PM'],
      });
    });
  });

  it('should update times based on selected date', async () => {
    fetchAPI.mockResolvedValue(['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00']);
    const dispatch = jest.fn();

    await act(async () => {
      render(
        <MemoryRouter>
          <BookingForm availableTimes={[]} dispatch={dispatch} />
        </MemoryRouter>,
        { container }
      );
    });

    const dateInput = screen.getByLabelText(/date/i);
    fireEvent.change(dateInput, { target: { value: '2024-07-30' } });

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'],
      });
    });
  });
});
