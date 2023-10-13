import React from 'react'
import './Footer.css'
const Footer = () => {
  return (
    <div>
      <footer class="footer">
        <div class="footer-container">
          <div class="row">
            <div class="footer-col">
              <h4>company</h4>
              <ul>
                <li>About us</li>
                <li>Our Services</li>
                <li>Privacy policy</li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Get help</h4>
              <ul>
                <li>FAQ</li>
                <li>Booking status</li>
                <li>Payment Options</li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Follow us</h4>
              <div class="social-links">
                <a href="https://www.facebook.com/profile.php?id=100034832349920&mibextid=ZbWKwL">
                  <i class="fa-brands fa-facebook-f"></i>
                </a>
                <a href="https://twitter.com/rajarajeesh11?t=n2R00XEa00LJeeZ-V7bqUA&s=09">
                  <i class="fa-brands fa-twitter"></i>
                </a>
                <a href="https://instagram.com/__twinbros__?igshid=MzNlNGNkZWQ4Mg==">
                  <i class="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Footer
