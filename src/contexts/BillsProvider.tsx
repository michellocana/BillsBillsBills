import React, { ReactNode, useCallback, useEffect, useState } from 'react'
import { GITHUB_GIST_ID } from '@env'

import { fetchBills, updateBillsResponse, updateGist } from '../helpers/github'

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
  onTemplateCreate(templateToCreate: Template): Promise<void>
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
  onTemplateDelete: async () => {},
  onTemplateCreate: async () => {}
})

export default function BillsProvider({ children }: BillsProviderProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [billsResponse, setBillsResponse] = useState<BillsResponse>({
    templates: [],
    billGroups: []
  })

  const onBillChange = useCallback(
    async (billId: string, isPaid: boolean, changedBillGroup: BillGroup) => {
      const newBillsResponse: BillsResponse = updateBillsResponse({
        ...billsResponse,
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
      })

      setBillsResponse(newBillsResponse)
      await updateGist(GITHUB_GIST_ID, newBillsResponse)
    },
    [billsResponse]
  )

  const onTemplateChange = useCallback(
    async (templateToUpdate: Template) => {
      const newBillsResponse: BillsResponse = updateBillsResponse({
        ...billsResponse,
        templates: billsResponse.templates.map<Template>(template => {
          if (template.id !== templateToUpdate.id) {
            return template
          }

          return { ...template, ...templateToUpdate }
        })
      })

      setBillsResponse(newBillsResponse)
      await updateGist(GITHUB_GIST_ID, newBillsResponse)
    },
    [billsResponse]
  )

  const onTemplateDelete = useCallback(
    async (templateToDelete: Template) => {
      const newBillsResponse: BillsResponse = updateBillsResponse({
        ...billsResponse,
        templates: billsResponse.templates.filter(template => template.id !== templateToDelete.id)
      })

      setBillsResponse(newBillsResponse)
      await updateGist(GITHUB_GIST_ID, newBillsResponse)
    },
    [billsResponse]
  )

  const onTemplateCreate = useCallback(
    async (templateToCreate: Template) => {
      const newBillsResponse: BillsResponse = updateBillsResponse({
        ...billsResponse,
        templates: [...billsResponse.templates, templateToCreate]
      })

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
        onTemplateDelete,
        onTemplateCreate
      }}
    >
      {children}
    </BillsContext.Provider>
  )
}
