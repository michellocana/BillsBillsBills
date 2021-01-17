import React, { useState } from 'react'
import { TouchableNativeFeedback, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1, COLOR_WHITE, COLOR_LIGHT_RED } from '../constants/colors'
import Card, { CardType } from './Card'
import ExpireDay, { ExpireDayType } from './ExpireDay'
import TemplateFormModal from './TemplateFormModal'
import useBills from '../hooks/useBills'
import TemplateDeleteModal from './TemplateDeleteModal'

const s = StyleSheet.create({
  textWrapper: {
    flexDirection: 'row',
    alignItems: 'center'
  },

  text: {
    flex: 1,
    color: COLOR_WHITE,
    fontSize: 16
  },

  iconTouchable: {
    padding: 5,
    marginVertical: -5,
    marginLeft: 5,
    marginRight: -5
  },

  icon: {
    color: COLOR_LIGHT_RED
  }
})

export default function TemplateCard({ ...template }: Template) {
  const { onTemplateChange, onTemplateDelete } = useBills()
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isDeletingTemplate, setIsDeletingTemplate] = useState(false)

  return (
    <>
      <TouchableNativeFeedback onPress={() => setIsEditModalOpen(true)}>
        <Card
          key={template.id}
          style={s.textWrapper}
          type={template.isEnabled ? CardType.Success : CardType.Danger}
        >
          <Text style={s.text}>
            {template.name}
            <ExpireDay
              day={template.expireDay}
              type={template.isEnabled ? ExpireDayType.Success : ExpireDayType.Danger}
            />
          </Text>

          <Switch
            trackColor={{
              false: COLOR_LIGHT_RED,
              true: COLOR_GREEN_1
            }}
            thumbColor={COLOR_WHITE}
            value={template.isEnabled}
            onValueChange={isEnabled => onTemplateChange({ ...template, isEnabled })}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            style={s.iconTouchable}
            onPress={() => setIsDeleteModalOpen(true)}
          >
            <Icon name='trash-2' size={24} style={s.icon} />
          </TouchableOpacity>
        </Card>
      </TouchableNativeFeedback>

      <TemplateFormModal
        template={template}
        isOpen={isEditModalOpen}
        onSave={template => onTemplateChange(template)}
        onClose={() => setIsEditModalOpen(false)}
      />

      <TemplateDeleteModal
        isSaving={isDeletingTemplate}
        isOpen={isDeleteModalOpen}
        template={template}
        onConfirm={async () => {
          setIsDeletingTemplate(true)
          await onTemplateDelete(template)
          setIsDeletingTemplate(false)
          setIsDeleteModalOpen(false)
        }}
        onClose={() => setIsDeleteModalOpen(false)}
      />
    </>
  )
}
