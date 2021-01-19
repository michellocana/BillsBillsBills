import React, { ReactNode, useEffect, useRef } from 'react'
import {
  Animated,
  KeyboardAvoidingView,
  Modal as RNModal,
  ModalProps as RNModalProps,
  StyleSheet,
  TouchableWithoutFeedback,
  View
} from 'react-native'

import Card, { CardType } from './Card'
import Spinner from './Spinner'

import { DEFAULT_ANIMATION_DURATION } from '../../constants/animation'
import { COLOR_DARK_GRAY } from '../../constants/colors'

const s = StyleSheet.create({
  backdrop: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.9,
    backgroundColor: COLOR_DARK_GRAY
  },

  content: {
    width: '100%',
    height: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    position: 'relative'
  },

  loader: {
    position: 'absolute',
    zIndex: 1,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card: {
    width: '100%',
    margin: 0
  },

  loaderBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_DARK_GRAY,
    opacity: 0.6
  }
})

type ModalProps = RNModalProps & {
  isOpen: boolean
  isSaving: boolean
  onClose(): void
  children: ReactNode
  type: CardType
}

export default function Modal({
  isOpen,
  isSaving,
  onClose,
  children,
  type,
  ...otherProps
}: ModalProps) {
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    Animated.timing(opacity, {
      toValue: Number(isSaving),
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true
    }).start()
  }, [isSaving])

  return (
    <RNModal
      transparent
      visible={isOpen}
      animationType='fade'
      onRequestClose={onClose}
      {...otherProps}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={s.backdrop} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView style={s.content} pointerEvents='box-none'>
        <Animated.View style={[s.loader, { opacity }]} pointerEvents={isSaving ? 'auto' : 'none'}>
          <View style={s.loaderBackground} />
          <Spinner />
        </Animated.View>

        <Card type={type} style={s.card}>
          {children}
        </Card>
      </KeyboardAvoidingView>
    </RNModal>
  )
}
