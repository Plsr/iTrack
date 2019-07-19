import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styles from './Home.css'
import ArrivalTimeInput from './ArrivalTimeInput'
import LeaveTimeInput from './LeaveTimeInput'
import LunchBreakInput from './LunchBreakInput'

function WorkTimeCalculator({ onFinished }) {
  const [arrivalTime, setArrivalTime] = useState(0)
  const [leaveTime, setLeaveTime] = useState(0)
  const [lunchBreakTime, setLunchBreakTime] = useState(0) // eslint-disable-line
  const [currentStep, setCurrentStep] = useState(1)

  function handleArrivalTimeSubmit(time) {
    setArrivalTime(timeStringToFloat(time))
    increaseCurrentStep()
  }

  function handleLeaveTimeSubmit(time) {
    const leaveTimeFloat = timeStringToFloat(time)

    setLeaveTime(leaveTimeFloat)
    increaseCurrentStep()
  }

  function handleLunchBreakTimeSubmit(time) {
    const lunchTimeFloat = timeStringToFloat(time)
    onFinished(timeFloatToString(leaveTime - arrivalTime - lunchTimeFloat))
  }

  function increaseCurrentStep() {
    setCurrentStep(oldCurrentStep => oldCurrentStep + 1)
  }

  function timeStringToFloat(timeString) {
    const splitAtColon = timeString.toString().split(':')
    const hours = +splitAtColon[0]
    const minutes = +splitAtColon[1]
    const minutesPercentage = (minutes / 60).toFixed(2)
    return hours + Number(minutesPercentage)
  }

  function timeFloatToString(timeFloat) {
    const hours = timeFloat.toFixed()
    const minutesPercentage = timeFloat - Math.floor(timeFloat)
    const minutes = 60 * minutesPercentage
    return `${hours}:${minutes.toFixed()}`
  }

  function getTotalWorkTime() {
    if (!leaveTime) return null

    return timeFloatToString(leaveTime - arrivalTime - lunchBreakTime)
  }

  // CLEANUP: Move to ReactRouter
  // CLEANUP: Components can be reused here, no need for having to components
  // that are so similar to each other
  // TODO: Render component that asks for the main project
  function renderStep() {
    switch (currentStep) {
      case 1:
        return <ArrivalTimeInput onSubmit={handleArrivalTimeSubmit} />
      case 2:
        return <LeaveTimeInput onSubmit={handleLeaveTimeSubmit} />
      case 3:
        return (
          <LunchBreakInput
            totalOfficeTime={getTotalWorkTime()}
            onSubmit={handleLunchBreakTimeSubmit}
          />
        )
      default:
        return null
    }
  }

  return <div className={styles.container}>{renderStep()}</div>
}

WorkTimeCalculator.propTypes = {
  onFinished: PropTypes.func.isRequired
}

export default WorkTimeCalculator
