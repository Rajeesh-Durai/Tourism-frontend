import React, { useState, useEffect, useRef } from 'react'
import gallery from '../../assets/images/update-bg.jpg'
import './Book.css'
import { TextField, Button } from '@mui/material'
import { useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'
import axios from 'axios'
import projLogo from '../../assets/images/make-your-trip-logo.png'
import ReactDOM from 'react-dom'
import Package from '../Package/Package'
import Navbar from '../Navbar/Navbar'
const Book = () => {
  const { packageId: urlPackageId } = useParams()
  const [totalNumber, setTotalNumber] = useState(1)
  const [totalAmount, setTotalAmount] = useState(30000)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [selectedPackageId, setSelectedPackageId] = useState('')
  const [packageDays, setPackageDays] = useState(0)
  const [PackagePrice, setPackagePrice] = useState(0)
  const handleTotalNumberChange = (event) => {
    const inputNumber = event.target.value
    if (inputNumber > 50) {
      alert('maximum of only 50 members is allowed')
      setTotalNumber(0) // Reset total number to 0
      setTotalAmount(0)
    } else {
      const amount = PackagePrice * parseInt(inputNumber, 10)
      setTotalNumber(inputNumber)
      setTotalAmount(isNaN(amount) ? '' : amount)
    }
  }

  const [isButtonDisabled, setIsButtonDisabled] = useState(true)
  useEffect(() => {
    // ... (your existing useEffect code)

    // Update validation status based on conditions
    const isTotalNumberValid = totalNumber > 0 && totalNumber <= 50
    const isStartDateValid = startDate !== ''

    setIsButtonDisabled(!(isTotalNumberValid && isStartDateValid))
  }, [startDate, totalNumber])
  useEffect(() => {
    const storedPackageId = sessionStorage.getItem('selectedPackageId')

    console.log(storedPackageId)
    axios
      .get(
        `https://localhost:7190/api/UserView/ParticularPackage?id=${storedPackageId}`
      )
      .then((response) => {
        setPackageDays(response.data.days)
        setPackagePrice(response.data.pricePerPerson)
        console.log(response.data.days)
        console.log(response.data.pricePerPerson)
        console.log('success')
        // Calculate and update the end date based on the start date and total number of days
        if (startDate && response.data.days > 0) {
          const numberOfDays = parseInt(response.data.days, 10)
          const newEndDate = new Date(startDate)
          newEndDate.setDate(newEndDate.getDate() + numberOfDays)
          setEndDate(newEndDate.toISOString().slice(0, 10))
        } else {
          setEndDate('')
        }

        // Calculate and update the total amount based on pricePerPerson and total number of persons
        if (response.data.pricePerPerson > 0 && totalNumber > 0) {
          const amount =
            response.data.pricePerPerson * parseInt(totalNumber, 10)
          setTotalAmount(isNaN(amount) ? 0 : amount)
        } else {
          setTotalAmount(0)
        }
      })
      .catch((error) => {
        console.error('Error fetching detailed package data:', error)
      })

    setSelectedPackageId(storedPackageId || urlPackageId)
  }, [startDate, totalNumber, urlPackageId])

  // Function to handle form submission
  const handleSubmit = (e) => {
    const storedRole = sessionStorage.getItem('role')
    if (storedRole !== null) {
      //gateway
      e.preventDefault()
      if (totalAmount > 0) {
        var options = {
          key: 'rzp_test_7e9duwwmPmdiUp',
          key_secret: 'MLkWAb8wbhF2xiYhdXYPX4qq',
          amount: totalAmount * 100,
          currency: 'INR',
          name: 'MAKE YOUR TRIP',
          description: 'TestingPurpose',
          handler: function (response) {
            alert(response.razorpay_payment_id)
          },
          prefill: {
            name: 'Rajeesh',
            email: 'rajarajeesh11@gmail.com',
            contact: '9150112751',
          },
          notes: {
            address: 'Razorpay Corporate Office',
          },
          theme: {
            backgroundImage: '#D1F9E8',
          },
        }
        var pay = new window.Razorpay(options)
        pay.open()
      } else {
        alert('There is no value to Pay')
      }

      // Do something with the selected data, e.g., send it to the server
      const selectedPack = {
        packageId: selectedPackageId,
        startingDate: startDate,
        endingDate: endDate,
        peopleCount: totalNumber,
        totalPrice: totalAmount,
        transactionStatus: 'true',
      }

      console.log(selectedPack)

      axios
        .post('https://localhost:7190/api/UserView/PostBooking', selectedPack, {
          headers: {
            accept: 'text/plain',
            Authorization: 'Bearer ' + sessionStorage.getItem('token'),
          },
        })
        .then((response) => {
          // Handle successful response from the server
          console.log('Data successfully sent to the server:', response.data)
          downloadPdf()
        })
        .catch((error) => {
          // Handle error
          alert('login as user to book')
          console.error('Error while sending data to the server:', error)
        })
    } else {
      alert('Login to book')
    }
  }
  const pdfRef = useRef()

  const downloadPdf = async () => {
    try {
      const input = pdfRef.current
      const pdfOptions = {
        scale: 2, // Increase the scale to improve rendering
        background: 'white', // Set the background color to white
      }

      // Wait for the DOM elements to update with the latest values
      await new Promise((resolve) => setTimeout(resolve, 100))

      html2canvas(input, pdfOptions).then((canvas) => {
        const imgData = canvas.toDataURL('image/png')
        const pdf = new jsPDF('p', 'mm', 'a4', true) // portrait, dimensions, page-format
        const pdfWidth = pdf.internal.pageSize.getWidth()
        const pdfHeight = pdf.internal.pageSize.getHeight()
        const imgWidth = canvas.width
        const imgHeight = canvas.height
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight)
        const imgX = (pdfWidth - imgWidth * ratio) / 2
        const imgY = 30
        pdf.addImage(
          imgData,
          'PNG',
          imgX,
          imgY,
          imgWidth * ratio,
          imgHeight * ratio
        )
        pdf.save('BookingDetails.pdf')
      })
    } catch (error) {
      console.error('Error while generating PDF:', error)
    }
  }

  // Get the current date in 'YYYY-MM-DD' format
  const currentDate = new Date().toISOString().slice(0, 10)

  return (
    <div className="gallery-img">
      <div className="bookingpg">
        <div className="book-head">BOOK NOW</div>
        <div className="book-container" ref={pdfRef}>
          <div className="booknow-box">
            <div>
              <div>
                <h5>Start Date</h5>
                <input
                  type="date"
                  className="date-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={currentDate} // Set the minimum date to the current date
                />
              </div>
              <div>
                <h5>End Date</h5>
                <input
                  type="date"
                  className="date-input"
                  value={endDate}
                  disabled
                />
              </div>
            </div>
            <div>
              <TextField
                style={{ width: '360px' }}
                label="Total Number of Person"
                id="typeText"
                type="number"
                onChange={handleTotalNumberChange}
              />
            </div>
            <br />
            <br />
            {typeof totalAmount === 'number' && (
              <div>
                Total Amount:{' '}
                <span className="location-name">Rs.{totalAmount}</span>
              </div>
            )}
            <div style={{ width: '360px' }}>
              <Button
                style={{ width: '100%' }}
                variant="contained"
                color="primary"
                className="upload-cancel"
                onClick={handleSubmit}
                disabled={isButtonDisabled}
              >
                Pay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Book
