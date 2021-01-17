import React from 'react'

import useBills from '../hooks/useBills'

import ScreenScrollView from '../components/ScreenScrollView'
import TemplateCard from '../components/TemplateCard'

// TODO make templates editable
export default function Templates() {
  const { billsResponse } = useBills()

  return (
    <ScreenScrollView>
      {billsResponse.templates.map(template => (
        <TemplateCard key={template.id} {...template} />
      ))}
    </ScreenScrollView>
  )
}
