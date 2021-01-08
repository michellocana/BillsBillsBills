import React, { useCallback, useEffect, useState } from 'react'
import { ScrollView, RefreshControl, StyleSheet } from 'react-native'
import { GITHUB_GIST_ID } from '@env'

import BillGroupCard from '../components/BillGroupCard'

import { fetchBills, updateBillGroups } from '../helpers/github'
import {  COLOR_GRAY, COLOR_GREEN_1 } from '../constants/colors'

const s = StyleSheet.create({
  scrollView: {
    minHeight: '100%'
  }
})

// TODO make templates editable
// TODO bottom bar
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

    setBillsResponse(newBillsResponse)
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
          progressBackgroundColor={COLOR_GRAY}
          colors={[COLOR_GREEN_1]}
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
