import React, { useState } from 'react'
import { StyleSheet, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_BLACK, COLOR_GREEN_1 } from '../../constants/colors'
import useBills from '../../hooks/useBills'

import TemplateFormModal from './TemplateFormModal'

type TemplateCreateModalProps = {
  buttonOffset?: number
}

const s = StyleSheet.create({
  touchableWrapper: {
    position: 'absolute',
    width: 48,
    height: 48,
    right: 16,
    bottom: 16,
    backgroundColor: COLOR_GREEN_1,
    borderRadius: 48,
    overflow: 'hidden'
  },

  iconWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },

  icon: {
    color: COLOR_BLACK
  }
})

export default function TemplateCreateModal({ buttonOffset }: TemplateCreateModalProps) {
  const { onTemplateCreate } = useBills()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <TemplateFormModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onSave={async template => await onTemplateCreate(template)}
      />

      {buttonOffset !== undefined && (
        <View style={[s.touchableWrapper, { bottom: buttonOffset + s.touchableWrapper.bottom }]}>
          <TouchableNativeFeedback onPress={() => setIsOpen(true)}>
            <View style={s.iconWrapper}>
              <Icon name='plus' size={24} style={s.icon} />
            </View>
          </TouchableNativeFeedback>
        </View>
      )}
    </>
  )
}
