const parseMessage = (userInput) => {
  const lowerCaseInput = userInput.toLowerCase()
  const namePattern = /hi\s+im\s+([a-z]+)/i
  const match = lowerCaseInput.match(namePattern)
  if (match) {
    // If the user introduced themselves, extract their name from the match
    const name = match[1]
    return {
      type: 'GREETING_WITH_NAME',
      name,
    }
  } else if (lowerCaseInput.includes('spots in kerala')) {
    return { type: 'SPOTS_KERALA' }
  } else if (lowerCaseInput.includes('spots in goa')) {
    return { type: 'SPOTS_GOA' }
  } else if (lowerCaseInput.includes('spots in west bengal')) {
    return { type: 'SPOTS_WEST_BENGAL' }
  } else if (lowerCaseInput.includes('spots in rajasthan')) {
    return { type: 'SPOTS_RAJASTHAN' }
  } else if (lowerCaseInput.includes('spots in new delhi')) {
    return { type: 'SPOTS_NEW_DELHI' }
  } else if (lowerCaseInput.includes('your name')) {
    return { type: 'YOUR_NAME' }
  } else if (lowerCaseInput.includes('packages in kerala')) {
    return { type: 'PACKAGE_KERALA' }
  } else if (lowerCaseInput.includes('packages in goa')) {
    return { type: 'PACKAGE_GOA' }
  } else if (lowerCaseInput.includes('packages in west bengal')) {
    return { type: 'PACKAGE_WEST_BENGAL' }
  } else if (lowerCaseInput.includes('packages in rajasthan')) {
    return { type: 'PACKAGE_RAJASTHAN' }
  } else if (lowerCaseInput.includes('packages in new delhi')) {
    return { type: 'PACKAGE_NEW_DELHI' }
  }
  return { type: 'UNKNOWN' }
}

export default parseMessage
