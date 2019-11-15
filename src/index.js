import React from 'react'
import ReactDOM from 'react-dom'
import nb from 'date-fns/locale/nb'
import { registerLocale, setDefaultLocale } from 'react-datepicker'
import 'semantic-ui-css/semantic.min.css'
import 'react-table/react-table.css'
import 'react-datepicker/dist/react-datepicker.css'

import App from './App'
import { AppContextProvider, LANGUAGES } from './AppContext'

registerLocale(LANGUAGES.norwegian, nb)
setDefaultLocale(LANGUAGES.norwegian)

ReactDOM.render(
  <AppContextProvider>
    <App />
  </AppContextProvider>,
  document.getElementById('root')
)
