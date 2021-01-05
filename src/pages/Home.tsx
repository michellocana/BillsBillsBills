import React, { useCallback, useState } from 'react'
import { Button, View, ActivityIndicator,  StyleSheet } from 'react-native'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_GIST_ID } from '@env'

import BillGroupCard from '../components/BillGroupCard'

import { authorize, BillGroup, BillsResponse, fetchBills, updateBillGroups } from '../helpers/github'

const s = StyleSheet.create({
  spinner: {
    marginTop: 20
  }
})

export default function Home() {
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

  return (
    <View>
      <Button
        title='sign in with github'
        onPress={async () => {
          await authorize(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)
          const newBills = await fetchBills(GITHUB_GIST_ID)
          setBillsResponse(newBills)
        }}
      />

      {billsResponse?.billGroups.length ? (
        billsResponse.billGroups.map((currentBillGroup: BillGroup) => (
          <BillGroupCard
            {...currentBillGroup}
            key={currentBillGroup.id}
            onBillChange={(billId, isPaid) => onBillChange(billId, isPaid, currentBillGroup)}
          />
        ))
      ) : (
        <ActivityIndicator size='large' color='black' style={s.spinner} />
      )}
    </View>
  )
}
