import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((all) => {
      setState((prev) => ({
        ...prev,
        days: all[0].data,
        appointments: all[1].data,
        interviewers: all[2].data,
      }));
    });
  }, []);

  function updateSpots(type) {
    const index = state.days.findIndex((day) => day.name === state.day);
    const copy = [...state.days];
    let newDay;

    for (let day of copy) {
      if (day.name === state.day) {
        newDay = { ...day };
        if (type === "subtract") {
          newDay.spots = newDay.spots - 1;
        }
        if (type === "add") {
          newDay.spots = newDay.spots + 1;
        }
        if (type === "edit") {
          continue;
        }
      }
    }
    copy[index] = newDay;
    return copy;
  }

  function bookInterview(id, interview) {
    return axios
      .put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState((prev) => {
          const appointment = {
            ...prev.appointments[id],
            interview: { ...interview },
          };
          const appointments = {
            ...prev.appointments,
            [id]: appointment,
          };
          const isEdit =
            state.appointments[id].interview === null ? "subtract" : "edit";
          const days = updateSpots(isEdit);
          return { ...prev, appointments, days: days };
        });
      });
  }

  function cancelInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState((prev) => {
        const appointment = {
          ...prev.appointments[id],
          interview: null,
        };
        const appointments = {
          ...prev.appointments,
          [id]: appointment,
        };
        const days = updateSpots("add");
        return { ...prev, appointments, days: days };
      });
    });
  }

  const setDay = (day) => setState({ ...state, day });

  return { state, setDay, bookInterview, cancelInterview };
}
