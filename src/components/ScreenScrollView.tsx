import React, { ReactNode } from 'react'
import { RefreshControl, ScrollView, StyleSheet } from 'react-native'

import { COLOR_GRAY, COLOR_GREEN_1 } from '../constants/colors'
import useBills from '../hooks/useBills'

const s = StyleSheet.create({
  scrollView: {
    flex: 1
  }
})

type ScreenScrollViewProps = {
  children: ReactNode
}

export default function ScreenScrollView({ children }: ScreenScrollViewProps) {
  const { isRefreshing, fetchAllBills } = useBills()
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
      {children}
    </ScrollView>
  )
}
