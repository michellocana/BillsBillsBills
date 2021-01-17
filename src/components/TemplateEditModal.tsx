import React, { useEffect, useRef, useState } from 'react'
import {
  KeyboardAvoidingView,
  Modal,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View as KeyboardAvoid
} from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_DARK_GRAY, COLOR_GREEN_1, COLOR_LIGHT_RED, COLOR_WHITE } from '../constants/colors'
import Card, { CardType } from './Card'

type TemplateEditModalProps = {
  isOpen: boolean
  initialName: string
  initialExpireDay: number
  onClose(): void
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
    margin: 0
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
  }
})

export default function TemplateEditModal({
  isOpen,
  initialName,
  initialExpireDay,
  onClose
}: TemplateEditModalProps) {
  const [name, setName] = useState(initialName)
  const [expireDay, setExpireDay] = useState(initialExpireDay.toString())
  const nameTextInputRef = useRef<TextInput>(null)

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType='fade'
      onRequestClose={onClose}
      onShow={() => {
        if (nameTextInputRef.current) {
          nameTextInputRef.current.focus()
        }
      }}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <KeyboardAvoid style={s.backdrop} />
      </TouchableWithoutFeedback>

      <KeyboardAvoidingView style={s.content} pointerEvents='box-none'>
        <Card type={CardType.Success} style={s.card}>
          <KeyboardAvoid>
            <TextInput ref={nameTextInputRef} value={name} style={s.input} onChangeText={setName} />

            <TextInput
              value={expireDay}
              style={s.input}
              onChangeText={setExpireDay}
              keyboardType='numeric'
              maxLength={2}
            />

            <KeyboardAvoid style={s.actions}>
              <TouchableOpacity
                style={s.iconTouchable}
                onPress={() => {
                  // TODO onSavePress
                  onClose()
                }}
              >
                <Icon name='check' style={[s.icon, s.save]} />
                <Text style={[s.action, s.save]}>Salvar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={s.iconTouchable} onPress={onClose}>
                <Icon name='x' style={[s.icon, s.cancel]} />
                <Text style={[s.action, s.cancel]}>Cancelar</Text>
              </TouchableOpacity>
            </KeyboardAvoid>
          </KeyboardAvoid>
        </Card>
      </KeyboardAvoidingView>
    </Modal>
  )
}
