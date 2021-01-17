import React, { useCallback, useEffect, useRef, useState } from 'react'
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_DARK_GRAY, COLOR_GREEN_1, COLOR_LIGHT_RED, COLOR_WHITE } from '../constants/colors'
import { DEFAULT_ANIMATION_DURATION } from '../constants/animation'

import Card, { CardType } from './Card'
import Spinner from './Spinner'

type TemplateFormModalProps = {
  isOpen: boolean
  template: Template
  onClose(): void
  onSave(template: Template): void
}

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
    padding: 16
  },

  input: {
    height: 40,
    borderColor: COLOR_WHITE,
    borderWidth: 1,
    borderRadius: 2,
    color: COLOR_WHITE,
    padding: 8,
    fontSize: 16,
    marginBottom: 16
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },

  card: {
    width: '100%',
    margin: 0,
    position: 'relative'
  },

  iconTouchable: {
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center'
  },

  icon: {
    marginRight: 4,
    fontSize: 24
  },

  action: {
    fontSize: 16
  },

  cancel: {
    color: COLOR_LIGHT_RED
  },

  save: {
    color: COLOR_GREEN_1
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

  loaderBackground: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: COLOR_DARK_GRAY,
    opacity: 0.6
  }
})

export default function TemplateFormModal({
  isOpen,
  template,
  onClose,
  onSave
}: TemplateFormModalProps) {
  const [name, setName] = useState(template.name)
  const [expireDay, setExpireDay] = useState(template.expireDay.toString())
  const [isSaving, setIsSaving] = useState(false)
  const opacityValue = useRef(new Animated.Value(0)).current
  const nameTextInputRef = useRef<TextInput>(null)
  const submit = useCallback(async () => {
    setIsSaving(true)
    await onSave({ ...template, name, expireDay: Number(expireDay) })
    setIsSaving(false)
    onClose()
  }, [name, expireDay])

  useEffect(() => {
    if (!isOpen) {
      setName(template.name)
      setExpireDay(template.expireDay.toString())
    }
  }, [isOpen])

  useEffect(() => {
    Animated.timing(opacityValue, {
      toValue: Number(isSaving),
      duration: DEFAULT_ANIMATION_DURATION,
      useNativeDriver: true
    }).start()
  }, [isSaving])

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType='fade'
      onRequestClose={onClose}
      onShow={() => {
        requestAnimationFrame(() => {
          if (nameTextInputRef.current) {
            nameTextInputRef.current.focus()
          }
        })
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={s.backdrop} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView style={s.content} pointerEvents='box-none'>
        <Card type={CardType.Success} style={s.card}>
          <Animated.View
            style={[s.loader, { opacity: opacityValue }]}
            pointerEvents={isSaving ? 'auto' : 'none'}
          >
            <View style={s.loaderBackground} />
            <Spinner />
          </Animated.View>

          <View>
            <TextInput
              ref={nameTextInputRef}
              value={name}
              style={s.input}
              onChangeText={setName}
              onSubmitEditing={submit}
            />

            <TextInput
              value={expireDay}
              style={s.input}
              onChangeText={setExpireDay}
              keyboardType='numeric'
              maxLength={2}
              onSubmitEditing={submit}
            />

            <View style={s.actions}>
              <TouchableOpacity style={s.iconTouchable} onPress={submit}>
                <Icon name='check' style={[s.icon, s.save]} />
                <Text style={[s.action, s.save]}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.iconTouchable} onPress={onClose}>
                <Icon name='x' style={[s.icon, s.cancel]} />
                <Text style={[s.action, s.cancel]}>Cancelar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Card>
      </KeyboardAvoidingView>
    </Modal>
  )
}
