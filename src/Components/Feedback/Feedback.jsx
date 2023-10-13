import React, { useRef, useEffect } from 'react'
import emailjs from '@emailjs/browser'
import star from '../../assets/images/stars.png'
import moons from '../../assets/images/moon.png'
import mountFront from '../../assets/images/mountains_front.png'
import mountBehind from '../../assets/images/mountains_behind.png'
import { TextField, TextareaAutosize, Button } from '@mui/material'
import './Feedback.css'
const Feedback = () => {
  useEffect(() => {
    let text = document.getElementById('feedtext')
    let stars = document.getElementById('stars')
    let moon = document.getElementById('moon')
    let mount_behind = document.getElementById('mount_behind')
    let mount_front = document.getElementById('mount_front')

    const handleScroll = () => {
      let value = window.scrollY
      if (text) {
        text.style.marginRight = value * 2 + 'px'
        text.style.marginTop = value * 0.5 + 'px'
      }

      if (stars) {
        stars.style.left = value * 0.002 + 'px'
      }
      if (moon) {
        moon.style.top = value * 0.8 + 'px'
      }
      if (mount_behind) {
        mount_behind.style.top = value * 0 + 'px'
      }

      if (mount_front) {
        mount_front.style.top = value * 0 + 'px'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  const form = useRef()

  const sendEmail = (e) => {
    e.preventDefault()

    emailjs
      .sendForm(
        'service_27bm1fn',
        'template_pifzehh',
        form.current,
        'UOBhHfN400V1Y0-DT'
      )
      .then(
        (result) => {
          console.log(result.text)
          alert('message sent')
          form.current.reset()
        },
        (error) => {
          console.log(error.text)
        }
      )
  }

  return (
    <div className="feedback">
      <section class="feedcontainer">
        <img src={star} id="stars" alt="stars" />
        <img src={moons} id="moon" alt="moon" />
        <img src={mountBehind} id="mount_behind" alt="mount_behind" />
        <h2 id="feedtext">Contact Us</h2>
        <img src={mountFront} id="mount_front" alt="mount_front" />
      </section>
      <section className="feedbackform">
        <div className="Feedback_Form">
          <h1>Give Your Valuable Feedback :</h1>
          <br></br>
          <br></br>
          <form ref={form} onSubmit={sendEmail}>
            <TextField
              label="Name"
              name="user_name"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextField
              label="Email"
              name="user_email"
              type="email"
              variant="outlined"
              fullWidth
              margin="normal"
              required
            />
            <TextareaAutosize
              label="Message"
              name="message"
              className="messagebox"
              rowsMin={3}
              placeholder="Enter your message"
              style={{ width: '100%', marginBottom: 16, height: '100px' }}
            />
            <div className="feedbtn">
              <Button type="submit" variant="contained" color="secondary">
                Send
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Feedback
