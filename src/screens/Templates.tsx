import React from 'react'
import { StyleSheet, Text } from 'react-native'

import ScreenScrollView from '../components/ScreenScrollView'

import { COLOR_WHITE } from '../constants/colors'

import useBills from '../hooks/useBills'

const s = StyleSheet.create({
  text: {
    color: COLOR_WHITE
  }
})

export default function Templates() {
  const { billsResponse } = useBills()

  return (
    <ScreenScrollView>
      {billsResponse.templates.map(template => (
        <Text key={template.id} style={s.text}>
          {template.name}
        </Text>
      ))}
    </ScreenScrollView>
  )
}
