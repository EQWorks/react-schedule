import React, { useState } from 'react'

import ScheduleEdit, { DAYS } from '../src/schedule-edit'


const Schedule = () => {
  const [schedule, update] = useState(DAYS.map(() => Array(24).fill(false)))

  return (
    <ScheduleEdit schedule={schedule} update={update} />
  )
}

export default Schedule
