import { useContext } from 'react'

import { BottomBarContext } from '../contexts/BottomBarProvider'

export default function useBottomBar() {
  return useContext(BottomBarContext)
}
