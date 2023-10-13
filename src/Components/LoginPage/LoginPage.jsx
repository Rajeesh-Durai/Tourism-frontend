import React, { useState } from 'react'
import axios from 'axios'
import loginImage from '../../assets/images/login.png'
import myavatar from '../../assets/images/Login-logo.png'
import { Link } from 'react-router-dom'
import './LoginPage.css'
const LoginPage = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [usernameError, setUsernameError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    setUsernameError('')
    setPasswordError('')

    // Validate the username and password before submitting
    const isUsernameValid = /^[A-Za-z]+$/.test(username)
    const isPasswordValid =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        password
      )

    if (!isUsernameValid) {
      setUsernameError('Username must contain only alphabets.')
      return
    }

    if (!isPasswordValid) {
      setPasswordError(
        'Password must contain 1 uppercase, 1 special character, 1 number, and be at least 8 characters long.'
      )
      return
    }
    const data = {
      username: username,
      password: password,
    }

    axios
      .post('https://localhost:7190/api/UserInfo/LogIN', data)
      .then((response) => {
        // Extract data from the response
        const { email, id, username, role, token } = response.data

        // Store the extracted data in the sessionStorage
        sessionStorage.setItem('email', email)
        sessionStorage.setItem('id', id)
        sessionStorage.setItem('name', username)
        sessionStorage.setItem('role', role)
        sessionStorage.setItem('token', token)
        // Check if 'role' is available in sessionStorage
        if (role) {
          window.location.href = '/'
        } else {
          console.log('else')
          // Handle the case when 'role' is not available in sessionStorage
          // Redirect the user to some other page or display an error message
          alert('Either Username or Password is invalid')
        }
      })
      .catch((error) => {
        // Handle error, if needed
        alert('Failed')
      })
  }
  return (
    <div className="loginbody">
      <div class="logincontainer">
        <div class="img">
          <img src={loginImage} alt="" />
        </div>
        <div class="login-container">
          <form onSubmit={handleSubmit}>
            <div class="img-avatar">
              <img src={myavatar} alt="" />
            </div>
            <h2>log in</h2>
            <div class="input-div one focus">
              <div class="i">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="input"
                  placeholder="Username"
                  pattern="^[A-Za-z]+$"
                  required
                />
              </div>
            </div>
            {usernameError && <div className="msg error">{usernameError}</div>}
            <div class="input-div focus two">
              <div class="i">
                <i class="fa fa-lock" aria-hidden="true"></i>
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input"
                  placeholder="Password"
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$"
                  required
                />
              </div>
            </div>
            &nbsp;
            {passwordError && <div className="msg error">{passwordError}</div>}
            <div>
              <input
                type="submit"
                className="loginbtn"
                value="Login"
                id="btnSubmit"
              />
            </div>
            <div class="msg light">{/* {{ statusmessage }} */}</div>
            <div class="signup">
              <h4>Don't have an account?&nbsp;&nbsp;</h4>
              <Link to="/usersignup">Sign Up for User</Link>
              <Link to="/agentsignup">Sign Up for Agent</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
