import React, { useEffect } from 'react'
import bird11 from '../../assets/images/bird1.png'
import bird21 from '../../assets/images/bird2.png'
import forest1 from '../../assets/images/forest.png'
import rocks1 from '../../assets/images/rocks.png'
import water from '../../assets/images/water.png'
import attractions from '../../assets/images/activities-attractions.jpg'
import see2 from '../../assets/images/see2.jpg'
import './See.css'
import Navbar from '../Navbar/Navbar'
import Footer from '../FooterComponent/Footer'
const See = () => {
  useEffect(() => {
    let text = document.getElementById('seetext')
    let bird1 = document.getElementById('bird-1')
    let bird2 = document.getElementById('bird-2')
    let rocks = document.getElementById('rocks')

    const handleScroll = () => {
      let value = window.scrollY
      if (text) {
        text.style.marginTop = value * 1.5 + 'px'
      }

      if (bird1) {
        bird1.style.top = value * -1.5 + 'px'
        bird1.style.left = value * 2 + 'px'
      }
      if (bird2) {
        bird2.style.top = value * -1.5 + 'px'
        bird2.style.left = value * -5 + 'px'
      }
      if (rocks) {
        rocks.style.top = value * -0.12 + 'px'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <div className="see">
      <section class="seecontainer">
        <img src={bird11} id="bird-1" alt="bird-1" />
        <img src={bird21} id="bird-2" alt="bird-2" />
        <img src={forest1} id="forest" alt="forest" />
        <h2 id="seetext">See & Do</h2>
        <img src={rocks1} id="rocks" alt="rocks" />
        <img src={water} id="water" alt="water" />
      </section>
      <section class="seecontainer-2">
        <div class="seecontent-1">
          <h2>What to do in India</h2>
          <div class="seemain-con">
            <div class="seemain-con1 seecon1">
              <div class="seecontent-1">
                <img src={attractions} class="seecon-img" />
              </div>
              <div class="seecontent-2">
                <h3>Activities & attractions</h3>
                <p>
                  For a breathtaking natural wonders, the Himalayas offers the
                  stunning landscapes and The backwaters of Kerala, with their
                  tranquil lagoons and coconut groves, are a paradise for nature
                  lovers.Indulge in the spicy and savory flavors of India's
                  world-renowned cuisine, from traditional street food to
                  gourmet dining.
                </p>
              </div>
            </div>
            <div class="seemain-con1">
              <div class="seecontent-1">
                <img src={see2} class="seecon-img" />
              </div>
              <div class="seecontent-2">
                <h3>Experiences & tours</h3>
                <p>
                  From exploring ancient forts and palaces to indulging in
                  delicious cuisine and shopping in bustling bazaars, there's
                  something for everyone in India.No matter what kind of
                  experience or tour you're looking for, India has something to
                  offer that will leave you with lasting memories and a deep
                  appreciation for its fascinating culture and history.Embark on
                  a cultural odyssey through India's ancient cities and
                  experience the country's rich history and traditions
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="seecontainer-3">
        <div class="seebox1">
          <div class="seetxtbox1">
            <div class="seeimg-1">
              <div class="seetext1">GET READY FOR THE BIG CHILL</div>
            </div>
          </div>
          <div class="seeimg-2">
            <div class="seetext1 seetext2">SLEEP UNDER THE STARS</div>
          </div>
        </div>
        <div class="seebox2">
          <div class="seeimg-3">
            <div class="seetext1 seetext2">
              START PLANNING YOUR NEXT ADVENTURE
            </div>
            <div class="seelast-btn" style={{ paddingLeft: '65px' }}></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default See
