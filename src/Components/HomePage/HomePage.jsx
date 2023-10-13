import React, { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Map from '../MapComponent/Map'
import Footer from '../FooterComponent/Footer'
import ChatBot from '../ChatBot/ChatBot'
import Slider from 'react-slick'
import { Skeleton } from '@mui/material'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import axios from 'axios'
import hill1 from '../../assets/images/hill1.png'
import hill2 from '../../assets/images/hill2.png'
import hill3 from '../../assets/images/hill3.png'
import hill4 from '../../assets/images/hill4.png'
import hill5 from '../../assets/images/hill5.png'
import leaf from '../../assets/images/leaf.png'
import tree from '../../assets/images/tree.png'
import plant from '../../assets/images/plant.png'
import chatbot from '../../assets/images/chatbot.jpg'
import './HomePage.css'
import Navbar from '../Navbar/Navbar'

const HomePage = () => {
  const [images, setImages] = useState([])
  const [placeImage, setPlaceImage] = useState([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [loadingPlaces, setLoadingPlaces] = useState(true)

  useEffect(() => {
    // Code to run on component mount
    axios
      .get('https://localhost:7190/api/UserView/AllGalleryImages')
      .then((response) => {
        console.log('Success fetching images')
        console.log(response.data)
        setImages(response.data)
        setLoadingImages(false)
      })
      .catch((error) => {
        console.error('Error fetching images', error)
      })

    axios
      .get('https://localhost:7190/api/UserView/GetPlans')
      .then((responses) => {
        console.log('Success fetching places')
        setPlaceImage(responses.data)
        console.log(responses.data.id)
        setLoadingPlaces(false)
      })
      .catch((error) => {
        console.error('Error fetching places', error)
      })
  }, [])

  console.log(images)
  useEffect(() => {
    let text = document.getElementById('destinationtext')
    let leafval = document.getElementById('leaf')
    let hill1st = document.getElementById('hill-1')
    let hill4th = document.getElementById('hill-4')
    let hill5th = document.getElementById('hill-5')

    const handleScroll = () => {
      let value = window.scrollY
      if (text) {
        text.style.marginTop = value * 1.5 + 'px'
      }
      if (leafval) {
        leafval.style.top = value * -1.5 + 'px'
        leafval.style.left = value * -1.5 + 'px'
      }
      if (hill5th) {
        hill5th.style.left = value * 1.5 + 'px'
      }
      if (hill4th) {
        hill4th.style.left = value * -1.5 + 'px'
      }
      if (hill1st) {
        hill1st.style.top = value * 0.1 + 'px'
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  const [isChatBotVisible, setChatBotVisibility] = useState(false)
  const chatbotRef = useRef(null)

  const handleImageClick = () => {
    // Show the chatbot when the image is clicked
    setChatBotVisibility(true)
  }

  const handleClickOutsideChatbot = (event) => {
    // Check if the clicked element is outside the chatbot area
    if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
      setChatBotVisibility(false) // Close the chatbot
    }
  }

  useEffect(() => {
    // Add event listener to detect clicks outside the chatbot area
    document.addEventListener('click', handleClickOutsideChatbot)

    return () => {
      // Remove the event listener when the component is unmounted
      document.removeEventListener('click', handleClickOutsideChatbot)
    }
  }, [])
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  }
  return (
    <div className="homePage">
      <section className="homecontainer">
        <img className="homeimg" src={hill1} id="hill-1" alt="hill-1" />
        <img className="homeimg" src={hill2} id="hill-2" alt="hill-2" />
        <img className="homeimg" src={hill3} id="hill-3" alt="hill-3" />
        <img className="homeimg" src={hill4} id="hill-4" alt="hill-4" />
        <img className="homeimg" src={hill5} id="hill-5" alt="hill-5" />
        <img className="homeimg" src={tree} id="tree" alt="tree" />
        <h2 id="destinationtext">Choose your Destination</h2>
        <img className="homeimg" src={leaf} id="leaf" alt="tree" />
        <img className="homeimg" src={plant} id="plant" alt="plant" />
      </section>

      <section className="homePart">
        <div className="homeCont1">
          {loadingImages ? (
            // Skeleton for image slider while loading
            <Skeleton variant="rectangular" width={1450} height={500} />
          ) : (
            <Slider {...settings}>
              {images.map((image) => (
                <div key={image.id}>
                  <img
                    src={`data:image/jpeg;base64,${image.imageName}`}
                    alt={`Image ${image.id}`}
                    width="1450px"
                    style={{ backgroundSize: 'cover' }}
                  />
                </div>
              ))}
            </Slider>
          )}
        </div>
        <div className="homecontainer-2">
          <h2 className="homeDeals">Jackpot Deals on Top Selling Packages</h2>
          <div className="homePageCard">
            {loadingPlaces ? (
              // Skeleton for package cards while loading
              <>
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="rectangular" width={300} height={300} />
                <Skeleton variant="rectangular" width={300} height={300} />
              </>
            ) : (
              placeImage.map((value) => (
                <Link key={value.id} to={`/package/${value.id}`}>
                  <div
                    className="bg-imageHome"
                    style={{
                      backgroundImage: `url(data:image/jpeg;base64,${value.image})`,
                    }}
                  >
                    <div className="card-img-overlay">
                      <h3>{value.placeName}</h3>
                      <h5 className="card-text">
                        Starting from Rs.{value.minimumPrice}
                      </h5>
                    </div>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      <div className="chatbotClickBtnDiv" ref={chatbotRef}>
        <img
          className="chatbotClickBtn"
          src={chatbot}
          alt="Click Me"
          onClick={handleImageClick}
        />
        {isChatBotVisible && <ChatBot />}
      </div>
      <Map />
      <Footer />
    </div>
  )
}

export default HomePage
