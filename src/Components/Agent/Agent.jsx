import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './Agent.css'
import {
  Select,
  Container,
  MenuItem,
  Typography,
  TextField,
  Button,
} from '@mui/material'
import Navbar from '../Navbar/Navbar'
const Agent = () => {
  const [location, setLocation] = useState([])
  const [selectedValue, setSelectedValue] = useState('')
  const [iselectedValue, setISelectedValue] = useState('')
  const [iselectedValue2, setISelectedValue2] = useState([])
  const [numDays, setNumDays] = useState(1) // Initialize with 1 day
  const [spot, setSpot] = useState([])
  const [hotel, setHotel] = useState([])
  const [selectedSpots, setSelectedSpots] = useState(
    Array.from({ length: numDays }, () => '')
  )
  const [selectedHotels, setSelectedHotels] = useState(
    Array.from({ length: numDays }, () => '')
  )
  const [selectedHotel, setSelectedHotel] = useState('')
  const [selectedPack, setSelectedPack] = useState({
    userInfoId: 1,
    placeId: 0,
    packageName: '',
    packageImage: null, //file
    imageName: '', //file-name
    iternary: '',
    pricePerPerson: 0,
    days: 0,
    food: '',
  })
  const [dayschedule, setDaySchedule] = useState({
    packageId: 0,
    daywise: 1,
    hotelName: '',
    spotName: '',
    vehicleName: '',
  })

  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true) // Step 1: Initialize validation status

  useEffect(() => {
    const isAllFieldsValid =
      selectedPack.placeId !== 0 &&
      selectedPack.packageName !== '' &&
      selectedPack.packageImage !== null &&
      selectedPack.iternary !== '' &&
      selectedPack.days > 0 &&
      selectedPack.pricePerPerson > 0 &&
      selectedPack.food !== ''

    // Update the validation status
    setIsSubmitDisabled(!isAllFieldsValid)
  }, [selectedPack])
  useEffect(() => {
    const fetchCarouselData = async () => {
      try {
        const token = sessionStorage.getItem('token')
        const response = await axios.get(
          'https://localhost:7190/api/UserView/AllPlaces',
          {
            headers: {
              accept: 'text/plain',
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + token,
            },
          }
        )
        console.log(response.data)
        setLocation(response.data) // Assuming the API response contains the data for carousel items
      } catch (error) {
        console.error(error)
      }
    }

    fetchCarouselData()
  }, [])

  const handleChange = (event) => {
    console.log(event.target.value)
    setISelectedValue(event.target.value)
    fetchLocationName(event.target.value)
    const uncheckedDeptName = location.find(
      (dept) => dept.placeName === event.target.value
    ).id
    console.log(uncheckedDeptName)
    setSelectedPack({
      ...selectedPack,
      placeId: uncheckedDeptName,
    })
  }

  const handlePackageName = (event) => {
    console.log(event.target.value)
    setSelectedPack({
      ...selectedPack,
      packageName: event.target.value,
    })
  }

  const handlePrice = (event) => {
    console.log(event.target.value)
    const price = parseInt(event.target.value, 10)
    setSelectedPack({
      ...selectedPack,
      pricePerPerson: price,
    })
  }

  const handleIternary = (event) => {
    console.log(event.target.value)
    setSelectedPack({
      ...selectedPack,
      iternary: event.target.value,
    })
  }

  const handlePostFood = (event) => {
    console.log(event.target.value)
    setSelectedPack({
      ...selectedPack,
      food: event.target.value,
    })
  }

  const [spotArray, setSpotArray] = useState([])
  const [hotelArray, setHotelArray] = useState([])
  const [vehicleArray, setVehicleArray] = useState([])

  const handleChange2 = async (event, dayIndex) => {
    const spotN = event.target.value
    setDaySchedule({
      ...dayschedule,
      spotName: spotN,
    })

    setSpotArray((prevSpot) => {
      const updatedSpotArray = [...prevSpot]
      updatedSpotArray[dayIndex] = spotN
      return updatedSpotArray
    })
    fetchHotelName(spotN, dayIndex) // Pass the dayIndex to identify the selected day
  }

  const [hotels, setHotels] = useState('')
  const handleHotelChange = (event, dayIndex) => {
    const hotelNames = event.target.value
    setDaySchedule({
      ...dayschedule,
      hotelName: event.target.value,
    })

    setHotelArray((prevSpot) => {
      const updatedSpotArray = [...prevSpot]
      updatedSpotArray[dayIndex] = event.target.value
      return updatedSpotArray
    })

    setHotels((prevHotels) => [...prevHotels, hotelNames])
  }
  const [getvehicle, setVehicle] = useState('')
  const handleVehicleNameChange = (event, dayIndex) => {
    const vehicleNames = event.target.value
    setDaySchedule({
      ...dayschedule,
      vehicleName: vehicleNames,
    })

    setVehicleArray((prevSpot) => {
      const updatedSpotArray = [...prevSpot]
      updatedSpotArray[dayIndex] = vehicleNames
      return updatedSpotArray
    })

    setVehicle((prevHotel) => [...prevHotel, ...event.target.value])
  }

  useEffect(() => {
    setSelectedHotel('') // Reset selected hotel whenever the selected spot changes
  }, [selectedSpots])

  const fetchLocationName = async (placeName) => {
    // GetSpots in that Locations
    try {
      const uncheckedDeptName = location.find(
        (dept) => dept.placeName === placeName
      ).id
      console.log(uncheckedDeptName)

      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `https://localhost:7190/api/AgentView/SpotByPlaceId?placeId=${uncheckedDeptName}`,
        {
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      console.log(response.data)
      setSpot(response.data) // Assuming the API response contains the data for carousel items
    } catch (error) {
      console.error(error)
    }
  }

  const fetchHotelName = async (spotName, dayIndex) => {
    try {
      const uncheckedDeptName = spot.find(
        (dept) => dept.spotName === spotName
      ).id
      console.log(uncheckedDeptName)

      const token = sessionStorage.getItem('token')
      const response = await axios.get(
        `https://localhost:7190/api/AgentView/HotelBySpotId?spotId=${uncheckedDeptName}`,
        {
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      )
      console.log(response.data)

      // Get the array of hotels for the selected spot
      const hotelsForSpot = response.data.map((item) => item.hotelName)

      setSelectedHotels((prevHotels) => {
        const newHotels = [...prevHotels]
        newHotels[dayIndex] = hotelsForSpot[0] || '' // Set the selected hotel for the specific day to the first hotel for the spot
        return newHotels
      })

      // Update the hotel state with the fetched hotels
      setHotel((prevHotel) => [...prevHotel, ...response.data])
    } catch (error) {
      console.error(error)
    }
  }

  const PostPackage = () => {
    const formData = new FormData()
    console.log(formData)
    formData.append('userInfoId', selectedPack.userInfoId)
    formData.append('packageName', selectedPack.packageName)
    formData.append('imageName', selectedPack.imageName)
    formData.append('packageImage', selectedPack.packageImage)
    formData.append('placeId', selectedPack.placeId)
    formData.append('days', selectedPack.days)
    formData.append('food', selectedPack.food)
    formData.append('iternary', selectedPack.iternary)
    formData.append('pricePerPerson', selectedPack.pricePerPerson)
    console.log(formData)
    console.log(selectedPack)
    axios
      .post(
        'https://localhost:7190/api/AgentView/PostPackageWithImage',
        formData,
        {
          headers: {
            accept: 'text/plain',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      .then((response) => {
        alert('success')
        console.log('Data successfully sent to the server:', response.data)
      })
      .catch((error) => {
        // Handle error
        alert('error')
        console.error('Error while sending data to the server:', error)
      })
    setIsOpen(true)
  }

  const handlePost = async () => {
    try {
      // Get the last package ID
      const packId = await axios.get(
        'https://localhost:7190/api/AgentView/GetLastPackage',
        {
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const packIdResponse = packId.data.id

      // Get all places
      const response = await axios.get(
        'https://localhost:7190/api/UserView/AllPlaces',
        {
          headers: {
            accept: 'text/plain',
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        }
      )
      const lengthItem = response.data.length
      // Update the packageId property in daySchedule with the new lengthItem
      setDaySchedule((prevSchedule) => ({
        ...prevSchedule,
        packageId: lengthItem,
      }))

      for (let i = 0; i < numDays; i++) {
        const dayschedule = {
          packageId: packIdResponse,
          daywise: i + 1,
          hotelName: hotelArray[i],
          spotName: spotArray[i],
          vehicleName: vehicleArray[i],
        }

        console.log(dayschedule)
        console.log('spotarray', spotArray)
        console.log('hotelarray', hotelArray)
        console.log('vehicleArray', vehicleArray)
        // Send the POST request with the updated daySchedule
        const postResponse = await axios.post(
          'https://localhost:7190/api/AgentView/PostDayWise',
          dayschedule,
          {
            headers: {
              accept: 'text/plain',
              Authorization: 'Bearer ' + sessionStorage.getItem('token'),
            },
          }
        )

        alert('success')
        console.log('Data successfully sent to the server:', postResponse.data)
      }
    } catch (error) {
      alert('error')
      console.error('Error while fetching or sending data:', error)
    }
  }

  const handleNumDaysChange = (event) => {
    setNumDays(parseInt(event.target.value, 10))
    const price = parseInt(event.target.value, 10)
    setSelectedPack({
      ...selectedPack,
      days: price,
    })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    setSelectedPack({
      ...selectedPack,
      packageImage: file,
      imageName: file.name,
    })
    if (file) {
      reader.readAsDataURL(file)
    }
  }
  return (
    <div>
      <Navbar />
      <div className="PackageAdd">
        <h1>Add Packages</h1>
      </div>

      <Container className="booknowflex">
        <div className="booknow">
          <div>
            <h2>ADDING PACKAGE</h2>
          </div>
          <div className="locationSelected">
            <Select
              className="increase-width"
              value={iselectedValue}
              onChange={handleChange}
            >
              <MenuItem value="">Select a Location</MenuItem>
              {location.map((item) => (
                <MenuItem key={item.id} value={item.placeName}>
                  {item.placeName}
                </MenuItem>
              ))}
            </Select>
          </div>
          <div className="locationSelected">
            <TextField
              className="mb-3"
              label="Package Name"
              id="typeText"
              type="text"
              onChange={handlePackageName}
            />
          </div>

          <div className="locationSelected">
            <input className="mb-3" type="file" onChange={handleImageChange} />
          </div>
          <div className="locationSelected">
            <TextField
              className="mb-3"
              label="Iternary"
              id="typeText"
              type="text"
              onChange={handleIternary}
            />
          </div>
          <div className="locationSelected">
            <TextField
              className="mb-3"
              label="Number of Days"
              value={numDays}
              onChange={handleNumDaysChange}
              id="typeText"
              type="number"
            />
          </div>
          <div className="locationSelected">
            <TextField
              className="mb-3"
              label="Price Per Person"
              id="typeText"
              type="number"
              onChange={handlePrice}
            />
          </div>
          <div className="locationSelected">
            <TextField
              className="mb-3"
              label="Food"
              id="typeText"
              type="text"
              onChange={handlePostFood}
            />
          </div>
          <div className="upload-btn">
            <Button
              className="btn btn-primary mt-3 upload-cancel"
              onClick={PostPackage}
              variant="contained"
              color="primary"
              disabled={isSubmitDisabled}
            >
              Submit
            </Button>
          </div>
        </div>
      </Container>

      {isOpen && (
        <Container>
          <div className="booknow">
            <div>
              <h2>ADDING DAY SCHEDULES</h2>
            </div>
            {Array.from({ length: numDays }).map((_, dayIndex) => (
              <div key={dayIndex}>
                <Typography variant="h3" className="mt-5 mb-3">
                  Day: {dayIndex + 1}
                </Typography>
                <Select
                  className="c mb-3"
                  onChange={(event) => handleChange2(event, dayIndex)}
                >
                  <MenuItem value="">Select a Spot Name</MenuItem>
                  {spot.map((item) => (
                    <MenuItem key={item.id} value={item.spotName}>
                      {item.spotName}
                    </MenuItem>
                  ))}
                </Select>

                <div>
                  <Select
                    className="increase-width mb-3"
                    onChange={(event) => handleHotelChange(event, dayIndex)}
                  >
                    <MenuItem value="">Select a Hotel</MenuItem>
                    {hotel.map((item) => (
                      <MenuItem key={item.id} value={item.hotelName}>
                        {item.hotelName}
                      </MenuItem>
                    ))}
                  </Select>
                </div>

                <div>
                  <TextField
                    className="mb-3"
                    label="Vehicle to Provide"
                    id="typeText"
                    type="text"
                    onChange={(event) =>
                      handleVehicleNameChange(event, dayIndex)
                    }
                  />
                </div>
              </div>
            ))}
            <div className="submitBtn">
              <Button
                className="upload-AllTheDetails"
                onClick={handlePost}
                style={{ width: '200px', marginTop: '15px' }}
                variant="contained"
                color="primary"
              >
                Submit
              </Button>
            </div>
          </div>
        </Container>
      )}
    </div>
  )
}

export default Agent
