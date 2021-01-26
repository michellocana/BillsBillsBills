import React from 'react'

import useBills from '../hooks/useBills'
import useBottomBar from '../hooks/useBottomBar'

import ScreenScrollView from '../components/UI/ScreenScrollView'
import TemplateCard from '../components/Template/TemplateCard'
import TemplateCreateModal from '../components/Template/TemplateCreateModal'

export default function Templates() {
  const { billsResponse } = useBills()
  const { layout: bottomBarLayout } = useBottomBar()

  return (
    <>
      <ScreenScrollView>
        {billsResponse.templates.map(template => (
          <TemplateCard key={template.id} {...template} />
        ))}
      </ScreenScrollView>

      <TemplateCreateModal buttonOffset={bottomBarLayout.height} />
    </>
  )
}
