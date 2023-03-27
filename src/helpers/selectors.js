export function getAppointmentsForDay(state, day) {
  const dayObjArr = state.days.filter((dayItem) => dayItem.name === day);
  
  if (dayObjArr.length === 0) {
    return [];
  }

  const dayObj = dayObjArr[0];

  return dayObj.appointments.map((id) => state.appointments[id]);
}
