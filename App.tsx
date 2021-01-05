import React, { Fragment } from 'react'
import { SafeAreaView, ScrollView, StatusBar } from 'react-native'
import { NativeRouter, Route } from 'react-router-native'

import Home from './src/pages/Home'

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
