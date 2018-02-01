import React from 'react'

import PropTypes from 'prop-types'
import { Grid } from 'semantic-ui-react'

import DisplayField from '../../../../common-components/display-field'
import {
  parseSchedule,
  humanizeArray,
  getDaysOfWeek,
  getTimesOfDay,
} from '../../../../utils/schedule'


const propTypes = { data: PropTypes.object.isRequired }

const ScheduleDisplay = ({ data }) => {
  const { targeting } = data
  let timesOfDayMsg
  let daysOfWeekMsg

  const daysOfWeek = getDaysOfWeek(targeting)
  if (daysOfWeek !== false) {
    if (daysOfWeek.length === 0) {
      // no schedule
      timesOfDayMsg = 'None'
      daysOfWeekMsg = 'None'
    } else if (daysOfWeek.length === 7) {
      // full week schedule
      timesOfDayMsg = 'All Hours'
      daysOfWeekMsg = 'Every Day'
    } else {
      // normal full day schedule
      timesOfDayMsg = 'All Hours'
      daysOfWeekMsg = humanizeArray(daysOfWeek)
    }
  } else {
    const schedule = parseSchedule(targeting)
    const timesOfDay = getTimesOfDay(schedule)
    if (timesOfDay === false) {
      // complicated schedule
      return (
        <div>
          Complicated schedule, please enter edit mode for more detail.
        </div>
      )
    }
    // same schedule every day
    timesOfDayMsg = humanizeArray(timesOfDay)
    daysOfWeekMsg = 'Every Day'
  }

  return (
    <Grid>
      <Grid.Row>
        <Grid.Column>
          <DisplayField header='Times of Day' content={timesOfDayMsg} />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <DisplayField header='Days of Week' content={daysOfWeekMsg} />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

ScheduleDisplay.propTypes = propTypes

export default ScheduleDisplay
