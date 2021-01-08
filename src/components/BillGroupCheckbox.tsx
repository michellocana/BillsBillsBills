import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import CheckBox from '@react-native-community/checkbox'

type BillGroupCheckboxProps = Bill & {
  onBillChange(billId: string, isPaid: boolean): void
}

const s = StyleSheet.create({
  bill: {
    flexDirection: 'row',
    alignItems: 'center'
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
      />

      <Text>
        {name} (vence no dia {expireDay})
      </Text>
    </View>
  )
}
