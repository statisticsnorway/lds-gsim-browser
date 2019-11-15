import React from 'react'
import { Message } from 'semantic-ui-react'

import { getNestedObject } from '../utilities/Common'

function ErrorMessage ({ error }) {
  const resolveError = getNestedObject(error, ['response', 'data'])

  return <Message error content={resolveError === undefined ? error.toString() : resolveError} />

}

export default ErrorMessage
