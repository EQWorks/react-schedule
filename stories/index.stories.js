import React from "react";

import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import "semantic-ui-css/semantic.min.css";

import Schedule from "../src/schedule";
import Button from "../src/custom-button/button";

const schedule = [
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, false]
];

storiesOf("Schedule", module).add("Simple", () => <Schedule defaultSchedule={schedule} onChange={action("onChange")} />);

storiesOf("Custom Button", module)
  .add("Small", () => <Button label="Click Me" size="small" onClick={action("clicked")} />)
  .add("Medium", () => <Button label="Click Me" onClick={action("clicked")} />)
  .add("Large", () => <Button label="Click Me" size="large" onClick={action("clicked")} />)
  .add("Outlined", () => <Button label="Click Me" size="large" outlined color="red" onClick={action("clicked")} />)
  .add("Filled", () => <Button label="Click Me" size="large" filled color="red" onClick={action("clicked")} />)
  .add("Disabled-outlined", () => <Button label="Disabled" size="large" outlined color="grey" disabled />)
  .add("Disabled-filled", () => <Button label="Disabled" size="large" filled color="grey" disabled />)
  .add("Toggle-active", () => <Button label="Toggle" size="large" color="grey" toggle active={true} />)
  .add("Toggle-inactive", () => <Button label="Toggle" size="large" color="grey" toggle active={false} />)
  .add("Toggle-active-filled", () => <Button label="Toggle" size="large" filled color="green" toggle active={true} />)
  .add("Toggle-inactive-filled", () => <Button label="Toggle" size="large" filled color="green" toggle active={false} />)
  .add("Toggle-active-outlined", () => <Button label="Toggle" size="large" outlined color="grey" toggle active={true} />)
  .add("Toggle-inactive-outlined", () => <Button label="Toggle" size="large" outlined color="grey" toggle active={false} />);
