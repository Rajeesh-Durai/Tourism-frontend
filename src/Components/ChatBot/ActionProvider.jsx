const provideAction = (parsedMessage, setMessages) => {
  switch (parsedMessage.type) {
    case 'GREETING_WITH_NAME':
    case 'GREETING_WITH_NAME':
      // Construct the personalized greeting message
      const greetingResponse = {
        text: `Hi ${parsedMessage.name}! How can I help you?`,
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, greetingResponse])
      break

    case 'SPOTS_KERALA':
      // Handle best spots in Kerala response
      const keralaSpotsResponse = {
        text: 'Kerala, often referred to as "Gods Own Country," is a beautiful state in India known for its lush greenery, backwaters, beaches, hill stations, and diverse culture. Some of the best spots in Kerala are Munnar, Alleppey, Kochi, Thekkady, and Varkala.',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, keralaSpotsResponse])
      break

    case 'SPOTS_GOA':
      // Handle best spots in Goa response
      const goaSpotsResponse = {
        text: 'Goa is a popular beach destination in India, known for its sandy beaches, vibrant nightlife, and Portuguese influence. Some of the best spots in Goa are Baga Beach, Calangute Beach, Anjuna Beach, and Dudhsagar Waterfalls.',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, goaSpotsResponse])
      break

    case 'SPOTS_WEST_BENGAL':
      // Handle best spots in West Bengal response
      const westBengalSpotsResponse = {
        text: 'West Bengal is a state in eastern India, known for its rich cultural heritage and natural beauty. Some of the best spots in West Bengal are Darjeeling, Sunderbans, Kolkata, and Digha.',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, westBengalSpotsResponse])
      break

    case 'SPOTS_RAJASTHAN':
      // Handle best spots in Rajasthan response
      const rajasthanSpotsResponse = {
        text: 'Rajasthan is a land of royalty and heritage in India, known for its magnificent palaces, forts, and deserts. Some of the best spots in Rajasthan are Jaipur (Pink City), Udaipur (City of Lakes), Jaisalmer (Golden City), and Ranthambore National Park.',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, rajasthanSpotsResponse])
      break

    case 'SPOTS_NEW_DELHI':
      // Handle best spots in New Delhi response
      const newDelhiSpotsResponse = {
        text: 'New Delhi, the capital city of India, offers a mix of history, culture, and modernity. Some of the best spots in New Delhi are India Gate, Qutub Minar, Humayun’s Tomb, and Lotus Temple.',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, newDelhiSpotsResponse])
      break

    case 'YOUR_NAME':
      // Handle your name response
      const nameResponse = {
        text: 'My name is TourismBot. How can I assist you today?',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, nameResponse])
      break

    case 'PACKAGE_KERALA':
      // Handle package in Kerala response
      const keralaPackageResponse = {
        text: 'We have various packages for Kerala that cover popular destinations like Munnar, Alleppey, Kochi, and more. Would you like to know more details?',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, keralaPackageResponse])
      break

    case 'PACKAGE_GOA':
      // Handle package in Goa response
      const goaPackageResponse = {
        text: 'We offer exciting packages for Goa that include beach resorts, water sports, and nightlife experiences. Would you like to explore our Goa packages?',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, goaPackageResponse])
      break

    case 'PACKAGE_WEST_BENGAL':
      // Handle package in West Bengal response
      const westBengalPackageResponse = {
        text: 'Discover the beauty of West Bengal with our customized packages that cover Darjeeling, Sundarbans, Kolkata, and more. Are you interested in exploring West Bengal?',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [
        ...prevMessages,
        westBengalPackageResponse,
      ])
      break

    case 'PACKAGE_RAJASTHAN':
      // Handle package in Rajasthan response
      const rajasthanPackageResponse = {
        text: 'Experience the grandeur of Rajasthan with our royal packages that include palaces, camel safaris, and cultural performances. Would you like to book a package for Rajasthan?',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, rajasthanPackageResponse])
      break

    case 'PACKAGE_NEW_DELHI':
      // Handle package in New Delhi response
      const newDelhiPackageResponse = {
        text: 'Explore the treasures of New Delhi with our sightseeing and cultural packages that cover historical monuments and city attractions. Are you interested in touring New Delhi?',
        isUserMessage: false,
      }
      setMessages((prevMessages) => [...prevMessages, newDelhiPackageResponse])
      break

    case 'UNKNOWN':
      // Add a default response for unknown queries
      const unknownResponse = {
        text: "I'm sorry, I couldn't understand your query.",
        isUserMessage: false,
      }

      setMessages((prevMessages) => [...prevMessages, unknownResponse])

      break

    default:
      break
  }
}

export default provideAction
