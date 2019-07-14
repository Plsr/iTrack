import React, { useState } from 'react'
import styles from './Home.css'

function Login({ onSubmit }) {
  const [token, setToken] = useState('')

  function handleInputChange(e) {
    setToken(e.target.value)
  }

  function handleSubmit() {
    onSubmit(token)
  }

  return (
    <div className={styles.container} data-tid="container">
      <h2>Login</h2>
      <p>Please enter your Personal Access Token</p>
      <input type="text" value={token} onChange={handleInputChange} />
      <button type="submit" onClick={handleSubmit}>
        Save
      </button>
    </div>
  )
}

export default Login
