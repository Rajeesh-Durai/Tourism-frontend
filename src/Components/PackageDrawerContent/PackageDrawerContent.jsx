import React, { useState } from 'react'
import { Button, Skeleton } from '@mui/material'
import Vehicle from '../../assets/images/Verna.jpg'
import './PackageDrawerContent.css'
import { Link, useNavigate } from 'react-router-dom'
import { useParams } from 'react-router-dom'

const PackageDrawerContent = ({ detailedPackage, onClose }) => {
  const navigate = useNavigate()
  const { id } = useParams()
  const selectedPackageId = sessionStorage.getItem('selectedPackageId')

  const handleBookClick = (packageId) => {
    if (packageId !== null) {
      console.log(packageId)
      // Navigate to the BookingPage with the selected packageId as a parameter
      navigate(`/booking/${packageId}`)
    } else {
      console.error('No package selected.')
    }
  }
  if (!detailedPackage) {
    // If the detailedPackage data is not available yet, show the Skeleton
    return (
      <div className="daywise">
        {/* Skeleton for each item in the list */}
        <Skeleton variant="text" width={200} height={40} />
        <Skeleton variant="rectangular" width={160} height={160} />
        <Skeleton variant="text" width={160} height={20} />
        <Skeleton variant="text" width={200} height={20} />
        <Skeleton variant="text" width={180} height={20} />
        <Skeleton variant="rectangular" width={160} height={160} />
        <Skeleton variant="text" width={160} height={20} />
        <Skeleton variant="text" width={180} height={20} />
        <Skeleton variant="rectangular" width={160} height={160} />
        <Skeleton variant="text" width={160} height={20} />
        <Skeleton variant="text" width={180} height={20} />
      </div>
    )
  }

  return (
    <div style={{ width: 755 }} className="daywise">
      <div className="days">
        {detailedPackage !== null &&
          detailedPackage.map((day) => {
            return (
              <div
                key={`${day.dayNo}-${day.spotName}-${day.hotelName}`}
                className="day"
              >
                <h1 className="dayNo">Day {day.dayNo}</h1>
                <div style={{ padding: '20px' }}>
                  <h2>Spot</h2>
                </div>
                <div className="Spot">
                  <div className="spotImg">
                    <img
                      src={`data:image/jpeg;base64,${day.spotImage}`}
                      width="160px"
                      height="160px"
                      alt={`Image ${day.id}`}
                    />
                  </div>
                  <div className="spotName">
                    <p>Name: {day.spotName}</p>
                    <p>Address: {day.spotAddress}</p>
                    <p>Duration: {day.spotDuration} hrs</p>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h2>Staying</h2>
                </div>
                <div className="Spot">
                  <div className="spotImg">
                    <img
                      src={`data:image/jpeg;base64,${day.hotelImage}`}
                      width="160px"
                      height="160px"
                      alt={`Image ${day.id}`}
                    />
                  </div>
                  <div className="spotName">
                    <p>Hotel Name: {day.hotelName}</p>
                    <p>Ratings: {day.hotelRating} star</p>
                  </div>
                </div>
                <div style={{ padding: '20px' }}>
                  <h2>Travel By</h2>
                </div>
                <div className="vehicle">
                  <div className="vehicleImg">
                    <img
                      src={Vehicle}
                      width="160px"
                      height="160px"
                      alt="Vehicle"
                    />
                  </div>
                  <div className="vehicle-con">
                    <p>Vehicle Name: {day.vehicleName}</p>
                  </div>
                </div>
              </div>
            )
          })}
      </div>
      <div className="btns" style={{ marginBottom: '30px' }}>
        <div className="btn1">
          <Button
            className="cancel"
            variant="outlined"
            color="error"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
        <div className="btn2">
          <Link to={`book/${selectedPackageId}`}>
            <Button
              id="submit"
              variant="contained"
              style={{ marginLeft: '20px', marginRight: '15px' }}
              onClick={() => handleBookClick(detailedPackage[0].packageId)}
            >
              Book
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PackageDrawerContent
