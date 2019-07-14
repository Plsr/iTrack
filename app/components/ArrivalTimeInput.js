import React, { useState } from 'react'
import PropTypes from 'prop-types'

function ArrivalTimeInput({ onSubmit }) {
  const [arrivalTime, setArrivalTime] = useState('09:00')

  function handleArrivalTimeChange(e) {
    setArrivalTime(e.target.value)
  }

  function handleSubmit() {
    onSubmit(arrivalTime)
  }

  return (
    <div>
      <h2>When did you arrive at work today?</h2>
      <input
        type="time"
        value={arrivalTime}
        onChange={handleArrivalTimeChange}
      />
      <button type="submit" disabled={!arrivalTime} onClick={handleSubmit}>
        next
      </button>
    </div>
  )
}

ArrivalTimeInput.propTypes = {
  onSubmit: PropTypes.func.isRequired
}
export default ArrivalTimeInput
