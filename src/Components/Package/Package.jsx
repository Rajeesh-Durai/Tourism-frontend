import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import './Package.css'
import activity from '../../assets/images/activity.png'
import TextField from '@mui/material/TextField'
import hotel from '../../assets/images/hotel.png'
import axios from 'axios'
import Drawer from '@mui/material/Drawer'
import PackageDrawerContent from '../PackageDrawerContent/PackageDrawerContent'
import Navbar from '../Navbar/Navbar'
import Footer from '../FooterComponent/Footer'
const Package = () => {
  const [packageData, setPackageData] = useState(null)
  const [selectedPackageId, setSelectedPackageId] = useState(null)
  const { id } = useParams()
  const [detailedPackage, setDetailedPackage] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    axios
      .get(
        `https://localhost:7190/api/UserView/GetPackageDetails?placeId=${id}`
      )
      .then((response) => {
        setPackageData(response.data)
        setUnfilteredPackageData(response.data)
        setLoading(false)
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
        setLoading(false)
      })
  }, [id])

  const handleViewDetails = (packageId) => {
    setSelectedPackageId(packageId)
    sessionStorage.setItem('selectedPackageId', packageId)
    try {
      axios
        .get(
          `https://localhost:7190/api/UserView/GetDayWise?packageId=${packageId}`
        )
        .then((response) => {
          setDetailedPackage(response.data)
          console.log('success')
        })
        .catch((error) => {
          console.error('Error fetching detailed package data:', error)
        })
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const importClose = () => {
    setDetailedPackage(null)
    setSelectedPackageId(null)
  }

  const handleImportSubmit = () => {
    console.log(selectedPackageId)
    if (selectedPackageId !== null) {
      console.log(selectedPackageId)
      // Navigate to the BookingPage with the selected packageId as a parameter
      return <Link to={`/booking/${selectedPackageId}`} />
    } else {
      console.error('No package selected.')
    }
  }

  // Separate unfiltered package data and filtered package data
  const [unfilteredPackageData, setUnfilteredPackageData] = useState(null)

  useEffect(() => {
    axios
      .get(
        `https://localhost:7190/api/UserView/GetPackageDetails?placeId=${id}`
      )
      .then((response) => {
        setPackageData(response.data)
        setUnfilteredPackageData(response.data) // Initialize unfiltered data
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
  }, [id])

  const filteredPackageData = unfilteredPackageData
    ? unfilteredPackageData.filter((pack) =>
        pack.packageName.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : []

  return (
    <div key="package-root">
      <Navbar />
      <div className="packageImg">
        <h1>Packages</h1>
        <TextField
          className="searchBox"
          label="Search Package"
          variant="outlined"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ borderRadius: '25px' }}
        />
      </div>
      {loading && <div className="loader-overlay" />}
      {packageData === null ? (
        <div className="loader" />
      ) : searchQuery === '' ? (
        <div className="package-cards-container">
          {packageData.map((pack, index) => (
            <div key={index} className="package-cards">
              <div className="package-img">
                <img
                  src={`data:image/jpeg;base64,${pack.image}`}
                  width="360px"
                  height="200px"
                  alt={`Image ${pack.id}`}
                />
              </div>
              <h2 className="package-title">{pack.packageName}</h2>
              <p className="package-days">Days: {pack.days}</p>
              <p className="package-iternary">Iternary: {pack.iternary}</p>
              <p className="package-food">Food: {pack.food}</p>
              <p className="package-price">
                <img src={activity} width="20px" alt="Activity" />
                {pack.activities} &nbsp;&nbsp;
                <img src={hotel} width="20px" alt="Hotel" />
                {pack.hotel}
              </p>
              <p className="package-price">Rs.{pack.pricePerPerson}</p>
              <Button
                variant="contained"
                onClick={() => handleViewDetails(pack.packageId)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      ) : filteredPackageData.length === 0 ? (
        <div className="not-available-message">Not Available</div>
      ) : (
        <div className="package-cards-container">
          {filteredPackageData.map((pack, index) => (
            <div key={index} className="package-cards">
              <div className="package-img">
                <img
                  src={`data:image/jpeg;base64,${pack.image}`}
                  width="160px"
                  height="160px"
                  alt={`Image ${pack.packageId}`}
                />
              </div>
              <h2 className="package-title">{pack.packageName}</h2>
              <p className="package-days">Days: {pack.days}</p>
              <p className="package-iternary">Iternary: {pack.iternary}</p>
              <p className="package-food">Food: {pack.food}</p>
              <p className="package-price">
                <img src={activity} width="20px" alt="Activity" />
                {pack.activities} &nbsp;&nbsp;
                <img src={hotel} width="20px" alt="Hotel" />
                {pack.hotel}
              </p>
              <p className="package-price">Rs.{pack.pricePerPerson}</p>
              <Button
                variant="contained"
                onClick={() => handleViewDetails(pack.packageId)}
              >
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}

      <Drawer
        anchor="right"
        open={selectedPackageId !== null}
        onClose={importClose}
      >
        {/* Use the PackageDrawerContent component */}
        <PackageDrawerContent
          detailedPackage={detailedPackage}
          onClose={importClose}
          onSubmit={() => handleImportSubmit(selectedPackageId)}
        />
      </Drawer>
      <Footer />
    </div>
  )
}

export default Package
