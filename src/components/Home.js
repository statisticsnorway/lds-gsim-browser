import React, { useContext, useState } from 'react'
import { Dropdown, Header } from 'semantic-ui-react'

import { AppContext } from '../AppContext'
import { HOME } from '../enums'
import Domain from './Domain'

function Home () {
  const context = useContext(AppContext)
  const language = context.language
  const options = context.uiSchemas.map((uiSchema, index) => ({
    key: uiSchema.displayName,
    value: index,
    text: uiSchema.displayName,
    content: (
      <Header content={uiSchema.displayName} subheader={uiSchema.description} />
    )
  }))

  const [domain, setDomain] = useState('')

  return (
    <>
      <Dropdown
        search
        selection
        fluid
        options={options}
        placeholder={HOME.SEARCH[language]}
        onChange={(e, { value }) => setDomain(value)}
        value={domain}
      />
      {domain !== '' && <Domain domainIndex={domain} />}
    </>
  )
}

export default Home
