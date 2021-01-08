import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { COLOR_GRAY, COLOR_GREEN_1, COLOR_RED, COLOR_WHITE } from '../constants/colors'

import BillGroupCheckbox from './BillGroupCheckbox'

const s = StyleSheet.create({
  container: {
    margin: 8,
    padding: 16,
    backgroundColor: COLOR_GRAY,
    borderRadius: 4,
    borderBottomWidth: 4
  },

  containerDanger: {
    borderBottomColor: COLOR_RED
  },

  containerSuccess: {
    borderBottomColor: COLOR_GREEN_1
  },

  title: {
    fontWeight: '700',
    color: COLOR_WHITE,
    fontSize: 16
  }
})

type BillGroupCardProps = BillGroup & {
  onBillChange(billId: string, isPaid: boolean): void
}

export default function BillGroupCard({ id, bills, onBillChange }: BillGroupCardProps) {
  const date = dayjs(id, 'YYYY-MM').format('MMMM [de] YYYY')
  const hasAllBillsPaid = bills.every(bill => bill.isPaid)

  return (
    <View key={id} style={[s.container, hasAllBillsPaid ? s.containerSuccess : s.containerDanger]}>
      <Text style={s.title}>{date}</Text>

      {bills.map(bill => (
        <BillGroupCheckbox {...bill} key={bill.id} onBillChange={onBillChange} />
      ))}
    </View>
  )
}
