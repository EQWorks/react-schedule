import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions';
import 'semantic-ui-css/semantic.min.css'

import Schedule from '../src/schedule'


const schedule = [
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
  [false, false, false, false, false, false, false, false, true, true, true, true, true, true, true, true, true, true, true, false, false, false, false, 0],
]

storiesOf('Schedule', module)
  .add('Simple', () => (<Schedule defaultSchedule={schedule} onChange={action('onChange')} />))
