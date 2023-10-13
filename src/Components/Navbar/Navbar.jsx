import React, { useState, useEffect } from 'react'
import projLogo from '../../assets/images/make-your-trip-logo.png'
import { Link } from 'react-router-dom'
import './Navbar.css'

const Navbar = () => {
  const [selectedOption, setSelectedOption] = useState('user') // Default value is 'user'
  const [role, setRole] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [userIn, setUser] = useState(false)
  const [agent, setAgent] = useState(false)
  const [nouser, setNoUser] = useState(false)
  useEffect(() => {
    // Retrieve the 'role' from sessionStorage
    const storedRole = sessionStorage.getItem('role')
    setRole(storedRole)
    if (storedRole === null) {
      setNoUser(true)
    } else if (storedRole === 'Admin') {
      setAdmin(true)
    } else if (storedRole === 'Agent') {
      setAgent(true)
    } else if (storedRole === 'User') {
      setUser(true)
    }
  }, [])
  const logoutFn = () => {
    // Remove all the stored data from sessionStorage
    sessionStorage.removeItem('token')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('name')
    sessionStorage.removeItem('email')
    sessionStorage.removeItem('role')

    // Navigate to the home page ("/")
    window.location.href = '/'
  }

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    // Handle form submission based on selectedOption value
    if (selectedOption === 'user') {
      // User signup logic
      console.log('User Signup')
    } else if (selectedOption === 'agent') {
      // Agent signup logic
      console.log('Agent Signup')
    }
  }

  return (
    <header>
      <div className="sticky">
        <div className="navProgImg">
          <Link to="/">
            <img src={projLogo} alt="logo" />
          </Link>
        </div>
        <input type="checkbox" id="nav-check" hidden />
        <nav>
          <ul>
            {(userIn || nouser) && (
              <li>
                <Link to="/plan">
                  <p>Plan your trip</p>
                </Link>
              </li>
            )}
            {(userIn || nouser) && (
              <li>
                <Link to="/see">
                  <p>See & Do</p>
                </Link>
              </li>
            )}
            {(userIn || nouser) && (
              <li>
                <Link to="/feedback">
                  <p>Contact Us</p>
                </Link>
              </li>
            )}
            {agent && (
              <li>
                <Link to="/agent">
                  <p>Agent</p>
                </Link>
              </li>
            )}
            {admin && (
              <li>
                <Link to="/admin">
                  <p>Admin</p>
                </Link>
              </li>
            )}
            {nouser && (
              <li>
                <Link to="/login">
                  <p>Login</p>
                </Link>
              </li>
            )}

            {(agent || admin || userIn) && (
              <li>
                <p style={{ cursor: 'pointer' }} onClick={logoutFn}>
                  Logout
                </p>
              </li>
            )}
          </ul>
        </nav>
        <label htmlFor="nav-check" className="toggle">
          <div></div>
          <div></div>
          <div></div>
        </label>
      </div>
    </header>
  )
}

export default Navbar
