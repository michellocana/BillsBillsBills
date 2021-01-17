import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1_RGB, COLOR_LIGHT_RED_RGB } from '../constants/colors'
import { DEFAULT_ANIMATION_DURATION } from '../constants/animation'

type ExpireDayProps = {
  day: number
  type?: ExpireDayType
}

export enum ExpireDayType {
  Danger,
  Success
}

const s = StyleSheet.create({
  icon: {
    fontSize: 16,
    marginLeft: 8
  }
})

export default function ExpireDay({ day, type = ExpireDayType.Success }: ExpireDayProps) {
  const colors: Record<ExpireDayType, any> = {
    [ExpireDayType.Danger]: COLOR_LIGHT_RED_RGB,
    [ExpireDayType.Success]: COLOR_GREEN_1_RGB
  }
  const color = useRef(new Animated.Value(type)).current
  const AnimatedIcon = useRef(Animated.createAnimatedComponent(Icon)).current

  useEffect(() => {
    Animated.timing(color, {
      toValue: type,
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: false
    }).start()
  }, [type])

  return (
    <>
      {' '}
      <Animated.Text
        style={{
          color: color.interpolate({
            inputRange: Object.keys(colors).map(Number),
            outputRange: Object.values(colors)
          })
        }}
      >
        <AnimatedIcon name='calendar' style={[s.icon]} />
        {` ${day}`}
      </Animated.Text>
    </>
  )
}
