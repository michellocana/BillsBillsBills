import React from 'react'

import BillGroupCard from '../components/BillGroupCard'

import useBills from '../hooks/useBills'
import ScreenScrollView from '../components/ScreenScrollView'

// TODO make templates editable
export default function Home() {
  const { billsResponse, onBillChange } = useBills()

  return (
    <ScreenScrollView>
      {billsResponse?.billGroups.map((currentBillGroup: BillGroup) => (
        <BillGroupCard
          {...currentBillGroup}
          key={currentBillGroup.id}
          onBillChange={(billId, isPaid) => onBillChange(billId, isPaid, currentBillGroup)}
        />
      ))}
    </ScreenScrollView>
  )
}
