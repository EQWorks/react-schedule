import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Button } from 'semantic-ui-react'

import styles from './schedule-edit.css'

// const TIMES = [...Array(24).keys()]
export const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']


class ScheduleEdit extends Component {
  state = {
    displaySchedule: this.props.schedule,
    startingDay: null,
    startingHour: null,
    startingState: null,
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ displaySchedule: nextProps.schedule })
  }

  onHourCellClick = (_, data) => {
    const { day, hour } = data.data
    const newSchedule = this.props.schedule
    newSchedule[day][hour] = !newSchedule[day][hour]
    this.props.update(newSchedule)
  }

  onDayCellClick = (_, data) => {
    const { day } = data.data
    const newSchedule = this.props.schedule
    if (newSchedule[day].filter(hour => hour).length < 24) {
      // turn full day schedule if not full day schedule
      newSchedule[day] = Array(24).fill(true)
    } else {
      newSchedule[day] = Array(24).fill(false)
    }
    this.props.update(newSchedule)
  }

  onHourCellMouseDown = (day, hour) => (() => {
    this.setState({
      startingDay: day,
      startingHour: hour,
      startingState: this.props.schedule[day][hour],
    })
  })

  updateDisplaySchedule = (day, hour, startingDay, startingHour, startingState) => {
    const newSchedule = []
    this.props.schedule.forEach((day) => {
      newSchedule.push(day.slice())
    })

    const minDay = Math.min(startingDay, day)
    const maxDay = Math.max(startingDay, day)
    const minHour = Math.min(startingHour, hour)
    const maxHour = Math.max(startingHour, hour)

    for (let i = minDay; i <= maxDay; i++) {
      for (let j = minHour; j <= maxHour; j++) {
        newSchedule[i][j] = !startingState
      }
    }

    this.setState({ displaySchedule: newSchedule })
  }

  onHourCellMouseOver = (day, hour) => (() => {
    const { startingDay, startingHour, startingState } = this.state
    if (startingDay !== null && startingHour !== null) {
      this.updateDisplaySchedule(day, hour, startingDay, startingHour, startingState)
    }
  })

  onHourCellMouseUp = () => (() => {
    const { startingDay, startingHour, displaySchedule } = this.state
    if (startingDay !== null && startingHour !== null) {
      this.setState({
        startingDay: null,
        startingHour: null,
        startingState: null,
      })
      this.props.update(displaySchedule)
    }
  })

  render() {
    const { displaySchedule } = this.state

    /* eslint-disable react/no-array-index-key */
    return (
      <div className={styles.scheduleGrid}>
        {DAYS.map((day, i) => (
          <div className={styles.dayRow} key={day}>
            <Button
              className={styles.dayButton}
              size='mini'
              basic
              toggle
              active={false}
              content={day}
              data={{ day: i }}
              onClick={this.onDayCellClick}
            />
            {displaySchedule[i].map((hour, j) => (
              <span style={{ display: 'inline-block' }} key={j}>
                {/* {TIMES.map(t => (
                  <Button
                    key={t}
                    content={t}
                    disabled
                  />
                ))} */}
                <Button
                  onClick={this.onHourCellClick}
                  onMouseOver={this.onHourCellMouseOver(i, j)}
                  onMouseDown={this.onHourCellMouseDown(i, j)}
                  onMouseUp={this.onHourCellMouseUp(i, j)}
                  data={{ day: i, hour: j }}
                  className={styles.hourCell}
                  size='mini'
                  toggle
                  active={hour}
                />
              </span>
            ))}
          </div>
        ))}
      </div>
    )
    /* eslint-enable react/no-array-index-key */
  }
}
ScheduleEdit.propTypes = {
  schedule: PropTypes.array.isRequired,
  update: PropTypes.func.isRequired,
}

export default ScheduleEdit
