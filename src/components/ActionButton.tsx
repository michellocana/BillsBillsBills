import React, { ReactNode } from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Feather'
import { COLOR_GREEN_1, COLOR_LIGHT_RED, COLOR_WHITE } from '../constants/colors'

const s = StyleSheet.create({
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
  }
})

export enum ActionButtonType {
  Save,
  Trash,
  Cancel
}

export enum ActionButtonColor {
  Success,
  Danger,
  Neutral
}

type ActionButtonProps = {
  onPress(): void
  children: ReactNode
  type: ActionButtonType
  color: ActionButtonColor
}

export default function ActionButton({ onPress, children, type, color }: ActionButtonProps) {
  const icons: Record<ActionButtonType, any> = {
    [ActionButtonType.Save]: 'check',
    [ActionButtonType.Trash]: 'trash-2',
    [ActionButtonType.Cancel]: 'x'
  }
  const colors: Record<ActionButtonColor, any> = {
    [ActionButtonColor.Success]: COLOR_GREEN_1,
    [ActionButtonColor.Danger]: COLOR_LIGHT_RED,
    [ActionButtonColor.Neutral]: COLOR_WHITE
  }
  const colorStyle = {
    color: colors[color]
  }

  return (
    <TouchableOpacity style={s.iconTouchable} onPress={onPress} activeOpacity={0.5}>
      <Icon name={icons[type]} style={[s.icon, colorStyle]} />
      <Text style={[s.action, colorStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}
