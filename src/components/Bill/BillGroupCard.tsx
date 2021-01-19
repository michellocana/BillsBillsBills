import dayjs from 'dayjs'
import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { COLOR_WHITE } from '../../constants/colors'

import BillGroupCheckbox from './BillGroupCheckbox'
import Card, { CardType } from '../UI/Card'

const s = StyleSheet.create({
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
    <Card key={id} type={hasAllBillsPaid ? CardType.Success : CardType.Danger}>
      <Text style={s.title}>{date}</Text>

      {bills.map(bill => (
        <BillGroupCheckbox {...bill} key={bill.id} onBillChange={onBillChange} />
      ))}
    </Card>
  )
}
