import React, { useState } from 'react'
import WorkTimeCalculator from '../components/WorkTimeCalculator'

function MainView() {
  const [workTime, setWorkTime] = useState(null) // eslint-disable-line

  if (workTime) {
    // Render project chooose foo
  }

  return <WorkTimeCalculator />
}

export default MainView
