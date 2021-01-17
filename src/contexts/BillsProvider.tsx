import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { GITHUB_GIST_ID } from '@env'

import { fetchBills, updateGist } from '../helpers/github'

type BillsProviderProps = {
  children: ReactNode
}

type BillsProviderContext = {
  isRefreshing: boolean
  fetchAllBills(): Promise<void>
  billsResponse: BillsResponse
  onBillChange(billId: string, isPaid: boolean, changedBillGroup: BillGroup): Promise<void>
  onTemplateChange(templateToUpdate: Template): Promise<void>
  onTemplateDelete(templateToDelete: Template): Promise<void>
}

export const BillsContext = React.createContext<BillsProviderContext>({
  isRefreshing: false,
  fetchAllBills: async () => {},
  billsResponse: {
    templates: [],
    billGroups: []
  },
  onBillChange: async () => {},
  onTemplateChange: async () => {},
  onTemplateDelete: async () => {}
})

export default function BillsProvider({ children }: BillsProviderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [billsResponse, setBillsResponse] = useState<BillsResponse>({
    templates: [],
    billGroups: []
  })

  const onBillChange = useCallback(
    async (billId: string, isPaid: boolean, changedBillGroup: BillGroup) => {
      const newBillsResponse: BillsResponse = {
        templates: billsResponse.templates,
        billGroups: billsResponse.billGroups
          .map(billGroup => {
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
          .sort((billGroupA, billGroupB) => (billGroupA.id > billGroupB.id ? -1 : 1))
      }

      setBillsResponse(newBillsResponse)
      await updateGist(GITHUB_GIST_ID, newBillsResponse)
    },
    [billsResponse]
  )

  const onTemplateChange = useCallback(
    async (templateToUpdate: Template) => {
      const newBillsResponse: BillsResponse = {
        templates: billsResponse.templates
          .map<Template>(template => {
            if (template.id !== templateToUpdate.id) {
              return template
            }

            return { ...template, ...templateToUpdate }
          })
          .sort((templateA, templateB) => (templateA.name < templateB.name ? -1 : 1))
          .sort((templateA, templateB) => (templateA.expireDay < templateB.expireDay ? -1 : 1)),
        billGroups: billsResponse.billGroups
      }

      setBillsResponse(newBillsResponse)
      await updateGist(GITHUB_GIST_ID, newBillsResponse)
    },
    [billsResponse]
  )

  const onTemplateDelete = useCallback(
    async (templateToDelete: Template) => {
      const newBillsResponse: BillsResponse = {
        templates: billsResponse.templates.filter(template => template.id !== templateToDelete.id),
        billGroups: billsResponse.billGroups
      }

      setBillsResponse(newBillsResponse)
      await updateGist(GITHUB_GIST_ID, newBillsResponse)
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
    <BillsContext.Provider
      value={{
        isRefreshing,
        fetchAllBills,
        billsResponse,
        onBillChange,
        onTemplateChange,
        onTemplateDelete
      }}
    >
      {children}
    </BillsContext.Provider>
  )
}
