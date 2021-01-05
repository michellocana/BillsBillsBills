import React, { useState } from 'react'
import { Button, View, ActivityIndicator, Text, StyleSheet } from 'react-native'
import { GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, GITHUB_GIST_ID } from '@env'

import { authorize, fetchBillGroups, BillGroup } from '../helpers/github'

const s = StyleSheet.create({
  spinner: {
    marginTop: 20
  }
})

export default function Home() {
  const [billGroups, setBillGroups] = useState<BillGroup[]>()

  return (
    <View>
      <Button
        title='sign in with github'
        onPress={async () => {
          await authorize(GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET)
          const newBills = await fetchBillGroups(GITHUB_GIST_ID)
          setBillGroups(newBills)
        }}
      />

      {billGroups?.length ? (
        billGroups.map(billGroup => (
          <View key={billGroup.id}>
            <Text>{billGroup.id}</Text>

            {billGroup.bills.map(bill => (
              <View key={bill.name}>
                <Text>{bill.name}</Text>
                <Text>{bill.expireDay}</Text>
                <Text>{bill.paid ? 'paid' : 'not paid'}</Text>
              </View>
            ))}
          </View>
        ))
      ) : (
        <ActivityIndicator size='large' color='black' style={s.spinner} />
      )}
    </View>
  )
}
