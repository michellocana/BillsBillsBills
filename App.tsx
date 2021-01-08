import React, { Fragment } from 'react'
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { HOME_ROUTE } from './src/constants/routes'

import AuthProvider from './src/contexts/AuthProvider'

import Home from './src/screens/Home'
import { COLOR_BLACK, COLOR_DARK_GRAY } from './src/constants/colors'

dayjs.extend(customParseFormat)
dayjs.locale('pt-br')

const s = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLOR_DARK_GRAY
  }
})

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle='light-content' backgroundColor={COLOR_BLACK} />
      <SafeAreaView style={s.safeAreaView}>
        <AuthProvider>
          <NativeRouter>
            <Route exact path={HOME_ROUTE} component={Home} />
          </NativeRouter>
        </AuthProvider>
      </SafeAreaView>
    </Fragment>
  )
}
