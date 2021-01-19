import React, { useCallback, useEffect, useRef, useState } from 'react'
import { StyleSheet, TextInput, View } from 'react-native'

import { COLOR_WHITE } from '../../constants/colors'
import ActionButton, { ActionButtonColor, ActionButtonType } from '../UI/ActionButton'
import { CardType } from '../UI/Card'

import Modal from '../UI/Modal'

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
        <ActionButton
          onPress={submit}
          type={ActionButtonType.Save}
          color={ActionButtonColor.Success}
        >
          Salvar
        </ActionButton>

        <ActionButton
          onPress={onClose}
          type={ActionButtonType.Cancel}
          color={ActionButtonColor.Neutral}
        >
          Cancelar
        </ActionButton>
      </View>
    </Modal>
  )
}
