import React from 'react'

import useBills from '../hooks/useBills'

import ScreenScrollView from '../components/UI/ScreenScrollView'
import TemplateCard from '../components/Template/TemplateCard'

// TODO create template modal
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
