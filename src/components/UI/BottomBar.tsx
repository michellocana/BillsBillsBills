import React from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR_GRAY } from '../../constants/colors'

import { HOME_ROUTE, TEMPLATES_ROUTE } from '../../constants/routes'
import useBottomBar from '../../hooks/useBottomBar'

import BottomBarLink from './BottomBarLink'

const s = StyleSheet.create({
  container: {
    flexDirection: 'row',
    elevation: 10,
    backgroundColor: COLOR_GRAY,
    position: 'absolute',
    bottom: 0,
    left: 0
  }
})

export default function BottomBar() {
  const { setLayout } = useBottomBar()

  return (
    <View
      style={s.container}
      onLayout={event => setLayout({ height: event.nativeEvent.layout.height })}
    >
      <BottomBarLink to={HOME_ROUTE} icon='dollar-sign'>
        Contas
      </BottomBarLink>

      <BottomBarLink to={TEMPLATES_ROUTE} icon='tag'>
        Templates
      </BottomBarLink>
    </View>
  )
}
