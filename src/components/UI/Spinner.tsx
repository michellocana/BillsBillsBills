import React from 'react'
import { ActivityIndicator } from 'react-native'

import { COLOR_GREEN_1 } from '../../constants/colors'

export default function Spinner() {
  return <ActivityIndicator size='large' color={COLOR_GREEN_1} />
}
