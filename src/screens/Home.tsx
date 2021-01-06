import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, RefreshControl, StyleSheet } from 'react-native'
import { GITHUB_GIST_ID } from '@env'

import BillGroupCard from '../components/BillGroupCard'

import { BillGroup, BillsResponse, fetchBills, updateBillGroups } from '../helpers/github'

const s = StyleSheet.create({
  scrollView: {
    minHeight: '100%'
  }
})

export default function Home() {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [billsResponse, setBillsResponse] = useState<BillsResponse>({
    templates: [],
    billGroups: []
  })

  const onBillChange = useCallback(async (billId: string, isPaid: boolean, changedBillGroup: BillGroup) => {
    const newBillsResponse = {
      templates: billsResponse.templates,
      billGroups: billsResponse.billGroups.map(billGroup => {
        return {
          ...billGroup,
          bills: billGroup.bills.map(bill => {
            if (billGroup.id === changedBillGroup.id && bill.id === billId)  {
              return { ...bill, isPaid }
            }

            return { ...bill }
          })
        }
      })
    }

    await updateBillGroups(GITHUB_GIST_ID, newBillsResponse)
  }, [billsResponse])

  const fetchAllBills = useCallback(async () => {
    setIsRefreshing(true)
    const newBills = await fetchBills(GITHUB_GIST_ID)
    setBillsResponse(newBills)
    setIsRefreshing(false)
  }, [])

  useEffect(() => {
    fetchAllBills()
  }, [])

  return (
    <ScrollView
      style={s.scrollView}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => fetchAllBills()}
        />
      }
    >
      {billsResponse?.billGroups.map((currentBillGroup: BillGroup) => (
        <BillGroupCard
          {...currentBillGroup}
          key={currentBillGroup.id}
          onBillChange={(billId, isPaid) => onBillChange(billId, isPaid, currentBillGroup)}
        />
      ))}
    </ScrollView>
  )
}
