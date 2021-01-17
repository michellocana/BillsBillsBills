import React, { useState } from 'react'
import { TouchableNativeFeedback, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_RED, COLOR_GREEN_1, COLOR_WHITE, COLOR_LIGHT_RED } from '../constants/colors'
import Card, { CardType } from './Card'
import ExpireDay from './ExpireDay'
import TemplateModal from './TemplateModal'
import useBills from '../hooks/useBills'

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
  const { onTemplateChange } = useBills()
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          setIsModalOpen(true)
        }}
      >
        <Card
          key={template.id}
          style={s.textWrapper}
          type={CardType.Success} // TODO change this based on enabled flag
        >
          <Text style={s.text}>
            {template.name}
            <ExpireDay day={template.expireDay} />
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

          <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={s.iconTouchable}>
            <Icon name='trash-2' size={24} style={s.icon} />
          </TouchableOpacity>
        </Card>
      </TouchableNativeFeedback>

      <TemplateModal
        template={template}
        isOpen={isModalOpen}
        onSave={template => onTemplateChange(template)}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
