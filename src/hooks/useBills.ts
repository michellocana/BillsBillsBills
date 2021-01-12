import { useContext } from 'react'

import { BillsContext } from '../contexts/BillsProvider'

export default function useBills() {
  return useContext(BillsContext)
}
