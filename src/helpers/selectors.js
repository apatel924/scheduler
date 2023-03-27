export function getAppointmentsForDay(state, day) {
  const dayObjArr = state.days.filter((dayItem) => dayItem.name === day);
  
  if (dayObjArr.length === 0) {
    return [];
  }

  const dayObj = dayObjArr[0];

  return dayObj.appointments.map((id) => state.appointments[id]);
}

export function getInterviewersForDay(state, day) {
  const dayObjArr = state.days.filter((dayItem) => dayItem.name === day);

  if (dayObjArr.length === 0) {
    return [];
  }

  const dayObj = dayObjArr[0];

  const interviewerArr = dayObj.interviewers.map((id) => state.interviewers[id]);

  return interviewerArr;
}

export function getInterview(state, interview) {
  if (interview === null) {
    return null;
  }

  return {
    student: interview.student,
    interviewer: {
      id: interview.interviewer,
      name: state.interviewers[interview.interviewer].name,
      avatar: state.interviewers[interview.interviewer].avatar,
    },
  };
}
