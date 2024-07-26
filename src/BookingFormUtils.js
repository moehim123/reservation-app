import { fetchAPI } from './Api/fetchAPI';

export const initializeTimes = async () => {
  const times = await fetchAPI();
  return times.length > 0 ? times : ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00'];
};

export const updateTimes = (state, action) => {
  switch (action.type) {
    case 'UPDATE_TIMES':
      return action.payload;
    default:
      return state;
  }
};
