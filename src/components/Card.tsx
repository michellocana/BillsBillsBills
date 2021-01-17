import React, { ReactNode, useEffect, useRef } from 'react'
import { Animated, StyleSheet, ViewProps } from 'react-native'
import { DEFAULT_ANIMATION_DURATION } from '../constants/animation'
import { COLOR_GRAY, COLOR_LIGHT_RED_RGB, COLOR_GREEN_1_RGB } from '../constants/colors'

type CardProps = ViewProps & {
  children: ReactNode
  type: CardType
}

export enum CardType {
  Danger,
  Success
}

const s = StyleSheet.create({
  container: {
    margin: 8,
    padding: 16,
    backgroundColor: COLOR_GRAY,
    borderRadius: 4,
    borderBottomWidth: 4
  }
})

export default function Card({ children, type, style, ...otherProps }: CardProps) {
  const borderColors: Record<CardType, string> = {
    [CardType.Danger]: COLOR_LIGHT_RED_RGB,
    [CardType.Success]: COLOR_GREEN_1_RGB
  }
  const borderColor = useRef(new Animated.Value(type)).current

  useEffect(() => {
    Animated.timing(borderColor, {
      toValue: type,
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: false
    }).start()
  }, [type])

  return (
    <Animated.View
      style={[
        s.container,
        {
          borderColor: borderColor.interpolate({
            inputRange: Object.keys(borderColors).map(Number),
            outputRange: Object.values(borderColors)
          })
        },
        style
      ]}
      {...otherProps}
    >
      {children}
    </Animated.View>
  )
}
