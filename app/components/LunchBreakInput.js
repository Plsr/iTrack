import React, { useState } from 'react'
import PropTypes from 'prop-types'

function LunchBreakInput({ totalOfficeTime, onSubmit }) {
  const [lunchBreakTime, setLunchBreakTime] = useState('01:00')

  function handleLunchBreakTimeChange(e) {
    setLunchBreakTime(e.target.value)
  }

  function handleSubmitClick() {
    onSubmit(lunchBreakTime)
  }

  return (
    <div>
      <h2>Nice, {totalOfficeTime} hours at work!</h2>
      <p>Remember how long your lunch break might have been?</p>
      <input
        type="time"
        value={lunchBreakTime}
        onChange={handleLunchBreakTimeChange}
      />
      <button
        type="submit"
        disabled={!setLunchBreakTime}
        onClick={handleSubmitClick}
      >
        next
      </button>
    </div>
  )
}

LunchBreakInput.propTypes = {
  totalOfficeTime: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired
}
export default LunchBreakInput
