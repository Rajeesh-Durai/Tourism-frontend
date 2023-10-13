import React, { useEffect } from 'react'
import mount1 from '../../assets/images/mountain_01.png'
import mount2 from '../../assets/images/mountain_02.png'
import tree1 from '../../assets/images/trees_01.png'
import tree2 from '../../assets/images/trees_02.png'
import man from '../../assets/images/man.png'
import plants from '../../assets/images/plants.png'
import itinery from '../../assets/images/itinery.jpg'
import transport from '../../assets/images/transport.jpg'
import trip from '../../assets/images/road trip.jpg'
import Footer from '../FooterComponent/Footer'
import './Plan.css'
const Plan = () => {
  useEffect(() => {
    let text = document.getElementById('plantext')

    const handleScroll = () => {
      let value = window.scrollY
      if (text) {
        text.style.right = value * 1.5 + 'px'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
  return (
    <div className="plan">
      <section class="plancontainer">
        <h2 id="plantext">Plan Your Trip</h2>

        <img src={mount1} id="mount-1" alt="mount-1" />
        <img src={tree2} id="tree-2" alt="tree-2" />
        <img src={mount2} id="mount-2" alt="mount-2" />
        <img src={tree1} id="tree-1" alt="tree-1" />
        <img src={man} id="man" alt="man" />
        <img src={plants} id="plants" alt="plants" />
      </section>
      <section class="plancontainer-2">
        <div class="planbox-1">
          <div class="plancontent">
            <h2 class="planhead">Discover Our Trip Planner</h2>
            <br />
            <div class="plancontent-1">
              <div class="plantext-1">
                <h2>Create Your Own Itinerary</h2>
                <p>
                  Create a fully customized day-by-day itinerary and discover
                  the hidden gems of India.
                </p>
              </div>
              <div class="planimg-1">
                <img src={itinery} />
              </div>
            </div>
            <br />
            <br />
            <h2 class="planhead">Useful Informations</h2>
            <br />
            <div class="plancontent-2">
              <div class="planimg-2">
                <img src={transport} />
              </div>
              <div class="plantext-2">
                <h2>Transportation</h2>
                <p>
                  With 34 international airports, served by a wealth of global
                  carriers, getting to and around the Kingdom couldn't be
                  easier. A first-rate transportation system connects India's
                  provinces and cities, serving millions of people each day.
                </p>
              </div>
            </div>
            <br />
            <br />
            <div class="plancontent-3">
              <div class="plantext-3">
                <h2>Road Trip Guide</h2>
                <p>
                  Spend your days soaking up scenery, history and vibrant
                  cosmopolitanism, as you weave in and out of cities, explore
                  ancient villages or embark on outdoor adventures. Stop to bask
                  on sandy beaches, or feast your way through delicious local
                  dishes as you set your own pace.
                </p>
              </div>
              <div class="planimg-3">
                <img src={trip} />
              </div>
            </div>
            <br />
            <br />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Plan
