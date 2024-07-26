import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import BookingForm from './BookingForm';
import { fetchAPI } from './Api/fetchAPI';
import { MemoryRouter } from 'react-router-dom';

jest.mock('./Api/fetchAPI', () => ({
  fetchAPI: jest.fn(),
}));

describe('BookingForm', () => {
  beforeEach(() => {
    fetchAPI.mockReset();
  });

  it('should initialize times correctly', async () => {
    // Mock fetchAPI to return a set of times
    fetchAPI.mockResolvedValue(['10:00 AM', '11:00 AM', '12:00 PM']);

    const dispatch = jest.fn();
    render(<BookingForm dispatch={dispatch} availableTimes={[]} />);

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: ['10:00 AM', '11:00 AM', '12:00 PM'],
      });
    });
  });

  it('should update times based on selected date', async () => {
    // Mock fetchAPI to return a set of times for a specific date
    fetchAPI.mockResolvedValue(['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00']);

    const dispatch = jest.fn();
    const { result } = render(<BookingForm dispatch={dispatch} availableTimes={[]} />);

    // Assuming `result.current.setDate` is how you set the date for testing
    result.current.setDate('2024-07-30');

    await waitFor(() => {
      // Mock the expected times based on the selected date
      expect(dispatch).toHaveBeenCalledWith({
        type: 'UPDATE_TIMES',
        payload: ['02:00 PM', '03:00 PM', '04:00 PM'],
      });
    });
  });
});
