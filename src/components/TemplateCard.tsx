import React, { useState } from 'react'
import { TouchableNativeFeedback, Text, Switch, TouchableOpacity, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'

import { COLOR_RED, COLOR_GREEN_1, COLOR_WHITE, COLOR_LIGHT_RED } from '../constants/colors'
import Card, { CardType } from './Card'
import ExpireDay from './ExpireDay'
import TemplateEditModal from './TemplateEditModal'

type TemplateCardProps = Template & {}

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

export default function TemplateCard({ id, name, expireDay }: TemplateCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(true)

  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          setIsModalOpen(true)
        }}
      >
        <Card
          key={id}
          style={s.textWrapper}
          type={CardType.Success} // TODO change this based on enabled flag
        >
          <Text style={s.text}>
            {name}
            <ExpireDay day={expireDay} />
          </Text>

          <Switch
            trackColor={{
              false: COLOR_RED,
              true: COLOR_GREEN_1
            }}
            thumbColor={COLOR_WHITE}
            value
          />

          <TouchableOpacity activeOpacity={0.5} onPress={() => {}} style={s.iconTouchable}>
            <Icon name='trash-2' size={24} style={s.icon} />
          </TouchableOpacity>
        </Card>
      </TouchableNativeFeedback>

      <TemplateEditModal
        initialName={name}
        initialExpireDay={expireDay}
        isOpen={id === 'fies'}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  )
}
