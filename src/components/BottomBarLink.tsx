import React from 'react'
import { StyleSheet, Text, TouchableNativeFeedback, View } from 'react-native'
import { useHistory, useLocation } from 'react-router-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1, COLOR_WHITE } from '../constants/colors'

const s = StyleSheet.create({
  link: {
    flex: 1,
    alignItems: 'center',
    padding: 8
  },

  text: {
    fontSize: 12,
    color: COLOR_WHITE,
    marginTop: 4
  },

  textActive: {
    color: COLOR_GREEN_1
  },

  icon: {
    fontSize: 24,
    marginTop: 0
  }
})

type BottomBarLinkProps = {
  to: string
  icon: string
  children: string
}

// TODO animate color transition
export default function BottomBarLink({ to, icon, children }: BottomBarLinkProps) {
  const history = useHistory()
  const location = useLocation()
  const isActive = location.pathname === to

  return (
    <TouchableNativeFeedback onPress={() => history.push(to)}>
      <View style={s.link}>
        <Icon name={icon} size={30} style={[s.text, s.icon, isActive && s.textActive]} />
        <Text style={[s.text, isActive && s.textActive]}>{children}</Text>
      </View>
    </TouchableNativeFeedback>
  )
}
