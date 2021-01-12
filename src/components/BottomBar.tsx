import React from 'react'
import { LayoutRectangle, StyleSheet, View } from 'react-native'
import { COLOR_GRAY } from '../constants/colors'

import { HOME_ROUTE, TEMPLATES_ROUTE } from '../constants/routes'

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

type BottomBarProps = {
  onLayout(layout: LayoutRectangle): void
}

export default function BottomBar({ onLayout }: BottomBarProps) {
  return (
    <View style={s.container} onLayout={event => onLayout(event.nativeEvent.layout)}>
      <BottomBarLink to={HOME_ROUTE} icon='dollar-sign'>
        Contas
      </BottomBarLink>

      <BottomBarLink to={TEMPLATES_ROUTE} icon='tag'>
        Templates
      </BottomBarLink>
    </View>
  )
}
