import React, { useState } from 'react'
import { TouchableNativeFeedback, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_GREEN_1, COLOR_WHITE, COLOR_LIGHT_RED } from '../constants/colors'
import Card, { CardType } from './Card'
import ExpireDay, { ExpireDayType } from './ExpireDay'
import TemplateFormModal from './TemplateFormModal'
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

export default function TemplateCard(props: Template) {
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
          key={props.id}
          style={s.textWrapper}
          type={props.isEnabled ? CardType.Success : CardType.Danger}
        >
          <Text style={s.text}>
            {props.name}
            <ExpireDay
              day={props.expireDay}
              type={props.isEnabled ? ExpireDayType.Success : ExpireDayType.Danger}
            />
          </Text>

          <Switch
            trackColor={{
              false: COLOR_LIGHT_RED,
              true: COLOR_GREEN_1
            }}
            thumbColor={COLOR_WHITE}
            value={props.isEnabled}
            onValueChange={isEnabled => onTemplateChange({ ...props, isEnabled })}
          />

          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              // TODO delete template with confirmation modal
              // onTemplateDelete(template)
            }}
            style={s.iconTouchable}
          >
            <Icon name='trash-2' size={24} style={s.icon} />
          </TouchableOpacity>
        </Card>
      </TouchableNativeFeedback>

      <TemplateFormModal
        template={props}
        isOpen={isModalOpen}
        onSave={template => onTemplateChange(template)}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
