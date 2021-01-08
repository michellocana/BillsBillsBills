import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox'
import { COLOR_GREEN_1, COLOR_GREEN_2, COLOR_WHITE } from '../constants/colors'

type BillGroupCheckboxProps = Bill & {
  onBillChange(billId: string, isPaid: boolean): void
}

const s = StyleSheet.create({
  bill: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  text: {
    color: COLOR_WHITE
  }
})

export default function BillGroupCheckbox({
  id,
  expireDay,
  name,
  isPaid,
  onBillChange
}: BillGroupCheckboxProps) {
  const [value, setValue] = useState(isPaid)

  return (
    <View style={s.bill}>
      <CheckBox
        value={value}
        onValueChange={newValue => {
          setValue(newValue)
          onBillChange(id, newValue)
        }}
        tintColors={{ true: COLOR_GREEN_1, false: COLOR_WHITE }}
      />

      <Text style={s.text}>
        {name} (vence no dia {expireDay})
      </Text>
    </View>
  )
}
