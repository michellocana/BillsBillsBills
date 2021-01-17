import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1, COLOR_LIGHT_RED, COLOR_WHITE } from '../constants/colors'
import { CardType } from './Card'

import Modal from './Modal'

type TemplateFormModalProps = {
  isOpen: boolean
  template: Template
  onClose(): void
  onSave(template: Template): void
}

const s = StyleSheet.create({
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

export default function TemplateFormModal({
  isOpen,
  template,
  onClose,
  onSave
}: TemplateFormModalProps) {
  const [name, setName] = useState(template.name)
  const [expireDay, setExpireDay] = useState(template.expireDay.toString())
  const [isSaving, setIsSaving] = useState(false)
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

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isSaving={isSaving}
      type={CardType.Success}
      onShow={() => {
        requestAnimationFrame(() => {
          if (nameTextInputRef.current) {
            nameTextInputRef.current.focus()
          }
        })
      }}
    >
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
    </Modal>
  )
}
