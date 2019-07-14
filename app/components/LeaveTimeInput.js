import React, { useState } from 'react'
import PropTypes from 'prop-types'

function LeaveTimeInput({ onSubmit }) {
  const today = new Date()
  const hours =
    today.getHours() < 10 ? `0${today.getHours()}` : today.getHours()
  const minutes =
    today.getMinutes() < 10 ? `0${today.getMinutes()}` : today.getMinutes()
  const now = `${hours}:${minutes}`
  const [leaveTime, setLeaveTime] = useState(now)

  function handleLeaveTimeChange(e) {
    setLeaveTime(e.target.value)
  }

  function handleSubmit() {
    onSubmit(leaveTime)
  }

  return (
    <div>
      <h2>When did you leave?</h2>
      <input type="time" value={leaveTime} onChange={handleLeaveTimeChange} />
      <button type="submit" disabled={!leaveTime} onClick={handleSubmit}>
        next
      </button>
    </div>
  )
}

LeaveTimeInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
export default LeaveTimeInput
