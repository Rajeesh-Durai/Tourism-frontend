import React, { useState } from 'react'
import myimg from '../../assets/images/login.jpg'
import myAvatar from '../../assets/images/signup-avatar.png'
import axios from 'axios'
import './AgentSignUp.css'

const AgentSignUp = () => {
  const [AgentformData, setAgentformData] = useState({
    username: '',
    agencyName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  })

  const [AgentFormErrors, setAgentFormErrors] = useState({})
  const [isVerified, setIsVerified] = useState(false)

  const handleAgentChange = (e) => {
    const { name, value } = e.target
    setAgentformData((prevAgentformData) => ({
      ...prevAgentformData,
      [name]: value,
    }))

    // Validate input
    let AgentErrorMessage = ''
    switch (name) {
      case 'username':
        AgentErrorMessage = /^[a-zA-Z]+$/.test(value)
          ? ''
          : 'Username should contain only alphabets'
        break
      case 'agencyName':
        AgentErrorMessage = /^[a-zA-Z\s]+$/.test(value)
          ? ''
          : 'Agency Name should contain only alphabets and spaces'
        break
      case 'email':
        AgentErrorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Invalid Email address'
        break
      case 'phone':
        AgentErrorMessage = /^\d{10}$/.test(value)
          ? ''
          : 'Phone number must be 10 digits'
        break
      case 'password':
        AgentErrorMessage =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/.test(
            value
          )
            ? ''
            : 'Password must contain one uppercase letter, one lowercase letter, one number, and one special character'
        break
      case 'confirmPassword':
        AgentErrorMessage =
          value === AgentformData.password ? '' : 'Passwords do not match'
        break
      default:
        break
    }

    setAgentFormErrors((prevAgentFormErrors) => ({
      ...prevAgentFormErrors,
      [name]: AgentErrorMessage,
    }))
  }

  const handleAgentSubmit = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (AgentformData.password !== AgentformData.confirmPassword) {
      setAgentFormErrors((prevAgentFormErrors) => ({
        ...prevAgentFormErrors,
        confirmPassword: 'Passwords do not match',
      }))
      return // Return early if passwords don't match
    }

    // Clear the error if passwords match
    setAgentFormErrors((prevAgentFormErrors) => ({
      ...prevAgentFormErrors,
      confirmPassword: '',
    }))

    const AgentDataToSend = {
      username: AgentformData.username,
      userPassword: AgentformData.confirmPassword,
      phoneNumber: AgentformData.phone,
      agencyName: AgentformData.agencyName,
      email: AgentformData.email,
      IsActive: false,
      role: 'Agent',
    }
    console.log(AgentDataToSend)
    axios
      .post('https://localhost:7190/api/UserInfo/Register', AgentDataToSend)
      .then((response) => {
        setIsVerified(true)
        alert('success')
      })
      .catch((error) => {
        alert('failed')
      })
  }

  return (
    <div className="signupbody">
      <div class="signupcontainer">
        <div class="img">
          <img src={myimg} alt="" />
        </div>
        <div className="login-container">
          <form onSubmit={handleAgentSubmit}>
            <div className="img-avatar">
              <img src={myAvatar} alt="" />
            </div>
            <h2>Sign Up</h2>
            <div className="input-div focus one">
              <div className="i">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div className="input-container">
                <input
                  className="AgentSignupInput"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={AgentformData.username}
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="msg error">{AgentFormErrors.username}</div>
            <div className="input-div focus one">
              <div className="i">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div className="input-container">
                <input
                  className="AgentSignupInput"
                  type="text"
                  name="agencyName"
                  placeholder="Agency Name"
                  value={AgentformData.agencyName}
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="msg error">{AgentFormErrors.agencyName}</div>
            <div className="input-div focus one">
              <div className="i">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div className="input-container">
                <input
                  className="AgentSignupInput"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={AgentformData.email}
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="msg error">{AgentFormErrors.email}</div>
            <div className="input-div focus one">
              <div className="i">
                <i className="fa fa-user" aria-hidden="true"></i>
              </div>
              <div className="input-container">
                <input
                  className="AgentSignupInput"
                  type="number"
                  name="phone"
                  placeholder="Phone number"
                  value={AgentformData.phone}
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="msg error">{AgentFormErrors.phone}</div>

            <div className="input-div focus two">
              <div className="i">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </div>
              <div className="input-container">
                <input
                  className="AgentSignupInput"
                  type="password"
                  name="password"
                  placeholder="Password (Format: Abc@1r)"
                  value={AgentformData.password}
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="msg error">{AgentFormErrors.password}</div>
            <div className="input-div focus two">
              <div className="i">
                <i className="fa fa-lock" aria-hidden="true"></i>
              </div>
              <div className="input-container">
                <input
                  className="AgentSignupInput"
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={AgentformData.confirmPassword}
                  onChange={handleAgentChange}
                />
              </div>
            </div>
            <div className="msg error">{AgentFormErrors.confirmPassword}</div>

            <button type="submit" className="Loginbtn" id="btnSubmit">
              Signup
            </button>
            {isVerified && <p>Admin needs to verify</p>}
          </form>
        </div>
      </div>
    </div>
  )
}
export default AgentSignUp
