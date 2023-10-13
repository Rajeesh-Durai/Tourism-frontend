import React from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import LoginPage from './Components/LoginPage/LoginPage'
import SignUpPageUser from './Components/SignUpPage/SignUpPage'
import HomePage from './Components/HomePage/HomePage'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import Navbar from './Components/Navbar/Navbar'
import Admin from './Components/Admin/Admin'
import Package from './Components/Package/Package'
import Book from './Components/Book/Book'
import Agent from './Components/Agent/Agent'
import Feedback from './Components/Feedback/Feedback'
import Plan from './Components/Plan/Plan'
import See from './Components/See/See'
import AgentSignUp from './Components/AgentSignUp/AgentSignUp'
import ErrorPager from './Components/Error/ErrorPager'
import Footer from './Components/FooterComponent/Footer'

const App = () => {
  const userRole = sessionStorage.getItem('role')
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* Nested route for /location */}
        <Route
          path="/*"
          element={
            userRole === 'Admin' ||
            userRole === 'User' ||
            userRole === null ||
            userRole === 'Agent' ? (
              <LocationPage />
            ) : (
              <ErrorPager />
            )
          }
        />

        <Route
          path="/see"
          element={
            userRole === 'User' || userRole === null ? <See /> : <ErrorPager />
          }
        />
        <Route
          path="/feedback"
          element={
            userRole === 'User' ||
            userRole === null ||
            userRole === 'Admin' ||
            userRole === 'Agent' ? (
              <Feedback />
            ) : (
              <ErrorPager />
            )
          }
        />
        <Route
          path="/plan"
          element={
            userRole === 'User' || userRole === null ? <Plan /> : <ErrorPager />
          }
        />
        <Route
          path="/admin"
          element={userRole === 'Admin' ? <Admin /> : <ErrorPager />}
        />
        <Route
          path="/agent"
          element={userRole === 'Agent' ? <Agent /> : <ErrorPager />}
        />

        <Route
          path="/login"
          element={userRole === null ? <LoginPage /> : <ErrorPager />}
        />
        <Route
          path="/agentsignup"
          element={userRole === null ? <AgentSignUp /> : <ErrorPager />}
        />
        <Route
          path="/usersignup"
          element={userRole === null ? <SignUpPageUser /> : <ErrorPager />}
        />
        <Route path="*" element={<ErrorPager />} />
      </Routes>
    </div>
  )
}

export default App
const LocationPage = () => {
  return (
    <>
      <Routes>
        <Route index element={<HomePage />} />
        <Route path="package/:id/*" element={<Package />} />
        <Route path="package/:id/book/:packageId/*" element={<Book />} />
      </Routes>
    </>
  )
}
