import React, { Fragment } from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import Home from './src/pages/Home'

dayjs.extend(customParseFormat)
dayjs.locale('pt-br')

export default function App() {
  return (
    <Fragment>
      <StatusBar barStyle='dark-content' />
      <SafeAreaView>
        <ScrollView contentInsetAdjustmentBehavior='automatic'>
          <NativeRouter>
            <Route exact path='/' component={Home} />
          </NativeRouter>
        </ScrollView>
      </SafeAreaView>
    </Fragment>
  )
}
