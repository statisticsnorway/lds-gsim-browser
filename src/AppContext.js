import React, { createContext, useState } from 'react'

const LDS = `${process.env.REACT_APP_LDS}/ns`

export const LANGUAGES = {
  ENGLISH: 'en',
  NORWEGIAN: 'nb'
}

export const AppContext = createContext({
  backend: LDS,
  language: LANGUAGES.NORWEGIAN,
  schemas: [],
  uiSchemas: []
})

export const AppContextProvider = (props) => {
  const [backend, setBackend] = useState(LDS)
  const [language, setLanguage] = useState(LANGUAGES.NORWEGIAN)
  const [schemas, setSchemas] = useState([])
  const [uiSchemas, setUiSchemas] = useState([])

  return (
    <AppContext.Provider
      value={{
        backend,
        setBackend,
        language,
        setLanguage,
        schemas,
        setSchemas,
        uiSchemas,
        setUiSchemas
      }}
    >
      {props.children}
    </AppContext.Provider>
  )
}
