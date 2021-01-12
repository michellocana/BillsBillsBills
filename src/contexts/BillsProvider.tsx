import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { GITHUB_GIST_ID } from '@env'

import { updateBillGroups, fetchBills } from '../helpers/github'

type BillsProviderProps = {
  children: ReactNode
}

type BillsProviderContext = {
  isRefreshing: boolean
  fetchAllBills(): Promise<void>
  billsResponse: BillsResponse
  onBillChange(billId: string, isPaid: boolean, changedBillGroup: BillGroup): void
}

export const BillsContext = React.createContext<BillsProviderContext>({
  isRefreshing: false,
  fetchAllBills: async () => {},
  billsResponse: {
    templates: [],
    billGroups: []
  },
  onBillChange: () => {}
})

export default function BillsProvider({ children }: BillsProviderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [billsResponse, setBillsResponse] = useState<BillsResponse>({
    templates: [],
    billGroups: []
  })

  const onBillChange = useCallback(
    async (billId: string, isPaid: boolean, changedBillGroup: BillGroup) => {
      const newBillsResponse = {
        templates: billsResponse.templates,
        billGroups: billsResponse.billGroups.map(billGroup => {
          return {
            ...billGroup,
            bills: billGroup.bills.map(bill => {
              if (billGroup.id === changedBillGroup.id && bill.id === billId) {
                return { ...bill, isPaid }
              }

              return { ...bill }
            })
          }
        })
      }

      setBillsResponse(newBillsResponse)
      await updateBillGroups(GITHUB_GIST_ID, newBillsResponse)
    },
    [billsResponse]
  )

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
    <BillsContext.Provider value={{ isRefreshing, fetchAllBills, billsResponse, onBillChange }}>
      {children}
    </BillsContext.Provider>
  )
}
