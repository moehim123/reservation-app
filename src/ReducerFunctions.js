export function initializeTimes() {
    return ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  }

  export function updateTimes(state, action) {
    switch (action.type) {
      case 'UPDATE_TIMES':
        const selectedDate = new Date(action.date);
        const day = selectedDate.getDay();

        if (day === 0 || day === 6) { // Weekend (Sunday=0, Saturday=6)
          return ["17:00", "18:00", "19:00", "20:00"];
        } else { // Weekday
          return ["18:00", "19:00", "20:00", "21:00", "22:00"];
        }
      default:
        return state;
    }
  }
