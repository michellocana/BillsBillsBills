import React from 'react'
import { StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1, COLOR_LIGHT_RED, COLOR_RED } from '../constants/colors'

type ExpireDayProps = {
  day: number
  type?: ExpireDayType
}

export enum ExpireDayType {
  Success = 'Success',
  Danger = 'Danger'
}

const s = StyleSheet.create({
  icon: {
    fontSize: 16,
    marginLeft: 8
  },

  iconSuccess: {
    color: COLOR_GREEN_1
  },

  iconDanger: {
    color: COLOR_LIGHT_RED
  }
})

// TODO animate type change
export default function ExpireDay({ day, type = ExpireDayType.Success }: ExpireDayProps) {
  const typeStyle: Record<ExpireDayType, any> = {
    [ExpireDayType.Success]: s.iconSuccess,
    [ExpireDayType.Danger]: s.iconDanger
  }

  return (
    <>
      {' '}
      <Icon name='calendar' style={[s.icon, typeStyle[type]]} />
      {` ${day}`}
    </>
  )
}
