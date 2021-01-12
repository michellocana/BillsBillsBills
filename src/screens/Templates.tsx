import React from 'react'
import { ScrollView, StyleSheet, Text } from 'react-native'

import { COLOR_WHITE } from '../constants/colors'

const s = StyleSheet.create({
  scrollView: {
    flex: 1
  },

  text: {
    color: COLOR_WHITE
  }
})

export default function Templates() {
  return (
    <ScrollView style={s.scrollView}>
      <Text style={s.text}>templates</Text>
    </ScrollView>
  )
}
