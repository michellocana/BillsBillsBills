import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { COLOR_WHITE } from '../constants/colors'
import ActionButton, { ActionButtonColor, ActionButtonType } from './ActionButton'

import { CardType } from './Card'
import Modal from './Modal'

const s = StyleSheet.create({
  text: {
    fontSize: 16,
    color: COLOR_WHITE,
    fontWeight: '700'
  },

  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  }
})

type TemplateDeleteModalProps = {
  isOpen: boolean
  isSaving: boolean
  template: Template
  onClose(): void
  onConfirm(): void
}

export default function TemplateDeleteModal({
  isOpen,
  isSaving,
  template,
  onClose,
  onConfirm
}: TemplateDeleteModalProps) {
  return (
    <Modal isOpen={isOpen} isSaving={isSaving} type={CardType.Danger} onClose={onClose}>
      <Text style={s.text}>Excluir template "{template.name}"?</Text>
      <View style={s.actions}>
        <ActionButton
          onPress={onConfirm}
          type={ActionButtonType.Trash}
          color={ActionButtonColor.Danger}
        >
          Excluir
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
