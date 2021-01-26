import React, { ReactNode, useState } from 'react'
import { LayoutRectangle } from 'react-native'

type BottomBarProviderProps = {
  children: ReactNode
}

type LayoutHeight = Pick<LayoutRectangle, 'height'>

type BottomBarProviderContext = {
  layout: LayoutHeight
  setLayout(layout: LayoutHeight): void
}

export const BottomBarContext = React.createContext<BottomBarProviderContext>({
  layout: { height: 0 },
  setLayout: () => {}
})

export default function BottomBarProvider({ children }: BottomBarProviderProps) {
  const [layout, setLayout] = useState<LayoutHeight>({ height: 0 })

  return (
    <BottomBarContext.Provider value={{ layout, setLayout }}>{children}</BottomBarContext.Provider>
  )
}
