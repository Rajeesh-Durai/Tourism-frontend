import React, { useState } from 'react'
import myimg from '../../assets/images/login.jpg'
import myAvatar from '../../assets/images/signup-avatar.png'
import tick from '../../assets/images/tick.png'
import './SignUpPage.css'
import axios from 'axios'

const SignUpPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    username: '',
    userPassword: '',
  })
  const [formErrors, setFormErrors] = useState({})
  const [showDialog, setShowDialog] = useState(false)
  const [apiResponse, setApiResponse] = useState('')

  // Step 3: Handle form submission
  const handleSubmit1 = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (formData.userPassword !== formData.confirmPassword) {
      setFormErrors((prevFormErrors) => ({
        ...prevFormErrors,
        confirmPassword: 'Passwords do not match',
      }))
      return
    }
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      phoneNumber: formData.phone,
      username: formData.username,
      role: 'User',
      userPassword: formData.userPassword,
    }
    // Make API call using Axios
    console.log(userData)
    axios
      .post('https://localhost:7190/api/UserInfo/Register', userData)
      .then((response) => {
        setShowDialog(true)
        alert('Success')
        setApiResponse(response.data.message)
      })
      .catch((error) => {
        alert('Error')
        setShowDialog(false)
        setApiResponse('An error occurred while signing up.')
      })
  }

  const handleChange1 = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))

    // Validate input
    let errorMessage = ''
    switch (name) {
      case 'firstName':
        errorMessage = value.trim() ? '' : 'First Name is required'
        break
      case 'lastName':
        errorMessage = value.trim() ? '' : 'Last Name is required'
        break
      case 'email':
        errorMessage = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? ''
          : 'Invalid Email address'
        break
      case 'phone':
        errorMessage = /^\d{10}$/.test(value)
          ? ''
          : 'Phone number must be 10 digits'
        break
      case 'username':
        errorMessage = value.trim() ? '' : 'Username is required'
        break
      case 'userPassword':
        errorMessage =
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
            value
          )
            ? ''
            : 'Password must contain at least 8 characters, one uppercase letter, one lowercase letter, one number, and one special character'
        break
      case 'confirmPassword':
        errorMessage =
          value === formData.userPassword ? '' : 'Passwords do not match'
        break
      default:
        break
    }

    setFormErrors((prevFormErrors) => ({
      ...prevFormErrors,
      [name]: errorMessage,
    }))
  }

  return (
    <div className="signupbody">
      <div class="signupcontainer">
        <div class="img">
          <img src={myimg} alt="" />
        </div>
        <div class="login-container">
          <form onSubmit={handleSubmit1}>
            <div class="img-avatar">
              <img src={myAvatar} alt="" />
            </div>
            <h2>Sign Up</h2>
            <div class="input-div focus one">
              <div class="i">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="text"
                  name="firstName"
                  class="input"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.firstName}</div>

            <div class="input-div focus one">
              <div class="i">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="text"
                  name="lastName"
                  class="input"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.lastName}</div>

            <div class="input-div focus one">
              <div class="i">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="email"
                  name="email"
                  class="input"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.email}</div>

            <div class="input-div focus one">
              <div class="i">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="number"
                  name="phone"
                  class="input"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.phone}</div>

            <div class="input-div focus one">
              <div class="i">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="text"
                  name="username"
                  class="input"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.username}</div>

            <div class="input-div focus two">
              <div class="i">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="password"
                  name="userPassword"
                  class="input"
                  placeholder="Password (Format: Abc@1r)"
                  value={formData.userPassword}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.userPassword}</div>

            {/* Confirm Password */}
            <div class="input-div focus two">
              <div class="i">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
              <div class="input-container">
                <input
                  className="SignUpeffect"
                  type="password"
                  name="confirmPassword"
                  class="input"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange1}
                />
              </div>
            </div>
            <div class="msg error">{formErrors.confirmPassword}</div>

            <button type="submit" className="signUpBtnUser" id="btnSubmit">
              Signup
            </button>

            {showDialog && (
              <div className="dialog-box" id="popup">
                <img src={tick} alt="" />
                <i className="fa-solid fa-xmark fa-lg"></i>
                <h2>{apiResponse}</h2>
                <button type="button" onClick={() => setShowDialog(false)}>
                  Close
                </button>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage
