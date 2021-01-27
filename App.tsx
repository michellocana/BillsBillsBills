import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import { NativeRouter, Route, Switch } from 'react-router-native'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { HOME_ROUTE, TEMPLATES_ROUTE } from './src/constants/routes'
import { COLOR_BLACK, COLOR_DARK_GRAY } from './src/constants/colors'

import AuthProvider from './src/contexts/AuthProvider'
import BillsProvider from './src/contexts/BillsProvider'
import BottomBarProvider, { BottomBarContext } from './src/contexts/BottomBarProvider'

import BottomBar from './src/components/UI/BottomBar'

import Home from './src/screens/Home'
import Templates from './src/screens/Templates'

dayjs.extend(customParseFormat)
dayjs.locale('pt-br')

const s = StyleSheet.create({
  safeAreaView: {
    backgroundColor: COLOR_DARK_GRAY
  },

  routerWrapper: {
    minHeight: '100%'
  }
})

// TODO app icon
export default function App() {
  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor={COLOR_BLACK} />
      <SafeAreaView style={s.safeAreaView}>
        <AuthProvider>
          <BillsProvider>
            <BottomBarProvider>
              <BottomBarContext.Consumer>
                {({ layout: bottomBarLayout }) => (
                  <NativeRouter>
                    <View style={[s.routerWrapper, { paddingBottom: bottomBarLayout.height }]}>
                      <Switch>
                        <Route exact path={HOME_ROUTE} component={Home} />
                        <Route path={TEMPLATES_ROUTE} component={Templates} />
                      </Switch>
                      <BottomBar />
                    </View>
                  </NativeRouter>
                )}
              </BottomBarContext.Consumer>
            </BottomBarProvider>
          </BillsProvider>
        </AuthProvider>
      </SafeAreaView>
    </>
  )
}
