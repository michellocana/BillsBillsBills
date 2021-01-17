import React, { useEffect, useRef } from 'react'
import { Animated, StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import { useHistory, useLocation } from 'react-router-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1, COLOR_WHITE } from '../constants/colors'
import { DEFAULT_ANIMATION_DURATION } from '../constants/animation'

const s = StyleSheet.create({
  link: {
    flex: 1,
    alignItems: 'center',
    padding: 8
  },

  text: {
    fontSize: 12,
    flexDirection: 'column'
  },

  icon: {
    fontSize: 24,
    marginBottom: 4
  }
})

type BottomBarLinkProps = {
  to: string
  icon: string
  children: string
}

export default function BottomBarLink({ to, icon, children }: BottomBarLinkProps) {
  const history = useHistory()
  const location = useLocation()
  const isActive = location.pathname === to
  const color = useRef(new Animated.Value(Number(isActive))).current
  const AnimatedIcon = useRef(Animated.createAnimatedComponent(Icon)).current
  const animatedColor = {
    color: color.interpolate({
      inputRange: [0, 1],
      outputRange: [COLOR_WHITE, COLOR_GREEN_1]
    })
  }

  useEffect(() => {
    Animated.timing(color, {
      toValue: Number(isActive),
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: false
    }).start()
  }, [isActive])

  return (
    <TouchableNativeFeedback onPress={() => history.push(to)}>
      <View style={s.link}>
        <Animated.Text style={animatedColor}>
          <AnimatedIcon name={icon} size={30} style={[s.icon]} />
        </Animated.Text>

        <Animated.Text style={[s.text, animatedColor]}>{children}</Animated.Text>
      </View>
    </TouchableNativeFeedback>
  )
}
