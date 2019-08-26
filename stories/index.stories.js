import React from 'react'

import { storiesOf } from '@storybook/react'
import 'semantic-ui-css/semantic.min.css'

import Schedule from '../src/schedule'


storiesOf('Schedule', module)
  .add('Simple', () => (<Schedule />))
