import { types } from '@babel/core'
import React, { ReactNode } from 'react'
import { StyleSheet, View } from 'react-native'
import { COLOR_GRAY, COLOR_RED, COLOR_GREEN_1 } from '../constants/colors'

type CardProps = {
  children: ReactNode
  type: CardType
}

export enum CardType {
  Success = 'Success',
  Danger = 'Danger'
}

const s = StyleSheet.create({
  container: {
    margin: 8,
    padding: 16,
    backgroundColor: COLOR_GRAY,
    borderRadius: 4,
    borderBottomWidth: 4
  },

  containerDanger: {
    borderBottomColor: COLOR_RED
  },

  containerSuccess: {
    borderBottomColor: COLOR_GREEN_1
  }
})

export default function Card({ children, type }: CardProps) {
  const typeStyle: Partial<Record<CardType, any>> = {
    [CardType.Success]: s.containerSuccess,
    [CardType.Danger]: s.containerDanger
  }

  return <View style={[s.container, typeStyle[type]]}>{children}</View>
}
