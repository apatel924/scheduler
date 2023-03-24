import React from "react";

export default function Status(props) {
  return (
    <main className="appointment_card appointment_card--status">
      <img
        className="appointment_status-image"
        src="images/status.png"
        alt="Loading"
      />
    <h1 className="text--semi-bold">{props.message}</h1>
    </main> 
  )
}