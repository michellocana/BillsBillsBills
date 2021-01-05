import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import BillGroupCheckbox from './BillGroupCheckbox'

import { BillGroup } from '../helpers/github'

const s = StyleSheet.create({
  container: {
    margin: 8,
    padding: 16,
    elevation: 2,
    backgroundColor: '#fff',
    borderRadius: 4
  },

  title: {
    fontWeight: '700',
    color: '#333',
    fontSize: 16
  }
})

type BillGroupCardProps = BillGroup & {
  onBillChange(billId: string, isPaid: boolean): void
}

export default function BillGroupCard({ id, bills, onBillChange }: BillGroupCardProps) {
  const date = dayjs(id, 'YYYY-MM').format('MMMM [de] YYYY')

  return (
    <View key={id} style={s.container}>
      <Text style={s.title}>{date}</Text>

      {bills.map(bill => (
        <BillGroupCheckbox {...bill} key={bill.id} onBillChange={onBillChange} />
      ))}
    </View>
  )
}
