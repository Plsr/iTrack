import React, { useState, useContext } from 'react'
import WorkTimeCalculator from '../components/WorkTimeCalculator'
import CredentialsContext from '../utils/CredentialsContext'
import api from '../utils/api'

function MainView() {
  const [workTime, setWorkTime] = useState(null) // eslint-disable-line
  const authToken = useContext(CredentialsContext)

  function handleWorkTimeCalculated(calculatedTime) {
    setWorkTime(calculatedTime)
  }

  if (workTime) {
    const projects = api.projects.all(authToken).then(data => console.log(data)) //eslint-disable-line
    // Render project chooose foo
    return <div>I haz worktime: {workTime}</div>
  }

  return <WorkTimeCalculator onFinished={handleWorkTimeCalculated} />
}

export default MainView
