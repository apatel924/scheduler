import React, { useState, useEffect } from "react";
import axios from "axios";
import Application from "../components/Application";

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
    const updatedDays = [...state.days];
    for (let day of updatedDays) {
      if (day.name === state.day) {
        if (type === "subtract") {
          day.spots -= 1;
        }
        if (type === "add") {
          day.spots += 1;
        }
      }
    }
    return updatedDays;
  }
  
  const bookInterview = (appointmentId, interview) => {
    return axios
      .put(`/api/appointments/${appointmentId}`, { interview })
      .then((response) => {
        setState((prev) => {
          const updatedAppointment = {
            ...prev.appointments[appointmentId],
            interview: { ...interview },
          };
          const updatedAppointments = {
            ...prev.appointments,
            [appointmentId]: updatedAppointment,
          };
          const updatedDays = updateSpots("subtract");
          return { ...prev, appointments: updatedAppointments, days: updatedDays };
        });
      });
  };
  
  const cancelInterview = (appointmentId) => {
    return axios.delete(`/api/appointments/${appointmentId}`).then((response) => {
      setState((prev) => {
        const updatedAppointment = {
          ...prev.appointments[appointmentId],
          interview: null,
        };
        const updatedAppointments = {
          ...prev.appointments,
          [appointmentId]: updatedAppointment,
        };
        const updatedDays = updateSpots("add");
        return { ...prev, appointments: updatedAppointments, days: updatedDays };
      });
    });
  };
  
  const setDay = (day) => setState({ ...state, day }); 
  return { state, setDay, bookInterview, cancelInterview };
};  
