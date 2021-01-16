import { types } from '@babel/core'
import React, { ReactNode } from 'react'
import { StyleSheet, View, ViewProps } from 'react-native'
import { COLOR_GRAY, COLOR_RED, COLOR_GREEN_1 } from '../constants/colors'

type CardProps = ViewProps & {
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

export default function Card({ children, type, style, ...otherProps }: CardProps) {
  const typeStyle: Record<CardType, any> = {
    [CardType.Success]: s.containerSuccess,
    [CardType.Danger]: s.containerDanger
  }

  return (
    <View style={[s.container, typeStyle[type], style]} {...otherProps}>
      {children}
    </View>
  )
}
