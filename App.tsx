import React, { Fragment } from 'react'
import { SafeAreaView, StatusBar } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { HOME_ROUTE } from './src/constants/routes'

import AuthProvider from './src/contexts/AuthProvider'

import Home from './src/screens/Home'

dayjs.extend(customParseFormat)
dayjs.locale('pt-br')

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <AuthProvider>
          <NativeRouter>
            <Route exact path={HOME_ROUTE} component={Home} />
          </NativeRouter>
        </AuthProvider>
      </SafeAreaView>
    </Fragment>
  )
}
