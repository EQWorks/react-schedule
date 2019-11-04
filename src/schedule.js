import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/styles'
import { Button } from 'semantic-ui-react'
import produce from 'immer'


const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const HOURS = [...Array(24).keys()]

const propTypes = {
  defaultSchedule: PropTypes.array,
  onChange: PropTypes.func.isRequired,
}

const defaultProps = {
  defaultSchedule: DAYS.map(() => Array(24).fill(false)),
}

const useStyles = makeStyles({
  row: {
    display: 'flex',
    marginBottom: '1px',
  },
  dayButton: {
    padding: '0.5rem !important',
    height: '3rem',
    width: '3rem',
    flex: '0 0 auto',
  },
  hourButton: {
    padding: '0.5rem !important',
    width: '3rem',
    marginRight: '1px !important',
    borderRadius: 'initial !important',
  }
})

const Schedule = ({ defaultSchedule, onChange }) => {
  const [schedule, setSchedule] = useState(defaultSchedule)
  const [dragStart, setDragStart] = useState() // { day, hour }
  const [hover, setHover] = useState() // { day, hour }

  useEffect(() => {
    onChange(schedule)
  }, [schedule])

  let dragstartState
  if (dragStart) {
    dragstartState = schedule[dragStart.day][dragStart.hour]
  }

  const onDayClick = (_, { data }) => {
    const { day } = data
    setSchedule(produce(draftSchedule => {
      draftSchedule[day] = Array(24).fill(
        draftSchedule[day].filter(hour => hour).length < 24
      )
    }))
  }

  const onHourClick = (_, { data }) => {
    const { hour } = data
    setSchedule(produce(draftSchedule => {
      const toggle = draftSchedule.every(day => day[hour])
      draftSchedule.forEach(day => {
        day[hour] = !toggle
      })
    }))
  }

  const onHourMouseDown = (day, hour) => () => {
    // handle mouse lose focus and click again
    if (dragStart && hover) {
      return
    }
    setDragStart({ day, hour })
    setHover({ day, hour })
  }

  const onHourMouseOver = (day, hour) => () => {
    if (dragStart && (day !== hover.day || hour !== hover.hour)) {
      setHover({ day, hour })
    }
  }

  const onHourMouseUp = (endDay, endHour) => () => {
    if (!dragStart || !hover) {
      return
    }
    // final drag range
    const minDay = Math.min(dragStart.day, endDay)
    const maxDay = Math.max(dragStart.day, endDay)
    const minHour = Math.min(dragStart.hour, endHour)
    const maxHour = Math.max(dragStart.hour, endHour)

    setSchedule(produce(draftSchedule => {
      for (let i = minDay; i <= maxDay; i++) {
        for (let j = minHour; j <= maxHour; j++) {
          draftSchedule[i][j] = !dragstartState
        }
      }
    }))
    setDragStart()
    setHover()
  }

  const shouldHighlight = (originState, day, hour) => {
    if (!dragStart || !hover) {
      return originState
    }
    // current drag range
    const minDay = Math.min(dragStart.day, hover.day)
    const maxDay = Math.max(dragStart.day, hover.day)
    const minHour = Math.min(dragStart.hour, hover.hour)
    const maxHour = Math.max(dragStart.hour, hover.hour)

    if (day >= minDay && day <= maxDay && hour >= minHour && hour <= maxHour) {
      return !dragstartState
    } else {
      return originState
    }
  }

  const classes = useStyles()

  return (
    <div>
      <div className={classes.row}>
        <Button className={classes.dayButton} size='mini' basic disabled />
        {HOURS.map(hour => (
          <Button
            key={hour}
            className={classes.hourButton}
            size='mini'
            basic
            toggle
            active={false}
            content={String(hour).padStart(2, '0')}
            data={{ hour }}
            onClick={onHourClick}
          />
        ))}
      </div>
      {DAYS.map((day, i) => (
        <div key={day} className={classes.row}>
          <Button
            className={classes.dayButton}
            size='mini'
            basic
            toggle
            active={false}
            content={day}
            data={{ day: i }}
            onClick={onDayClick}
          />
          {schedule[i].map((hour, j) => (
            <Button
              key={j}
              onMouseOver={onHourMouseOver(i, j)}
              onMouseDown={onHourMouseDown(i, j)}
              onMouseUp={onHourMouseUp(i, j)}
              data={{ day: i, hour: j }}
              className={classes.hourButton}
              size='mini'
              toggle
              active={shouldHighlight(hour, i, j)}
            />
          ))}
        </div>
      ))}
    </div>
  )
}

Schedule.propTypes = propTypes
Schedule.defaultProps = defaultProps

export default Schedule
