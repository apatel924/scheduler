import React from "react";
import { Fragment } from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import "index.scss";

import Button from "../src/components/Button";
import DayListItem from "../src/components/DayListItem";
import DayList from '../src/components/DayList';
import InterviewerListItem from "components/InterviewerListItem";
import InterviewerList from "components/InterviewerList";
import Appointment from "components/Appointment/index.js";
import Header from "components/Appointment/Header";
import Empty from "components/Appointment/Empty";
import Show from "components/Appointment/Show";
import Confirm from "components/Appointment/Confirm";
import Status from "components/Appointment/Status";
import Error from "components/Appointment/Error";
import Form from "components/Appointment/Form";


// Button
storiesOf("Button", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Base", () => <Button>Base</Button>)
  .add("Confirm", () => <Button confirm>Confirm</Button>)
  .add("Danger", () => <Button danger>Cancel</Button>)
  .add("Clickable", () => (
    <Button onClick={action("button-clicked")}>Clickable</Button>
  ))
  .add("Disabled", () => (
    <Button disabled onClick={action("button-clicked")}>
      Disabled
    </Button>
  ));

// Day List Item
storiesOf("DayListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  })
  .add("Initial", () => <DayListItem name="Monday" spots={5} />)
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />)
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" onChange={action("setDay")} spots={5} />
  ));

const interviewer = {
  id: 1,
  name: "Sylvia Palmer",
  avatar: "https://i.imgur.com/LpaY82x.png",
};

//Day List - Dummy Data
const days = [
  {
    id: 1,
    name: "Monday",
    spots: 2,
  },
  {
    id: 2,
    name: "Tuesday",
    spots: 5,
  },
  {
    id: 3,
    name: "Wednesday",
    spots: 0,
  },
];

//Day List
storiesOf("DayList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Monday", () => (
    <DayList days={days} value={"Monday"} onChange={action("setDay")} />
  ))
  .add("Tuesday", () => (
    <DayList days={days} value={"Tuesday"} onChange={action("setDay")} />
  ))
  .add("Wednesday", () => (
    <DayList days={days} value={"Wednesday"} onChange={action("setDay")} />
  ));

// Interviewer list items
storiesOf("InterviewerListItem", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Initial", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
    />
  ))
  .add("Selected", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      selected
    />
  ))
  .add("Clickable", () => (
    <InterviewerListItem
      id={interviewer.id}
      name={interviewer.name}
      avatar={interviewer.avatar}
      setInterviewer={() => action("setInterviewer")(interviewer.id)}
    />
  ));

// dummy data of interviewers
const interviewers = [
  { id: 1, name: "Sylvia Palmer", avatar: "https://i.imgur.com/LpaY82x.png" },
  { id: 2, name: "Tori Malcolm", avatar: "https://i.imgur.com/Nmx0Qxo.png" },
  { id: 3, name: "Mildred Nazir", avatar: "https://i.imgur.com/T2WwVfS.png" },
  { id: 4, name: "Cohana Roy", avatar: "https://i.imgur.com/FK8V841.jpg" },
  { id: 5, name: "Sven Jones", avatar: "https://i.imgur.com/twYrpay.jpg" },
];

// interviewer list
storiesOf("InterviewerList", module)
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }],
  })
  .add("Initial", () => <InterviewerList interviewers={interviewers} />)
  .add("Selected", () => (
    <InterviewerList interviewers={interviewers} value={3} />
  ))
  .add("Clickable", () => (
    <InterviewerList
      interviewers={interviewers}
      setInterviewer={() => action("onChange")(interviewer.id)}
    />
  ));

  // Empty 
  storiesOf("Empty", module)
    .addParameters({
      backgrounds: [{ name: "white", value: "#fff", default: true }],
    })
    .add("Empty", () => <Empty onAdd={action("onAdd")} />);

// Appointment
storiesOf("Appointment", module)
  .addParameters({
    backgrounds: [{ name: "white", value: "#fff", default: true }],
  })
  .add("Appointment", () => <Appointment />)

  .add("Appointment with time", () => <Appointment time="12pm" />)

  .add("Header", () => <Header time="12pm" />)

  .add("Empty", () => <Empty onAdd={action("onAdd")} />)

  .add("Show", () => (
    <Show
      student="Lydia Miller-Jones"
      interviewer={interviewer}
      onEdit={action("onEdit")}
      onDelete={action("onDelete")}
    />
  ))

  .add("Confirm", () => (
    <Confirm
      message="Delete the appointment?"
      onConfirm={action("onConfirm")}
      onCancel={action("onCancel")}
    />
  ))

  .add("Status", () => <Status message="Deleting"/>)

  .add("Error", () => {
    <Error
      message="Could not delete appointment."
      onClose={action("onClose")}
    />
  })

  .add("Form Create", () => (
    <Form
      interviewers={interviewers}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))
  .add("Form Edit", () => (
    <Form
      student="Ashish Patel"
      interviewers={interviewers}
      interviewer={1}
      onSave={action("onSave")}
      onCancel={action("onCancel")}
    />
  ))

  .add("Appointment Empty", () => (
    <Fragment>
      <Appointment id={1} time="4pm" />
      <Appointment time="5pm" />
    </Fragment>
  ))

  .add("Appointment Booked", () => (
    <Fragment>
      <Appointment
        id={1}
        time="4pm"
        interview={{ student: "Lydia Miller-Jones", interviewer }}
      />
      <Appointment time="5pm" />
    </Fragment>
  ));