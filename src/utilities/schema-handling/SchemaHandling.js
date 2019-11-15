import { setAutofillProperties } from './AutofillHandling'
import { setProperties } from './PropertyHandling'

const uiGrouping = {
  autofilled: ['id', 'createdDate', 'createdBy', 'version', 'versionValidFrom', 'lastUpdatedDate', 'lastUpdatedBy', 'validFrom', 'validUntil'],
  common: ['name', 'description', 'administrativeStatus', 'versionRationale', 'administrativeDetails', 'agentInRoles']
}

export const createUiSchema = (schema) => {
  const domain = schema.$ref.replace('#/definitions/', '')
  const domainProperties = schema.definitions[domain].properties
  const uiSchema = {
    autofilled: {},
    common: {},
    unique: {},
    displayName: schema.definitions[domain].displayName,
    description: schema.definitions[domain].description
  }

  Object.keys(domainProperties).forEach(property => {
    if (!property.startsWith('_link_property_')) {
      if (uiGrouping.autofilled.includes(property)) {
        uiSchema.autofilled[property] = setAutofillProperties(domainProperties, property)
      } else if (uiGrouping.common.includes(property)) {
        uiSchema.common[property] = setProperties(schema.definitions, domain, property)
      } else {
        uiSchema.unique[property] = setProperties(schema.definitions, domain, property)
      }
    }
  })

  return uiSchema
}
