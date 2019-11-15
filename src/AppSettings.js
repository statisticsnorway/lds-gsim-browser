import React, { useContext, useState } from 'react'
import { Button, Container, Form, Header, Icon, Modal, Popup } from 'semantic-ui-react'

import { AppContext } from './AppContext'
import { SETTINGS } from './enums'
import ErrorMessage from './components/ErrorMessage'

function AppSettings ({ error, loading, open, setSettingsOpen }) {
  const context = useContext(AppContext)
  const language = context.language

  const [location, setLocation] = useState(context.backend)

  return (
    <Modal open={open} onClose={() => setSettingsOpen(false)}>
      <Header icon={{ name: 'cog', color: 'teal' }} content={SETTINGS.HEADER[language]} />
      <Modal.Content>
        <Form size='large'>
          <Popup flowing size='large' position='top center' trigger={
            <Form.Input label={SETTINGS.LOCATION[language]} placeholder={SETTINGS.LOCATION[language]}
                        value={location} onChange={(e) => setLocation(e.target.value)} disabled={loading} />
          }>
            <Icon color='blue' name='info circle' />
            {SETTINGS.LOCATION_INFO[language]}
          </Popup>
        </Form>
        {error && <ErrorMessage error={error} />}
        <Container textAlign='center' style={{ margin: '2em' }}>
          <Button size='massive' color='teal' animated disabled={loading} onClick={() => context.setBackend(location)}>
            <Button.Content visible>{SETTINGS.APPLY[language]}</Button.Content>
            <Button.Content hidden><Icon fitted name='sync' /></Button.Content>
          </Button>
        </Container>
      </Modal.Content>
    </Modal>
  )
}

export default AppSettings
