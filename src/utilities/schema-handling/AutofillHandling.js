const autofillTypes = {
  user: ['createdBy', 'lastUpdatedBy']
}

export const setAutofillProperties = (domainProperties, property) => {
  const properties = {
    name: property,
    displayName: domainProperties[property].displayName,
    description: domainProperties[property].description
  }

  if (domainProperties[property].hasOwnProperty('format')) {
    properties.type = domainProperties[property].format

    if (domainProperties[property].format === 'date-time') {
      properties.icon = 'calendar alternate outline'
    }
  } else {
    properties.type = domainProperties[property].type
  }

  [{ type: 'user', icon: 'user outline' }].forEach(value => {
    if (autofillTypes[value.type].includes(property)) {
      properties.icon = value.icon
    }
  })

  return properties
}
