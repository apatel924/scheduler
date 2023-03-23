import React from "react";
import ReactDOM from "react-dom";

import "index.scss";

import Application from "components/Application";

ReactDOM.render(<Application />, document.getElementById("root"));


storiesOf("DayListItem", module) //Initiates Storybook and registers our DayListItem component
  .addParameters({
    backgrounds: [{ name: "dark", value: "#222f3e", default: true }]
  }) // Provides the default background color for our component
  .add("Unselected", () => <DayListItem name="Monday" spots={5} />) // To define our stories, we call add() once for each of our test states to generate a story
  .add("Selected", () => <DayListItem name="Monday" spots={5} selected />) 
  .add("Full", () => <DayListItem name="Monday" spots={0} />)
  .add("Clickable", () => (
    <DayListItem name="Tuesday" setDay={action("setDay")} spots={5} /> // action() allows us to create a callback that appears in the actions panel when clicked
  ));