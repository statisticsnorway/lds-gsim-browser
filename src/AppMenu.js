import React, { useContext } from 'react'
import { Dropdown, Menu } from 'semantic-ui-react'

import { AppContext, LANGUAGES } from './AppContext'
import { APP } from './enums'

function AppMenu ({ loading, error, setSettingsOpen }) {
  const language = useContext(AppContext).language
  const setLanguage = useContext(AppContext).setLanguage

  return (
    <Menu secondary size='huge'>
      <Menu.Item header content={APP.HEADER[language]} />
      <Menu.Item icon={{
        name: !loading ? 'circle' : 'circle notch',
        color: loading ? 'yellow' : !error ? 'green' : 'red',
        loading: loading
      }}
      />
      <Menu.Menu position='right'>
        <Menu.Item onClick={() => setSettingsOpen(true)} icon={{
          name: 'cog',
          color: 'teal',
          size: 'large'
        }}
        />
        <Dropdown item text={`${APP.LANGUAGE[language]} (${APP.LANGUAGE_CHOICE[language]})`}>
          <Dropdown.Menu>
            {Object.keys(LANGUAGES).map(languageName =>
              <Dropdown.Item
                key={languageName}
                content={APP[languageName][language]}
                onClick={() => setLanguage(LANGUAGES[languageName])}
              />
            )}
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Menu>
    </Menu>
  )
}

export default AppMenu
