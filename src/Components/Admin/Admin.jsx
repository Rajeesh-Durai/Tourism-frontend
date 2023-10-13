import { Button } from '@mui/material'
import React, { useState, useEffect } from 'react'
import book from '../../assets/images/book.jpg'
import axios from 'axios'
import './Admin.css'
import Navbar from '../Navbar/Navbar'
const Admin = () => {
  const [myObject, setMyObject] = useState({
    id: 0,
    imageSrc: 'a',
    imageName: '',
    galleryImage: null,
  })

  const [imageSrc, setImageSrc] = useState('')
  const [imageName, setImageName] = useState('')
  const [reloadRequests, setReloadRequests] = useState(false)
  const defaltimage = { book }
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    setMyObject({
      ...myObject,
      FormFile: file,
    })
    if (isPngFileInput(file)) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result
        setImageSrc(imageUrl)
        setImageName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }
  const postToDb = () => {
    const formData = new FormData()
    formData.append('Id', myObject.id)
    formData.append('imageSrc', myObject.imageSrc)
    formData.append('imageName', myObject.imageName)
    formData.append('galleryImage', myObject.galleryImage)
    console.log(myObject)

    const apiUrl = 'https://localhost:7190/api/AdminView/PostImageGallery'
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        accept: 'text/plain',
        Authorization: 'Bearer ' + sessionStorage.getItem('token'),
      },

      body: formData,
    })
      .then(async (data) => {
        if (data.status === 200) {
          var myData = await data.json()
          console.log(myData)
          alert('Success')
        } else {
          var myData = await data.json()
          console.log(myData)
          alert('No post happened')
        }
      })
      .catch((err) => {
        console.log(err.error)
      })
  }

  const handleDrop = (event) => {
    event.preventDefault()
    const file = event.dataTransfer.files[0]
    setMyObject({
      ...myObject,
      galleryImage: file,
      imageName: file.name,
    })

    if (isPngFileInput(file)) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result
        setImageSrc(imageUrl)
        setImageName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDragOver = (event) => {
    event.preventDefault()
  }

  const isPngFileInput = (file) => {
    return file.type === 'image/png' || file.type === 'image/jpeg'
  }

  const handlePngFileInput = (event) => {
    const file = event.target.files[0]
    setMyObject({
      ...myObject,
      galleryImage: file,
      imageName: file.name,
    })
    if (isPngFileInput(file)) {
      const reader = new FileReader()
      reader.onload = () => {
        const imageUrl = reader.result
        setImageSrc(imageUrl)
        setImageName(file.name)
      }
      reader.readAsDataURL(file)
    }
  }

  const [requests, setRequests] = useState([])

  useEffect(() => {
    const apiUrl = 'https://localhost:7190/api/AdminView/GetApproval'

    const token = sessionStorage.getItem('token')
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        setRequests(response.data) // Assuming the API response is an array of request objects
      })
      .catch((error) => {
        console.error('Error fetching data:', error)
      })
      .finally(() => {
        setReloadRequests(false) // Reset the reload state
      })
  }, [reloadRequests])

  const handleAcceptRequest = (requestId) => {
    const apiUrl = `https://localhost:7190/api/AdminView/AgentApproved?id=${requestId}`

    const token = sessionStorage.getItem('token')
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }

    axios
      .put(apiUrl, null, { headers })
      .then((response) => {
        console.log('Response:', response)
        alert('Success')
        setReloadRequests(true)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  const handleDeclineRequest = (requestId) => {
    // Handle decline request logic here (if needed)
    console.log('Declined Request ID:', requestId)
    const apiUrl = `https://localhost:7190/api/AdminView/AgentRejected?id=${requestId}`

    const token = sessionStorage.getItem('token')
    const headers = {
      accept: 'text/plain',
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + token,
    }

    axios
      .delete(apiUrl, { headers })
      .then((response) => {
        console.log('Response:', response)
        alert('Success')
        setReloadRequests(true)
      })
      .catch((error) => {
        console.error('Error:', error)
      })
  }

  return (
    <div>
      <Navbar />
      <div className="options">
        <h1>Admin</h1>
      </div>
      <div className="adminOption">
        <div className="adminPostImage">
          <div>
            <h2>Add</h2>
          </div>
          <div>
            <label className="file-input-label" htmlFor="file-input">
              <div
                className="pic-drop"
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <div className="pic-img">
                  {imageSrc ? (
                    <img src={imageSrc} width="80px" height="80px" alt="" />
                  ) : (
                    <img src={book} width="80px" height="80px" alt="" />
                  )}
                </div>

                <div className="Imagefile">
                  Drop a picture file here, or Browse to add the image
                </div>

                <input
                  id="file-input"
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={handlePngFileInput}
                  style={{ display: 'none' }}
                />
              </div>
            </label>
          </div>
          <div className="galleryPostBtn">
            <Button disabled={!imageSrc} onClick={postToDb}>
              Add
            </Button>
          </div>
        </div>
        <div className="vertical-line"></div>
        <div className="adminRequest">
          {requests.length > 0 ? (
            <div className="custom-card-container">
              <h2>Agent Request</h2>
              {requests.map((request) => (
                <div key={request.id} className="custom-card">
                  <h3 className="custom-name">Name: {request.username}</h3>
                  <p className="custom-agency">
                    Agency Name: {request.agencyName}
                  </p>
                  <p className="custom-agency">
                    Phone Number: {request.phoneNumber}
                  </p>
                  <p className="custom-agency">Email: {request.email}</p>
                  <div className="custom-buttons">
                    <Button
                      variant="contained"
                      color="success"
                      onClick={() => handleAcceptRequest(request.id)}
                    >
                      Accept
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => handleDeclineRequest(request.id)}
                    >
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No request available</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default Admin
