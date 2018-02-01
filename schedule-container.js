import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { toast } from 'react-toastify'
import { pick } from 'lodash'

import ManagePanel from '../../manage-panel'
import ScheduleDisplay from './schedule-display'
import ScheduleEdit from './schedule-edit'
import { DAYS, parseSchedule, assembleSchedule } from '../../../../utils/schedule'


const propTypes = {
  campaignData: PropTypes.object.isRequired,
  isLoading: PropTypes.bool.isRequired,
  updateCampaign: PropTypes.func.isRequired,
  fetchCampaign: PropTypes.func.isRequired,
}

const pickEditValues = campaignData => (
  { targeting: pick(campaignData.targeting, DAYS.map(day => `DayPart${day}`)) }
)

class ScheduleContainer extends Component {
  constructor(props) {
    super(props)

    const editedData = pickEditValues(props.campaignData)
    this.state = {
      editedData,
      schedule: parseSchedule(editedData.targeting),
    }
  }

  componentWillReceiveProps(nextProps) {
    const editedData = pickEditValues(nextProps.campaignData)
    this.setState({ editedData })
  }

  updateCampaignWrapper = () => {
    const { updateCampaign, fetchCampaign, campaignData } = this.props
    const { schedule } = this.state

    const updateData = { targeting: assembleSchedule(schedule) }

    return updateCampaign(updateData, campaignData.metadata.CampCode).then(() => {
      toast.success('Successfully Updated Campaign')
      fetchCampaign(campaignData.metadata.CampCode)
      return true
    }).catch(() => {
      toast.error('Unable to update Campaign')
      return false
    })
  }

  updateSchedule = (schedule) => {
    this.setState({ schedule: [...schedule] })
  }

  resetEditedData = () => {
    this.setState({ schedule: parseSchedule(pickEditValues(this.props.campaignData).targeting) })
  }

  render() {
    const { isLoading } = this.props
    const { editedData, schedule } = this.state

    return (
      <ManagePanel
        header='Schedule'
        displayView={<ScheduleDisplay data={editedData} />}
        editView={
          <ScheduleEdit
            schedule={schedule}
            updateSchedule={this.updateSchedule}
          />
        }
        isLoading={isLoading}
        saveHandler={this.updateCampaignWrapper}
        resetEditedData={this.resetEditedData}
      />
    )
  }
}

ScheduleContainer.propTypes = propTypes

export default ScheduleContainer
