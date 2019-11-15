import React, { useContext, useEffect, useState } from 'react'
import useAxios from 'axios-hooks'
import { Segment } from 'semantic-ui-react'

import { AppContext } from './AppContext'
import { createUiSchema } from './utilities/schema-handling/SchemaHandling'
import { ErrorMessage, Home } from './components'
import AppMenu from './AppMenu'
import AppSettings from './AppSettings'

function App () {
  const context = useContext(AppContext)

  const [{ data, loading, error }] = useAxios(context.backend + '?schema=embed')

  const [settingsOpen, setSettingsOpen] = useState(false)

  useEffect(() => {
    if (!loading && !error) {
      context.setSchemas(data)
      context.setUiSchemas(data.map(element => createUiSchema(element)))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, loading, data])

  return (
    <>
      <AppMenu error={error} loading={loading} setSettingsOpen={setSettingsOpen} />
      <Segment basic loading={loading}>
        {!loading && !error && <Home />}
        {error && <ErrorMessage error={error} />}
      </Segment>
      <AppSettings error={error} loading={loading} open={settingsOpen} setSettingsOpen={setSettingsOpen} />
    </>
  )
}

export default App
